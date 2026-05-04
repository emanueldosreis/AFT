# AFT-012: Conformance

Status: Draft 0.1  
Category: Normative

## Purpose

Conformance profiles allow partial implementations to interoperate without claiming full support for every AFT capability.

## AFT-Core

Mandatory:

- parse AFT identifiers;
- validate Draft 0.1 JSON Schemas relevant to implemented artifacts;
- preserve unknown extension fields only where schemas allow them;
- enforce privacy classification handling;
- reject events with missing algorithm identifiers.

Optional:

- event signing;
- anchoring;
- reputation scoring.

## AFT-Identity

Mandatory:

- create and validate Agent Financial Identity Profiles;
- distinguish agent, principal, operator, controller, and owner roles;
- publish key identifiers and key versions;
- represent lifecycle and risk status;
- reference credentials without embedding private data.

Optional:

- DID resolution;
- Verifiable Credential verification;
- SPIFFE/SPIRE integration.

## AFT-Events

Mandatory:

- create and validate event envelopes;
- apply canonical JSON rules;
- compute event hashes;
- verify signatures for supported algorithms;
- support correction and supersession references;
- enforce mandate reference presence for financially material events.

Optional:

- selective-disclosure proofs;
- batch publication.

## AFT-Anchoring

Mandatory:

- compute event hash commitments;
- build or verify Merkle inclusion proofs;
- publish or verify batch roots;
- include chain and finality metadata;
- avoid storing sensitive data on-chain.

Optional:

- smart contract registry integration;
- previous-root chaining;
- reputation root anchoring.

## AFT-Reputation

Mandatory:

- produce contextual reputation snapshots;
- identify issuer, time window, metrics, confidence, and trust tier;
- distinguish pending, validated, rejected, and resolved negative events;
- support privacy-preserving snapshot commitments.

Optional:

- credit scoring;
- counterparty feedback weighting;
- Sybil-resistance scoring.

## AFT-Risk-API

Mandatory:

- implement risk evaluation request and response structures;
- return decision, reason codes, confidence, and evidence references;
- support privacy classification;
- avoid requiring raw private evidence in standard requests.

Optional:

- real-time policy evaluation;
- challenge flows;
- signed risk decisions.

## AFT-PQC-Hybrid

Mandatory:

- support algorithm identifiers and key versioning;
- verify at least one AFT hybrid signature profile;
- record component algorithm metadata;
- support key rotation and revocation metadata.

Optional:

- ML-KEM for evidence encryption;
- SLH-DSA backup signatures.

## AFT-PQC-Primary

Mandatory:

- support ML-DSA signatures for new financially material events;
- support crypto-agile verification;
- reject classical-only signatures for high-value new events unless policy exception applies;
- publish PQC readiness level.

Optional:

- SLH-DSA backup signatures;
- hybrid compatibility signatures.

## AFT-Full

Mandatory:

- AFT-Core;
- AFT-Identity;
- AFT-Events;
- AFT-Anchoring;
- AFT-Reputation;
- AFT-Risk-API;
- AFT-PQC-Hybrid or AFT-PQC-Primary;
- conformance tests for schemas, canonicalization, signatures, anchors, and privacy classification.

Optional:

- production payment integrations;
- regulatory reporting integrations;
- zero-knowledge selective disclosure;
- multi-chain anchoring.

## AFT-Peer

Mandatory:

- publish a verifiable peer identity;
- publish peer status and revocation metadata;
- declare supported event types and credential types;
- sign peer metadata using registered AFT signature profiles;
- distinguish issuance capability from trustworthiness in documentation.

Optional:

- DID service endpoint publication;
- trust registry membership;
- conformance credential issuance.

## AFT-Federated-Events

Mandatory:

- accept or emit events from multiple independent peers;
- verify issuer identity, key status, signatures, event schema, and privacy classification;
- preserve issuer identifiers and event hashes;
- support correction, supersession, revocation, and dispute references;
- avoid collapsing conflicting attestations into an untraceable single record.

Optional:

- cross-peer event correlation;
- peer-specific trust policies;
- multi-ledger anchor verification.

## AFT-Peer-Discovery

Mandatory:

- publish or consume `.well-known/aft-agent-trust`;
- validate AFT peer discovery documents;
- verify discovery document signatures where present;
- check peer status and revocation endpoints;
- support caching controls and stale-document rejection.

Optional:

- DID service endpoint discovery;
- signed consortium registry discovery.

## AFT-Multi-Attestation

Mandatory:

- support multiple signed attestations for the same subject or transaction;
- preserve attester identity, attestation type, evidence hashes, and anchor references;
- support challenge, supersession, correction, and dispute outcome references;
- expose enough metadata for reputation providers to evaluate evidence quality.

Optional:

- attester credibility weighting;
- automated conflict detection;
- selective-disclosure proofs over attestations.

## AFT-Consortium-Deployment

Mandatory:

- define participant governance and onboarding policy;
- publish member status or equivalent trust registry data;
- support private evidence channels and selective disclosure;
- define permissioned ledger or shared anchor verification rules;
- maintain conformance and audit records.

Optional:

- public-chain checkpointing;
- consortium dispute arbitration;
- enterprise PKI or SPIFFE integration.

## AFT-Public-Network

Mandatory:

- support open peer discovery;
- support public or semi-public event commitments;
- define Sybil-resistance and anti-gaming controls;
- support challenge and dispute mechanisms;
- support multiple independent reputation providers.

Optional:

- staking or bonding;
- rate limits;
- issuer reputation registries;
- public-chain anchoring.

## Claims

Implementers MUST state the exact conformance profiles, versions, algorithms, schemas, and extension registries they support. AFT conformance does not imply legal, financial, regulatory, or security certification.
