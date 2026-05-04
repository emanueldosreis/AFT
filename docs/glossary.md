# Glossary

## Agent

Software that acts with some level of autonomy to perform tasks, including financial or commercial actions.

## Agentic Application

An application that uses one or more agents to plan, decide, call tools, transact, or complete tasks on behalf of a principal.

## Principal

The person, organization, or legal entity on whose behalf an agent may act.

## Operator

The person, organization, or system that runs the agent runtime or service.

## Controller

The entity with administrative authority over an agent profile, keys, lifecycle status, or policy configuration.

## Mandate

A signed or otherwise verifiable authorization defining what an agent may do, under what scope, limits, purpose, counterparty constraints, expiration, and replay-protection rules.

## DID

Decentralized Identifier. A URI-based identifier that can resolve to verification methods and service metadata under a DID method.

## Verifiable Credential

A cryptographically verifiable attestation about a subject, issuer, and claims, often supporting selective disclosure and revocation.

## Payment Instrument

A tokenized reference to a card, bank account, wallet, stablecoin account, credit facility, or other means of payment. AFT uses references, not raw instrument data.

## Event

A signed AFT record describing a financial, credit, dispute, reputation, security, scam, fraud, mandate, or anchoring occurrence.

## Receipt

Evidence that a payment, authorization, settlement, refund, dispute, incident, or other action occurred. AFT generally stores receipt hashes and references.

## Anchor

A blockchain or shared-ledger commitment to a hash, Merkle root, revocation root, reputation root, dispute commitment, registry pointer, or bond state.

## Merkle Root

The root hash of an authenticated tree over event or record commitments.

## Reputation Root

A commitment to a batch of reputation snapshots or reputation state updates.

## Dispute

A contested financial event, obligation, payment, escrow release, invoice, credit event, or reputation-impacting report.

## Incident

A security, fraud, scam, impersonation, key compromise, prompt-injection, unauthorized-spend, or policy-violation event.

## Credit Event

An event involving credit issuance, utilization, repayment, lateness, default, suspension, or limit change.

## Trust Tier

A contextual AFT reputation category, from `AFT-T0` Unknown to `AFT-T6` Institutionally Trusted.

## PQC

Post-quantum cryptography intended to resist attacks by cryptographically relevant quantum computers.

## ML-KEM

Module-Lattice-Based Key-Encapsulation Mechanism, standardized as FIPS 203, used for quantum-resistant key establishment.

## ML-DSA

Module-Lattice-Based Digital Signature Algorithm, standardized as FIPS 204, used as AFT's primary post-quantum signature family.

## SLH-DSA

Stateless Hash-Based Digital Signature Algorithm, standardized as FIPS 205, used as a conservative hash-based backup signature family.

## Hybrid Signature

A signature profile that binds both a classical signature and a post-quantum signature to the same canonical payload.

## Crypto-Agility

The ability to add, replace, deprecate, and migrate cryptographic algorithms, keys, and verification methods without changing core protocol semantics.

## AFT Peer

An independent participant that can publish AFT discovery metadata, issue or verify AFT events, issue credentials, anchor commitments, evaluate risk, or provide conformance services.

## Peer Discovery Document

A signed or verifiable JSON document, usually published at `.well-known/aft-agent-trust` or through a DID service endpoint, describing a peer's AFT capabilities, endpoints, status, crypto profiles, anchoring modes, and privacy defaults.

## Federation

A network model in which many independent peers interoperate using shared protocols, schemas, registries, and verification rules without relying on one central operator or database.

## Multi-Attestation

The practice of preserving multiple signed claims about the same transaction, delivery, incident, mandate, or dispute so verifiers can evaluate attester credibility and evidence quality.

## Reputation Provider

An independent party that computes contextual reputation or risk views from signed AFT evidence, credentials, anchors, disputes, issuer credibility, and policy context.

## Anchor Provider

A peer that batches and publishes commitments such as event roots, revocation roots, reputation roots, or dispute-state commitments to a public chain, L2, permissioned DLT, or consortium ledger.

## Open Network

An AFT deployment where participation and discovery are public or broadly accessible and Sybil resistance depends on layered controls such as credentials, bonding, rate limits, and challenge mechanisms.

## Permissioned Network

An AFT deployment where participants are admitted under governance rules, contracts, credentials, or membership controls.

## Consortium Deployment

A permissioned deployment operated by multiple known organizations under shared governance.

## Trust Registry

A versioned registry of recognized peer types, issuers, algorithms, conformance profiles, or deployment-specific participants. Registry inclusion is not proof of truth.

## Attester

A peer or issuer that signs a claim, event, credential, or evidence commitment.

## Verifier

A party that checks signatures, credentials, revocation status, anchors, evidence hashes, and policy context before relying on an AFT artifact.

## Issuer

A party that creates a credential, event, attestation, reputation snapshot, or other signed claim.

## Holder

A party that controls and presents credentials, events, selective disclosures, or proofs.

## Selective Disclosure

Disclosure of only the fields or proofs required for a verifier's purpose, while withholding private event bodies or evidence.

## Sybil Resistance

Controls that make it harder for one actor to create many fake identities or peers to inflate reputation or evade accountability.

## Bonding

Posting collateral or stake to support accountability or risk alignment.

## Slashing

Reducing or confiscating bonded value according to a defined rule or dispute outcome.
