# Use Agent Context

Status: Planned.

Audience: AI agents, app developers, maintainers.

This guide describes the planned agent context workflow. Agent context commands are not implemented yet.

MVP Alpha should start with map-informed inspection through `lumina inspect why`, not full agent context capsules. The first map should help agents narrow context, identify affected routes, and explain why files matter.

## Planned Command

```bash
lumina agent context --route /pricing --json
```

Future behavior: full `lumina agent context` output remains planned after MVP Alpha.

## MVP Alpha Inspection

Target MVP behavior:

```bash
lumina inspect / --json
lumina inspect why /
lumina inspect why components/Hero.tsx
```

These commands should use `.lumina/routes.json`, `.lumina/render-manifest.json`, and `.lumina/map.json` to explain the app without shipping agent metadata in production runtime bundles.

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

Future generated outputs:

- `.lumina/context/*.ctx.json`
- `.lumina/context/agent-index.json`

## Source

- [Agent-Safe Workflows](../concepts/agent-native.md)
- [Agent Kernel](../../agent-kernel.md)
- [Machine-Readable Documentation](../../machine-readable-docs.md)

