# AFT Standardization Strategy

Status: Draft 0.1

## Decentralization Narrative

AFT should be presented to standards communities as a decentralized and federated financial trust protocol. AFT does not propose a central database, central scoring bureau, central network operator, mandatory blockchain, or single official credit score. It standardizes the schemas, proofs, discovery metadata, registries, event envelopes, signatures, revocation signals, anchoring commitments, and conformance tests that allow independent peers to interoperate.

The core message is:

> AFT standardizes interoperability, not ownership of the network.

## Relationship To DID And Verifiable Credentials

W3C DID documents can express verification methods and service endpoints. AFT uses that model to let peers publish keys, AFT service endpoints, and discovery metadata. W3C Verifiable Credentials define an issuer-holder-verifier model for tamper-evident claims. AFT applies that model to financial trust credentials, mandate references, incident attestations, dispute outcomes, reputation snapshots, and PQC readiness credentials.

AFT should avoid presenting itself as a replacement for DID or Verifiable Credentials. It should be framed as an agent financial trust profile and evidence layer that can use DID and VC primitives.

## IETF Track

The IETF-facing work should focus on mechanics, not the whole AFT vision:

- `.well-known/aft-agent-trust` discovery;
- HTTP transport for events, attestations, risk evaluation, challenge, and supersession;
- receipt and event verification formats;
- signature input and verification flows;
- caching, replay protection, and status semantics;
- crypto profile negotiation, including hybrid and PQC-capable profiles.

The IETF track should not try to standardize reputation scoring formulas, legal liability, payment settlement, or governance of a global trust network.

## W3C Track

The W3C-facing work should focus on agent financial identity and trust semantics:

- Agent Financial Identity Profile;
- peer discovery through DID service endpoints;
- financial trust credentials;
- reputation metadata and status references;
- dispute and incident credential references;
- PQC readiness metadata;
- revocation and reputation root references.

The W3C framing should align with agent identity and AI agent protocol work while preserving AFT's narrower financial trust scope.

## LF Decentralized Trust Or Similar Foundation Track

An open-source foundation track can host:

- federated reference implementations;
- peer discovery services;
- event validators;
- conformance tooling;
- multi-peer test networks;
- public-chain and permissioned-ledger anchoring demos;
- independent reputation provider demos.

The reference implementation MUST NOT become a required central AFT operator.

## Payment Ecosystem Track

Payment ecosystem engagement should focus on mappings:

- AP2 mandates and delegated purchase flows;
- x402 HTTP-native paid APIs and content access;
- agentic commerce protocols and payment-network trusted agent flows;
- stablecoin and traditional payment settlement receipts;
- chargeback, refund, dispute, and reputation evidence.

AFT should be positioned as complementary post-transaction trust evidence and risk context.

## Submission Stages

### Stage 0: Public GitHub Draft

Publish Draft 0.1 specs, schemas, examples, registries, and reference tools. Invite review from identity, payments, security, cryptography, reputation, and blockchain communities.

### Stage 1: Position Papers And Discussion Issues

Submit narrow position papers to the appropriate venues. Ask for fit, terminology, boundaries, and existing-work alignment.

### Stage 2: Community Group Work Item Proposals

Propose focused work items such as agent financial trust profile, peer discovery, VC schemas, or receipt verification. Do not ask one venue to adopt the entire AFT repository.

### Stage 3: Reference Implementation And Interoperability Pilots

Build multi-peer demos, schema validators, event signing and verification tools, anchor proof demos, and conformance tests.

### Stage 4: Formal Draft Reports, Internet-Drafts, Or Lab Proposals

Prepare venue-specific drafts and lab proposals after community feedback and implementation evidence.

### Stage 5: Broader Standards Handoff

Move stable, narrowly scoped components to durable governance under appropriate standards bodies or neutral foundations.

## Ninety-Day Action Plan

Days 1-30:

- publish decentralization specs AFT-018 and AFT-019;
- publish peer discovery schema and examples;
- request feedback from DID, VC, HTTP, payment, and PQC reviewers;
- identify candidate maintainers for peer discovery and conformance tooling.

Days 31-60:

- run a federated demo with at least three peers;
- validate multi-attestation examples;
- draft W3C, IETF, DIF, and LFDT-specific position notes;
- document objections and adjust non-goals.

Days 61-90:

- prepare work item proposals or discussion issues;
- publish conformance fixtures;
- recruit independent reputation and anchor provider prototype participants;
- schedule standards-community review sessions.

## What Not To Ask Too Early

AFT should not initially ask any venue to bless one global network, one official score, one chain, one payment rail, one legal liability model, or one production-grade reference implementation. Early asks should be for review, fit, terminology alignment, and narrowly scoped work items.
