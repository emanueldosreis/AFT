# AFT-001: Agent Financial Identity

Status: Draft 0.1  
Category: Normative

## Purpose

An AFT Agent Financial Identity Profile describes an agent as a financial actor. It binds the agent to principals, operators, controllers, credentials, risk status, payment references, wallet references, and cryptographic capabilities.

Agent identity is not the same as principal identity. Operator identity is not always principal identity. Wallet control is not unlimited authority. Legal liability MUST be explicitly bound by policy, contract, mandate, or applicable external legal process.

## Identifier Model

An AFT profile SHOULD include:

- `agent_id`: stable AFT identifier for the agent financial actor.
- `handle`: human-readable display handle. Handles MUST NOT be treated as secure identifiers.
- `did`: optional DID for the agent.
- `owner_id`: entity that owns or maintains the agent.
- `principal_id`: entity on whose behalf the agent may act.
- `operator_id`: entity or system operating the agent runtime.
- `controller_id`: entity or system with administrative control.

The same organization may appear in several roles, but implementations MUST preserve the distinctions.

## Financial References

The profile MAY contain references to:

- funding sources;
- payment instruments;
- wallets;
- merchant accounts;
- bank or processor accounts;
- credit facilities;
- escrow arrangements.

Financial references MUST be tokenized or indirect. AFT profiles MUST NOT include card numbers, bank account numbers, private keys, seed phrases, raw processor secrets, or full account records.

## Credential References

Profiles SHOULD reference credentials rather than embed complete private credentials. References may include:

- Verifiable Credential identifiers;
- issuer identifiers;
- credential schema identifiers;
- credential hash commitments;
- revocation status references;
- expiration timestamps;
- selective-disclosure availability.

## Risk And Lifecycle Status

`risk_status` SHOULD use one of:

- `UNKNOWN`;
- `NORMAL`;
- `WATCHLISTED`;
- `RESTRICTED`;
- `SUSPENDED`;
- `REVOKED`.

`lifecycle_status` SHOULD use one of:

- `PROPOSED`;
- `ACTIVE`;
- `PAUSED`;
- `DEPRECATED`;
- `RETIRED`;
- `REVOKED`.

Status changes SHOULD be signed and SHOULD be represented as AFT events.

## Public Keys And Cryptographic Capabilities

Profiles MUST describe all active verification methods used for AFT signatures. Each key record MUST include:

- `kid`;
- `alg`;
- `key_version`;
- `verification_method`;
- `public_key_ref` or public key material encoded by a recognized method;
- `created_at`;
- `status`;
- `pqc_profile`;
- optional `expires_at`;
- optional `revoked_at`.

Implementations SHOULD avoid embedding large keys in every event. Profiles MAY reference DID documents, JWKS documents, credential registries, or other key-discovery mechanisms.

## PQC Readiness

`pqc_readiness` MUST identify the strongest profile the agent can operationally support:

- `AFT-PQC-0` Legacy Classical Only;
- `AFT-PQC-1` Crypto-Agile Classical;
- `AFT-PQC-2` Hybrid Classical + PQC;
- `AFT-PQC-3` PQC Primary;
- `AFT-PQC-4` PQC Primary + Hash-Based Backup;
- `AFT-PQC-5` Fully PQC Operational with tested rotation, revocation, and recovery.

Profiles claiming `AFT-PQC-3` or higher SHOULD publish operational evidence for key rotation, revocation, verification, and recovery.

## Key Rotation Metadata

Profiles SHOULD include:

- current key version;
- previous key version references;
- rotation schedule;
- last rotation time;
- next scheduled rotation time where applicable;
- overlap window for signature verification;
- compromised key references where applicable.

## Revocation Metadata

Profiles SHOULD include:

- revocation status;
- revocation registry reference;
- latest revocation root;
- revocation reason code where disclosure is appropriate;
- revocation effective time.

Revocation metadata SHOULD be anchorable without revealing private cause details.

## Liability Binding

AFT records MAY reference contracts, policies, terms, procurement rules, mandates, or legal agreements. AFT does not determine legal liability by itself. Implementers MUST NOT infer unlimited principal liability merely because an agent holds a wallet key, has API credentials, or executed a payment.
