# Security Policy

Status: Planned.

Audience: maintainers, contributors, security reviewers, AI agents.

Lumina has a Phase 1 scaffold, but framework security behavior is not implemented yet. This policy defines how security should be handled as implementation begins.

MVP Alpha should avoid high-risk write, auth, billing, MCP write, and deployment surfaces unless `docs/mvp-alpha-scope.md` is updated in the same change. Planned security controls for deferred features remain future until implementation and tests exist.

Detailed planned security requirements for high-risk implementation work, production error behavior, security headers, vulnerability advisory flow, provenance, supply chain rules, and testing evidence live in [Security Contract](docs/security-contract.md).

## Supported Versions

No released versions exist yet. Security support begins when the project publishes packages or release artifacts.

## Reporting A Vulnerability

Until a private security intake is configured, do not post exploitable vulnerabilities publicly. Contact the project maintainers privately with:

- Affected package, file, or planned surface.
- Reproduction steps or proof of concept.
- Impact.
- Whether secrets, auth, billing, filesystem writes, MCP write tools, or deployment adapters are involved.
- Whether production error behavior, security headers, generated artifacts, package provenance, or supply chain release paths are involved.

## High-Risk Areas

Lumina treats these areas as high risk:

- Auth and sessions.
- Billing or payment integrations.
- Cache invalidation.
- Deployment adapters.
- File-system write tools.
- Safe edit APIs.
- MCP write tools.
- Environment variable handling.
- Runtime request routing.

## Security Documentation Rules

- Do not claim a security property without implementation and tests.
- Document threat models for high-risk features before implementation.
- Keep agent metadata out of production bundles.
- Route all write-capable agent and MCP behavior through safe edit transactions.
- Require explicit human sign-off for high-risk production edits.
- Do not publish security, provenance, supply chain, or advisory claims without implementation, tests, and review evidence.

