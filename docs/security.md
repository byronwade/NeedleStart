# Security

Status: Planned.

Audience: security reviewers, maintainers, AI agents.

This page is the docs-level security guide. See root `SECURITY.md` for vulnerability reporting policy.

The detailed planned security requirements for high-risk implementation work, secret handling, production error behavior, security headers, advisory flow, provenance, supply chain rules, and testing evidence are defined in [Security Contract](security-contract.md).

## High-Risk Product Areas

- Auth and sessions.
- Billing or payments.
- Cache invalidation.
- Deployment adapters.
- File-system write tools.
- Safe edit APIs.
- MCP write tools.
- Environment variables.
- Runtime request routing.

Configuration and environment-variable behavior is documented in [Configuration Contract](config-contract.md).
API route request, validation, cache, and error behavior is documented in [API Route Contract](api-route-contract.md).
Cache safety rules are documented in [Cache Contract](cache-contract.md).
Diagnostic sanitization and secret-exclusion rules are documented in [Diagnostics Contract](diagnostics-contract.md).
Runtime and adapter production-error behavior is documented in [Runtime Contract](runtime-contract.md) and [Adapter Contract](adapter-contract.md).
Public-facing security expectations are summarized in [Public Security Reference](public/reference/security.md).

## Documentation Requirements

High-risk features must include:

- Threat model notes.
- Validation behavior.
- Production error behavior.
- Security headers when response behavior changes.
- Secret handling and redaction rules.
- Tests and security evidence required.
- Vulnerability or advisory impact when release behavior changes.
- Provenance and supply chain impact when package publishing changes.
- Human sign-off requirements when agent writes are involved.

## Threat Model Template

High-risk feature docs should answer:

- What trusted and untrusted inputs exist?
- What files, routes, secrets, or generated artifacts can be affected?
- What validation runs before behavior executes?
- What checks run before an agent write applies?
- What is logged?
- How can the change be rolled back?
- What is explicitly out of scope?

## Agent Security Rule

AI agents must not use Needle Map as the only authority for safety-critical changes. Safe edit validation, tests, explicit contracts, and human sign-off are required for high-risk writes.
