# Security

Status: Planned.

Audience: security reviewers, maintainers, AI agents.

This page is the docs-level security guide. See root `SECURITY.md` for vulnerability reporting policy.

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

## Documentation Requirements

High-risk features must include:

- Threat model notes.
- Validation behavior.
- Error behavior.
- Tests required.
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
