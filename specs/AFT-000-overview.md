# AFT-000: Overview

Status: Draft 0.1  
Category: Informational and architectural

## Executive Summary

AFT, the Agent Financial Trust Protocol, defines an interoperable trust layer for autonomous and semi-autonomous economic agents. AFT records who an agent is financially acting for, what authority it had, what financial event occurred, what evidence supports the event, what reputation or credit effect may follow, and how the event can be verified over time.

The core thesis is:

> Payment protocols answer "can the agent pay?" AFT answers "should the agent be financially trusted?"

AFT is complementary to payment, identity, authorization, and blockchain systems. It does not move money. It provides signed, privacy-preserving, crypto-agile records that can be consumed by risk engines, counterparties, marketplaces, auditors, dispute systems, and reputation services.

## Scope

AFT defines:

- an Agent Financial Identity Profile;
- mandate and delegated authority bindings;
- a canonical financial event envelope;
- a financial event taxonomy;
- blockchain anchoring for commitments and roots;
- reputation and credit signal models;
- risk evaluation interface concepts;
- privacy and selective-disclosure requirements;
- post-quantum and hybrid cryptographic profiles;
- governance and conformance profiles.

## Non-Scope

AFT does not define:

- payment settlement mechanics;
- custody, wallet, or account control;
- legal agency or liability by itself;
- regulatory compliance certification;
- a single global credit score;
- one mandatory blockchain;
- one mandatory DID method, wallet, payment provider, or financial institution;
- a replacement for AP2, x402, OAuth/OIDC, SPIFFE/SPIRE, HTTP Message Signatures, Verifiable Credentials, or card and bank networks.

## Design Principles

### Separate Identity, Authority, Money, And Liability

Agent identity, principal identity, operator identity, wallet control, payment authorization, and legal liability are separate concepts. AFT records their relationships but does not collapse them into one identifier.

### Contextual Reputation, Not One Universal Score

Reputation MUST be contextual. An agent reliable for low-value API purchases may not be reliable for high-value procurement, payroll, securities trading, or regulated payments.

### Blockchain For Proofs, Not Private Data

AFT uses blockchains for commitments, roots, revocation state, reputation roots, dispute-state commitments, registry pointers, and bond or stake state. Raw prompts, responses, PII, card data, bank data, private merchant data, private customer data, private incident evidence, and full conversation logs MUST NOT be stored on-chain.

### Protocol Neutrality

AFT MUST remain neutral across payment protocols, DID methods, wallets, chains, identity providers, policy engines, and financial rails.

### Crypto-Agility And Quantum Resistance

AFT records MUST carry algorithm identifiers, key identifiers, key versions, verification methods, and PQC readiness profiles. Long-term designs SHOULD use ML-DSA or SLH-DSA signatures and ML-KEM key establishment where applicable, with hybrid profiles during transition.

## AFT Layers

### Agent Financial Identity Profile

Defines agent, principal, operator, controller, credential, payment-reference, wallet-reference, lifecycle, risk, and cryptographic metadata.

### Mandate And Authority Binding

Connects events to explicit delegated authority, amount limits, merchant constraints, purpose codes, expiration, nonces, revocation, and external authorization artifacts.

### Financial Event Layer

Defines signed event envelopes for payments, invoices, obligations, escrow, credit, security incidents, scams, fraud, disputes, reputation attestations, bonds, and certifications.

### Blockchain Anchoring Layer

Defines event hashing, Merkle batching, previous-root chaining, revocation-root publication, reputation-root publication, dispute-state commitments, registry pointers, and bond state.

### Reputation And Credit Layer

Defines multidimensional metrics such as settlement reliability, late payment rate, dispute rate, default count, fraud validated count, security incident count, mandate compliance, credit utilization, and trust tiers.

### Risk Decision API

Defines request and response patterns for parties that evaluate whether to accept, reject, limit, challenge, or escalate agent financial activity.

### Governance And Conformance

Defines versioning, registries, extension processes, working groups, and implementation profiles.
