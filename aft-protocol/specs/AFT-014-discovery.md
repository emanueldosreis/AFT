# AFT-014 - Discovery

Status: Draft 0.1  
Category: Normative

## Purpose

AFT discovery allows agents, peers, verifiers, merchants, marketplaces, wallets, payment processors, and reputation providers to find AFT service endpoints and capability metadata. Discovery supports decentralized and federated deployments without requiring one central AFT directory.

## Discovery Mechanisms

AFT discovery SHOULD support:

- `.well-known/aft-agent-trust`;
- DID service endpoint discovery;
- signed consortium registries;
- local enterprise registries where equivalent verification is provided.

## `.well-known/aft-agent-trust`

HTTPS peers SHOULD publish a peer discovery document at:

```text
https://{origin}/.well-known/aft-agent-trust
```

The document SHOULD validate against `schemas/aft-peer-discovery.schema.json`. It SHOULD be signed and SHOULD include status, endpoints, supported event types, credential types, crypto profiles, PQC readiness, anchoring modes, privacy metadata, revocation endpoint, and conformance profiles.

## DID Service Endpoint Discovery

Peers with DIDs SHOULD publish an `AFTAgentTrustService` service endpoint in the DID document. The endpoint MAY point directly to the `.well-known` document or to an AFT API base URL.

## Peer Discovery JSON

The peer discovery JSON format is defined in AFT-019. Discovery consumers MUST NOT assume that a capability claim is sufficient proof of trust. They SHOULD verify signatures, key status, revocation status, peer status, conformance profile, and local policy.

## Versioning

Discovery documents MUST include `aft_version`. Breaking changes MUST use a new version. Verifiers SHOULD reject unsupported major versions and SHOULD apply local policy for unsupported minor versions.

## Signing

Discovery documents SHOULD be signed using registered AFT signature profiles. Signatures MUST include algorithm identifiers, key identifiers, key versions, PQC profile identifiers, verification methods, and creation time.

## Revocation

Discovery documents MUST identify a revocation endpoint or status source. Verifiers SHOULD check status for high-value or high-risk operations and SHOULD reject new records from revoked or compromised peers unless a local recovery process explicitly allows them.

## Status

Peer status SHOULD use the `peer-status-codes` registry. `active` means the peer is advertising active participation; it does not guarantee that any event is true. `suspended`, `under_review`, `compromised`, `revoked`, and `deprecated` require relying-party policy decisions.

## Caching

Discovery documents MAY be cached, but cache replay is a security risk. Implementations SHOULD use `updated_at`, signature creation time, key version, revocation status, and HTTP caching metadata to bound staleness.

## Privacy

Discovery can leak peer roles, supported ledgers, supported event categories, and business capabilities. Peers SHOULD avoid publishing private customer relationships, internal infrastructure details, private merchant lists, or sensitive evidence URLs.

## Security

Discovery consumers SHOULD protect against DNS takeover, web-host compromise, DID document compromise, malicious endpoint substitution, stale documents, downgrade to weak crypto profiles, and false capability claims. Discovery is a routing and capability mechanism, not a complete trust decision.

## Relationship To AFT-019

AFT-014 defines the discovery architecture. AFT-019 defines the peer discovery and capability document in detail. Implementers SHOULD use both documents together.
