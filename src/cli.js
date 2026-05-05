#!/usr/bin/env node
'use strict';

// AFT reference CLI — minimal tooling for the event envelope + mandate binding primitive.
// No external dependencies. Requires Node 18+.
//
// Commands:
//   keygen  <outdir>                          — generate Ed25519 key pair
//   mandate <out.json>                        — write a sample LOW_VALUE_API_PURCHASE mandate
//   sign    <event.json> <private.pem> <kid>  — sign an event envelope
//   verify  <event.json> <public.pem>         — verify a signed event envelope

const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

const { buildMandate } = require('./mandate');
const { signEvent } = require('./sign');
const { verifyEvent } = require('./verify');

const [, , command, ...args] = process.argv;

const USAGE = `
aft-cli — Agent Financial Trust Protocol reference tool
Requires Node 18+. No external dependencies.

Commands:
  keygen  <outdir>                          Generate an Ed25519 key pair
  mandate <out.json>                        Write a sample mandate JSON
  sign    <event.json> <private.pem> <kid>  Sign an AFT event envelope
  verify  <event.json> <public.pem>         Verify a signed AFT event envelope
  help                                      Show this message
`;

function run() {
  switch (command) {
    case 'keygen':  return cmdKeygen();
    case 'mandate': return cmdMandate();
    case 'sign':    return cmdSign();
    case 'verify':  return cmdVerify();
    case 'help':
    case undefined:
      process.stdout.write(USAGE + '\n');
      break;
    default:
      process.stderr.write(`Unknown command: ${command}\n${USAGE}\n`);
      process.exit(1);
  }
}

function cmdKeygen() {
  const outdir = args[0] || '.';
  if (!fs.existsSync(outdir)) {
    process.stderr.write(`Directory does not exist: ${outdir}\n`);
    process.exit(1);
  }

  const { privateKey, publicKey } = crypto.generateKeyPairSync('ed25519', {
    privateKeyEncoding: { type: 'pkcs8', format: 'pem' },
    publicKeyEncoding:  { type: 'spki',  format: 'pem' },
  });

  const privPath = path.join(outdir, 'aft-private.pem');
  const pubPath  = path.join(outdir, 'aft-public.pem');
  fs.writeFileSync(privPath, privateKey, { mode: 0o600 });
  fs.writeFileSync(pubPath, publicKey);

  process.stdout.write(`Key pair generated:\n  private: ${privPath}\n  public:  ${pubPath}\n`);
  process.stdout.write(`\nKeep aft-private.pem secret. Use it only with the 'sign' command.\n`);
}

function cmdMandate() {
  const outPath = args[0] || 'mandate.json';

  const mandate = buildMandate({
    mandateType:      'LOW_VALUE_API_PURCHASE',
    principalId:      'aft:principal:replace-with-your-principal-id',
    agentId:          'aft:agent:replace-with-your-agent-id',
    scope:            ['search-api', 'data-retrieval'],
    amountLimit:      { value: '5.00', currency: 'USD' },
    purposeCodes:     ['DATA_RETRIEVAL'],
    expiresInSeconds: 3600,
  });

  fs.writeFileSync(outPath, JSON.stringify(mandate, null, 2));
  process.stdout.write(`Mandate written to ${outPath}\n`);
  process.stdout.write(`mandate_id:   ${mandate.mandate_id}\n`);
  process.stdout.write(`mandate_hash: ${mandate.mandate_hash}\n`);
  process.stdout.write(`expires_at:   ${mandate.expiration}\n`);
  process.stdout.write(`\nEdit the file to match your agent and principal IDs before using in an event.\n`);
}

function cmdSign() {
  const [eventPath, keyPath, kid = 'key-1'] = args;
  if (!eventPath || !keyPath) {
    process.stderr.write('Usage: aft sign <event.json> <private.pem> [kid]\n');
    process.exit(1);
  }

  let eventBody;
  try {
    eventBody = JSON.parse(fs.readFileSync(eventPath, 'utf8'));
  } catch (err) {
    process.stderr.write(`Failed to read event file: ${err.message}\n`);
    process.exit(1);
  }

  let privateKey;
  try {
    privateKey = fs.readFileSync(keyPath, 'utf8');
  } catch (err) {
    process.stderr.write(`Failed to read private key: ${err.message}\n`);
    process.exit(1);
  }

  let signed;
  try {
    signed = signEvent(eventBody, privateKey, kid);
  } catch (err) {
    process.stderr.write(`Signing failed: ${err.message}\n`);
    process.exit(1);
  }

  const outPath = eventPath.replace(/\.json$/, '.signed.json');
  fs.writeFileSync(outPath, JSON.stringify(signed, null, 2));

  process.stdout.write(`Signed event written to ${outPath}\n`);
  process.stdout.write(`event_id:   ${signed.event_id}\n`);
  process.stdout.write(`event_hash: ${signed.crypto.event_hash}\n`);
  process.stdout.write(`kid:        ${signed.signatures[0].kid}\n`);
  process.stdout.write(`signed_at:  ${signed.signatures[0].signature_created_at}\n`);
}

function cmdVerify() {
  const [eventPath, keyPath] = args;
  if (!eventPath || !keyPath) {
    process.stderr.write('Usage: aft verify <event.json> <public.pem>\n');
    process.exit(1);
  }

  let event;
  try {
    event = JSON.parse(fs.readFileSync(eventPath, 'utf8'));
  } catch (err) {
    process.stderr.write(`Failed to read event file: ${err.message}\n`);
    process.exit(1);
  }

  let publicKey;
  try {
    publicKey = fs.readFileSync(keyPath, 'utf8');
  } catch (err) {
    process.stderr.write(`Failed to read public key: ${err.message}\n`);
    process.exit(1);
  }

  let result;
  try {
    result = verifyEvent(event, publicKey);
  } catch (err) {
    process.stderr.write(`Verification error: ${err.message}\n`);
    process.exit(1);
  }

  process.stdout.write(JSON.stringify(result, null, 2) + '\n');

  if (result.valid) {
    process.stdout.write('\nOK  signature valid, hash matches, mandate compliant\n');
    process.exit(0);
  } else {
    process.stdout.write('\nFAIL  verification did not pass — see details above\n');
    process.exit(1);
  }
}

run();
