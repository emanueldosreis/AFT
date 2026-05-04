# FAQ

## Is AFT A Blockchain?

No. AFT is a protocol layer for financial trust records. It can use blockchains for commitments, roots, revocation state, reputation roots, dispute commitments, and bond state.

## Is AFT A Payment Protocol?

No. AFT does not move money. It records financial trust evidence around payments, obligations, credit, disputes, incidents, and reputation.

## Does AFT Replace AP2 Or x402?

No. AP2 and x402 solve specific authorization and payment flows. AFT records authority references, financial events, outcomes, disputes, and reputation signals around those flows.

## Does AFT Store Private Data On-Chain?

No. AFT MUST NOT store raw prompts, responses, PII, card data, bank data, private merchant data, customer records, private incident evidence, or full conversation logs on-chain.

## Can Agents Have Credit?

Yes, if a lender or principal chooses to extend credit under an external legal and commercial arrangement. AFT can record credit events and repayment history, but it does not create credit by itself.

## Who Is Liable For An Agent?

AFT does not determine liability. Liability must come from external contracts, policies, mandates, laws, or payment-network rules. AFT helps record the evidence needed to evaluate authority and responsibility.

## Why Not Use A Single Score?

Agent trust is contextual. Reliability for low-value API purchases does not imply reliability for high-value procurement, regulated transactions, or credit. AFT supports multiple metrics and scoped trust tiers.

## Why Quantum-Resistant Crypto?

Financial trust records may need to remain verifiable for years. AFT therefore requires crypto-agility and defines migration paths toward ML-DSA, SLH-DSA, and ML-KEM-based profiles.

## What Is The MVP?

The MVP is a validator and event service supporting agent profiles, mandate references, signed event envelopes, x402/AP2 mappings, Merkle anchoring, a basic reputation snapshot, and hybrid or ML-DSA signing.

## Who Should Adopt AFT?

Potential adopters include agent platforms, AI application developers, payment processors, API marketplaces, procurement systems, stablecoin services, wallets, risk engines, reputation providers, security teams, and institutions experimenting with delegated agent finance.

## Is AFT Centralized?

No. AFT is designed as a decentralized and federated protocol. It standardizes schemas, discovery, signatures, events, credentials, anchors, and conformance so independent peers can interoperate.

## Who Runs The AFT Network?

No single party is required to run it. Public deployments may have many independent peers. Consortium deployments may have known members and shared governance.

## Does AFT Require One Blockchain?

No. AFT is blockchain-neutral. Peers may use public chains, L2s, permissioned ledgers, consortium ledgers, or no public chain where another tamper-evident mechanism is used.

## Can Different Organizations Issue Events?

Yes. Payment processors, wallets, merchants, marketplaces, operators, auditors, arbiters, reputation providers, and other peers may issue events within their role and evidence scope.

## Can There Be Multiple Reputation Providers?

Yes. AFT expects multiple independent reputation providers. They may compute different views for different transaction sizes, domains, rails, policies, and risk appetites.

## How Does AFT Prevent Fake Reports?

AFT does not rely on first reports being correct. It supports signed evidence, issuer reputation, challenge, supersession, correction, revocation, dispute outcomes, and privacy-preserving evidence review.

## How Does AFT Support Enterprise Or Private Networks?

Enterprises and consortia can use permissioned peers, private evidence channels, permissioned DLTs, selective disclosure, audited participants, and contractual governance while preserving AFT schemas and verification rules.

## Can AFT Be Used Without Public Blockchain?

Yes. AFT can use permissioned ledgers, consortium ledgers, private append-only logs, or other verifiable commitments. Public blockchain anchoring is optional.

## What Prevents Sybil Agent Farms?

Open deployments need layered controls: verified credentials, issuer reputation, bonding, staking, rate limits, anomaly detection, graph analysis, challenge windows, and dispute outcomes. No single control is sufficient.

## Who Decides Whether An Agent Is Trustworthy?

Relying parties decide using their own policy and risk context. Reputation providers can help, but AFT does not define one official score or one mandatory trust authority.
