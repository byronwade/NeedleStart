# Testing

Status: Planned.

Audience: framework contributors, maintainers, AI agents.

This page defines expected test categories for NeedleStart as implementation begins.

The planned test layers, fixture layout, snapshot policy, CI gates, artifact rules, browser-test rules, and evidence reporting requirements are defined in [Testing Contract](testing-contract.md).

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

## Documentation Checks

Until package scripts exist, documentation changes should use [Documentation Verification](docs-verification.md). That page defines the current manual checks for whitespace, local Markdown links, root AI playbook placement, status-language review, navigation coverage, and machine-readable docs contracts.

Once the Bun workspace exists, these checks should become package scripts and CI jobs.

## Determinism

Agent-facing output, manifests, snapshots, and fixture output must be deterministic across operating systems.

## Out Of Scope

- Claiming checks pass before package scaffolding exists.
- Network-dependent tests unless explicitly required.
- Benchmark claims without benchmark methodology.
