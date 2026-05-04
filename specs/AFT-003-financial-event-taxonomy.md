# AFT-003: Financial Event Taxonomy

Status: Draft 0.1  
Category: Normative registry

## Purpose

This document defines the Draft 0.1 event taxonomy. Implementations MUST preserve event type names exactly. Extensions SHOULD use a registered namespace until accepted into the core taxonomy.

Common required envelope fields are defined in AFT-002. The `required fields` column below lists event-specific required fields inside `transaction`, `authority`, `evidence`, or event extensions.

## Payment Events

| Event type | Purpose | Required fields | Optional fields | Allowed issuers/reporters | Evidence requirements | Privacy notes | Reputation impact hints | Default |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `AGENT_PAYMENT_INITIATED` | Records that an agent started a payment attempt. | amount, asset, counterparty_id, mandate_id | payment_protocol, quote_id | agent, principal, payment processor | authorization request hash | Do not expose payment instrument details. | Neutral until outcome. | PRIVATE |
| `AGENT_PAYMENT_AUTHORIZED` | Records authorization by an issuer, wallet, principal, or processor. | authorization_id, amount, mandate_id | approval_method, expires_at | principal, wallet, processor, policy engine | authorization receipt hash | Public form SHOULD be hash-only. | Positive for mandate compliance. | HASH_ONLY |
| `AGENT_PAYMENT_SETTLED` | Records final or practically final settlement. | settlement_id, amount, asset, settled_at | payment_protocol, rail | processor, wallet, counterparty, agent | settlement receipt hash | Hide card, bank, and customer data. | Improves settlement reliability. | PRIVATE |
| `AGENT_PAYMENT_FAILED` | Records failed payment. | failure_code, amount | retryable, processor_code | processor, wallet, agent | failure receipt hash | Avoid exposing sensitive decline details. | May reduce reliability depending on cause. | PRIVATE |
| `AGENT_PAYMENT_REVERSED` | Records reversal after prior settlement or authorization. | original_event_id, reversal_reason | reversal_amount | processor, wallet, counterparty | reversal receipt hash | Use redacted reason codes publicly. | May reduce reliability. | PRIVATE |
| `AGENT_PAYMENT_REFUNDED` | Records refund to counterparty or principal. | original_event_id, refund_amount | refund_reason | processor, wallet, merchant, agent | refund receipt hash | Do not expose private customer details. | May improve dispute outcomes. | PRIVATE |
| `AGENT_PAYMENT_CHARGEBACK_OPENED` | Records chargeback initiation. | original_event_id, dispute_id, reason_code | network_reference | issuer, processor, principal, counterparty | chargeback notice hash | Restricted by default. | Increases dispute rate until resolved. | RESTRICTED |
| `AGENT_PAYMENT_CHARGEBACK_RESOLVED` | Records chargeback result. | dispute_id, result | loss_amount, reason_code | issuer, processor, arbitrator | resolution notice hash | Publish only aggregate or hash commitments. | Impacts dispute loss rate. | RESTRICTED |

## Invoice And Obligation Events

| Event type | Purpose | Required fields | Optional fields | Allowed issuers/reporters | Evidence requirements | Privacy notes | Reputation impact hints | Default |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `AGENT_INVOICE_ISSUED` | Records invoice issuance to or by an agent. | invoice_id, amount, due_at | line_item_hash, tax_hash | merchant, counterparty, agent | invoice hash | Never publish private line items by default. | Neutral until accepted or paid. | PRIVATE |
| `AGENT_INVOICE_ACCEPTED` | Records acceptance of invoice obligation. | invoice_id, accepted_at, mandate_id | acceptance_terms_hash | agent, principal | acceptance receipt hash | Hash terms unless public. | Positive for obligation clarity. | PRIVATE |
| `AGENT_INVOICE_PAID` | Records payment of invoice. | invoice_id, settlement_id | paid_amount | processor, counterparty, agent | payment receipt hash | Hide payment instruments. | Improves repayment reliability. | PRIVATE |
| `AGENT_INVOICE_LATE` | Records late invoice status. | invoice_id, days_late | grace_period | issuer, counterparty, credit service | invoice status evidence | Public only as aggregate if possible. | Increases late payment rate. | RESTRICTED |
| `AGENT_INVOICE_DEFAULTED` | Records invoice default. | invoice_id, default_date | recovery_status | issuer, counterparty, credit service | default notice hash | Restricted; disclose only to authorized parties. | Increases default count. | RESTRICTED |
| `AGENT_OBLIGATION_CREATED` | Records non-invoice obligation. | obligation_id, amount_or_value, due_at | service_level_hash | agent, principal, counterparty | obligation contract hash | Avoid exposing private terms. | Neutral until fulfilled or breached. | PRIVATE |
| `AGENT_OBLIGATION_FULFILLED` | Records obligation fulfillment. | obligation_id, fulfilled_at | acceptance_hash | counterparty, principal, agent | completion evidence hash | Public aggregate MAY be used. | Improves reliability. | PRIVATE |
| `AGENT_OBLIGATION_BREACHED` | Records breach of obligation. | obligation_id, breach_code | cure_period | counterparty, principal, arbitrator | breach notice hash | Restricted until adjudicated where appropriate. | Negative, dispute-adjusted. | RESTRICTED |

