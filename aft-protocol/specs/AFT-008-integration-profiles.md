# AFT-008: Integration Profiles

Status: Draft 0.1  
Category: Informational with normative mapping guidance

## Purpose

AFT is designed to consume identity, authorization, payment, signing, workload, and blockchain artifacts from existing systems and emit signed financial trust events, reputation snapshots, risk evidence, and anchor commitments.

## DID And Verifiable Credentials

- AFT consumes: DIDs, DID documents, verification methods, Verifiable Credentials, credential schemas, issuer identifiers, revocation status, and selective-disclosure proofs.
- AFT emits: credential references, financial identity profiles, signed events, reputation attestations, and revocation root references.
- Mappings: credential issuance maps to `AGENT_CERTIFICATION_ISSUED`; credential revocation maps to `AGENT_CERTIFICATION_REVOKED`; identity status updates map to profile lifecycle events or reputation attestations.
- Trust assumptions: credential issuers and DID methods must be evaluated by relying parties.
- Privacy and security notes: disclose credential claims selectively and verify revocation state.

## W3C Agent Identity Registry Concepts

- AFT consumes: agent identity registry entries, controller metadata, service endpoints, and verification methods where available.
- AFT emits: financial profile hashes, risk status updates, and reputation or incident commitments.
- Mappings: registry identity references become `agent_id`, `controller_id`, and `verification_method` references.
- Trust assumptions: registry governance and update authority matter.
- Privacy and security notes: registry publication can increase linkability across contexts.

## AP2

- AFT consumes: intent mandates, cart mandates, payment mandates, hashes, signatures, merchant data, and payment outcomes.
- AFT emits: mandate references, payment events, invoice events, dispute events, and reputation updates.
- Mappings: AP2 payment completion maps to `AGENT_PAYMENT_SETTLED`; disputes map to chargeback, escrow, or dispute events as applicable.
- Trust assumptions: AP2 mandate verification and participating payment providers remain authoritative for their own flow.
- Privacy and security notes: AFT SHOULD store AP2 mandate hashes and selected fields, not full private carts by default.

## x402

- AFT consumes: paid HTTP resource metadata, payment requirements, settlement receipts, and failure responses.
- AFT emits: low-value payment events, mandate compliance signals, API reliability history, and risk decisions.
- Mappings: successful resource payment maps to `AGENT_PAYMENT_SETTLED`; failed payment maps to `AGENT_PAYMENT_FAILED`; blocked out-of-scope usage maps to `AGENT_UNAUTHORIZED_PAYMENT_ATTEMPT`.
- Trust assumptions: resource server and payment settlement verification must be checked independently.
- Privacy and security notes: avoid publishing URLs or query parameters that reveal private user intent.

## Visa Trusted Agent Protocol

- AFT consumes: agent trust assertions, payment authorization outcomes, merchant or processor references, and dispute or chargeback signals where available.
- AFT emits: neutral AFT event envelopes, reputation snapshots, and anchor commitments.
- Mappings: authorization and settlement outcomes map to payment events; chargebacks map to chargeback events.
- Trust assumptions: network and issuer rules remain outside AFT.
- Privacy and security notes: do not store cardholder data or network-private data in AFT records.

## Mastercard Agent Pay

- AFT consumes: agent payment authorization, tokenized payment references, settlement outcomes, and dispute indicators where available.
- AFT emits: payment, dispute, and reputation events.
- Mappings: payment authorization maps to `AGENT_PAYMENT_AUTHORIZED`; settlement maps to `AGENT_PAYMENT_SETTLED`.
- Trust assumptions: network, issuer, acquirer, and merchant rules remain authoritative for the payment rail.
- Privacy and security notes: AFT records MUST avoid card and account data.

## Stripe/OpenAI Agentic Commerce Protocol

- AFT consumes: merchant, cart, authorization, payment status, receipt, and dispute references where available.
- AFT emits: mandate-bound payment events, dispute events, refunds, and reputation updates.
- Mappings: successful checkout maps to `AGENT_PAYMENT_SETTLED`; refunds map to `AGENT_PAYMENT_REFUNDED`.
- Trust assumptions: payment processor records are authoritative for processor outcomes.
- Privacy and security notes: avoid exposing merchant-private cart contents or customer data.

