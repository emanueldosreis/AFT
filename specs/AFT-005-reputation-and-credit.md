# AFT-005: Reputation And Credit

Status: Draft 0.1  
Category: Normative

## Purpose

AFT defines multidimensional reputation and credit signals for agent financial behavior. AFT does not require one universal score. Implementers SHOULD publish context, methodology, data freshness, dispute adjustments, and confidence.

## Core Metrics

Reputation snapshots MAY include:

- settlement reliability;
- late payment rate;
- default count;
- dispute rate;
- dispute loss rate;
- fraud validated count;
- security incident count;
- policy violation rate;
- mandate compliance score;
- max verified transaction amount;
- credit utilization;
- repayment reliability;
- domain trust;
- principal trust;
- operator trust;
- counterparty feedback;
- trust tiers.

Metrics MUST identify their time window, event set, issuer, calculation method, and confidence.

## Trust Tiers

Draft 0.1 defines:

- `AFT-T0` Unknown: no reliable financial trust history.
- `AFT-T1` Identified: agent profile and controller information are available.
- `AFT-T2` Mandated: authority and mandate evidence are available.
- `AFT-T3` Observed: sufficient signed event history exists for a limited context.
- `AFT-T4` Reliable: sustained settlement and obligation reliability in a defined context.
- `AFT-T5` Creditworthy: credit repayment and utilization history support limited credit decisions.
- `AFT-T6` Institutionally Trusted: institutionally governed, audited, insured, or contractually controlled status in a defined context.

Trust tiers MUST be scoped. AFT-T5 for low-value API usage does not imply AFT-T5 for high-value procurement.

## Score Transparency

Reputation issuers SHOULD disclose:

- metric definitions;
- included event categories;
- exclusion criteria;
- weighting approach;
- time decay;
- confidence level;
- dispute adjustment method;
- issuer identity;
- verification method;
- whether the snapshot is public, private, restricted, or hash-only.

## Anti-Gaming Requirements

Implementations SHOULD mitigate:

- self-dealing transactions;
- wash payments;
- circular payment graphs;
- fake merchants or resources;
- repeated low-value transactions used to inflate scores;
- collusive positive feedback;
- repeated identity resets;
- unverifiable off-chain claims.

Countermeasures MAY include counterparty weighting, verified settlement sources, stake or bond requirements, issuer reputation, anomaly detection, graph analysis, credential checks, and dispute-adjusted metrics.

## Sybil Resistance

AFT does not mandate one Sybil-resistance method. Implementations MAY use verified credentials, principal identity, organizational domains, wallet history, payment processor attestations, rate limits, bonds, attestations, and risk scoring. The selected method SHOULD be disclosed.

## False-Reporting Mitigation

Fraud, scam, dispute, and incident reports SHOULD support challenge and resolution. Pending reports SHOULD be distinguished from validated reports. False or rejected reports SHOULD be represented by signed resolution events.

## Dispute-Adjusted Scoring

Scores SHOULD treat open, won, lost, withdrawn, and rejected disputes differently. AFT implementations SHOULD avoid permanently penalizing agents for unresolved or disproven allegations.

## Privacy-Preserving Snapshots

Reputation snapshots SHOULD support selective disclosure and hash commitments. Public snapshots SHOULD avoid exposing raw transaction lists, PII, private merchant names, private customer data, raw prompts, responses, or full logs.

## Reputation Root Anchoring

Reputation services MAY batch snapshot commitments into a reputation root. The root MAY be anchored on-chain. The root MUST NOT reveal private snapshot contents.
