# Use Agent Context

Status: Planned.

Audience: AI agents, app developers, maintainers.

This guide describes the planned agent context workflow. Agent context commands are not implemented yet.

## Planned Command

```bash
lumina agent context --route /pricing --json
```

## Planned Context

Agent context should include:

- route
- source files
- render mode
- SEO status
- related components
- safe edit zones
- danger zones
- recommended checks

## Planned Generated Outputs

- `.lumina/context/*.ctx.json`
- `.lumina/context/agent-index.json`

## Source

- [Agent-Safe Workflows](../concepts/agent-native.md)
- [Agent Kernel](../../agent-kernel.md)
- [Machine-Readable Documentation](../../machine-readable-docs.md)

