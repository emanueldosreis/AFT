# AFT-018 - Decentralized Trust Network

Status: Draft 0.1  
Category: Normative architecture

## Abstract

AFT defines a decentralized and federated trust network for agent financial activity. AFT standardizes interoperability, not ownership of the network. It defines shared schemas, identifiers, cryptographic rules, discovery documents, registries, event envelopes, anchoring proofs, dispute mechanics, and conformance tests so many independent peers can issue, verify, anchor, challenge, and consume agent financial trust evidence.

AFT MUST NOT require a single global database, a single official reputation score, a single blockchain, a single DID method, or one central AFT operator.

## Motivation

Autonomous economic agents will transact across marketplaces, APIs, wallets, payment processors, content systems, procurement platforms, and agent-to-agent service networks. A centralized scoring platform would create concentration risk, lock-in, unilateral censorship risk, and opaque scoring incentives. AFT instead treats trust as a computation over portable signed evidence, credentials, issuer reputation, dispute outcomes, revocation state, and policy context.

## Scope

AFT-018 defines:

- decentralized AFT network layers;
- network participant roles;
- peer identity and discovery;
- peer capabilities;
- federated event issuance;
- multi-attestation;
- federated credential issuance;
- blockchain and distributed-ledger anchoring across peers;
- decentralized reputation providers;
- public/open and consortium/permissioned deployment models;
- peer onboarding, suspension, distrust, and conformance expectations.

## Non-Scope

AFT-018 does not:

- define one mandatory network operator;
- define one global reputation provider;
- require all events to be public;
- require one chain, ledger, consensus system, DID method, wallet, or payment provider;
- resolve legal liability;
- certify regulatory compliance;
- make permissionless networks safe without Sybil controls;
- make permissioned networks automatically trustworthy.

## Decentralization Principles

AFT deployments MUST follow these principles:

- AFT standardizes interoperability, not ownership of the network.
- AFT MUST NOT require a single central event database.
- AFT MUST NOT require a single official credit or reputation score.
- AFT MUST NOT require a single blockchain or distributed ledger.
- AFT MUST NOT require a single DID method.
- AFT MUST NOT require one central AFT operator.
- AFT SHOULD allow many peers to participate permissionlessly in open deployments.
- AFT SHOULD allow permissioned consortium deployments for regulated or enterprise contexts.
- AFT SHOULD allow multiple reputation providers to compute different risk views.
- AFT SHOULD define portable reputation evidence, not a monopoly credit bureau.

## Five Decentralized Layers

### 1. Identity Layer

Agents, principals, operators, issuers, verifiers, merchants, wallets, auditors, arbiters, anchor providers, conformance testers, and reputation providers each have DIDs or equivalent verifiable identities. DID documents MAY express verification methods and service endpoints. Non-DID identity systems MAY be used if they provide equivalent verifiability, key discovery, and lifecycle controls.

### 2. Credential Layer

Many independent issuers can issue Verifiable Credentials or equivalent signed attestations about agents, peers, mandates, creditworthiness, incidents, dispute outcomes, certifications, and PQC readiness. AFT relies on issuer credibility, credential status, revocation, and selective disclosure rather than a single central credential authority.

### 3. Event Layer

Peers emit signed AFT events using shared event schemas. A peer MAY issue events only for observations, receipts, decisions, credentials, or operational roles it is qualified to attest.

### 4. Anchoring Layer

Peers batch events into Merkle trees and anchor event roots, revocation roots, reputation roots, and dispute-state commitments on one or more blockchains or distributed ledgers. Public chains, L2s, permissioned ledgers, and consortium ledgers MAY be used. Raw prompts, responses, PII, card data, bank data, customer names, private merchant data, private evidence, and full logs MUST NOT be placed on-chain.

### 5. Reputation/Risk Layer

Multiple independent reputation providers compute competing or complementary risk views from shared evidence, credentials, proofs, issuer credibility, disputes, and policy context. AFT defines portable evidence and snapshot formats, not one official scoring formula.

## Network Roles

### Agent Operator

Description: Runs or hosts an agent runtime.  
Events it may emit: security incidents, mandate compliance, payment attempts, policy violations, key compromise reports.  
Credentials it may issue: operational-control attestations, runtime security posture attestations, mandate compliance attestations.  
Credentials it may consume: principal mandate credentials, agent identity credentials, wallet-provider credentials.  
Trust assumptions: controls runtime logs and policy-enforcement context but may be economically interested.  
Abuse risks: hiding incidents, overstating mandate compliance, colluding with agents.  
Conformance requirements: MUST sign events, publish key status, support revocation, and disclose evidence selectively.

