# AFT — Agent Financial Trust Protocol: Identity, Credit, Risk, and Reputation for Autonomous Economic Agents

Status: Draft 0.1

## Abstract

AFT defines an open trust layer for economic agents. It separates identity, delegated authority, financial events, evidence, reputation, credit, dispute history, incident history, blockchain commitments, and cryptographic verification. AFT is designed to complement existing payment, identity, authorization, and blockchain systems rather than replace them.

## Introduction

Autonomous and semi-autonomous agents are becoming participants in financial workflows. They can call paid APIs, buy content, procure services, hire other agents, receive payments, and operate under delegated budgets. These actions require more than payment execution. Counterparties need a way to evaluate whether an agent is identified, authorized, reliable, dispute-prone, creditworthy, compromised, or associated with fraud.

AFT provides signed financial trust records that can be verified, selectively disclosed, and anchored over time.

## Why Agent Financial Trust Is Needed

Agent financial behavior introduces new risk surfaces:

- the agent is not always the legal principal;
- the runtime operator may differ from the principal;
- wallet control may not imply spending authority;
- prompt injection can induce payments outside intent;
- reputation can be manufactured through low-value self-dealing;
- incidents and disputes may be hidden across platforms;
- classical signatures may not remain safe for long-lived financial records.

AFT addresses these issues by defining common identity profiles, mandate references, signed event envelopes, reputation snapshots, dispute records, incident records, and PQC-ready cryptographic metadata.

## Existing Rails And Why They Are Insufficient Alone

DID, Verifiable Credentials, OAuth/OIDC, SPIFFE/SPIRE, HTTP Message Signatures, AP2, x402, card rails, bank rails, stablecoin rails, smart contracts, Visa Trusted Agent Protocol, Mastercard Agent Pay, and Stripe/OpenAI Agentic Commerce Protocol each solve important parts of the stack.

They do not provide one neutral layer for:

- cross-rail financial event history;
- contextual credit and reputation;
- late payment, default, dispute, scam, fraud, and incident records;
- mandate compliance scoring;
- blockchain-neutral commitments;
- PQC migration state.

AFT consumes artifacts from those systems and emits neutral trust evidence.

## AFT Architecture

AFT has seven core layers:

1. Agent Financial Identity Profile.
2. Mandate and Authority Binding.
3. Financial Event Layer.
4. Blockchain Anchoring Layer.
5. Reputation and Credit Layer.
6. Risk Decision API.
7. Governance and Conformance.

```text
Identity / VC / OIDC / SPIFFE
          |
          v
Agent Financial Identity Profile
          |
          v
Mandate + Policy Binding -----> Risk Evaluation
          |
          v
Signed Financial Event Envelope
          |
          +-----> Reputation / Credit Snapshot
          |
          +-----> Dispute / Incident History
          |
          v
Merkle Batch Root / Revocation Root / Reputation Root
          |
          v
Blockchain-neutral Anchor
```

## Agent Financial Identity

An AFT agent profile distinguishes:

- `agent_id`;
- principal;
- owner;
- operator;
- controller;
- funding references;
- payment instrument references;
- wallet references;
- credential references;
- risk and lifecycle status;
- cryptographic capabilities.

AFT explicitly avoids treating agent identity, principal identity, operator identity, wallet control, and liability as the same concept.

## Delegated Authority And Mandates

AFT binds financial events to mandates. A mandate reference identifies:

- authority type;
- hash of the mandate;
- principal and agent;
- scope;
- amount limits;
- counterparty constraints;
- purpose codes;
- expiration;
- nonce or replay protection;
- revocation state.

Mandates may reference AP2 intent, cart, and payment mandates; OAuth/OIDC scopes; Verifiable Credentials; policy engine decisions; human approvals; or autonomous budget grants.

## Financial Event Model

AFT events are immutable signed envelopes. They include:

- event identifier and type;
- event time;
- agent, principal, operator, and counterparty references;
- transaction summary;
- authority reference;
- evidence commitments;
- privacy classification;
- optional blockchain anchor reference;
- canonicalization and hash metadata;
- one or more signatures.

Corrections and supersessions are represented as new signed events. Events are not rewritten.

## Blockchain Anchoring

AFT uses blockchains only for proofs and commitments:

- event hashes;
- Merkle batch roots;
- previous-root chaining;
- credential hashes;
- revocation roots;
- reputation roots;
- dispute-state commitments;
- bond and stake state.

AFT MUST NOT store raw prompts, responses, PII, card data, bank data, private merchant data, private customer data, private incident evidence, or full conversation logs on-chain.

## Reputation And Credit Model

AFT reputation is multidimensional and contextual. A snapshot may include settlement reliability, late payment rate, default count, dispute rate, fraud validated count, security incident count, policy violation rate, mandate compliance, maximum verified transaction amount, credit utilization, repayment reliability, domain trust, principal trust, operator trust, and counterparty feedback.

