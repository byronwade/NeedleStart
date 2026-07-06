# Security Policy

Status: Planned.

Audience: maintainers, contributors, security reviewers, AI agents.

NeedleStart is not yet implemented. This policy defines how security should be handled as implementation begins.

Detailed planned security requirements for high-risk implementation work live in [Security Contract](docs/security-contract.md).

## Supported Versions

No released versions exist yet. Security support begins when the project publishes packages or release artifacts.

## Reporting A Vulnerability

Until a private security intake is configured, do not post exploitable vulnerabilities publicly. Contact the project maintainers privately with:

- Affected package, file, or planned surface.
- Reproduction steps or proof of concept.
- Impact.
- Whether secrets, auth, billing, filesystem writes, MCP write tools, or deployment adapters are involved.

## High-Risk Areas

NeedleStart treats these areas as high risk:

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

