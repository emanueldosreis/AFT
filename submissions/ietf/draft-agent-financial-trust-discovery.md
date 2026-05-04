# draft-agent-financial-trust-discovery

Status: Individual Internet-Draft style sketch, Draft 0.1

## Abstract

This document defines HTTP discovery for Agent Financial Trust Protocol peers. It specifies `.well-known/aft-agent-trust`, peer capability metadata, status metadata, signature metadata, caching guidance, and security considerations for decentralized agent financial trust deployments.

## Introduction

AFT peers need a predictable way to advertise service endpoints, supported event types, supported credential types, cryptographic profiles, PQC readiness, anchoring modes, privacy defaults, revocation endpoints, and conformance profiles. This document focuses only on discovery mechanics.

## Terminology

Peer: an entity that issues, verifies, anchors, challenges, or consumes AFT artifacts.  
Discovery document: signed JSON metadata for a peer.  
Capability: declared support for an event type, credential type, API, ledger, or crypto profile.

## Protocol Overview

An HTTPS origin serving AFT SHOULD publish:

```text
GET /.well-known/aft-agent-trust
```

The response body is an AFT peer discovery document. A DID document MAY also contain a service endpoint pointing to the same document.

## Message Format

The discovery document includes:

- `aft_version`;
- `peer_id`;
- `peer_type`;
- `status`;
- `service_endpoints`;
- `supported_event_types`;
- `supported_credentials`;
- `supported_crypto_profiles`;
- `pqc_readiness_level`;
- `anchoring`;
- `conformance`;
- `privacy`;
- `revocation`;
- `signatures`.

## HTTP Status Semantics

- `200 OK`: document returned.
- `304 Not Modified`: cached document remains current.
- `404 Not Found`: origin does not publish AFT discovery.
- `410 Gone`: peer endpoint is no longer active.
- `423 Locked`: peer is suspended by local policy.
- `503 Service Unavailable`: temporary discovery outage.

Peer status inside the document remains authoritative for AFT policy. HTTP status alone is not sufficient.

## Caching And Replay Protection

Clients SHOULD bound cache lifetime using HTTP cache headers, document `updated_at`, signature creation time, key version, and revocation endpoint checks. High-value operations SHOULD refresh discovery metadata before relying on the peer.

## Signature Verification

Discovery documents SHOULD be signed. Verifiers MUST check algorithm identifiers, key identifiers, key versions, verification methods, PQC readiness, revocation status, and document freshness.

## PQC And Hybrid Negotiation

Peers advertise supported crypto profiles. Clients SHOULD prefer hybrid or PQC profiles for financially material exchanges and SHOULD avoid silent downgrade to classical-only profiles.

## Security Considerations

Risks include DNS compromise, web-host compromise, DID document compromise, stale cache replay, endpoint substitution, false capability claims, and downgrade to weaker cryptography.

## Privacy Considerations

Discovery metadata can reveal business roles and supported ledgers. Peers SHOULD minimize metadata and avoid exposing private customer or merchant relationships.

## IANA Considerations

This draft may later request registration for an AFT media type and well-known URI if the work progresses.