### Principal

Description: Entity on whose behalf an agent may act.  
Events it may emit: mandate issuance, mandate revocation, dispute opening, invoice acceptance, human-confirmed authorization.  
Credentials it may issue: mandate credentials, delegation credentials, principal-authority credentials.  
Credentials it may consume: agent identity, operator, wallet, and reputation credentials.  
Trust assumptions: authority over delegated intent, not necessarily operational visibility.  
Abuse risks: repudiating valid delegated actions, issuing overbroad mandates.  
Conformance requirements: SHOULD bind scope, amount limits, purpose codes, expiration, and nonces.

### Controller

Description: Entity controlling agent profile lifecycle, keys, and administrative policy.  
Events it may emit: profile updates, key rotations, key compromise reports, revocations.  
Credentials it may issue: controller authority and key-management credentials.  
Credentials it may consume: conformance and audit credentials.  
Trust assumptions: can change keys and profile metadata.  
Abuse risks: unauthorized profile takeover or failure to revoke compromised keys.  
Conformance requirements: MUST support key versioning, revocation, rotation, and crypto-agility.

### Merchant

Description: Sells goods, content, APIs, services, or agent work outputs.  
Events it may emit: service delivery attestations, invoice issuance, refunds, disputes.  
Credentials it may issue: service delivery, merchant category, fulfillment, refund credentials.  
Credentials it may consume: agent mandate, payment settlement, reputation snapshots.  
Trust assumptions: has delivery evidence but may be biased in disputes.  
Abuse risks: fake delivery, collusive reputation inflation, resource misrepresentation.  
Conformance requirements: SHOULD provide receipt hashes and challengeable evidence.

### API Provider

Description: Offers paid or metered APIs.  
Events it may emit: paid API settlement, usage fulfillment, policy violation, rate-limit incidents.  
Credentials it may issue: API access fulfillment and usage attestations.  
Credentials it may consume: x402 receipts, agent identity, mandate credentials.  
Trust assumptions: controls service logs and usage metering.  
Abuse risks: overbilling, leaking private request metadata, false fulfillment.  
Conformance requirements: MUST avoid public disclosure of private URLs, queries, prompts, or responses.

### Content Provider

Description: Offers paid content or licensed information resources.  
Events it may emit: content access settlement, license compliance, policy violation.  
Credentials it may issue: content access and license compliance credentials.  
Credentials it may consume: payment settlement, bot/auth credentials, mandate credentials.  
Trust assumptions: controls access logs and content policy.  
Abuse risks: excessive metadata leakage, false access claims.  
Conformance requirements: SHOULD use hash-only public commitments for content access events.

### Payment Processor

Description: Processes fiat, card, ACH, bank, stablecoin, or other payment outcomes.  
Events it may emit: `AGENT_PAYMENT_SETTLED`, `AGENT_PAYMENT_FAILED`, chargebacks, refunds, reversals.  
Credentials it may issue: settlement, refund, chargeback, processor status credentials.  
Credentials it may consume: mandate references, agent identity, merchant credentials.  
Trust assumptions: authoritative for processor-observed outcomes.  
Abuse risks: leaking payment metadata, biased chargeback reporting, settlement ambiguity.  
Conformance requirements: MUST NOT expose card, bank, or customer data in AFT records.

### Wallet Provider

Description: Provides wallet, custody, signing, or policy-controlled payment infrastructure.  
Events it may emit: payment authorization, wallet policy denial, settlement, key compromise.  
Credentials it may issue: wallet-control, policy-enforcement, transaction status credentials.  
Credentials it may consume: mandate, agent profile, controller credentials.  
Trust assumptions: controls wallet policy and transaction metadata.  
Abuse risks: overstating authority from wallet control, privacy leakage through addresses.  
Conformance requirements: MUST distinguish wallet control from unlimited financial authority.

### Agent Marketplace

Description: Lists, matches, or brokers agents and agent-provided services.  
Events it may emit: marketplace fulfillment, escrow, disputes, certification, policy violations.  
Credentials it may issue: marketplace membership, service completion, dispute outcome credentials.  
Credentials it may consume: agent identity, reputation, incident, and conformance credentials.  
Trust assumptions: has marketplace workflow visibility.  
Abuse risks: preferential ranking, suppressing disputes, fake marketplace activity.  
Conformance requirements: SHOULD support challenge and supersession for marketplace-issued events.

