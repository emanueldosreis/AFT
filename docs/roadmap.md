# Roadmap

## Current Focus

Active implementation work is on one primitive: **the signed financial event envelope with mandate binding (AFT-002 + AFT-004)**.

This is the atomic unit. Everything else — reputation, anchoring, dispute, credit — is downstream of a verified signed event. It also has a single-player value proposition: one organization running agents can deploy it as an internal mandate-compliance audit trail before any external peer network exists.

Deliverables in scope now:

- `src/canonicalize.js` — RFC 8785 JCS canonical JSON (done)
- `src/mandate.js` — mandate building and hashing (done)
- `src/sign.js` — Ed25519 event signing (done)
- `src/verify.js` — signature, hash, and mandate compliance verification (done)
- `src/cli.js` — `keygen`, `mandate`, `sign`, `verify` CLI (done)
- x402 integration narrative and complete end-to-end worked example
- Canonicalization and signature test vectors
- Single-file validator for CI use

## Deferred

The following are fully specified but not yet implemented. They will be picked up once the event envelope primitive has traction and feedback:

| Deferred area | Specs | Notes |
| --- | --- | --- |
| Blockchain anchoring and Merkle batching | AFT-006 | Solidity contracts exist; implementation waits for adoption signal |
| Reputation scoring engine | AFT-005 | Needs real event data before scoring can be calibrated |
| PQC / ML-DSA signing profiles | AFT-010 | Algorithm identifier is already in the schema; Ed25519 ships first |
| Full conformance test suite | AFT-012 | Follows once the primitive is stable |
| Peer discovery service | AFT-014, AFT-019 | Follows reference implementation |
| Governance working groups | AFT-011 | Follows first external adopters |

---

## Phase 0: Draft Specification And Schemas

- Publish Draft 0.1 specifications.
- Publish JSON Schema Draft 2020-12 artifacts.
- Publish examples and OpenAPI reference.
- Collect security, privacy, payments, identity, and PQC review.

## Phase 1: Reference Implementation

- Implement schema validation.
- Implement canonical JSON hashing.
- Implement signature verification interface.
- Implement event storage with privacy classifications.
- Implement conformance fixtures.

## Phase 2: x402 And AP2 Demos

- Demonstrate low-value paid API events.
- Demonstrate AP2 mandate references for procurement.
- Generate settlement, refund, and dispute examples.
- Compare risk decisions with and without AFT history.

## Phase 3: Blockchain Anchoring Demo

- Build Merkle batches.
- Publish batch roots to at least one test network.
- Verify inclusion proofs.
- Demonstrate revocation root and reputation root anchoring.

## Phase 4: Reputation Engine Prototype

- Compute contextual reputation snapshots.
- Implement dispute-adjusted scoring.
- Implement Sybil and self-dealing risk indicators.
- Publish reputation root commitments.

## Phase 5: Governance Group

- Form working groups for identity, payments, reputation, security, PQC, anchoring, and privacy.
- Establish proposal process.
- Establish registry management.
- Establish responsible disclosure contact.

## Phase 6: Interoperability Pilots

- Test multiple independent implementations.
- Publish canonicalization and signature test vectors.
- Pilot traditional payment rails and stablecoin rails.
- Validate privacy and selective-disclosure flows.

## Phase 7: Standards Submission

- Prepare stable specification text.
- Resolve intellectual property and governance model.
- Submit to an appropriate neutral foundation or standards process.
- Maintain backwards compatibility and conformance testing.

## Decentralization Roadmap

### Phase 1: Open Spec Decentralization

- Publish peer schemas, federation registries, examples, and conformance test plans.
- Define AFT-018 decentralized trust network and AFT-019 peer discovery.

### Phase 2: Federated Peer Discovery

- Implement `.well-known/aft-agent-trust`.
- Add DID service endpoint discovery examples.
- Publish signed peer capability documents.

### Phase 3: Signed Event Exchange

- Demonstrate cross-peer event issuance and verification.
- Preserve issuer identity, key version, event hashes, and evidence commitments.

### Phase 4: Multi-Chain / Multi-Ledger Anchoring

- Demonstrate public-chain and permissioned-ledger anchors.
- Verify event roots, revocation roots, reputation roots, and dispute-state commitments.

### Phase 5: Credential Ecosystem

- Enable auditors, wallets, marketplaces, payment processors, arbiters, and conformance testers to issue credentials.
- Support selective disclosure and revocation.

### Phase 6: Reputation Provider Ecosystem

- Demonstrate independent reputation providers issuing contextual snapshots.
- Compare scoring views without creating one official score.

### Phase 7: Dispute And Incident Federation

- Enable arbiters and incident responders to issue standardized challenge, validation, rejection, and outcome attestations.

### Phase 8: Formal Standards Governance

- Move registries, conformance profiles, and discovery mechanics toward neutral governance.
- Keep AFT blockchain-neutral, DID-method-neutral, payment-provider-neutral, and reputation-provider-neutral.
