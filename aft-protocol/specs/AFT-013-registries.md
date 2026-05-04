# AFT-013 - Registries

Status: Draft 0.1  
Category: Normative registry policy

## Purpose

AFT registries define shared codes used by decentralized peers. Registries improve interoperability but do not create a central trust authority. Registry inclusion MUST NOT be treated as proof that an issuer, peer, or event is trustworthy.

## Draft 0.1 Registries

Draft 0.1 includes:

- `event-types`;
- `trust-tiers`;
- `autonomy-levels`;
- `cryptographic-algorithms`;
- `pqc-readiness-levels`;
- `integration-profiles`;
- `purpose-codes`;
- `incident-types`;
- `dispute-reason-codes`;
- `risk-decision-codes`;
- `peer-types`;
- `network-deployment-modes`;
- `attestation-types`;
- `peer-status-codes`.

## Registry Entry Shape

Each registry SHOULD include:

- `registry_name`;
- `version`;
- `status`;
- `entries`;
- entry `code`;
- entry `name`;
- entry `description`;
- entry `status`;
- entry `since_version`;
- entry `deprecated`;
- entry `replacement_code`.

## Extension Policy

New registry entries SHOULD be proposed with:

- problem statement;
- expected issuer or verifier behavior;
- privacy and security considerations;
- backwards compatibility;
- conformance impact;
- deprecation plan where applicable.

## New Peer Types

New peer types SHOULD be added only when existing roles cannot describe the peer's authority, evidence, and abuse risks. A new peer type MUST define expected event issuance, credential issuance, credential consumption, trust assumptions, and conformance requirements.

## New Attestation Types

New attestation types MUST define subject, issuer role, evidence requirements, challenge process, revocation behavior, and privacy classification.

## New Deployment Modes

New deployment modes MUST describe participant governance, identity model, anchoring model, evidence disclosure, Sybil controls, and conformance requirements.

## Deprecated Peers And Codes

Deprecated registry codes SHOULD include replacement guidance. Deprecated peer statuses SHOULD remain verifiable for historical records. Relying parties SHOULD preserve historical meaning while avoiding deprecated codes for new events.

## Trust Registry Updates

Trust registries MAY list recognized peers or issuers for a deployment. Updates SHOULD be signed, versioned, auditable, and challengeable. AFT deployments SHOULD avoid treating registry maintainers as infallible authorities.