## Escrow Events

| Event type | Purpose | Required fields | Optional fields | Allowed issuers/reporters | Evidence requirements | Privacy notes | Reputation impact hints | Default |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `AGENT_ESCROW_FUNDED` | Records escrow funding. | escrow_id, amount, asset | escrow_contract_ref | escrow service, wallet, agent | funding receipt hash | On-chain escrow MAY reveal amount; avoid private metadata. | Positive for risk reduction. | HASH_ONLY |
| `AGENT_ESCROW_RELEASED` | Records escrow release. | escrow_id, release_amount | release_condition_hash | escrow service, arbitrator | release receipt hash | Hide beneficiary details unless public. | Improves reliability. | PRIVATE |
| `AGENT_ESCROW_DISPUTED` | Records escrow dispute. | escrow_id, dispute_id | claim_hash | counterparty, agent, escrow service | dispute notice hash | Restricted by default. | Increases dispute rate. | RESTRICTED |
| `AGENT_ESCROW_REFUNDED` | Records escrow refund. | escrow_id, refund_amount | refund_reason | escrow service, arbitrator | refund receipt hash | Private by default. | Context-dependent. | PRIVATE |
| `AGENT_ESCROW_ARBITRATED` | Records arbitration outcome. | escrow_id, dispute_id, outcome | award_amount | arbitrator, escrow service | arbitration decision hash | Disclose minimal result. | Impacts dispute loss rate. | RESTRICTED |

## Credit Events

| Event type | Purpose | Required fields | Optional fields | Allowed issuers/reporters | Evidence requirements | Privacy notes | Reputation impact hints | Default |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `AGENT_CREDIT_LINE_ISSUED` | Records credit facility issuance. | credit_line_id, limit_amount, asset | lender_id, terms_hash | lender, principal | credit agreement hash | Restricted; expose only selective proof. | Enables credit utilization metrics. | RESTRICTED |
| `AGENT_CREDIT_LIMIT_UPDATED` | Records credit limit change. | credit_line_id, new_limit | previous_limit, reason_code | lender, credit service | update receipt hash | Restricted by default. | Context-dependent. | RESTRICTED |
| `AGENT_CREDIT_UTILIZED` | Records draw or utilization. | credit_line_id, utilized_amount | utilization_rate | lender, agent, processor | draw receipt hash | Avoid exposing lender-sensitive terms. | Affects utilization. | RESTRICTED |
| `AGENT_CREDIT_REPAID` | Records repayment. | credit_line_id, repayment_amount, paid_at | remaining_balance | lender, processor | repayment receipt hash | Private or aggregate. | Improves repayment reliability. | PRIVATE |
| `AGENT_CREDIT_LATE` | Records late repayment. | credit_line_id, days_late | cure_status | lender, credit service | delinquency notice hash | Restricted. | Negative until cured. | RESTRICTED |
| `AGENT_CREDIT_DEFAULTED` | Records default on credit. | credit_line_id, default_date | loss_amount | lender, credit service | default notice hash | Restricted with strict access. | Strong negative impact. | RESTRICTED |
| `AGENT_CREDIT_SUSPENDED` | Records suspension of credit facility. | credit_line_id, reason_code | reinstatement_conditions_hash | lender | suspension notice hash | Restricted. | Negative or neutral depending on cause. | RESTRICTED |

## Security And Scam Events

