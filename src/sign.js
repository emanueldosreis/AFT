'use strict';

// AFT event signing — Ed25519 / Node built-in crypto.
// Signs the canonical event body (including event_hash) and attaches the
// signature array. No external dependencies required.
//
// Signing flow (per AFT-002):
//   1. Build event body (no event_hash, no signatures yet).
//   2. Hash body  → crypto.event_hash  (sha256 of canonical body without hash field).
//   3. Sign canonical(body + event_hash) with Ed25519 private key.
//   4. Attach signatures array.
//
// Verification expects the inverse: strip signatures, verify sig, then verify hash.

const crypto = require('crypto');
const { canonicalize } = require('./canonicalize');

// Build an unsigned event envelope from the caller-supplied fields.
// The caller must supply all required AFT-002 fields.
// event_hash and signatures are NOT included — signEvent fills them in.
function buildEventBody({
  eventType,
  agentId,
  principalId,
  operatorId,
  counterpartyId,
  transaction,
  authority,
  evidence,
  privacy,
  correlation,
  supersedesEventId,
}) {
  const body = {
    event_id: `aft:event:${crypto.randomUUID()}`,
    aft_event_version: '0.1',
    event_type: eventType,
    event_time: new Date().toISOString(),
    agent_id: agentId,
    principal_id: principalId,
    transaction,
    authority,
    evidence,
    privacy,
    crypto: {
      canonicalization: 'JCS-RFC8785',
      digest_alg: 'SHA-256',
      pqc_profile: 'AFT-PQC-1',
      signature_input: 'event_body_excluding_signatures_v1',
    },
  };

  if (operatorId) body.operator_id = operatorId;
  if (counterpartyId) body.counterparty_id = counterpartyId;
  if (correlation) body.correlation = correlation;
  if (supersedesEventId) body.supersedes_event_id = supersedesEventId;

  return body;
}

// Sign an event body (output of buildEventBody or a compatible JSON object).
// privateKeyPem — Ed25519 private key in PKCS#8 PEM format (from crypto.generateKeyPairSync).
// kid           — key identifier string.
// keyVersion    — integer (default 1).
// Returns a new object (does not mutate the input).
// Any pre-existing signatures and event_hash fields are stripped and recomputed.
function signEvent(eventBody, privateKeyPem, kid, keyVersion = 1) {
  // Step 1: compute event_hash over body without any existing hash or signatures.
  // eslint-disable-next-line no-unused-vars
  const { signatures: _sigs, crypto: existingCrypto = {}, ...rest } = eventBody;
  const { event_hash: _ignored, ...cryptoMeta } = existingCrypto;

  const bodyForHash = { ...rest, crypto: cryptoMeta };
  const hashInput = canonicalize(bodyForHash);
  const hashHex = crypto.createHash('sha256').update(hashInput).digest('hex');
  const eventHash = `sha256:${hashHex}`;

  // Step 2: assemble the body that will be signed (includes event_hash).
  const bodyToSign = {
    ...rest,
    crypto: { ...cryptoMeta, event_hash: eventHash },
  };

  // Step 3: sign the canonical form of the full body.
  const signInput = Buffer.from(canonicalize(bodyToSign));
  const sigBuffer = crypto.sign(null, signInput, privateKeyPem);
  const sigValue = sigBuffer.toString('base64url');

  const signature = {
    alg: 'aft-sig-ed25519-legacy',
    kid,
    key_version: keyVersion,
    pqc_profile: 'AFT-PQC-1',
    signature_value: sigValue,
    signature_created_at: new Date().toISOString(),
    verification_method: `did:key:${kid}#${kid}`,
  };

  return { ...bodyToSign, signatures: [signature] };
}

module.exports = { buildEventBody, signEvent };
