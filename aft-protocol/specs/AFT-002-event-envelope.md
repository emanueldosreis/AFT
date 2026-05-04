# AFT-002: Event Envelope

Status: Draft 0.1  
Category: Normative

## Purpose

The AFT event envelope is the canonical container for signed financial trust events. It is designed to be payment-protocol-neutral, privacy-preserving, anchorable, and crypto-agile.

## Envelope Fields

An event envelope MUST include:

- `event_id`: globally unique event identifier.
- `aft_event_version`: event schema version.
- `event_type`: value from the AFT taxonomy or an approved extension.
- `event_time`: time the event occurred or was observed.
- `agent_id`: agent financial identity.
- `principal_id`: principal associated with the event.
- `transaction`: transaction or obligation summary.
- `authority`: mandate and delegated authority binding.
- `evidence`: evidence references and commitments.
- `privacy`: classification and disclosure controls.
- `crypto`: canonicalization, hashing, and PQC metadata.
- `signatures`: one or more signatures over the canonical event.

An event envelope MAY include:

- `operator_id`;
- `counterparty_id`;
- `blockchain_anchor`;
- `correlation`;
- `supersedes_event_id`.

## Canonical JSON Rules

AFT events MUST be serialized using a deterministic JSON canonicalization profile before hashing or signing. The default Draft 0.1 profile is:

- UTF-8 JSON;
- no insignificant whitespace;
- lexicographic object-member ordering by Unicode code point;
- arrays preserved in declared order;
- numbers represented without insignificant leading zeros or trailing fractional zeros;
- strings normalized according to the selected canonicalization profile;
- fields with `null` values omitted unless the schema explicitly requires `null`.

Implementations MAY use a recognized canonicalization scheme such as RFC 8785 JCS when compatible with the selected field model. The selected profile MUST be recorded in `crypto.canonicalization`.

## Hashing Rules

The event hash MUST be computed over the canonical event body excluding signature values. Signature metadata may be included if it is stable before signing; the exact covered fields MUST be defined by `crypto.signature_input`.

Minimum hash algorithm: SHA-256. Long-term commitments SHOULD support SHA-384 or SHA-512. Hash references MUST include an algorithm prefix, such as `sha256:<hex>`.

## Signature Rules

Each signature entry MUST include:

- `alg`;
- `kid`;
- `key_version`;
- `pqc_profile`;
- `signature_value`;
- `signature_created_at`;
- `verification_method`.

Where applicable, a signature SHOULD include `signature_expires_at`. Hybrid signatures MUST identify each component algorithm and verification method. AFT signatures MUST NOT rely on an implicit default algorithm.

New deployments SHOULD support `aft-sig-hybrid-ed25519-ml-dsa`, `aft-sig-hybrid-ecdsa-ml-dsa`, `aft-sig-ml-dsa`, or `aft-sig-slh-dsa`. Classical-only signatures are legacy or transitional.

## Event Immutability

Published events are immutable. Implementations MUST NOT rewrite or delete an event to change its meaning. Corrections MUST be represented by a new signed event that references the earlier event.

## Correction And Supersession

A correction event SHOULD include:

- `supersedes_event_id`;
- a correction reason code;
- evidence references supporting the correction;
- signatures from an authorized issuer or reporter.

Reputation and risk systems SHOULD preserve both the original event and the correction chain.

## Correlation And Causality

`correlation` MAY include:

- `correlation_id`;
- `causation_event_id`;
- `related_event_ids`;
- `external_reference_ids`;
- `workflow_id`.

Correlation identifiers MUST be designed to reduce unnecessary linkability. Public correlation IDs SHOULD be scoped and rotated.

## Privacy Classification

The `privacy.classification` value SHOULD be one of:

- `PUBLIC`;
- `PRIVATE`;
- `RESTRICTED`;
- `HASH_ONLY`.

Public events MAY expose a minimal event summary. Private and restricted events SHOULD expose only commitments or selective disclosures. Hash-only events SHOULD reveal no event body beyond commitments, anchor metadata, and any required public status.

## Selective Disclosure

AFT event issuers SHOULD be able to disclose:

- the entire event;
- only selected fields;
- proof of inclusion in a Merkle batch;
- proof that a field satisfies a predicate;
- evidence hashes without underlying evidence;
- redacted event views.

Future zero-knowledge proofs SHOULD be supported by stable field names, explicit algorithm identifiers, and hash-domain separation.

## Blockchain Anchor Object

When present, `blockchain_anchor` SHOULD reference:

- batch identifier;
- chain or network identifier;
- transaction reference;
- Merkle root;
- event inclusion proof reference;
- anchor timestamp;
- anchor contract or registry pointer if applicable.

The anchor object MUST NOT include private event contents.
