# Security

Status: Planned.

Audience: app developers, security reviewers, maintainers, AI agents.

NeedleStart security behavior is planned but not implemented yet. This page summarizes the public security expectations for future framework features.

## Current Status

No released packages exist. No runtime, adapter, auth, MCP write tool, or safe edit implementation exists yet.

Do not treat NeedleStart as security-audited, production-hardened, or compliant.

## High-Risk Areas

NeedleStart treats these as high risk:

- Auth and sessions.
- Billing or payment integrations.
- Cache invalidation.
- Deployment adapters.
- File-system write tools.
- Safe edit APIs.
- MCP write tools.
- Environment variable handling.
- Runtime request routing.
- Generated artifacts.
- Package publishing.

## Planned Rules

Future high-risk work must include:

- Threat model notes.
- Validation behavior.
- Production error behavior.
- Secret redaction rules.
- Cache and header behavior when relevant.
- Tests for rejection paths.
- Human sign-off when agent writes can affect high-risk surfaces.

## Reporting Vulnerabilities

Use the root [Security Policy](../../../SECURITY.md) for reporting guidance. Before public release, maintainers should configure private vulnerability reporting.

## Related

- [Security Contract](../../security-contract.md)
- [Diagnostics](diagnostics.md)
- [Configuration](config.md)
- [Cache](cache.md)
- [API Routes](api-routes.md)
- [Adapters](adapters.md)
