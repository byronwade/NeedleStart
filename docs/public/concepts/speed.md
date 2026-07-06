# Whole-System Speed

Status: Planned.

Audience: app developers, performance reviewers, maintainers.

NeedleStart should be fast across the whole workflow: development startup, route updates, build output, runtime request handling, hot APIs, graph queries, agent context, and client payloads.

## Speed Principles

- Static first when safe.
- Move work to build time when possible.
- Keep runtime adapters small.
- Use explicit render modes.
- Generate hot API handlers for selected performance-critical routes.
- Keep app graph queries fast and deterministic.
- Keep agent context compact.
- Require raw benchmark evidence before public speed claims.

## Evidence Rule

No public benchmark claim should be made without:

- Fixture source.
- Raw results.
- Commit SHA.
- Runtime versions.
- Hardware or environment.
- Methodology.

## Reference

- [Speed Strategy](../../speed-strategy.md)
- [Benchmark Honesty](../deployment/benchmarks.md)
- [Performance](../../performance.md)

