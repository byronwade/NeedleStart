# Deployment

Status: Planned.

Audience: app developers, deployers, adapter maintainers.

Lumina should support Bun by default while keeping Node and static output credible through adapters.

Adapter output, manifest fields, capability rules, environment variables, health endpoint behavior, and deployment evidence requirements are defined in [Adapter Contract](adapter-contract.md).

## Planned Adapter Paths

- `@lumina/adapter-bun`: default production adapter path.
- `@lumina/adapter-node`: Node compatibility path.
- `@lumina/adapter-static`: static export path.

## Deployment Docs Must Cover

- Build command.
- Start command.
- Required runtime.
- Generated output.
- Adapter capabilities.
- Unsupported features.
- Environment variables.
- Cache behavior.
- Health endpoint behavior.

## Rule

Do not publish deployment claims until the adapter path exists and has integration tests.

Do not mark Bun, Node, static, or hosted-platform deployment as supported until [Compatibility](compatibility.md) has evidence and [Adapter Contract](adapter-contract.md) fixture requirements are satisfied.

## Out Of Scope

- Hosted platform-specific guides before adapter contracts exist.
- Edge runtime support in the first prototype.
- Full deployment adapter matrix before Bun, Node, and static paths are credible.
