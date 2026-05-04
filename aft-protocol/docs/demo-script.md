# Demo Script

Status: Draft 0.1

## Federated Multi-Peer AFT Demo

This demo shows AFT as a decentralized and federated trust protocol. It does not require a central AFT database, a single blockchain, or one official reputation score.

## Actors

- Payment processor peer: `did:web:payments.example`
- Agent marketplace peer: `did:web:marketplace.example`
- Reputation provider peer: `did:web:reputation.example`
- Agent operator peer: `did:web:operator.example`
- Merchant peer: `did:web:merchant.example`
- Agent: `aft:agent:procurement-agent-009`

## Flow

1. Payment processor peer publishes `/.well-known/aft-agent-trust`.
2. Agent marketplace peer publishes `/.well-known/aft-agent-trust`.
3. Reputation provider peer publishes `/.well-known/aft-agent-trust`.
4. Agent performs a simulated x402 or AP2 transaction under a scoped mandate.
5. Payment processor emits `AGENT_PAYMENT_SETTLED`.
6. Merchant emits a service delivery attestation.
7. Agent operator emits a mandate compliance attestation.
8. Each peer anchors its own Merkle batch to its selected chain or ledger.
9. Reputation provider consumes attestations and emits `AGENT_REPUTATION_ROOT_UPDATED`.
10. Another merchant queries the risk API and verifies signatures, peer status, evidence hashes, and anchor proofs before deciding whether to transact.

## Commands

Validate peer discovery examples:

```sh
npm run validate:peers
```

Run the multi-attestation aggregation demo:

```sh
npm run demo:multi-attestation
```

## Expected Output

The demo should show:

- three signed peer discovery documents;
- one transaction with multiple independent attestations;
- distinct issuer peer IDs;
- distinct event hashes;
- distinct Merkle batch roots;
- one reputation update that references the attestation hashes;
- no raw PII, prompts, responses, card data, bank data, customer names, private merchant data, or full logs.

## Verification Discussion

The risk-verifying merchant should ask:

- Are all peer discovery documents signed and current?
- Are peer statuses active?
- Are event types within each peer's declared capability?
- Are signatures verifiable with current keys?
- Are event hashes anchored?
- Is any attestation challenged, superseded, revoked, or disputed?
- Does the reputation provider disclose methodology and evidence roots?
- Does local policy accept these issuers and ledgers for this transaction size?
