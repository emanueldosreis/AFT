# AFT-019 - Peer Discovery And Capabilities

Status: Draft 0.1  
Category: Normative

## Abstract

AFT peer discovery allows relying parties to find a peer's AFT service endpoints, supported event types, credential types, cryptographic profiles, PQC readiness, anchoring modes, revocation endpoint, privacy defaults, conformance level, and status. Discovery MAY occur through HTTPS `.well-known/aft-agent-trust`, DID service endpoints, or deployment-specific registries.

## Discovery Methods

### `.well-known/aft-agent-trust`

Peers with HTTPS origins SHOULD publish:

```text
https://example.com/.well-known/aft-agent-trust
```

The response media type SHOULD be `application/aft-peer-discovery+json` or `application/json`. The document MUST validate against the AFT peer discovery schema.

### DID Service Endpoint Discovery

Peers using DIDs SHOULD include a service entry in their DID document. The service type SHOULD be `AFTAgentTrustService`, and the service endpoint SHOULD reference the discovery document or AFT API base URL.

### Registry Discovery

Consortium and permissioned deployments MAY use signed trust registries to locate peers. Registry discovery MUST NOT remove the requirement to verify peer signatures, status, and capabilities.

## Capability Documents

A peer discovery document states what a peer claims to support. Verifiers SHOULD treat these claims as signed metadata, not as proof that all future events are valid. Capability declarations SHOULD include:

- supported event types;
- supported credential types;
- supported crypto profiles;
- PQC readiness level;
- supported anchoring modes;
- supported chains or ledgers;
- supported APIs;
- privacy policy metadata;
- revocation endpoint;
- conformance level;
- terms or policy URL hashes;
- peer status.

## AFT Peer Discovery Document Format

Required fields:

- `aft_version`;
- `peer_id`;
- `peer_name`;
- `peer_type`;
- `status`;
- `service_endpoints`;
- `supported_event_types`;
- `supported_credentials`;
- `supported_crypto_profiles`;
- `pqc_readiness_level`;
- `anchoring`;
- `conformance`;
- `privacy`;
- `revocation`;
- `created_at`;
- `updated_at`;
- `signatures`.

Example:

```json
{
  "aft_version": "0.1",
  "peer_id": "did:web:payments.example",
  "peer_name": "Example Payment Processor",
  "peer_type": ["payment_processor", "event_issuer"],
  "status": "active",
  "service_endpoints": {
    "events": "https://payments.example/aft/v1/events",
    "credentials": "https://payments.example/aft/v1/credentials",
    "revocation": "https://payments.example/aft/v1/revocations",
    "risk": "https://payments.example/aft/v1/risk",
    "anchors": "https://payments.example/aft/v1/anchors"
  },
  "supported_event_types": [
    "AGENT_PAYMENT_SETTLED",
    "AGENT_PAYMENT_FAILED",
    "AGENT_PAYMENT_CHARGEBACK_OPENED"
  ],
  "supported_credentials": [
    "AgentPaymentSettlementCredential",
    "AgentChargebackCredential"
  ],
  "supported_crypto_profiles": [
    "aft-sig-hybrid-ed25519-ml-dsa",
    "aft-sig-ml-dsa"
  ],
  "pqc_readiness_level": "AFT-PQC-2",
  "anchoring": {
    "mode": "merkle_batch",
    "supported_ledgers": ["base", "ethereum", "hyperledger-fabric"],
    "anchor_endpoint": "https://payments.example/aft/v1/anchors"
  },
  "conformance": {
    "profiles": ["AFT-Core", "AFT-Events", "AFT-Anchoring", "AFT-PQC-Hybrid"]
  },
  "privacy": {
    "default_disclosure": "hash_only",
    "pii_on_chain": false,
    "evidence_storage": "encrypted_off_chain"
  }
}
```

## Supported Event Types

`supported_event_types` identifies event types the peer claims it can issue, receive, or verify. Implementations SHOULD distinguish issuance capability from verification capability in future profiles. Draft 0.1 treats the field as a peer-declared capability and relies on policy to determine whether issuance is accepted.

## Supported Credential Types

`supported_credentials` identifies credential types the peer can issue, consume, or verify. Credential names SHOULD align with AFT VC profiles where possible.

## Supported Crypto Profiles

`supported_crypto_profiles` MUST use registered AFT signature profile identifiers. Peers SHOULD support at least one hybrid or PQC profile for financially material events. Classical-only peers SHOULD be treated as transitional.

## PQC Readiness

`pqc_readiness_level` MUST be one of `AFT-PQC-0` through `AFT-PQC-5`. Peers claiming `AFT-PQC-3` or higher SHOULD provide evidence of key rotation, revocation, and recovery testing.

## Anchoring Modes

Draft 0.1 anchoring modes:

- `none`;
- `merkle_batch`;
- `direct_event_hash`;
- `consortium_ledger`;
- `hybrid`.

A peer MAY support multiple ledgers. AFT MUST remain ledger-neutral.

## Service Endpoints

Endpoints MUST use HTTPS URLs unless a consortium profile explicitly defines an equivalent authenticated transport. Service endpoints SHOULD include events, credentials, revocation, risk, anchors, peer status, and capabilities when supported.

## Versioning

`aft_version` identifies the AFT discovery schema version. Breaking changes MUST use a new version and SHOULD preserve a compatibility endpoint during migration.

## Signing

Discovery documents SHOULD be signed. The signature metadata MUST include `alg`, `kid`, `key_version`, `pqc_profile`, `signature_value`, `verification_method`, and `signature_created_at`. Verifiers SHOULD validate the discovery signature before using the endpoints for financially material decisions.

## Revocation And Status

Peers MUST publish a status and SHOULD publish a revocation endpoint. Relying parties SHOULD reject or challenge new events from peers marked `revoked` or `compromised`, and SHOULD apply local policy for peers marked `under_review`, `suspended`, or `deprecated`.

## Caching

Discovery documents MAY be cached. Implementations SHOULD honor declared cache controls where present, but MUST re-check status for high-value or high-risk decisions. Cache replay SHOULD be mitigated by document signatures, `updated_at`, key version checks, and revocation endpoints.

## Privacy

Discovery documents may reveal relationships, capabilities, supported ledgers, and business roles. Peers SHOULD publish only necessary metadata and avoid listing private counterparties, private customer relationships, or internal infrastructure details.

## Security

Verifiers SHOULD protect against spoofed origins, stale discovery documents, compromised keys, DNS or hosting takeover, malicious endpoint substitution, downgrade to weak crypto profiles, and false capability claims. Discovery is a starting point for verification, not a trust guarantee.
