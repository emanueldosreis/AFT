# AFT - Agent Financial Trust Protocol

Draft version: 0.1

AFT is an open protocol proposal for agent financial trust. It defines a common layer for agent financial identity, delegated authority, signed financial events, blockchain anchoring, dispute and incident history, reputation and credit signals, and quantum-resistant cryptographic operation.

AFT is not a payment rail, wallet, bank, card network, identity provider, or compliance product. It is a trust and evidence layer intended to work across traditional financial rails, crypto and stablecoin rails, API payment protocols, agent-commerce protocols, and institutional payment systems.

> Draft 0.1 is not production financial, legal, security, or compliance advice. The materials in this repository are a protocol proposal for review, experimentation, and interoperability discussion.

## Why AFT Is Needed

Agentic software will increasingly buy content, consume paid APIs, subscribe to tools, search, hire other agents, execute procurement tasks, receive payments, and operate with delegated financial autonomy. Payment protocols can answer whether a payment can be made. They do not by themselves answer whether an agent should be trusted financially.

AFT addresses the missing shared layer for:

- agent financial identity distinct from principal identity;
- delegated authority and mandate evidence;
- signed financial event history;
- reputation, credit, dispute, scam, fraud, late-payment, and security-incident signals;
- privacy-preserving event commitments and blockchain anchoring;
- risk evaluation inputs and receipts;
- crypto-agile, post-quantum-ready trust records.

## What AFT Solves

AFT defines interoperable data structures and process requirements for:

- identifying the agent, principal, operator, controller, and relevant funding or payment references;
- binding financial events to mandates, scopes, purpose codes, limits, and revocation state;
- producing signed, immutable event envelopes that can be selectively disclosed;
- anchoring event batches, revocation roots, reputation roots, dispute commitments, and bond state without exposing private data on-chain;
- publishing contextual reputation and credit snapshots;
- integrating with risk engines and payment authorization systems;
- migrating from classical cryptography to hybrid and post-quantum cryptographic profiles.

## What AFT Does Not Solve

AFT does not:

- move money or settle payments;
- replace banks, card networks, payment processors, stablecoin issuers, wallets, or custody systems;
- define a universal legal liability regime;
- certify compliance with financial regulation;
- require one blockchain, wallet, DID method, payment provider, or signature algorithm;
- require publication of private financial data;
- define one global reputation score for all contexts.

## Relationship To Existing Standards And Protocols

AFT is complementary to existing identity, authorization, payment, and signing systems.

- DID and Verifiable Credentials can identify agents, principals, operators, credentials, and attestations. AFT consumes and references those artifacts, then records financial trust events and reputation state derived from them.
- AP2 can express intent, cart, and payment mandates. AFT records mandate references, settlement events, disputes, and reputation outcomes associated with those flows.
- x402 can enable paid HTTP resources and API calls. AFT records authorization, settlement, failure, dispute, and reliability history without changing x402 payment mechanics.
- Visa Trusted Agent Protocol, Mastercard Agent Pay, and Stripe/OpenAI Agentic Commerce Protocol can provide commercial payment and trust flows. AFT maps their outcomes into a neutral financial event and reputation layer.
- OAuth/OIDC can authorize API access and scope delegated permissions. AFT records financial authority references and whether spending stayed within the authorized scope.
- SPIFFE/SPIRE can provide workload identity. AFT can reference workload identities and bind them to financial-agent profiles.
- HTTP Message Signatures can authenticate API requests and receipts. AFT can carry or reference those signatures inside evidence records.
- Blockchain rails can settle assets or provide public timestamping. AFT uses chains only for commitments, roots, registry pointers, revocation roots, reputation roots, dispute-state commitments, and bond or stake state.

## Architecture

```text
                   +-----------------------------+
                   | Principals / Organizations  |
                   +--------------+--------------+
                                  |
                                  | delegates authority
                                  v
+-------------+        +--------------------------+        +------------------+
| DID / VC /  | -----> | AFT Agent Financial      | -----> | Risk / Credit / |
| OIDC / SPIFFE|       | Identity Profile         |        | Reputation APIs |
+-------------+        +-------------+------------+        +---------+--------+
                                      |                               |
                                      | signs financial events        |
                                      v                               |
                         +--------------------------+                 |
                         | AFT Event Envelope       | <---------------+
                         | mandates, evidence, PQC  |
                         +-------------+------------+
                                       |
                                       | batch hash commitments
                                       v
                         +--------------------------+
                         | Blockchain Anchoring     |
                         | roots, revocation, bonds |
                         +--------------------------+
```

## Decentralized / Federated Trust Network

AFT is not a central database, not a single score, not one blockchain, and not a central AFT operator. It is a decentralized and federated trust protocol where independent peers can issue signed claims, publish discovery metadata, anchor proofs, challenge disputed claims, and compute reputation from portable evidence.

AFT standardizes common schemas, cryptographic rules, discovery documents, registries, and conformance tests so many organizations can interoperate without handing ownership of agent financial trust to one platform.

```text
 Payment Peer       Merchant Peer       Operator Peer
     | signed events    | attestations      | mandate evidence
     +---------+--------+---------+---------+
               |                  |
               v                  v
        Merkle roots + revocation roots + evidence hashes
               |                  |
               v                  v
      Public chains, L2s, permissioned DLTs, or consortium ledgers
               |
               v
      Independent reputation and risk providers
```

See [AFT-018 Decentralized Trust Network](specs/AFT-018-decentralized-trust-network.md) and [AFT-019 Peer Discovery And Capabilities](specs/AFT-019-peer-discovery-and-capabilities.md).

## Quickstart

- Start with the overview: [specs/AFT-000-overview.md](specs/AFT-000-overview.md)
- Read the decentralized trust model: [specs/AFT-018-decentralized-trust-network.md](specs/AFT-018-decentralized-trust-network.md)
- Review peer discovery: [specs/AFT-019-peer-discovery-and-capabilities.md](specs/AFT-019-peer-discovery-and-capabilities.md)
- Review the event envelope: [specs/AFT-002-event-envelope.md](specs/AFT-002-event-envelope.md)
- Review the PQC strategy: [specs/AFT-010-quantum-resistant-cryptography.md](specs/AFT-010-quantum-resistant-cryptography.md)
- Use JSON Schemas from [schemas/](schemas/)
- Inspect example events in [examples/](examples/)
- Review illustrative contracts in [contracts/](contracts/)
- Explore the reference API in [reference-api/openapi.yaml](reference-api/openapi.yaml)
- Read the whitepaper: [docs/whitepaper.md](docs/whitepaper.md)

## Repository Status

This repository contains a Draft 0.1 proposal. Implementers SHOULD treat all interfaces as unstable until a governance process, conformance suite, security review, and cryptography review are complete.

## License

This repository is licensed under the Apache License, Version 2.0. See [LICENSE](LICENSE).
