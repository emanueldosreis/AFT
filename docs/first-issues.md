# Suggested First Issues

These issues are intended to seed public review for AFT Draft 0.1.

## 1. Review AFT Event Taxonomy

Suggested title: `Review AFT event taxonomy for Draft 0.1`  
Suggested labels: `spec`, `event-taxonomy`, `review`

Description: Review `specs/AFT-003-financial-event-taxonomy.md` for missing event types, ambiguous event boundaries, issuer guidance, evidence requirements, and privacy classifications.

Acceptance criteria: Feedback identifies accepted event names, proposed changes, overlapping events, and open questions.

## 2. Review Decentralized Peer Discovery Model

Suggested title: `Review AFT peer discovery and capability document`  
Suggested labels: `spec`, `discovery`, `federation`

Description: Review AFT-018, AFT-019, `schemas/aft-peer-discovery.schema.json`, and peer discovery examples.

Acceptance criteria: Feedback covers DID service endpoint fit, `.well-known` behavior, caching, peer status, revocation, and privacy.

## 3. Review PQC Cryptography Profile

Suggested title: `Review AFT PQC and crypto-agility profile`  
Suggested labels: `pqc`, `security`, `cryptography`

Description: Review ML-KEM, ML-DSA, SLH-DSA, hybrid profile, key versioning, rotation, revocation, and compromise guidance.

Acceptance criteria: Review notes identify required changes, missing references, migration issues, or acceptable Draft 0.1 assumptions.

## 4. Review Blockchain Anchoring Model

Suggested title: `Review blockchain-neutral anchoring profile`  
Suggested labels: `anchoring`, `privacy`, `security`

Description: Review event hashes, Merkle roots, revocation roots, reputation roots, dispute commitments, and bond/slashing state.

Acceptance criteria: Feedback confirms no private data is required on-chain and identifies chain-neutral verification gaps.

## 5. Review Privacy And Selective Disclosure Model

Suggested title: `Review AFT privacy and selective disclosure requirements`  
Suggested labels: `privacy`, `selective-disclosure`, `review`

Description: Review PII minimization, hash-only disclosure, encrypted evidence, role-based disclosure, retention, and correlation risk.

Acceptance criteria: Review identifies missing privacy controls, over-disclosure risks, and suggested schema/spec changes.

## 6. Review W3C Submission Package

Suggested title: `Review W3C positioning for agent financial trust`  
Suggested labels: `standards`, `w3c`, `review`

Description: Review W3C-facing material for alignment with DID, Verifiable Credentials, Agent Identity Registry, and AI Agent Protocol work.

Acceptance criteria: Feedback identifies fit, boundaries, terminology changes, and recommended asks.

## 7. Review DIF Credential Schema Proposal

Suggested title: `Review AFT credential schema direction for DIF discussion`  
Suggested labels: `standards`, `dif`, `verifiable-credentials`

Description: Review credential schemas and proposed VC profiles for issuer-holder-verifier alignment and selective disclosure.

Acceptance criteria: Feedback proposes credential names, fields, revocation behavior, and privacy constraints.

## 8. Review IETF HTTP / Discovery Drafts

Suggested title: `Review IETF-style HTTP and discovery mechanics`  
Suggested labels: `standards`, `ietf`, `http`, `discovery`

Description: Review `.well-known/aft-agent-trust`, peer status, attestation challenge/supersession endpoints, caching, replay protection, and signature verification.

Acceptance criteria: Feedback identifies appropriate IETF areas/lists and mechanical protocol changes.

## 9. Review x402 / AP2 Integration Notes

Suggested title: `Review x402 and AP2 AFT integration mappings`  
Suggested labels: `integration`, `x402`, `ap2`, `payments`

Description: Review how AFT consumes mandates, receipts, settlement references, and emits trust events.

Acceptance criteria: Feedback identifies event mappings, non-competition wording, privacy concerns, and missing examples.

## 10. Create Reference Implementation MVP

Suggested title: `Build minimal AFT reference implementation MVP`  
Suggested labels: `tooling`, `reference-implementation`, `good-first-project`

Description: Create a minimal validator for agent profiles, peer discovery, events, signatures metadata, and Merkle anchor generation.

Acceptance criteria: MVP runs locally, validates examples, and documents placeholder cryptographic behavior clearly.

## 11. Create Conformance Test Suite

Suggested title: `Create AFT conformance test fixtures`  
Suggested labels: `conformance`, `testing`, `schemas`

Description: Add positive and negative fixtures for schemas, canonicalization, hashes, peer discovery, and privacy classification.

Acceptance criteria: Tests run in CI and produce clear pass/fail output.

## 12. Create Multi-Peer Federation Demo

Suggested title: `Create runnable multi-peer AFT federation demo`  
Suggested labels: `demo`, `federation`, `reference-implementation`

Description: Expand the multi-attestation demo into a runnable local service or script showing three peers, signed events, anchors, and reputation update.

Acceptance criteria: Demo shows independent peer discovery, event issuance, Merkle roots, reputation update, and risk verification without central scoring.