## OAuth/OIDC

- AFT consumes: authorization server identifiers, client identifiers, scopes, token claims, confirmation claims, and policy decisions.
- AFT emits: authority references, policy compliance events, and risk decisions.
- Mappings: out-of-scope spend maps to `AGENT_UNAUTHORIZED_PAYMENT_ATTEMPT` or `AGENT_POLICY_VIOLATION_RECORDED`.
- Trust assumptions: tokens prove access authorization, not unlimited financial authority.
- Privacy and security notes: do not store bearer tokens in AFT events.

## SPIFFE/SPIRE

- AFT consumes: workload identities, trust domains, SVID references, and workload attestation signals.
- AFT emits: operator or runtime identity references, incident events, and signed financial events.
- Mappings: workload identity becomes `operator_id` or evidence in the agent profile.
- Trust assumptions: trust-domain governance and workload attestation configuration must be evaluated.
- Privacy and security notes: avoid exposing internal topology through public records.

## HTTP Message Signatures

- AFT consumes: signed HTTP requests and responses, covered components, key identifiers, and verification results.
- AFT emits: evidence references and event signatures where appropriate.
- Mappings: signed request evidence can support payment initiated, authorized, or settled events.
- Trust assumptions: covered fields and key status must be verified.
- Privacy and security notes: do not disclose sensitive headers or request bodies publicly.

## Web Bot Auth

- AFT consumes: bot or crawler authentication evidence, site policy signals, and paid content access records.
- AFT emits: paid content usage events, policy violation events, and reputation metrics.
- Mappings: unauthorized paid content access maps to `AGENT_POLICY_VIOLATION_RECORDED` or `AGENT_UNAUTHORIZED_PAYMENT_ATTEMPT`.
- Trust assumptions: publisher identity and access policy must be verified.
- Privacy and security notes: URLs and query parameters may reveal private research or user intent.

## Stablecoin Rails

- AFT consumes: wallet references, transaction hashes, settlement confirmations, chain identifiers, and stablecoin asset identifiers.
- AFT emits: payment events, escrow events, anchor commitments, bond state, and dispute commitments.
- Mappings: confirmed transfer maps to `AGENT_PAYMENT_SETTLED`; on-chain escrow release maps to `AGENT_ESCROW_RELEASED`.
- Trust assumptions: finality, token issuer, sanctions screening, custody, and bridge assumptions remain external.
- Privacy and security notes: public addresses can create persistent linkability.

## Traditional Card, ACH, And Bank Rails

- AFT consumes: tokenized account references, processor receipts, authorization statuses, settlement statuses, returns, chargebacks, refunds, and disputes.
- AFT emits: payment, invoice, chargeback, refund, dispute, credit, and reputation events.
- Mappings: ACH return maps to payment failed or reversed; card chargeback maps to chargeback events.
- Trust assumptions: bank, network, processor, and legal rules remain outside AFT.
- Privacy and security notes: AFT MUST NOT store card data, bank account data, or processor secrets.

## Smart Contract Escrow

- AFT consumes: contract address, chain ID, escrow ID, event logs, release conditions, arbitrator references, and transaction hashes.
- AFT emits: escrow funded, released, disputed, refunded, or arbitrated events.
- Mappings: contract logs become evidence for escrow event envelopes.
- Trust assumptions: contract code, oracle design, admin controls, and chain finality must be reviewed.
- Privacy and security notes: do not put private dispute evidence into contract calldata.

## LLM Proxy And Virtual Key Governance

- AFT consumes: virtual key identifiers, budget policies, model or tool access categories, spend caps, and policy decisions.
- AFT emits: low-value payment events, policy violation events, security incidents, and reputation signals.
- Mappings: blocked over-budget tool call maps to `AGENT_UNAUTHORIZED_PAYMENT_ATTEMPT`; paid API call maps to `AGENT_PAYMENT_SETTLED`.
- Trust assumptions: proxy logs and metering must be tamper-evident and privacy-preserving.
- Privacy and security notes: never publish raw prompts or responses in AFT records or anchors.
