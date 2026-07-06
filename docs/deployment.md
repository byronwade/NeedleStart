# Deployment

Status: Planned.

Audience: app developers, deployers, adapter maintainers.

NeedleStart should support Bun by default while keeping Node and static output credible through adapters.

## Planned Adapter Paths

- `@needle/adapter-bun`: default production server path.
- `@needle/adapter-node`: Node compatibility path.
- `@needle/adapter-static`: static export path.

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

## Out Of Scope

- Hosted platform-specific guides before adapter contracts exist.
- Edge runtime support in the first prototype.
- Full deployment adapter matrix before Bun, Node, and static paths are credible.
