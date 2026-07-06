# Diagnostics

Status: Planned.

Audience: app developers, framework contributors, AI agents.

NeedleStart diagnostics are planned to use stable codes, structured source locations, remediation text, and docs links across CLI output, manifests, reports, MCP tools, and agent context. This behavior is not implemented yet.

## Planned Shape

The scaffolded `@needle/core` `NeedleDiagnostic` currently uses `code`, `severity`, `message`, optional `docsUrl`, and optional `source.file`, `source.line`, and `source.column`. The expanded fields below remain planned until diagnostics are implemented across compiler, CLI, manifests, and public docs.

```json
{
  "code": "ROUTE_DUPLICATE_PATH",
  "severity": "error",
  "category": "routing",
  "message": "Two route files resolve to the same path.",
  "source": {
    "file": "app/(marketing)/pricing/page.tsx"
  },
  "location": {
    "line": 1,
    "column": 1
  },
  "routePath": "/pricing",
  "remediation": "Move one route to a different public segment or remove the duplicate page."
}
```

## Planned Levels

- `info`
- `warning`
- `error`

## Planned Categories

- `config`
- `routing`
- `rendering`
- `api`
- `schema`
- `cache`
- `seo`
- `manifest`
- `agent`
- `security`
- `performance`
- `runtime`

## Rules

- Codes are stable once released.
- Paths are normalized and relative to the project root.
- JSON output must not include secrets or absolute local paths.
- Human output can include code frames, but automation should use JSON output.
- Diagnostics should link to the most specific docs page once the public docs site exists.

## Source

- [Diagnostics Contract](../../diagnostics-contract.md)
- [CLI JSON Contract](../../cli-json-contract.md)
- [Manifest Contracts](../../manifest-contracts.md)
