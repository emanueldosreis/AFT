# AFT Agent Financial Trust Extension

Status: Draft 0.1 discussion artifact

## Purpose

This document sketches a W3C-aligned extension for representing agent financial trust metadata using decentralized identifiers, Verifiable Credentials, and agent protocol service discovery.

## Extension Fields

An agent or peer profile MAY expose:

- `agent_id` or peer DID;
- financial lifecycle status;
- controller and operator references;
- supported mandate types;
- reputation snapshot references;
- dispute and incident credential references;
- revocation root references;
- reputation root references;
- PQC readiness level;
- supported AFT service endpoints;
- supported event and credential types.

## DID Service Endpoint

Example DID service entry:

```json
{
  "id": "did:web:payments.example#aft",
  "type": "AFTAgentTrustService",
  "serviceEndpoint": "https://payments.example/.well-known/aft-agent-trust"
}
```

The service endpoint returns the AFT peer discovery document defined in AFT-019.

## VC Alignment

AFT financial trust credentials SHOULD use standard VC issuer-holder-verifier semantics. Credentials SHOULD support selective disclosure and revocation. AFT credentials SHOULD NOT embed raw prompts, responses, PII, card data, bank data, customer names, private merchant data, or full logs.

## Decentralized Reputation

AFT does not define one official score. Reputation providers MAY issue AgentReputationSnapshotCredential objects with context, evidence roots, methodology references, confidence, and privacy classification. Verifiers choose which providers and methodologies to trust.

## Multi-Attestation

AFT event and credential references SHOULD support multiple attestations per subject. Conflicting attestations SHOULD be resolved through challenge, correction, supersession, revocation, and dispute outcome records rather than deletion or central override.

## Non-Goals

This extension does not define payment settlement, legal liability, regulatory compliance, a mandatory blockchain, one DID method, one reputation provider, or one central AFT registry.
