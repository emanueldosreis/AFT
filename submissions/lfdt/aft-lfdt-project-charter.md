# AFT Labs Project Charter

Status: Draft 0.1

## Mission

Build open-source reference implementations and conformance tooling for a decentralized and federated Agent Financial Trust Protocol.

## Governance

The project SHOULD use open governance, public issue tracking, documented maintainer roles, signed releases, and transparent decision records. Maintainer list is intentionally left for project formation and MUST be completed before submission.

## Deliverables

- Peer discovery implementation.
- Signed event validator.
- Federated attestation service.
- Challenge and supersession workflow.
- Merkle batching and anchor adapters.
- Public-chain anchoring example.
- Permissioned-ledger anchoring example.
- Independent reputation provider demo.
- Conformance tests and fixtures.
- Security and PQC review artifacts.

## Architecture

The reference implementation SHOULD run multiple peers. Each peer owns its own event store, signs its own records, publishes its own discovery document, and anchors its own commitments or uses an explicitly selected anchor provider.

## No Central AFT Operator

The project MUST NOT require a central AFT database, central scoring service, central blockchain, or central network operator. Any demo coordinator MUST be replaceable.

## Conformance Test Suite

Tests SHOULD cover:

- JSON Schema validation;
- peer discovery validation;
- signature metadata validation;
- event canonicalization;
- Merkle root generation;
- anchor proof verification;
- challenge and supersession;
- privacy classification;
- PQC/hybrid profile metadata.

## Deployment Examples

The project SHOULD demonstrate public/open and consortium/permissioned deployments. Public examples should include Sybil controls. Permissioned examples should include governance and evidence-access controls.
