# AFT-006: Blockchain Anchoring

Status: Draft 0.1  
Category: Normative

## Purpose

AFT blockchain anchoring provides public or shared verification of event existence, ordering, revocation state, reputation roots, dispute-state commitments, and bond or stake state. AFT is chain-neutral.

## Anchorable Artifacts

AFT MAY anchor:

- event hashes;
- Merkle batch roots;
- `previous_batch_root` chaining values;
- on-chain registry pointers;
- credential hashes;
- revocation roots;
- reputation roots;
- dispute status commitments;
- bond, stake, and slashing events.

## Event Hashes

Each event hash MUST include an algorithm identifier. Implementations SHOULD use domain separation, such as including the string `AFT-EVENT-DRAFT-0.1` in the hash input or canonical object.

## Merkle Trees

Batch anchors SHOULD use Merkle trees or another transparent authenticated data structure. Merkle metadata MUST identify:

- tree algorithm;
- hash algorithm;
- leaf canonicalization;
- leaf order rule;
- batch identifier;
- event count;
- batch time window.

## Batch Root Chaining

Batches SHOULD include `previous_batch_root` where an issuer maintains a continuous event log. Root chaining improves tamper evidence but does not replace independent verification of event contents and signatures.

## On-Chain Registry Pointer

An on-chain registry MAY store:

- agent profile hash;
- credential hash;
- revocation root;
- reputation root;
- event batch root;
- dispute status commitment;
- bond state;
- timestamps;
- submitter address.

It MUST NOT store sensitive event data.

## Chain Neutrality

AFT MUST NOT require a specific L1, L2, virtual machine, consensus mechanism, token, wallet, or bridge. Anchors SHOULD identify the chain, network, contract or program, transaction reference, finality assumptions, and verification method.

## Cost And Finality

Implementers SHOULD consider:

- batching frequency;
- transaction fees;
- expected finality;
- reorganization risk;
- L2 data availability;
- bridge assumptions;
- timestamp reliability;
- public metadata leakage.

High-frequency systems SHOULD batch events and anchor roots rather than anchoring each event individually.

## Privacy Considerations

Full event data MUST NOT be stored on-chain. Public chains can leak relationships through timing, amount, address reuse, and repeated anchors. Implementers SHOULD use batching, delayed anchoring, scoped identifiers, and selective disclosure to reduce correlation risk.

## Proof Verification Flow

A verifier SHOULD:

1. obtain the disclosed event or redacted event view;
2. canonicalize the disclosed fields according to the declared profile;
3. verify the event hash or selective-disclosure proof;
4. verify signatures and key status;
5. verify inclusion in the batch root;
6. verify the batch root against the chain or registry;
7. check revocation, supersession, correction, and dispute state.

## Bond And Slashing State

Bond state MAY be public when collateral is intentionally used as a risk signal. Contracts SHOULD store minimal amounts, addresses, status, hashes, and timestamps. Private dispute evidence MUST remain off-chain.
