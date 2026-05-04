# AFT Labs Proposal For LF Decentralized Trust-Style Incubation

Status: Draft 0.1 adaptation package

## Project Name

AFT Labs - Agent Financial Trust Protocol Reference Implementation

## Scope

AFT Labs would build open-source reference implementations and conformance tooling for decentralized agent financial trust:

- peer discovery service;
- event envelope validation;
- multi-peer signed event exchange;
- multi-attestation aggregation;
- blockchain-neutral anchoring adapters;
- permissioned-ledger anchoring adapter examples;
- independent reputation provider demo;
- conformance test suite.

## Non-Scope

AFT Labs would not operate a required central AFT network, issue one official reputation score, provide legal or regulatory certification, move money, custody assets, or require one blockchain.

## Federated Reference Implementation

The lab network should demonstrate at least:

- payment processor peer;
- marketplace peer;
- agent operator peer;
- anchor provider peer;
- reputation provider peer;
- dispute or incident peer.

Each peer should publish `.well-known/aft-agent-trust`, sign events, anchor its own batches, and expose verification APIs.

## Public And Permissioned Examples

The project should include:

- public-chain or L2 anchoring demo;
- permissioned DLT or consortium-ledger anchoring demo;
- private evidence channel example;
- public hash-only evidence commitments.

## Security And PQC Roadmap

AFT Labs should support crypto-agility, ML-DSA signing profiles, hybrid classical + PQC migration profiles, key rotation, revocation, and compromise drills. It should not invent new cryptography.

## Community Benefit

The project would provide neutral implementation experience for identity, credential, payment, blockchain, security, and reputation communities without centralizing control of AFT.
