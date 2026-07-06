# Diagnostics

Status: Planned.

Audience: app developers, framework contributors, AI agents.

Lumina diagnostics are planned to use stable codes, structured source locations, remediation text, and docs links across CLI output, manifests, reports, MCP tools, and agent context. This behavior is not implemented yet.

## Planned Shape

The Phase 1A `@lumina/core` `LuminaDiagnostic` is contract-backed for shared metadata shape. It includes `code`, `severity`, `category`, `message`, optional `docsUrl`, optional `docs`, optional `source.file`, optional `location`, optional route fields, `why`, `remediation`, `related`, `children`, and `tags`. Diagnostic production and rendering across compiler, CLI, manifests, and public docs remain planned.

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
  "docs": "https://lumina.dev/docs/reference/routing#route-conflicts",
  "why": "Route groups do not affect the public URL path.",
  "remediation": "Move one route to a different public segment or remove the duplicate page.",
  "related": [
    {
      "file": "app/(shop)/pricing/page.tsx",
      "line": 1,
      "column": 1,
      "message": "This file resolves to the same public path."
    }
  ],
  "children": [],
  "tags": []
}
```

## Planned Severities

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
- JSON diagnostics must be deterministic.
- Diagnostic arrays should use stable ordering by `severity`, `code`, file, line, column, and message unless a command documents a more specific order.
- JSON output must not include secrets, absolute local paths, raw environment values, stack traces, or auth-only data.
- Human output can include code frames, but automation should use JSON output.
- Command status maps to diagnostics by default: no diagnostics or only `info` diagnostics means `ok`, one or more `warning` diagnostics means `warning`, and one or more `error` diagnostics means `error`.
- Diagnostics should link to the most specific docs page once the public docs site exists.
- `why`, `related`, `children`, and `tags` fields are part of the shared type; framework behavior that populates them remains planned.

## Source

- [Diagnostics Contract](../../diagnostics-contract.md)
- [CLI JSON Contract](../../cli-json-contract.md)
- [Manifest Contracts](../../manifest-contracts.md)
