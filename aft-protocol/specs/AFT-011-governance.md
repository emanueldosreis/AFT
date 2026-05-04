# AFT-011: Governance

Status: Draft 0.1  
Category: Process

## Initial Governance Model

Draft 0.1 uses open repository governance. Changes are proposed through issues and pull requests. Normative changes SHOULD receive review from relevant domain experts before acceptance.

## Working Groups

The project SHOULD establish working groups for:

- identity;
- payments;
- reputation;
- security;
- cryptography/PQC;
- blockchain anchoring;
- privacy.

Working groups SHOULD publish meeting notes, design proposals, and unresolved issues.

## Proposal Process

Normative changes SHOULD use an AFT Improvement Proposal process:

1. problem statement;
2. proposed text;
3. affected schemas and examples;
4. interoperability impact;
5. privacy and security analysis;
6. conformance impact;
7. review period;
8. decision and version assignment.

## Spec Versioning

AFT specifications SHOULD use semantic versioning for releases and stable identifiers for individual documents. Draft documents may change incompatibly until a stable release is declared.

Event envelopes MUST carry `aft_event_version`. Schemas MUST carry `$id` and versioned paths or identifiers.

## Backwards Compatibility

Breaking changes SHOULD be avoided after stable release. When breaking changes are required, the project SHOULD define:

- migration path;
- deprecation period;
- compatibility profile;
- validator behavior;
- registry updates.

## Registry Management

AFT SHOULD maintain registries for:

- event types;
- mandate types;
- risk status values;
- lifecycle status values;
- trust tiers;
- signature profiles;
- key establishment profiles;
- hash and Merkle profiles;
- privacy classifications;
- conformance profiles.

Registry entries SHOULD include status, description, owner, version introduced, and deprecation status.

## Event Taxonomy Extension

Event additions MUST define purpose, required fields, optional fields, allowed issuers, evidence requirements, privacy classification, reputation impact, and default disclosure mode.

## Cryptographic Algorithm Registry Extension

Cryptographic registry additions MUST identify the external standard, security rationale, implementation availability, interoperability test vectors, deprecation considerations, and review status. AFT MUST NOT standardize new cryptographic primitives invented solely for AFT.

## Standards Path

The project may seek standardization through a neutral foundation, W3C-style process, IETF-style process, or another open venue. Any transition SHOULD preserve open participation, transparent records, royalty-free implementation expectations where possible, and independent security review.
