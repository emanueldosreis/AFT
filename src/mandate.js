'use strict';

const crypto = require('crypto');
const { canonicalize } = require('./canonicalize');

// Build a signed mandate reference object.
// params:
//   mandateType     — one of the AFT mandate type enum values
//   principalId     — aft:principal:... or did:...
//   agentId         — aft:agent:...
//   scope           — string[] of permitted resource/service categories
//   amountLimit     — { value: '5.00', currency: 'USD' }
//   purposeCodes    — string[] (optional)
//   expiresInSeconds — number (default 3600)
//   counterpartyConstraints — entityId[] (optional)
function buildMandate({
  mandateType,
  principalId,
  agentId,
  scope,
  amountLimit,
  purposeCodes = [],
  expiresInSeconds = 3600,
  counterpartyConstraints = [],
}) {
  const now = new Date();
  const expiration = new Date(now.getTime() + expiresInSeconds * 1000);

  const body = {
    mandate_id: `aft:mandate:${crypto.randomUUID()}`,
    mandate_type: mandateType,
    principal_id: principalId,
    agent_id: agentId,
    scope,
    amount_limit: amountLimit,
    purpose_codes: purposeCodes,
    expiration: expiration.toISOString(),
    nonce: crypto.randomBytes(16).toString('hex'),
    revocation: {
      status: 'ACTIVE',
      revocation_ref: `aft:revocation:${crypto.randomUUID()}`,
    },
  };

  if (counterpartyConstraints.length > 0) {
    body.counterparty_constraints = counterpartyConstraints;
  }

  body.mandate_hash = hashMandateBody(body);
  return body;
}

// Compute the sha256 hash of the canonical mandate body.
// Excludes mandate_hash and signature fields so the hash is stable.
function hashMandateBody(mandate) {
  const { mandate_hash, signature, ...body } = mandate;
  const canonical = canonicalize(body);
  const hex = crypto.createHash('sha256').update(canonical).digest('hex');
  return `sha256:${hex}`;
}

// Re-hash any mandate object. Useful for verifying a received mandate's hash field.
function verifyMandateHash(mandate) {
  const expected = hashMandateBody(mandate);
  return {
    valid: mandate.mandate_hash === expected,
    expected,
    recorded: mandate.mandate_hash,
  };
}

module.exports = { buildMandate, hashMandateBody, verifyMandateHash };
