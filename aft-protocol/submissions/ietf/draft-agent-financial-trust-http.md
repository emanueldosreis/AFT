# draft-agent-financial-trust-http

Status: Individual Internet-Draft style sketch, Draft 0.1

## Abstract

This document sketches HTTP transport for AFT events, peer metadata, attestations, challenges, supersession, and verification flows. It does not define reputation scoring, payment settlement, or legal liability.

## Introduction

AFT is a federated trust protocol. HTTP APIs allow independent peers to exchange signed events, submit attestations, challenge claims, supersede incorrect records, and query peer capabilities.

## Terminology

Attestation: a signed claim by a peer about a transaction, event, credential, incident, dispute, or reputation state.  
Challenge: a signed objection to an attestation.  
Supersession: a signed replacement or correction for a prior attestation.

## Protocol Overview

Core endpoints include:

- `GET /.well-known/aft-agent-trust`;
- `POST /v1/events`;
- `POST /v1/attestations`;
- `GET /v1/attestations/{attestation_id}`;
- `GET /v1/attestations?subject_id={subject_id}`;
- `POST /v1/attestations/{attestation_id}/challenge`;
- `POST /v1/attestations/{attestation_id}/supersede`;
- `GET /v1/peers/{peer_id}/status`;
- `POST /v1/crypto/verify-signature`.

## Attestation Submission

Attestations MUST include issuer peer ID, attestation type, subject ID, event hash or credential hash, evidence hashes, signature metadata, and optional anchor references. Private evidence bodies SHOULD remain off-chain.

## Challenge And Supersession

The protocol SHOULD support challenge and supersession rather than deletion. A challenged attestation remains part of the evidence graph with status and resolution metadata.

## Suspended, Revoked, And Unknown Peers

Clients SHOULD reject or quarantine new events from peers marked `revoked` or `compromised`. Clients SHOULD apply local policy to `suspended`, `under_review`, `deprecated`, or `unknown` peers. HTTP APIs SHOULD return machine-readable reason codes.

## Signature Verification

HTTP clients MUST verify canonical payload hashes, algorithm identifiers, key identifiers, key versions, verification methods, signature creation time, and revocation status. AFT implementations SHOULD support hybrid classical + PQC profiles during migration.

## Security Considerations

Risks include replay, compromised keys, false attestations, malicious challenges, endpoint substitution, downgrade attacks, and equivocation. Implementations SHOULD use nonces, timestamps, signature verification, peer status checks, revocation, idempotency keys, and audit logs.

## Privacy Considerations

HTTP requests and responses MUST NOT require raw prompts, responses, PII, card data, bank data, customer names, private merchant data, or full logs. APIs SHOULD exchange hashes, commitments, encrypted references, and selective disclosures.

## IANA Considerations

Future drafts may request media type registrations for AFT event, attestation, and peer discovery documents.
