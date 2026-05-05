'use strict';

// AFT event verification.
// Two independent checks are performed and must both pass:
//   1. Signature check — Ed25519 signature over canonical(body including event_hash).
//   2. Hash check      — crypto.event_hash matches sha256(canonical(body without event_hash)).
//   3. Mandate check   — amount, expiry, and authorization fields are consistent.

const crypto = require('crypto');
const { canonicalize } = require('./canonicalize');

// Verify all signatures on an event against a single Ed25519 public key.
// publicKeyPem — SPKI PEM string.
// Returns { valid, signatures: [{kid, alg, valid, error?}], hash_valid, ... }
function verifyEventSignature(event, publicKeyPem) {
  const { signatures, ...bodyWithHash } = event;

  if (!Array.isArray(signatures) || signatures.length === 0) {
    return { valid: false, error: 'no signatures present', signatures: [], hash_valid: false };
  }

  // Verify each signature over canonical(bodyWithHash).
  const canonical = Buffer.from(canonicalize(bodyWithHash));
  const sigResults = signatures.map(sig => {
    try {
      const sigBuffer = Buffer.from(sig.signature_value, 'base64url');
      const valid = crypto.verify(null, canonical, publicKeyPem, sigBuffer);
      return { kid: sig.kid, alg: sig.alg, valid };
    } catch (err) {
      return { kid: sig.kid, alg: sig.alg, valid: false, error: err.message };
    }
  });

  // Independently verify the event_hash field.
  const { crypto: { event_hash, ...cryptoMeta }, ...rest } = bodyWithHash;
  const bodyForHash = { ...rest, crypto: cryptoMeta };
  const expectedHex = crypto.createHash('sha256').update(canonicalize(bodyForHash)).digest('hex');
  const expectedHash = `sha256:${expectedHex}`;
  const hashValid = event_hash === expectedHash;

  return {
    valid: sigResults.every(r => r.valid) && hashValid,
    signatures: sigResults,
    hash_valid: hashValid,
    recorded_hash: event_hash,
    expected_hash: expectedHash,
  };
}

// Check that the event's authority fields are internally consistent.
// Does not contact external revocation services — offline check only.
function checkMandateCompliance(event) {
  const { authority, transaction, event_time } = event;
  const issues = [];

  if (!authority.authorized) {
    issues.push('authority.authorized is false');
  }

  if (authority.expires_at && new Date(authority.expires_at) < new Date(event_time)) {
    issues.push(
      `mandate expired at ${authority.expires_at}, event occurred at ${event_time}`
    );
  }

  if (authority.amount_limit && transaction.amount) {
    const limit = parseFloat(authority.amount_limit.value);
    const actual = parseFloat(transaction.amount.value);
    if (isNaN(limit) || isNaN(actual)) {
      issues.push('could not parse amount or limit as a number');
    } else if (actual > limit) {
      issues.push(
        `transaction amount ${actual} ${transaction.amount.currency} exceeds mandate limit ${limit} ${authority.amount_limit.currency}`
      );
    }
    if (authority.amount_limit.currency !== transaction.amount.currency) {
      issues.push(
        `currency mismatch: mandate limit is ${authority.amount_limit.currency}, transaction is ${transaction.amount.currency}`
      );
    }
  }

  return {
    compliant: issues.length === 0,
    issues,
  };
}

// Full event verification: signature + hash + mandate compliance.
// publicKeyPem — SPKI PEM string.
function verifyEvent(event, publicKeyPem) {
  const sigResult = verifyEventSignature(event, publicKeyPem);
  const mandateResult = checkMandateCompliance(event);

  return {
    valid: sigResult.valid && mandateResult.compliant,
    signature: sigResult,
    mandate: mandateResult,
  };
}

module.exports = { verifyEvent, verifyEventSignature, checkMandateCompliance };
