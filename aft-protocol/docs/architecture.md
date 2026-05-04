# Architecture

Status: Draft 0.1

## Agent Identity Flow

```text
Principal / Owner
      |
      | creates or delegates
      v
Agent Financial Identity Profile
      |
      +--> DID / VC references
      +--> operator and controller references
      +--> funding, wallet, and payment references
      +--> public keys and PQC readiness
      |
      v
Signed profile hash / registry pointer
```

The profile separates the agent from the principal, operator, controller, and owner. It references credentials and payment instruments without embedding private financial data.

## Payment Flow

```text
Agent requests paid resource or purchase
      |
      v
Mandate and policy check
      |
      +--> reject / challenge / require human confirmation
      |
      v
Payment protocol or financial rail
      |
      v
AFT payment event
      |
      +--> evidence hash
      +--> settlement or failure status
      +--> reputation update
```

AFT records the trust evidence around the payment. The payment rail remains responsible for authorization and settlement.

## Event Generation Flow

```text
Observed financial occurrence
      |
      v
Build AFT event envelope
      |
      +--> transaction summary
      +--> authority reference
      +--> evidence commitments
      +--> privacy classification
      +--> crypto metadata
      |
      v
Canonicalize JSON
      |
      v
Hash and sign
      |
      v
Store private body off-chain / disclose selected view
```

Corrections are new signed events that reference prior events.

## Blockchain Anchoring Flow

```text
Signed events
      |
      v
Canonical event hashes
      |
      v
Merkle tree
      |
      v
Batch root + previous root + metadata hash
      |
      v
On-chain anchor transaction
      |
      v
Verifier checks inclusion and signatures
```

Only commitments, roots, and minimal metadata are anchored. Private event bodies and evidence remain off-chain.

## Reputation Update Flow

```text
Verified event history
      |
      +--> settlements
      +--> late payments
      +--> disputes
      +--> fraud reports
      +--> incidents
      +--> credit events
      |
      v
Contextual scoring model
      |
      v
Reputation snapshot
      |
      +--> selective disclosure
      +--> reputation root anchor
```

Reputation is scoped by context and confidence. AFT does not require a universal score.

## Risk Evaluation Flow

```text
Counterparty / processor / policy engine
      |
      v
Risk evaluation request
      |
      +--> agent id
      +--> action and amount
      +--> mandate reference
      +--> evidence references
      |
      v
Risk engine
      |
      +--> identity checks
      +--> mandate checks
      +--> reputation checks
      +--> incident and dispute checks
      |
      v
Decision: approve, limit, challenge, escalate, reject
```

Risk decisions SHOULD be signed when they materially affect financial outcomes.

## PQC Signing And Verification Flow

```text
Canonical event payload
      |
      v
Hash with declared algorithm
      |
      +--> ML-DSA signature
      +--> optional SLH-DSA backup
      +--> optional hybrid classical signature
      |
      v
Event signature metadata
      |
      v
Verifier resolves key and checks:
      |
      +--> alg
      +--> kid
      +--> key_version
      +--> pqc_profile
      +--> signature time
      +--> revocation status
```

AFT verification never relies on implicit algorithms or unversioned keys.

## Federated Architecture

```text
             +------------------+         +------------------+
             | Payment Peer     |         | Marketplace Peer |
             | DID + discovery  |         | DID + discovery  |
             +---------+--------+         +---------+--------+
                       | signed events              |
                       v                            v
              +----------------+           +----------------+
              | Off-chain      |           | Off-chain      |
              | event store    |           | event store    |
              +-------+--------+           +--------+-------+
                      | Merkle roots                 |
                      +--------------+----------------+
                                     v
                        +-------------------------+
                        | Public chain, L2,       |
                        | permissioned DLT, or    |
                        | consortium ledger       |
                        +------------+------------+
                                     |
                  signed proofs      | evidence hashes
                                     v
          +----------------+   +----------------+   +----------------+
          | Auditor /      |   | Dispute Arbiter|   | Reputation     |
          | Credential     |   | Incident Peer  |   | Provider       |
          | Issuer         |   +----------------+   +----------------+
          +----------------+
```

AFT peers own their own records and publish signed commitments. Blockchain anchoring provides tamper evidence and ordering context, but it does not determine whether an event is truthful. Trust is computed from signatures, credentials, issuer credibility, evidence quality, dispute outcomes, revocation state, and policy context.

## Peer Onboarding Flow

1. Peer creates a DID or equivalent verifiable identity.
2. Peer publishes `.well-known/aft-agent-trust`.
3. Peer declares capabilities, supported events, credential types, crypto profiles, anchoring modes, privacy defaults, and conformance levels.
4. Peer obtains or issues credentials relevant to its role.
5. Peer emits signed AFT events.
6. Peer anchors event batches, revocation roots, reputation roots, or dispute-state commitments.
7. Other peers verify identity, credentials, signatures, event proofs, anchors, revocation status, and policy context.

## Multi-Attestation Flow

```text
One transaction
      |
      +--> payment processor attests settlement
      +--> merchant attests service delivery
      +--> agent operator attests mandate compliance
      +--> marketplace or arbiter may attest dispute state
      |
      v
Independent reputation provider evaluates all attestations,
issuer credibility, evidence hashes, revocation, and disputes.
```

AFT SHOULD preserve conflicting attestations rather than overwriting them. Challenge, correction, supersession, and dispute outcome events provide the resolution path.

## Public vs Permissioned Deployment

| Dimension | Public/Open | Consortium/Permissioned |
| --- | --- | --- |
| Participants | Open or broadly accessible peers | Known participants |
| Identity | Public DIDs or equivalent identities | DIDs, enterprise PKI, SPIFFE, or member identities |
| Anchoring | Public chains, L2s, or open ledgers | Permissioned DLTs, private channels, or public checkpoints |
| Evidence | Hash-only or selectively disclosed | Private evidence channels and audited access |
| Sybil risk | Higher; needs staking, issuer reputation, rate limits, challenges | Lower but still exposed to collusion and insider risk |
| Governance | Open registries and public conformance | Consortium rules, contracts, and audited membership |

## Decentralized Reputation Provider Model

AFT does not define one official score. Multiple reputation providers MAY compute different views for different contexts, such as paid APIs, procurement, credit, stablecoin settlement, or agent-to-agent work. Providers SHOULD disclose methodology, evidence roots, issuer weighting, dispute adjustment, confidence, and privacy classification.
