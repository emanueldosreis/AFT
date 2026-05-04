# AFT-010: Quantum-Resistant Cryptography

Status: Draft 0.1  
Category: Normative

## Purpose

AFT is designed for long-lived financial trust records. Events, receipts, credentials, anchors, reputation roots, and disputes may need to remain verifiable after classical public-key algorithms become unsafe. AFT therefore requires crypto-agility and defines post-quantum transition profiles.

## Cryptographic Goals

AFT cryptography aims to provide:

- event authenticity;
- event integrity;
- mandate and receipt non-repudiation evidence where appropriate;
- tamper-evident anchoring;
- confidential key establishment for sensitive evidence exchange;
- survivable migration from classical to post-quantum algorithms;
- algorithm deprecation and replacement without changing the entire protocol.

## Cryptographic Non-Goals

AFT does not:

- invent new cryptographic algorithms;
- guarantee legal non-repudiation by itself;
- define custody security for wallets or bank accounts;
- replace payment-rail cryptography;
- require one PKI, DID method, wallet, or hardware module;
- assert that any algorithm is permanently safe.

## Required Crypto-Agility

Every signature, key, credential reference, anchor, receipt, mandate reference, event, reputation snapshot, dispute record, and incident record MUST carry sufficient metadata to identify the cryptographic profile used.

Required signature metadata:

- `alg`;
- `kid`;
- `key_version`;
- `pqc_profile`;
- `signature_value`;
- `signature_created_at`;
- `signature_expires_at` where applicable;
- `verification_method`.

Required hashing metadata:

- hash algorithm;
- canonicalization profile;
- domain separation label where applicable;
- digest value.

## Algorithm Identifiers

Algorithm identifiers MUST be explicit strings from an AFT registry or recognized external registry. Draft 0.1 defines:

Signature profiles:

- `aft-sig-ed25519-legacy`;
- `aft-sig-ecdsa-p256-legacy`;
- `aft-sig-ml-dsa`;
- `aft-sig-slh-dsa`;
- `aft-sig-hybrid-ed25519-ml-dsa`;
- `aft-sig-hybrid-ecdsa-ml-dsa`.

Key establishment profiles:

- `aft-kem-ml-kem`;
- `aft-kem-hybrid-ecdh-ml-kem`.

Hash profiles SHOULD include at least SHA-256 and SHOULD support SHA-384 or SHA-512 for long-term commitments. Merkle roots MUST carry hash and tree algorithm identifiers.

## Recommended Algorithms

Implementations SHOULD use NIST-standardized post-quantum algorithms:

- ML-KEM / FIPS 203 for quantum-resistant key establishment and encryption key agreement;
- ML-DSA / FIPS 204 as the primary post-quantum signature family;
- SLH-DSA / FIPS 205 as a conservative hash-based backup signature family.

Classical algorithms such as Ed25519, ECDSA, and RSA MAY be used only in legacy or hybrid transitional profiles. They are not the long-term target for AFT.

Symmetric encryption SHOULD use AES-256-GCM, ChaCha20-Poly1305, or an equivalent authenticated encryption profile. Hashing MUST use SHA-256 or stronger. SHA-384 or SHA-512 SHOULD be available for long-term commitments.

## Key Identifiers And Versioning

Each verification key MUST have:

- stable `kid`;
- monotonically increasing `key_version` within the issuer context;
- algorithm identifier;
- creation time;
- status;
- verification method;
- optional expiration;
- optional revocation time.

Key identifiers MUST NOT be reused for different key material.

## Migration Policy

Implementers SHOULD migrate in stages:

1. Inventory classical keys and signatures.
2. Add algorithm identifiers and key versions to all records.
3. Enable hybrid signatures for new events.
4. Add ML-KEM or hybrid key establishment for sensitive evidence exchange.
5. Rotate high-value authorities to ML-DSA primary signatures.
6. Add SLH-DSA backup signatures for conservative long-term records.
7. Deprecate classical-only signatures for financially material events.
8. Re-attest important long-lived records where required.

## Algorithm Deprecation Policy

AFT registries SHOULD track algorithm status:

- `ACTIVE`;
- `TRANSITIONAL`;
- `DEPRECATED`;
- `DISALLOWED`;
- `EMERGENCY_DISABLED`.

When an algorithm is deprecated, implementations SHOULD define:

- last date for new signatures;
- last date for relying-party acceptance;
- re-signing or re-attestation expectations;
- affected key types;
- exception process for historical verification.

## Hybrid Signature Mode

Hybrid signatures bind a classical signature and a PQC signature to the same canonical payload. A verifier SHOULD require both components to verify unless a profile explicitly permits one component for transitional compatibility.

Hybrid signature records MUST include:

- outer `alg` such as `aft-sig-hybrid-ed25519-ml-dsa`;
- component algorithm identifiers;
- component key identifiers;
- component key versions;
- component verification methods;
- covered payload digest;
- signature creation time;
- signature values.

## Hybrid Key Establishment Mode

Hybrid key establishment SHOULD combine a classical ECDH secret and an ML-KEM shared secret using a vetted KDF. The profile MUST identify both components, KDF, context string, and output length. Implementers MUST use vetted libraries and MUST NOT design ad hoc KEM combiners.

## PQC Readiness Levels

- `AFT-PQC-0` Legacy Classical Only: no crypto-agility beyond classical algorithms.
- `AFT-PQC-1` Crypto-Agile Classical: algorithm identifiers and key versions are present, but signatures are classical.
- `AFT-PQC-2` Hybrid Classical + PQC: financially material events can use hybrid signatures.
- `AFT-PQC-3` PQC Primary: ML-DSA or approved PQC signatures are primary for new events.
- `AFT-PQC-4` PQC Primary + Hash-Based Backup: ML-DSA primary with SLH-DSA backup for conservative long-term records.
- `AFT-PQC-5` Fully PQC Operational: tested rotation, revocation, compromise recovery, monitoring, and conformance evidence.

## Required Cryptographic Fields

Every event, receipt, credential reference, anchor, mandate reference, and reputation snapshot MUST carry or reference:

- `alg`;
- `kid`;
- `key_version`;
- `pqc_profile`;
- `signature_value`;
- `signature_created_at`;
- `signature_expires_at` where applicable;
- `verification_method`.

If the artifact itself is unsigned but references a signed parent or signed batch, the reference MUST identify the parent signature metadata.

## Compromise Handling

When key compromise occurs, implementations SHOULD:

- create an `AGENT_KEY_COMPROMISE_REPORTED` event;
- identify affected `kid` and `key_version` values;
- identify the affected event window;
- rotate keys;
- update revocation roots;
- suspend or downgrade affected trust tiers;
- require re-attestation of critical credentials, mandates, and reputation snapshots;
- publish correction or supersession events where event validity is uncertain.

Historical signatures created before the affected window MAY remain valid if independent evidence supports their creation time and key status.

## Anchors And Long-Term Verification

Anchors SHOULD include:

- event hash algorithm;
- Merkle tree algorithm;
- batch root;
- previous batch root;
- anchor transaction reference;
- submitter;
- timestamp;
- signature metadata for the batch manifest.

Long-term verification SHOULD account for algorithm deprecation. Anchored timestamps may help establish that a signature existed before compromise or algorithm break, but they do not make a broken algorithm safe for all purposes.

## Implementation Guidance

Implementers MUST use vetted libraries and standard algorithms only. AFT implementations SHOULD support adding, deprecating, and migrating algorithms without changing event semantics. Security-sensitive deployments SHOULD obtain independent cryptographic review.
