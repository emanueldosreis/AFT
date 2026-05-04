# AFT Reference API

This directory contains an illustrative OpenAPI 3.1 interface for AFT services. It is not a production API contract. Implementers can use it to discuss interoperability for:

- agent registration;
- event submission and lookup;
- risk evaluation;
- reputation lookup;
- anchor submission and lookup;
- dispute and incident workflows;
- cryptographic signature verification;
- crypto profile discovery.

The API intentionally accepts and returns AFT JSON Schema artifacts by reference. Implementations SHOULD enforce authentication, authorization, rate limits, privacy classification, audit logging, and cryptographic verification before accepting financially material records.

No endpoint should require raw prompts, responses, PII, card data, bank data, private merchant data, customer records, private incident evidence, or full conversation logs.
