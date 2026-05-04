# AFT W3C Position Paper: Agent Financial Trust As A Decentralized Extension To Agent Identity

Status: Draft 0.1 discussion paper

## Summary

AFT proposes a financial trust extension for agent identity systems. It does not replace W3C DID, Verifiable Credentials, Agent Identity Registry work, or AI Agent Protocol work. AFT defines the financial trust evidence layer needed when agents buy content, call paid APIs, procure services, hire other agents, receive payments, or act under delegated budgets.

The W3C-relevant question is how agent identity systems can express financial trust metadata without centralizing control of reputation.

## Decentralized Peer Model

AFT is designed as a decentralized and federated trust protocol. Independent peers publish verifiable identities, discovery metadata, service endpoints, credentials, signed events, revocation state, and anchoring commitments. AFT MUST NOT require one AFT operator, one global database, one blockchain, one DID method, or one official score.

W3C DID service endpoints are a natural fit for advertising AFT peer discovery endpoints. DID verification methods are a natural fit for discovering keys used to sign AFT events, credentials, and discovery documents.

## VC Issuer-Holder-Verifier Alignment

AFT maps directly to the Verifiable Credential model:

- issuers: principals, payment processors, marketplaces, auditors, arbiters, wallets, conformance testers, and reputation providers;
- holders: agents, principals, operators, marketplaces, or wallets that present trust evidence;
- verifiers: merchants, API providers, payment systems, marketplaces, risk engines, and reputation providers.

Credential types include AgentFinancialIdentityCredential, AgentMandateReferenceCredential, AgentReputationSnapshotCredential, AgentIncidentAttestationCredential, AgentDisputeOutcomeCredential, and AgentPQCReadinessCredential.

## Multi-Attestation

W3C-aligned agent systems should not assume a single party's claim is final. AFT preserves multiple signed attestations about the same transaction or incident. A payment processor may attest settlement, a merchant may attest delivery, an operator may attest mandate compliance, and an arbiter may later attest a dispute outcome. Reputation providers evaluate those claims using issuer credibility, evidence quality, revocation, and dispute state.

## Reputation Provider Neutrality

AFT deliberately avoids central scoring. It defines portable evidence and reputation snapshot formats so multiple reputation providers can compute different contextual views. This avoids lock-in and allows communities to apply different policies without fragmenting the evidence layer.

## Proposed W3C Fit

AFT could fit as a financial trust profile or extension around:

- agent financial identity metadata;
- DID service endpoint discovery for agent financial trust services;
- VC schemas for mandates, reputation, disputes, incidents, certifications, and PQC readiness;
- lifecycle and revocation metadata;
- privacy-preserving references to off-chain evidence and anchor roots.

## Asks

- Is the Agent Financial Identity Profile boundary appropriate for W3C agent identity work?
- Should AFT peer discovery be represented as a DID service endpoint profile?
- Which financial trust credential schemas should be considered first?
- How should AFT avoid overlap with existing DID, VC, and agent protocol work?
- Is there interest in a narrowly scoped community report or work item?