| Event type | Purpose | Required fields | Optional fields | Allowed issuers/reporters | Evidence requirements | Privacy notes | Reputation impact hints | Default |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `AGENT_SECURITY_INCIDENT_REPORTED` | Records suspected or confirmed security incident. | incident_id, severity, detected_at | affected_system_hash | agent, principal, operator, security provider | incident report hash | Protect exploit details and victim data. | Negative until resolved. | RESTRICTED |
| `AGENT_KEY_COMPROMISE_REPORTED` | Records suspected or confirmed key compromise. | incident_id, affected_kids, affected_window | replacement_kid | controller, principal, security provider | compromise evidence hash | Public status MAY be hash-only. | Trust downgrade required. | HASH_ONLY |
| `AGENT_PROMPT_INJECTION_PAYMENT_ATTEMPT` | Records attempted payment induced by prompt injection. | incident_id, attempted_amount, blocked | source_context_hash | agent, operator, security provider | sanitized trace hash | Never store raw prompt or response on-chain. | Negative if not blocked; positive control signal if blocked. | RESTRICTED |
| `AGENT_UNAUTHORIZED_PAYMENT_ATTEMPT` | Records spending outside authority. | incident_id, attempted_amount, mandate_id | blocked, policy_id | policy engine, principal, processor | authorization failure hash | Restricted. | Negative mandate compliance impact. | RESTRICTED |
| `AGENT_IMPERSONATION_CLAIMED` | Records impersonation claim. | claim_id, claimed_agent_id | claimant_id | agent, principal, counterparty | claim evidence hash | Avoid publishing unverified accusations broadly. | Pending until resolved. | RESTRICTED |
| `AGENT_IMPERSONATION_CONFIRMED` | Records confirmed impersonation. | claim_id, confirmed_subject_id | remediation_hash | arbitrator, registry, security provider | adjudication hash | Hash-only public notice recommended. | Negative for impersonator; protective for victim. | HASH_ONLY |
| `AGENT_FRAUD_REPORT_FILED` | Records fraud allegation. | report_id, reason_code | loss_amount | principal, counterparty, processor, investigator | report hash | Restricted until validated. | Pending impact. | RESTRICTED |
| `AGENT_FRAUD_REPORT_VALIDATED` | Records validated fraud report. | report_id, validation_result | loss_amount | investigator, arbitrator, processor | validation evidence hash | Minimal public commitments only. | Strong negative impact. | RESTRICTED |
| `AGENT_FRAUD_REPORT_REJECTED` | Records rejected fraud report. | report_id, rejection_reason | false_report_indicator | investigator, arbitrator | rejection evidence hash | Protect reporter privacy where appropriate. | Reduces or removes pending impact. | RESTRICTED |
| `AGENT_POLICY_VIOLATION_RECORDED` | Records violation of policy or mandate. | policy_id, violation_code | severity, remediation_hash | policy engine, principal, auditor | policy decision hash | Do not expose private policy content. | Negative depending on severity. | RESTRICTED |

## Reputation And Attestation Events

| Event type | Purpose | Required fields | Optional fields | Allowed issuers/reporters | Evidence requirements | Privacy notes | Reputation impact hints | Default |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `AGENT_REPUTATION_ATTESTED` | Records reputation attestation. | reputation_snapshot_id, metrics_hash | trust_tier | reputation service, principal, counterparty | snapshot hash | Prefer selective disclosure. | Updates contextual score. | HASH_ONLY |
| `AGENT_REPUTATION_ROOT_UPDATED` | Records root update for reputation set. | reputation_root, period_start, period_end | previous_root | reputation service | Merkle root and signed manifest | Root only on-chain. | Enables verification. | PUBLIC |
| `AGENT_TRUST_TIER_UPDATED` | Records trust tier change. | trust_tier, reason_code | prior_trust_tier | reputation service, principal | tier decision hash | Public tier MAY omit metrics. | Changes risk treatment. | PRIVATE |
| `AGENT_BOND_STAKED` | Records bond or stake deposit. | bond_id, amount, asset | chain_ref | agent, principal, bond contract | stake transaction hash | On-chain amount may be public. | Positive risk collateral signal. | PUBLIC |
| `AGENT_BOND_SLASHED` | Records bond slashing. | bond_id, slash_amount, reason_code | dispute_id | bond contract, arbitrator | slashing decision hash | Public amount may reveal risk signal. | Negative impact. | PUBLIC |
| `AGENT_CERTIFICATION_ISSUED` | Records certification issuance. | certification_id, issuer_id | scope, expires_at | certification authority | credential hash | Public proof can be hash-only. | Positive within scope. | HASH_ONLY |
| `AGENT_CERTIFICATION_REVOKED` | Records certification revocation. | certification_id, revocation_reason | effective_at | certification authority | revocation receipt hash | Reason may be restricted. | Negative within scope. | HASH_ONLY |

## Extension Rules

New event types MUST NOT reuse existing names with changed semantics. Extensions SHOULD use a namespace such as `ORG_EXAMPLE_EVENT_TYPE` until standardized. Privacy, evidence, and reputation impact guidance MUST be provided for every extension.