### Auditor

Description: Reviews controls, evidence, compliance posture, or security posture.  
Events it may emit: certification issued/revoked, audit findings, incident validation.  
Credentials it may issue: audit, certification, PQC readiness, control attestations.  
Credentials it may consume: event proofs, profile credentials, policy records.  
Trust assumptions: independent review quality matters.  
Abuse risks: rubber-stamp certification or undisclosed conflicts.  
Conformance requirements: SHOULD disclose audit scope, evidence hash, and credential expiration.

### Security Incident Reporter

Description: Reports or validates security incidents affecting agents or peers.  
Events it may emit: `AGENT_SECURITY_INCIDENT_REPORTED`, `AGENT_KEY_COMPROMISE_REPORTED`, incident validation, incident rejection.  
Credentials it may issue: incident attestation and remediation credentials.  
Credentials it may consume: event evidence, key status, operator credentials.  
Trust assumptions: reporter credibility and evidence quality vary.  
Abuse risks: false reports, extortion, premature disclosure of exploit details.  
Conformance requirements: MUST protect incident evidence and support challenge flows.

### Dispute Arbiter

Description: Resolves disputed events or claims.  
Events it may emit: dispute opened, status updated, resolved, rejected, or superseded.  
Credentials it may issue: dispute outcome credentials.  
Credentials it may consume: payment, delivery, mandate, and incident attestations.  
Trust assumptions: arbiter jurisdiction and process must be understood.  
Abuse risks: biased decisions, opaque evidence handling.  
Conformance requirements: SHOULD publish outcome commitments and maintain private evidence controls.

### Credit Provider

Description: Extends credit or evaluates creditworthiness.  
Events it may emit: credit line issued, utilized, repaid, late, defaulted, suspended.  
Credentials it may issue: creditworthiness and repayment credentials.  
Credentials it may consume: reputation snapshots, payment history, dispute outcomes.  
Trust assumptions: authoritative only for its facility or evaluation method.  
Abuse risks: leaking credit terms or overstating negative signals.  
Conformance requirements: MUST use restricted disclosure for private credit terms.

### Insurer

Description: Offers coverage, guarantees, or risk transfer for agent activity.  
Events it may emit: coverage issued, coverage revoked, claim opened, claim outcome.  
Credentials it may issue: coverage, claim outcome, risk-control credentials.  
Credentials it may consume: reputation, incident, credit, and conformance credentials.  
Trust assumptions: policy scope matters.  
Abuse risks: ambiguous coverage or undisclosed exclusions.  
Conformance requirements: SHOULD disclose only commitments to private policy terms.

### Reputation Provider

Description: Computes contextual reputation or risk from signed evidence.  
Events it may emit: `AGENT_REPUTATION_ATTESTED`, `AGENT_REPUTATION_ROOT_UPDATED`, trust tier updates.  
Credentials it may issue: reputation snapshot credentials and trust-tier credentials.  
Credentials it may consume: all relevant signed event and credential types.  
Trust assumptions: methodology, input quality, and issuer weighting matter.  
Abuse risks: opaque scoring, pay-to-play scores, centralization pressure.  
Conformance requirements: SHOULD disclose methodology, confidence, evidence roots, and dispute adjustment.

### Anchor Provider

Description: Batches and anchors AFT commitments on chains or ledgers.  
Events it may emit: batch anchored, revocation root updated, reputation root updated.  
Credentials it may issue: anchor service and inclusion proof credentials.  
Credentials it may consume: event hashes and batch manifests.  
Trust assumptions: provides timestamping and commitment publication, not truth of events.  
Abuse risks: withholding anchors, selective anchoring, metadata leakage.  
Conformance requirements: MUST publish anchor metadata and MUST NOT store sensitive data on-chain.

### Registry Maintainer

Description: Maintains registries for event types, algorithms, peer types, and conformance profiles.  
Events it may emit: registry update and deprecation events.  
Credentials it may issue: registry membership or registry governance credentials.  
Credentials it may consume: governance approvals and security review records.  
Trust assumptions: registry governance affects interoperability.  
Abuse risks: capture, arbitrary deprecation, namespace squatting.  
Conformance requirements: MUST publish versioned registry entries and deprecation policies.

### Conformance Tester

