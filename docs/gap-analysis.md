# Protocol Gap Analysis

Status: Draft 0.1

This document maps what each existing identity, authorization, payment, and signing protocol provides, where each one stops, and what AFT adds. It is the clearest answer to the question: "why not just extend one of these?"

## The Core Gap

No existing protocol provides a **cross-rail, privacy-preserving, verifiable record** that simultaneously:

1. Identifies the agent and the authority under which it acted.
2. Binds the financial event to a specific mandate and proves compliance.
3. Produces a portable, signed trust record that any counterparty can verify.
4. Accumulates into contextual reputation across rails and over time.

Each existing system solves a subset. AFT is the layer between them.

## Protocol-by-Protocol Map

### DID and Verifiable Credentials

| | |
|---|---|
| **Provides** | Decentralized identifiers, issuer-holder-verifier model, tamper-evident credentials, revocation, selective disclosure |
| **Stops at** | Credentials answer "who is this entity and what has been attested about it." They do not record what financial events occurred, whether spending stayed within a mandate, whether payments were late or disputed, or what the reliability history is. |
| **AFT adds** | Consumes DID and VC as identity and credential inputs. Produces financial trust events, mandate-compliance records, and reputation snapshots that reference and extend those credentials. The financial event history is not a credential — it is an evidence record of what actually happened. |

### OAuth 2.0 and OIDC

| | |
|---|---|
| **Provides** | Delegated API access authorization, scope definitions, token-based proof of access, client identity |
| **Stops at** | OAuth scopes define what a client is permitted to access, not what it did or whether spending stayed within intended limits. A valid OAuth token is not evidence that the agent spent within a mandate. Out-of-scope API calls or over-budget expenditure leave no interoperable record. |
| **AFT adds** | References OAuth authorization server and scope as authority context. Records whether actual spend matched authorized scope. Emits `AGENT_UNAUTHORIZED_PAYMENT_ATTEMPT` or `AGENT_POLICY_VIOLATION_RECORDED` when scope is exceeded, creating a verifiable audit trail that OAuth alone cannot produce. |

### AP2 (Agentic Payment Protocol)

| | |
|---|---|
| **Provides** | Intent, cart, and payment mandate structures for agentic commerce. Defines what a purchase may include, for how much, and under what terms. |
| **Stops at** | AP2 defines the authorization structure before payment. It does not define what happens after: whether settlement succeeded, whether the agent paid late, whether a dispute was raised, or what the downstream reputation effect is. Cross-rail or multi-session history is outside scope. |
| **AFT adds** | Consumes AP2 mandate hashes and records them inside AFT event envelopes. Produces settlement, refund, dispute, and reputation events linked to each AP2 mandate. Builds the post-payment trust record that AP2 flows can be evaluated against over time. |

### x402 (HTTP-native paid API access)

| | |
|---|---|
| **Provides** | A lightweight HTTP protocol for per-request payment against paid resources. An agent pays for access; the server returns a receipt. |
| **Stops at** | x402 defines the payment mechanics for a single request. It does not accumulate reliability history, record failures, or provide any signal to a third party about whether the agent is trustworthy at a higher transaction value or different resource category. |
| **AFT adds** | Each x402 settlement, failure, or unauthorized attempt becomes an AFT event. Over time these accumulate into a mandate-compliance and reliability record that a marketplace, risk engine, or counterparty can evaluate — turning a per-request payment receipt into a long-term trust signal. |

### Visa Intelligent Commerce / Trusted Agent Protocol

| | |
|---|---|
| **Provides** | Agent payment authorization within the Visa network. Trusted agent status, spend controls, and authorization signals for Visa-settled transactions. |
| **Stops at** | Visa's framework is network-proprietary. An agent's Visa trust record does not transfer to Mastercard rails, stablecoin rails, x402 payments, AP2 procurement flows, or any other rail. Counterparties outside the Visa ecosystem have no access to the trust signal. |
| **AFT adds** | Maps Visa authorization and settlement outcomes to neutral AFT event envelopes. A risk engine consuming AFT events can combine Visa-settled transactions with x402, AP2, stablecoin, and other rail events into one cross-rail trust view — without requiring Visa to share proprietary network data. |

### Mastercard Agent Pay

| | |
|---|---|
| **Provides** | Agent payment authorization within the Mastercard network. Tokenized agent credentials, spend controls, and settlement signals. |
| **Stops at** | Same structural limitation as Visa: network-proprietary, not portable across rails. |
| **AFT adds** | Same as Visa mapping above. Mastercard settlement outcomes become AFT events. Combined with other rails they form a cross-rail history no single network can provide. |