AFT trust tiers range from `AFT-T0` Unknown to `AFT-T6` Institutionally Trusted. A tier MUST be scoped to context and evidence quality.

## Quantum-Resistant Cryptography

AFT is crypto-agile and post-quantum-oriented. Records carry algorithm identifiers, key identifiers, key versions, verification methods, signature times, and PQC profiles.

Draft 0.1 recommends:

- ML-KEM / FIPS 203 for quantum-resistant key establishment;
- ML-DSA / FIPS 204 as the primary PQC signature family;
- SLH-DSA / FIPS 205 as a conservative hash-based backup;
- hybrid classical plus PQC profiles during migration;
- AES-256-GCM or ChaCha20-Poly1305 for symmetric authenticated encryption;
- SHA-256 minimum, with SHA-384 or SHA-512 for long-term commitments where appropriate.

AFT does not invent cryptography and does not claim any algorithm is permanently safe.

## Decentralized AFT Network

Centralized scoring creates concentration risk. A single database or scoring company can become a lock-in point, censorship point, opaque risk model, or high-value attack target. AFT therefore treats trust as decentralized evidence rather than a centralized verdict.

In a decentralized AFT network, issuers, holders, verifiers, peers, and reputation providers interact through signed artifacts:

- peers publish identities and discovery metadata;
- issuers create Verifiable Credentials and signed AFT events;
- holders selectively disclose credentials, events, and proofs;
- verifiers check signatures, revocation, anchors, issuer credibility, and policy context;
- reputation providers compute independent contextual views.

Blockchain anchoring creates tamper-evident history without exposing private data. Peers anchor event hashes, Merkle roots, revocation roots, reputation roots, dispute-state commitments, bond or stake state, and credential commitments. They MUST NOT anchor raw prompts, responses, PII, card data, bank data, customer names, private merchant data, private evidence, or full logs.

Multiple reputation providers should exist because risk is contextual. A provider optimized for low-value paid APIs may not be appropriate for credit, insurance, procurement, or regulated payments. AFT avoids platform lock-in by making the underlying evidence portable across issuers, chains, ledgers, stores, and reputation providers.

AFT supports public/open networks for marketplaces, paid APIs, content commerce, stablecoin settlement, and agent-to-agent services. It also supports consortium or permissioned deployments for banks, enterprises, payment processors, insurers, regulated industries, B2B procurement, and closed marketplaces. Neither model is automatically safe: public networks require Sybil controls, and permissioned networks still require evidence review, governance, and auditability.

## Privacy And Selective Disclosure

AFT records use privacy classifications: `PUBLIC`, `PRIVATE`, `RESTRICTED`, and `HASH_ONLY`. Implementers should minimize data, encrypt off-chain evidence, disclose by role, and use commitments for public verification. Public records should avoid leaking private payment metadata through identifiers, timing, addresses, or rare event publication.

## Threat Model

AFT addresses agent impersonation, credential theft, key compromise, prompt-injection-induced payments, unauthorized delegated spending, mandate replay and tampering, collusive fraud, artificial reputation inflation, false reporting, Sybil farms, wallet drain, policy bypass, autonomous procurement abuse, and quantum attacks against classical public-key cryptography.

Controls include signed mandates, short-lived authority, nonces, counterparty verification, spending caps, purpose codes, anomaly detection, multi-party signatures, dispute challenge flows, revocation, event anchoring, bonding and slashing, selective disclosure, PQC signatures, and crypto-agility.

## Use Cases

- Low-value paid API calls under x402 or similar mechanisms.
- Agent-assisted procurement using AP2 mandates.
- Agentic commerce through card, ACH, bank, or processor rails.
- Stablecoin settlement with off-chain evidence and on-chain commitments.
- Smart contract escrow with private dispute evidence.
- LLM proxy virtual-key budgets and policy enforcement.
- Agent credit facilities based on verified repayment history.
- Cross-platform incident and fraud reporting.

## MVP Implementation Path

An MVP can implement:

1. agent profile schema;
2. event envelope schema;
3. mandate reference schema;
4. x402 and AP2 example mappings;
5. signed event verification;
6. Merkle batch anchoring;
7. simple reputation snapshot generation;
8. risk evaluation API;
9. hybrid or ML-DSA signing profile.

## Governance And Standardization

AFT should move toward open governance with working groups for identity, payments, reputation, security, cryptography/PQC, blockchain anchoring, and privacy. A neutral foundation or standards-body process should be considered after implementation feedback and interoperability tests.

## Conclusion

Agent financial autonomy requires a trust layer that is distinct from identity, authorization, and payment settlement. AFT proposes a neutral framework for signed financial events, mandate evidence, privacy-preserving anchors, contextual reputation, credit signals, disputes, incidents, and post-quantum cryptographic migration.