Description: Tests implementations against AFT profiles.  
Events it may emit: conformance test results, certification issued/revoked.  
Credentials it may issue: conformance credentials.  
Credentials it may consume: implementation metadata, peer discovery documents, test vectors.  
Trust assumptions: test scope and independence matter.  
Abuse risks: stale tests, false certification.  
Conformance requirements: SHOULD publish test suite version, profile scope, and result hash.

## Peer Identity

A peer MUST publish a verifiable identity. A DID is RECOMMENDED for open deployments because DID documents can advertise verification methods and service endpoints. Consortium deployments MAY use enterprise PKI, SPIFFE IDs, or permissioned-ledger member identities where they provide equivalent key discovery, revocation, and governance.

## Peer Discovery

Peers SHOULD publish a discovery document at `.well-known/aft-agent-trust` and MAY advertise the same endpoint through a DID service entry. Discovery documents identify peer type, status, service endpoints, supported event types, credential types, crypto profiles, PQC readiness, anchoring modes, privacy defaults, revocation endpoint, and conformance levels.

## Peer Capabilities

Capabilities SHOULD be explicit and signed. A verifier SHOULD NOT assume that a peer can issue every AFT event type. Capability documents SHOULD be cached only within declared freshness windows and SHOULD be revalidated after key rotation, suspension, revocation, or compromise.

## Federated Event Issuance

Any conformant peer MAY emit signed AFT events for which it has authority, observation, or role-based evidence. Event recipients SHOULD evaluate:

- issuer identity and status;
- event type authorization;
- signature validity;
- key version and revocation status;
- evidence quality;
- mandate scope;
- privacy classification;
- supersession and correction history;
- dispute status;
- anchor inclusion proofs.

Issuer guidance includes:

- `AGENT_PAYMENT_SETTLED`: payment processor, wallet provider, merchant, or chain indexer.
- `AGENT_INVOICE_LATE`: invoice issuer, marketplace, or creditor.
- `AGENT_ESCROW_RELEASED`: escrow contract, escrow provider, or marketplace.
- `AGENT_SECURITY_INCIDENT_REPORTED`: operator, auditor, affected counterparty, or marketplace.
- `AGENT_FRAUD_REPORT_VALIDATED`: arbiter, payment processor, marketplace, or fraud consortium.
- `AGENT_CERTIFICATION_ISSUED`: auditor or certification body.
- `AGENT_REPUTATION_ROOT_UPDATED`: reputation provider.

## Multi-Attestation Model

AFT SHOULD support multiple independent signed claims about the same transaction, delivery, incident, mandate, or dispute. The protocol SHOULD NOT assume the first reporter is correct. It SHOULD support challenge, supersession, correction, revocation, and dispute outcomes.

Reputation providers SHOULD consider attester credibility, evidence quality, dispute status, revocation status, correlation, timing, and policy context. Conflicting attestations SHOULD remain visible through signed correction or dispute chains rather than being overwritten.

## Federated Credential Issuance

AFT credentials MAY be issued by principals, marketplaces, auditors, payment processors, wallets, credit providers, reputation providers, arbiters, and conformance testers. Credential schemas SHOULD be portable across deployments and SHOULD support selective disclosure.

## Blockchain Anchoring Across Peers

Each peer MAY anchor its own Merkle batches, or a group of peers MAY use a shared anchor provider. Anchors MAY be placed on public chains, L2s, permissioned DLTs such as enterprise consortium ledgers, or private enterprise ledgers. Anchoring proves commitment existence and tamper evidence; it does not prove event truth by itself.

## Reputation-Provider Decentralization

AFT reputation providers are independent relying-party services. They MAY compute different views for different markets, jurisdictions, risk appetites, asset classes, transaction sizes, and policy contexts. AFT MUST NOT define one official score or require all participants to use one reputation provider.

## Public/Open Network Deployment

Best for:

- public agent marketplaces;
- paid APIs;
- content marketplaces;
- open web agent commerce;
- stablecoin transactions;
- agent-to-agent services.

Characteristics:

- public DIDs or equivalent public identities;
- public anchors;
- open registries;
- open peer discovery;
- public or semi-public event commitments;
- multiple reputation providers;
- higher Sybil risk;
- stronger need for staking, bonding, rate limits, issuer reputation, anomaly detection, and challenge mechanisms.

## Consortium/Permissioned Network Deployment

Best for:

- banks;
- enterprises;
- payment processors;
- insurance;
- regulated industries;
- B2B procurement;
- closed marketplaces.

Characteristics:

