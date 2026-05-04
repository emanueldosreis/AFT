# AFT-009: Threat Model

Status: Draft 0.1  
Category: Normative security guidance

## Threat Categories

AFT implementations SHOULD analyze at least the following threats:

- agent impersonation;
- credential theft;
- key compromise;
- prompt-injection-induced payment;
- unauthorized delegated spending;
- mandate replay;
- mandate tampering;
- payment laundering through fake resources;
- collusive merchant-agent fraud;
- artificial reputation inflation;
- false dispute reporting;
- false scam reporting;
- Sybil agent farms;
- wallet drain;
- policy bypass;
- resource misrepresentation;
- paid content abuse;
- autonomous procurement abuse;
- quantum threat against classical public-key cryptography;
- long-term harvest-now-decrypt-later risk for sensitive financial logs;
- signature-forgery risk after cryptographically relevant quantum computer availability.

## Control Objectives

AFT controls SHOULD provide:

- clear identity binding;
- explicit delegated authority;
- replay resistance;
- tamper evidence;
- disputeability and correction;
- privacy-preserving evidence handling;
- cryptographic agility;
- long-term verification under PQC transition;
- auditability without excessive disclosure.

## Control Mapping

| Threat | Primary controls |
| --- | --- |
| Agent impersonation | DID or credential verification, signed profiles, verification methods, registry pointers, counterparty verification |
| Credential theft | credential revocation, short-lived credentials, selective disclosure, anomaly detection |
| Key compromise | key rotation, `AGENT_KEY_COMPROMISE_REPORTED`, revocation roots, trust downgrade, re-attestation |
| Prompt-injection-induced payment | policy engines, purpose codes, spending caps, human approval thresholds, blocked-attempt events |
| Unauthorized delegated spending | signed mandates, scope checks, amount limits, nonce checks, policy decision evidence |
| Mandate replay | one-time nonces, expiration, counterparty and amount binding, event causality |
| Mandate tampering | mandate hashes, signatures, canonicalization, credential verification |
| Payment laundering through fake resources | resource categorization, counterparty verification, anomaly detection, graph analysis |
| Collusive merchant-agent fraud | dispute challenge process, counterparty weighting, bonding, slashing, issuer reputation |
| Artificial reputation inflation | anti-gaming metrics, verified settlement sources, Sybil resistance, graph analysis |
| False dispute or scam reporting | evidence requirements, reporter reputation, challenge windows, resolution events |
| Sybil agent farms | verified principal credentials, bonds, rate limits, domain trust, operator trust |
| Wallet drain | spend caps, scoped keys, multi-party signatures, anomaly detection, revocation |
| Policy bypass | signed policy decisions, versioned rulesets, audit logs, violation events |
| Resource misrepresentation | receipt hashes, resource category attestations, dispute process |
| Paid content abuse | Web Bot Auth mapping, usage policies, purpose codes, publisher attestations |
| Autonomous procurement abuse | AP2 mandate references, human approval thresholds, invoice acceptance records |
| Quantum attack on classical crypto | PQC or hybrid signatures, ML-KEM, ML-DSA, SLH-DSA, algorithm deprecation |
| Harvest-now-decrypt-later | ML-KEM for sensitive key establishment, encryption with AES-256-GCM or ChaCha20-Poly1305, minimization |
| Future signature forgery | PQC-primary profiles, anchored timestamps, key deprecation, re-attestation |

## Implementation Requirements

Implementations SHOULD enforce:

- signed mandates;
- short-lived authority;
- nonce and replay protection;
- counterparty verification;
- spending caps;
- purpose codes;
- resource categorization;
- anomaly detection;
- multi-party signatures where risk requires;
- dispute challenge process;
- credential revocation;
- key rotation;
- event anchoring;
- bonding and slashing where appropriate;
- selective disclosure;
- privacy-preserving evidence handling;
- PQC or hybrid signatures;
- crypto-agility.

## Residual Risk

AFT provides evidence and interoperability. It does not guarantee that events are truthful, counterparties are honest, payment rails are reversible, or all regulatory obligations are satisfied. Relying parties MUST evaluate issuers, evidence quality, context, and local risk requirements.
