# Security Policy

## Reporting Vulnerabilities

This repository is a Draft 0.1 protocol proposal and does not yet operate a formal security response team. Until a dedicated contact is established, report vulnerabilities by opening a private security advisory when the repository host supports it, or by contacting the maintainers through the project's public issue tracker with a minimal non-sensitive description.

Do not publish exploit details, private keys, private financial data, customer data, prompts, responses, full conversation logs, card data, bank data, or incident evidence in public issues.

## Threat Model Summary

AFT is designed for adversarial financial environments involving:

- agent impersonation;
- credential theft;
- key compromise;
- prompt-injection-induced payment attempts;
- unauthorized delegated spending;
- mandate replay or tampering;
- collusive merchant-agent fraud;
- artificial reputation inflation;
- false dispute or scam reporting;
- Sybil agent farms;
- wallet drain and policy bypass;
- quantum attacks against classical public-key cryptography.

The specification defines controls including signed mandates, short-lived authority, replay protection, counterparty verification, spending caps, purpose codes, anomaly detection, multi-party signatures, event anchoring, dispute challenge processes, credential revocation, bonding and slashing, selective disclosure, PQC or hybrid signatures, and crypto-agility.

## Post-Quantum Migration Expectations

Implementers SHOULD support crypto-agility from the first deployment. Classical-only deployments are expected to be transitional. New deployments SHOULD prefer hybrid classical plus PQC signatures or PQC-primary profiles where vetted libraries and operational support are available.

AFT recognizes:

- ML-KEM / FIPS 203 for quantum-resistant key establishment;
- ML-DSA / FIPS 204 as the primary post-quantum digital signature family;
- SLH-DSA / FIPS 205 as a conservative hash-based backup signature family.

Algorithm identifiers, key identifiers, key versions, verification methods, signature creation times, and PQC readiness profiles MUST be carried with signed records.

## Key Compromise Handling

When key compromise is suspected or confirmed, an implementation SHOULD:

1. publish an `AGENT_KEY_COMPROMISE_REPORTED` event;
2. identify the affected key identifiers, key versions, and time window;
3. revoke or suspend affected verification methods;
4. rotate keys and publish new key metadata;
5. update revocation roots and relevant registry pointers;
6. re-attest critical credentials or events where required;
7. downgrade trust until investigation and re-attestation are complete.

## No Sensitive Data On-Chain

AFT implementations MUST NOT store raw prompts, responses, PII, card data, bank data, private merchant data, private customer data, private incident evidence, or full conversation logs on-chain. Chains are used for hashes, commitments, Merkle roots, revocation roots, reputation roots, dispute-state commitments, registry pointers, and bond or stake state.

## Responsible Disclosure Placeholder

A formal responsible disclosure policy, response SLA, contact address, and recognition policy should be established before production deployments depend on this specification.