- known participants;
- permissioned validators or endorsers;
- stronger governance;
- private evidence channels;
- selective disclosure;
- audited participants;
- potentially lower Sybil risk;
- stronger legal or contractual controls.

Permissioned membership does not make claims automatically truthful. Verifiers SHOULD still check signatures, evidence quality, revocation, disputes, and policy context.

## Dispute And Incident Federation

Disputes and incidents SHOULD be represented as signed, challengeable, privacy-preserving event chains. Multiple peers MAY report, validate, reject, or resolve the same incident. Sensitive evidence MUST remain off-chain and access-controlled. Public records SHOULD use hash-only commitments unless broader disclosure is justified.

## Trust Registries And Governance

Trust registries MAY list recognized peers, issuers, arbiters, conformance testers, or reputation providers. AFT registries SHOULD be versioned, auditable, and governed transparently. Registry inclusion SHOULD NOT be treated as a guarantee of trustworthiness.

## Sybil Resistance And Anti-Gaming

Open deployments SHOULD use layered controls:

- verified credentials;
- issuer reputation;
- staking or bonding;
- rate limits;
- anomaly detection;
- graph analysis;
- challenge windows;
- dispute outcomes;
- revocation;
- marketplace or domain trust;
- conformance evidence.

Permissioned deployments SHOULD still guard against collusion, stale credentials, insider abuse, and false attestations.

## Peer Onboarding

Peer onboarding SHOULD include:

1. create DID or equivalent verifiable identity;
2. publish verification methods;
3. publish `.well-known/aft-agent-trust`;
4. declare capabilities and conformance profiles;
5. obtain or issue relevant credentials;
6. publish revocation and status endpoints;
7. demonstrate signature, event, anchor, and privacy handling;
8. complete conformance tests where required by the deployment.

## Peer Suspension And Distrust

Peers MAY be marked `under_review`, `suspended`, `compromised`, `revoked`, or `deprecated`. Suspension SHOULD be signed and SHOULD include scope, effective time, evidence commitment, and challenge path where appropriate. Relying parties SHOULD check peer status before accepting new events.

## Conformance Expectations

Federated peers SHOULD support:

- peer discovery;
- signed capability documents;
- event schema validation;
- event signature verification;
- key rotation and revocation;
- privacy classification;
- selective disclosure;
- challenge and supersession;
- anchor proof verification;
- PQC or hybrid crypto profiles.

## Privacy Considerations

Federation increases correlation risk. Peers SHOULD minimize disclosed identifiers, batch anchors, rotate scoped identifiers, avoid public disclosure of rare sensitive event types, and keep evidence encrypted off-chain. AFT MUST NOT require raw private data to be published to participate in the network.

## Security Considerations

Federated AFT deployments face impersonation, fake issuers, compromised peers, collusion, replay, false reporting, equivocation, anchor withholding, registry capture, Sybil attacks, and privacy leakage. Verifiers SHOULD combine cryptographic verification with issuer reputation, evidence review, dispute status, revocation, and policy checks.

## Quantum-Resistant Cryptography Considerations

Federated networks MUST be crypto-agile. Peer discovery, credentials, events, anchors, and reputation snapshots MUST carry algorithm identifiers, key identifiers, key versions, and verification methods. Deployments SHOULD support hybrid classical + PQC transition profiles and SHOULD migrate toward ML-DSA / FIPS 204 signatures, ML-KEM / FIPS 203 key establishment where encrypted evidence exchange is required, and SLH-DSA / FIPS 205 backup signatures for conservative long-term records.

```text
                         +-------------------------+
                         | Trust Registries        |
                         | peer types, algorithms  |
                         +-----------+-------------+
                                     |
        discovery + credentials      |       conformance + status
                                     v
+----------------+      +----------------+      +----------------+
| Payment Peer   |----->| Event Store    |<-----| Marketplace    |
| DID + .well-   |      | signed events  |      | Peer           |
| known metadata |      +-------+--------+      +-------+--------+
+--------+-------+              |                       |
         |                      | Merkle roots           |
         |                      v                       |
         |              +---------------+                |
         +------------->| Public chain  |<---------------+
                        | or DLT anchor |
         +------------->+---------------+<---------------+
         |                                              |
+--------+---------+                         +----------+--------+
| Auditor / Arbiter|                         | Reputation Provider|
| credentials,     |------------------------>| independent risk   |
| disputes         | signed attestations     | views and roots    |
+------------------+                         +-------------------+
```
