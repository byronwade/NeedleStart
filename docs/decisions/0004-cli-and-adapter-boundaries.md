# ADR 0004: CLI and Adapter Boundaries

Date: 2026-07-05

Status: proposed

## Context

NeedleStart needs a consistent command story before the CLI exists. Early planning used a mix of `bun dev`, `bun needle routes`, `bun build`, `bun start`, and `needle <command>` examples. That drift would become confusing for users, generated apps, docs, tests, and agents.

The architecture also had naming drift between `@needle/server-bun` and `@needle/adapter-bun`. Both names pointed at production request handling, but keeping both without a boundary would create duplicated runtime concepts before implementation starts.

## Decision

Use `needle <command>` as the canonical framework command form inside a NeedleStart app.

Examples:

```bash
needle dev
needle build
needle start
needle routes
needle seo
needle map
needle agent context --route / --json
needle mcp
```

Use `bun create needle my-app` as the project creation command.

Generated apps should expose package scripts that call the CLI:

```json
{
  "scripts": {
    "dev": "needle dev",
    "build": "needle build",
    "start": "needle start",
    "check": "needle check"
  }
}
```

User-facing docs may show `bun run dev`, `bun run build`, and `bun run start` when explaining generated app scripts, but framework behavior docs should prefer `needle dev`, `needle build`, and `needle start`.

For runtime boundaries, use adapter packages as the production runtime/output boundary:

- `@needle/adapter-bun`
- `@needle/adapter-node`
- `@needle/adapter-static`

Do not introduce `@needle/server-bun` unless a future ADR defines a shared server core with a clear reason.

## Consequences

This makes command examples stable before implementation:

- README, AGENTS, prototype demo, CLI docs, and generated app scripts can align.
- Agents can rely on one command namespace.
- CLI JSON contracts can be documented once.
- `bun` remains the package manager and create-app path without becoming the command prefix for every framework operation.

This also clarifies runtime ownership:

- Bun-specific request handling belongs in `@needle/adapter-bun`.
- Node compatibility belongs in `@needle/adapter-node`.
- Static export belongs in `@needle/adapter-static`.
- Shared adapter capability types belong in `@needle/core`.
- Runtime adapters consume generated manifests and handlers rather than rediscovering app source.

The tradeoff is that a shared server core package may still become useful later. If so, it must be introduced deliberately through a new ADR instead of emerging through import creep.

## Alternatives Considered

- Use `bun needle <command>` everywhere.
- Use only generated package scripts such as `bun run dev` and hide the framework CLI.
- Keep both `@needle/server-bun` and `@needle/adapter-bun` as separate packages from day one.
- Start with Node as the only stable adapter and treat Bun as an optimization.

## Follow-Up Requirements

- Keep `docs/cli.md` as the command contract.
- Keep `docs/package-map.md` aligned with adapter package boundaries.
- Keep `docs/deployment.md` aligned with adapter behavior.
- Update `docs/status.md` when commands become implemented or verified.