### Stripe / OpenAI Agentic Commerce Protocol

| | |
|---|---|
| **Provides** | Agent-to-merchant commerce flows within Stripe's payment infrastructure and OpenAI's agent ecosystem. Cart, authorization, and receipt semantics for agentic checkout. |
| **Stops at** | Ecosystem-specific. An agent's reliability record inside Stripe/OpenAI is not visible to a counterparty operating on a different stack. Disputes and fraud signals are not portable. |
| **AFT adds** | Stripe/OpenAI checkout outcomes become AFT events. Enables a merchant outside the Stripe/OpenAI ecosystem to evaluate the same agent's history via AFT, without requiring Stripe to expose its private commerce data. |

### SPIFFE / SPIRE

| | |
|---|---|
| **Provides** | Workload identity via SVIDs and trust domains. Authenticates that a running process is a specific workload in a specific deployment context. |
| **Stops at** | SPIFFE answers "is this the right workload?" It does not answer "has this workload been financially reliable?" or "is it acting within its financial mandate?" |
| **AFT adds** | References SPIFFE workload identity as the `operator_id` in an AFT agent profile. Binds financial events to a verifiable runtime context, so that a key compromise or workload change can be detected and recorded as an AFT security incident event. |

### HTTP Message Signatures (RFC 9421)

| | |
|---|---|
| **Provides** | Authentication of HTTP requests and responses. Proves a specific request or response was produced by a party controlling a given key. |
| **Stops at** | Signing a request proves it was sent. It does not record what the financial outcome was, whether it was within a mandate, or what the long-term trust history of that agent is. |
| **AFT adds** | HTTP Message Signature proofs can be referenced as evidence inside AFT event envelopes. The signed request becomes part of the evidence hash chain, anchoring the event to a specific signed HTTP interaction. |

### Web Bot Auth

| | |
|---|---|
| **Provides** | Authentication for automated web access. Allows publishers to verify that a bot or crawler is who it claims to be and charge for access. |
| **Stops at** | Does not record payment reliability, dispute history, or whether the agent's access stayed within its authorized purpose. |
| **AFT adds** | Paid content access becomes an AFT `AGENT_PAYMENT_SETTLED` event. Unauthorized access attempts become `AGENT_POLICY_VIOLATION_RECORDED` events. Publisher attestations feed into the agent's mandate compliance record. |

## Where AFT Sits In The Stack

```text
                 IDENTITY LAYER
       DID / VC / OIDC / SPIFFE / SPIRE
                      |
                      v
             AUTHORIZATION LAYER
          OAuth scopes / AP2 mandates
                      |
                      v
              PAYMENT RAIL LAYER
  x402 / AP2 / Visa / Mastercard / Stripe-ACP /
    stablecoin / card / ACH / smart contract
                      |
                      v  <-- AFT SITS HERE
        FINANCIAL TRUST EVIDENCE LAYER (AFT)
   signed events / mandate compliance / reputation
   dispute history / incident history / PQC records
                      |
                      v
            RISK AND REPUTATION CONSUMERS
      risk engines / credit providers / auditors /
             counterparties / marketplaces
```

AFT is not a replacement for any layer above it. It is the record layer that sits between payment execution and trust evaluation.

## Why Not Extend One Existing Protocol?

Each extension path has a structural problem:

- **Extend DID/VC:** Credentials are issued claims, not event records. Financial event history is not a credential — it is an accumulating evidence log. VCs have no natural model for event streams, mandate compliance tracking, or contextual reputation scoring.

- **Extend OAuth:** OAuth is a delegation and authorization protocol. Extending it to record financial outcomes conflates authorization (what you may do) with trust evidence (what you did and whether it was reliable). The threat model and revocation semantics are incompatible.

- **Extend AP2 or x402:** Each is rail-specific. An AP2 extension would not capture x402 events; an x402 extension would not capture card or stablecoin events. Neither has a model for multi-rail history, reputation aggregation, or PQC-ready long-lived records.

- **Adopt Visa or Mastercard's framework:** Proprietary governance, network-specific rules, and non-portable trust signals. The financial trust layer for agents should not be owned by any one payment network.

The gap is real, structural, and not closeable by extending any single existing protocol. AFT fills it as a neutral, cross-rail, open-standard evidence layer.
