# CLI Reference

Status: Planned.

Audience: app developers, framework contributors, AI agents.

This page is the future reference for `needle` commands. No CLI implementation exists yet.

## Planned Commands

| Command | Purpose | JSON output required? |
| --- | --- | --- |
| `needle dev` | Start local development. | No |
| `needle build` | Build app, manifests, graph, SEO, and adapter output. | Yes for diagnostics |
| `needle start` | Start built output. | No |
| `needle routes` | List route manifest entries. | Yes |
| `needle inspect` | Inspect route, file, or artifact details. | Yes |
| `needle check` | Run framework-aware checks. | Yes |
| `needle seo` | Run SEO audit. | Yes |
| `needle map` | Query Needle Map. | Yes |
| `needle agent` | Generate or inspect agent context. | Yes |
| `needle mcp` | Start MCP server. | No |

## Reference Requirements

Each command must eventually document:

- Syntax.
- Options.
- Exit codes.
- Human output.
- Stable `--json` output.
- Generated files read or written.
- Checks or tests that prove behavior.

## Out Of Scope

- Claiming command behavior before `@needle/cli` exists.
- Defining final option names before implementation.
- Human-output formatting beyond planned examples.
