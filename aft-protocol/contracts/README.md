# AFT Example Contracts

These Solidity contracts are illustrative only. They are not audited, not optimized, and not production-ready. They show how an implementation could store AFT commitments on-chain without storing sensitive data.

Contracts in this directory intentionally store only:

- agent identifier hashes;
- profile hashes;
- credential hashes;
- revocation flags;
- event batch roots;
- metadata hashes;
- dispute status commitments;
- bond amounts and status;
- timestamps and submitter addresses.

They MUST NOT be used to store raw prompts, responses, PII, card data, bank data, private merchant data, customer data, private incident evidence, or full conversation logs.

## Contracts

- `AFTRegistry.sol`: agent profile hash and credential hash registry.
- `AFTAnchor.sol`: event batch root anchoring.
- `AFTBond.sol`: simple bond staking, slashing, and release example.
- `AFTDisputeRegistry.sol`: dispute status commitment registry.

Production deployments require independent security review, access-control design, governance, upgrade policy, chain finality analysis, and privacy review.
