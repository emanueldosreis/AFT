# Contributing To AFT

AFT is a Draft 0.1 protocol proposal. Contributions are welcome when they improve precision, interoperability, security, privacy, or implementability.

## Where To Focus Now

The current executable focus is the signed financial event envelope with mandate binding (AFT-002 + AFT-004). The most impactful contributions right now are:

- Corrections or edge cases in `src/canonicalize.js`, `src/sign.js`, `src/verify.js`, or `src/mandate.js`
- Canonicalization and signature test vectors (see Interoperability Testing below)
- A complete x402 integration example: x402 payment receipt → AFT signed event → verification
- Schema corrections for `aft-event.schema.json` and `aft-mandate-ref.schema.json`
- Security review of the signing and verification flow

Blockchain anchoring, reputation scoring, PQC signing profiles, and conformance suite contributions are welcome but are not the current priority. See [docs/roadmap.md](roadmap.md) for the full deferred list.

## Issues

Open an issue for:

- ambiguous specification text;
- schema or example mismatches;
- event taxonomy gaps;
- integration-profile corrections;
- privacy or security concerns;
- cryptography and PQC review comments;
- conformance and test-vector proposals.

Issues SHOULD include the affected file, the expected behavior, the actual ambiguity or defect, and a concrete proposal when possible.

## Pull Requests

Pull requests SHOULD be scoped to one topic. A PR that changes normative behavior SHOULD include:

- the affected spec section;
- schema changes where applicable;
- updated examples;
- interoperability impact;
- backwards-compatibility notes;
- privacy and security considerations.

Do not include raw private financial data, card data, bank data, customer data, prompts, responses, full conversation logs, or real incident evidence in examples.

## Spec Proposals

Normative changes SHOULD be proposed as an AFT Improvement Proposal issue before a large PR. A proposal should state:

- problem statement;
- proposed normative language;
- compatibility impact;
- affected registries and schemas;
- threat-model impact;
- privacy impact;
- conformance impact.

## Event Taxonomy Additions

New event types MUST define:

- event name and category;
- purpose;
- required and optional fields;
- allowed issuers or reporters;
- evidence requirements;
- privacy classification;
- reputation impact hints;
- whether the event is public, private, restricted, or hash-only by default.

## Security Review

Security review SHOULD cover:

- identity binding and impersonation risks;
- delegated authority, replay, and tampering risks;
- event canonicalization and signature verification;
- evidence handling and selective disclosure;
- on-chain data minimization;
- dispute and false-reporting controls;
- key rotation, revocation, and compromise handling.

## Cryptography Review

Cryptography review MUST be conservative. AFT does not invent cryptography. Contributions that affect cryptographic behavior SHOULD reference vetted standards and implementations. PQC changes SHOULD be reviewed by contributors familiar with ML-KEM, ML-DSA, SLH-DSA, hybrid transition patterns, and algorithm deprecation.

## Interoperability Testing

Interoperability contributions SHOULD include:

- JSON Schema validation fixtures;
- canonicalization and hash test vectors;
- signature verification test vectors;
- anchor inclusion proof examples;
- API request and response examples;
- negative tests for malformed events.

## Governance Path

The intended path is open governance with working groups and eventual submission to an appropriate standards venue or neutral foundation. Candidate venues may include W3C-style, IETF-style, or foundation-hosted processes, depending on implementer participation and scope. No standards-body endorsement is implied by this repository.
