# Testing

Status: Planned.

Audience: framework contributors, maintainers, AI agents.

This page defines expected test categories for NeedleStart as implementation begins.

## Test Types

- Unit tests for pure parser, manifest, schema, and graph logic.
- Fixture tests for route discovery, SEO, API routes, and map generation.
- Integration tests for CLI behavior.
- HTTP tests for runtime adapters.
- Stable JSON tests for agent-facing output.
- Benchmark tests only when performance claims are introduced.

## Planned Commands

```bash
bun test
bun run typecheck
```

These commands are not verified until package scaffolding exists.

## Determinism

Agent-facing output, manifests, snapshots, and fixture output must be deterministic across operating systems.

## Out Of Scope

- Claiming checks pass before package scaffolding exists.
- Network-dependent tests unless explicitly required.
- Benchmark claims without benchmark methodology.
