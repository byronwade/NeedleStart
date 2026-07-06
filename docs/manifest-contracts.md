# Manifest Contracts

Status: Planned.

Audience: framework contributors, runtime adapter authors, AI agents.

Manifest contracts are the stable bridge between the compiler, runtime adapters, CLI, Needle Map, Agent Kernel, MCP, devtools, and tests.

## Planned Manifests

| Manifest | Purpose |
| --- | --- |
| `.needle/routes.json` | Discovered routes. |
| `.needle/render-manifest.json` | Render modes and cache metadata. |
| `.needle/map.json` | Public app graph output. |
| `.needle/graph.json` | Compiler and agent graph data. |
| `.needle/seo.report.json` | SEO audit output. |
| `.needle/perf.report.json` | Performance and budget output. |
| `.needle/context/agent-index.json` | Agent context index. |
| `dist/adapter.manifest.json` | Adapter capabilities. |

## Contract Rules

- Include schema version.
- Normalize paths across operating systems.
- Sort arrays by stable keys.
- Keep agent-facing JSON compact.
- Avoid absolute local paths in public artifacts.
- Document source inputs when practical.

## Out Of Scope

- Final JSON schemas before implementation.
- Backward compatibility guarantees before the first release.
- Runtime rediscovery of source files.
