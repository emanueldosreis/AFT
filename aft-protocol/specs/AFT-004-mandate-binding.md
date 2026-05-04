# AFT-004: Mandate Binding

Status: Draft 0.1  
Category: Normative

## Purpose

AFT binds financial events to delegated authority. A payment, invoice acceptance, credit draw, escrow release, or procurement action SHOULD be traceable to a mandate or policy decision that defined who authorized the action and under what constraints.

## Mandate Reference Fields

AFT mandate references SHOULD include:

- `mandate_id`;
- `mandate_type`;
- `mandate_hash`;
- `principal_id`;
- `agent_id`;
- `scope`;
- amount limits;
- merchant or counterparty constraints;
- purpose codes;
- expiration;
- nonce or replay-protection data;
- revocation reference;
- external mandate references where applicable.

Mandate references SHOULD be indirect and hash-based when mandates contain private terms.

## Mandate Types

Draft 0.1 defines:

- `LOW_VALUE_API_PURCHASE`;
- `AP2_INTENT_MANDATE`;
- `AP2_CART_MANDATE`;
- `AP2_PAYMENT_MANDATE`;
- `HUMAN_CONFIRMED_PAYMENT`;
- `AUTONOMOUS_BUDGET`;
- `RECURRING_SERVICE_PAYMENT`;
- `PROCUREMENT_AUTHORITY`;
- `ESCROW_RELEASE_AUTHORITY`;
- `CREDIT_UTILIZATION_AUTHORITY`;
- `CUSTOM`.

## Scope

Mandate scope SHOULD describe:

- permitted resources or service categories;
- permitted payment rails or protocols;
- maximum amount per transaction;
- maximum aggregate amount per period;
- permitted counterparties or merchant categories;
- geographic or jurisdictional constraints where relevant;
- required human approval thresholds;
- permitted purpose codes.

## Replay Protection

Mandates MUST include replay protection for financial actions. Acceptable controls include nonce values, sequence numbers, one-time mandate identifiers, expiration times, and binding to specific counterparty and amount fields.

An event verifier SHOULD reject a mandate reference if:

- the mandate expired before the event;
- the nonce was previously used;
- the mandate hash does not match the disclosed mandate;
- the event exceeds scope or amount limits;
- revocation was effective before the event.

## Revocation

Mandate revocation SHOULD be represented by:

- signed revocation event;
- revocation timestamp;
- revocation authority;
- affected mandate identifiers or hash prefixes;
- revocation root update where batch publication is used.

Revocation status SHOULD be checked before accepting a financially material event.

## Relationship With AP2

AP2 intent, cart, and payment mandates MAY be referenced by AFT mandate records. AFT does not replace AP2 mandate semantics. AFT records that a financial event claims to have occurred under an AP2 mandate, binds the event to the mandate hash, and records downstream outcomes such as settlement, dispute, refund, or reputation impact.

## Relationship With OAuth/OIDC

OAuth/OIDC scopes MAY authorize API access or delegated capability. AFT MAY reference token claims, authorization server identifiers, scope strings, and policy decisions. OAuth/OIDC authorization alone MUST NOT be treated as proof of unlimited spending authority.

## Relationship With Verifiable Credentials

Verifiable Credentials MAY attest that a principal, operator, agent, merchant, lender, or arbitrator has a status or capability. AFT mandate references MAY include credential references and credential hashes. Revocation status MUST be considered when the credential is material to authority.

## Relationship With Policy Engines

Policy engines MAY produce signed decisions authorizing or denying agent actions. AFT MAY reference policy identifiers, decision hashes, ruleset versions, and evaluation time. Policy content SHOULD be disclosed selectively.

## Examples

### Low-Value x402 API Purchase

An agent is authorized to spend up to USD 5 per request and USD 100 per day for search APIs under `LOW_VALUE_API_PURCHASE`. The x402 payment response is recorded as evidence. AFT records settlement reliability and mandate compliance without changing x402.

### AP2 Procurement Flow

An enterprise principal issues AP2 intent and cart mandates for office software procurement. AFT records the mandate hashes, the payment event, invoice acceptance, settlement, and any dispute. Reputation metrics can later distinguish successful procurement from late or disputed obligations.

### Human-Confirmed Payment

An agent prepares a payment above its autonomous threshold. A human principal approves a one-time mandate with a nonce, amount, merchant, and expiration. AFT records the authorization and settlement as linked events.

### Autonomous Budgeted Payment

An operator grants an agent a monthly autonomous budget for paid API usage. AFT records each purchase against aggregate limits and can produce a private reputation snapshot showing no over-budget events.
