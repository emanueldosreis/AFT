# AFT-007: Privacy And Selective Disclosure

Status: Draft 0.1  
Category: Normative

## Purpose

AFT is privacy-by-design. Financial trust records can be valuable without exposing raw private data. Implementers MUST minimize data, disclose only what is necessary, and keep sensitive evidence off-chain.

## PII Minimization

AFT records SHOULD use stable pseudonymous identifiers, DIDs, credential references, hash commitments, and scoped relationship identifiers. Profiles and events MUST NOT include raw card numbers, bank account numbers, private keys, seed phrases, customer records, full prompts, full responses, or full conversation logs.

## Public Disclosure Modes

Draft 0.1 defines:

- `PUBLIC`: minimal event summary may be public.
- `PRIVATE`: event body is available only to authorized parties.
- `RESTRICTED`: event body and evidence require role-based access and additional controls.
- `HASH_ONLY`: only commitments, roots, or inclusion proofs are disclosed.

## Hash-Only Public Disclosure

Hash-only publication SHOULD be used for events involving disputes, incidents, chargebacks, fraud allegations, credit facilities, private merchants, private customer data, sensitive payment metadata, or security evidence.

Hash-only disclosure proves that a commitment existed at a time. It does not prove truth by itself.

## Encrypted Off-Chain Evidence

Evidence SHOULD be stored off-chain and encrypted where confidentiality is required. Evidence references SHOULD include:

- evidence hash;
- storage reference;
- encryption profile;
- access-control policy reference;
- retention policy;
- redaction status.

Sensitive evidence SHOULD be accessible only to authorized investigators, counterparties, auditors, arbitrators, or regulators where appropriate.

## Role-Based Disclosure

Implementations SHOULD define roles such as:

- agent controller;
- principal;
- operator;
- counterparty;
- processor or wallet provider;
- lender;
- reputation issuer;
- arbitrator;
- auditor;
- security investigator.

Each role SHOULD receive the minimum event view required for its function.

## Zero-Knowledge-Friendly Future Design

AFT field names, hashes, and canonicalization rules SHOULD be stable enough to support future zero-knowledge proofs. Future profiles MAY prove facts such as "the transaction was under the mandate limit" or "the agent has no validated fraud events in the last 90 days" without disclosing all underlying events.

## Unlinkability And Correlation Risk

Even hash-only events can leak timing, frequency, chain address, and relationship patterns. Implementers SHOULD rotate scoped identifiers, batch anchors, avoid deterministic public handles for sensitive contexts, and avoid publishing rare event types with identifying timing.

## Retention Policy

Events and evidence SHOULD carry retention metadata. Retention policies SHOULD distinguish:

- public commitments;
- private event bodies;
- restricted evidence;
- security incident material;
- dispute material;
- regulated records held outside AFT.

Deletion of private evidence MUST NOT imply deletion of public commitments already anchored.

## Incident Evidence Protection

Incident evidence may include exploit indicators, system traces, credentials, or sensitive operational details. AFT MUST NOT require public disclosure of exploit details. Public incident records SHOULD use hash-only or heavily redacted forms.

## Payment Metadata Leakage

Payment metadata can reveal counterparties, prices, customer relationships, purchase intent, and business strategy. AFT events SHOULD use purpose codes, merchant category commitments, amount ranges, or redacted fields where exact details are not required.

## Public, Private, And Restricted Event Handling

Public event handlers MAY cache public summaries. Private and restricted event handlers SHOULD enforce authentication, authorization, audit logging, encryption in transit, and encryption at rest. Hash-only event handlers SHOULD avoid reconstructing sensitive details from side channels.
