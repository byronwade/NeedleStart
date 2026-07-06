# Diagnostics Contract

Status: Planned.

Audience: framework contributors, CLI implementers, runtime adapter authors, AI agents.

This page defines the planned diagnostics contract for Lumina. Diagnostics are not implemented yet. The contract exists so compiler errors, route warnings, config validation, API route errors, schema issues, cache warnings, SEO audits, CLI JSON, manifests, MCP tools, and public docs all use one stable vocabulary.

## Goals

- Every framework diagnostic has a stable code.
- Diagnostics explain what happened, where it happened, why it matters, and what to do next.
- Human output can improve without breaking machine-readable output.
- JSON diagnostics are compact, deterministic, and safe for agents.
- Source locations use normalized relative paths and one-based line and column numbers.
- Diagnostics link to public reference docs once the docs site exists.

## Research Notes

This contract follows current patterns from mature developer tools:

- TypeScript explains errors through a leading message plus nested elaborations that answer "why" step by step.
- Rust documents JSON diagnostic output, parent-child diagnostic relationships, codes, spans, and future-compatible parsing.
- Rust also maintains an error-code index for deeper explanations.
- ESLint documents selectable human and JSON formatters for the same lint results.
- Rollup plugin docs treat plugin names, source mappings, warnings, and generated locations as part of good tooling behavior.
- Vite troubleshooting docs pair specific error symptoms with concrete fixes.
- Next.js separates expected errors from uncaught exceptions and documents route-level error boundaries.

Source links:

- [TypeScript Understanding Errors](https://www.typescriptlang.org/docs/handbook/2/understanding-errors.html)
- [rustc JSON output](https://doc.rust-lang.org/rustc/json.html)
- [Rust error codes index](https://doc.rust-lang.org/error-index.html)
- [ESLint formatters](https://eslint.org/docs/latest/use/formatters/)
- [Rollup plugin development](https://rollupjs.org/plugin-development/)
- [Vite troubleshooting](https://vite.dev/guide/troubleshooting)
- [Next.js error handling](https://nextjs.org/docs/app/getting-started/error-handling)
- [Next.js error file convention](https://nextjs.org/docs/app/api-reference/file-conventions/error)

## Diagnostic Shape

The Phase 1 scaffold currently exposes a minimal `LuminaDiagnostic` from `@lumina/core`:

```ts
type LuminaDiagnostic = {
  code: string
  severity: "info" | "warning" | "error"
  message: string
  docsUrl?: string
  source?: {
    file: string
    line?: number
    column?: number
  }
}
```

This scaffold shape is intentionally smaller than the planned diagnostics contract. It establishes the shared field name `severity` and the allowed severity values before categories, remediations, related locations, and code frames exist.

Planned expanded shared shape:

```ts
type LuminaDiagnostic = {
  code: string
  severity: "info" | "warning" | "error"
  message: string
  category: DiagnosticCategory
  source?: DiagnosticSource
  location?: DiagnosticLocation
  routeId?: string
  routePath?: string
  docs?: string
  why?: string
  remediation?: string
  children?: LuminaDiagnosticChild[]
  related?: DiagnosticRelatedLocation[]
  tags?: DiagnosticTag[]
}
```

JSON example:

```json
{
  "code": "ROUTE_DUPLICATE_PATH",
  "severity": "error",
  "category": "routing",
  "message": "Two route files resolve to the same path.",
  "source": {
    "file": "app/(marketing)/pricing/page.tsx",
    "owner": "compiler"
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
  ]
}
```

## Required Fields

| Field | Required | Notes |
| --- | --- | --- |
| `code` | Yes | Stable uppercase code once released. |
| `severity` | Yes | `info`, `warning`, or `error`. |
| `message` | Yes | Human-readable summary. May improve over time without schema change. |
| `category` | Yes | One of the documented diagnostic categories. |
| `source.file` | Required when file-backed | Normalized relative path. |
| `location` | Required when source location is known | One-based line and column. |
| `docs` | Required after public docs route exists | Link to the best explanation or reference section. |
| `remediation` | Required for expected user-fixable diagnostics | Concrete next step. |

## Categories

Planned categories:

| Category | Used by |
| --- | --- |
| `config` | Config loading, env handling, normalized config. |
| `routing` | Route discovery, route IDs, file conventions. |
| `rendering` | Render modes, SSR, static, streaming, client-only. |
| `api` | API route methods, request parsing, response normalization. |
| `schema` | Validation helpers, serializers, OpenAPI mapping. |
| `cache` | Cache plans, headers, tags, revalidation. |
| `seo` | Metadata, sitemap, robots, structured data, public HTML. |
| `manifest` | Generated artifacts and schema versions. |
| `agent` | Context capsules, MCP, safe edits. |
| `security` | Secret exposure, unsafe write paths, auth-sensitive behavior. |
| `performance` | Budgets, benchmarks, route size, hot API eligibility. |
| `runtime` | Adapter behavior, request routing, startup failures. |

## Code Naming

Rules:

- Codes use uppercase snake case.
- Codes start with a domain prefix unless the diagnostic is cross-cutting.
- Released codes are stable.
- Deprecated codes remain documented until the next major schema version.
- Code changes follow [Versioning And Upgrades](versioning-and-upgrades.md).

Examples:

| Prefix | Examples |
| --- | --- |
| `CONFIG_` | `CONFIG_FILE_INVALID`, `CONFIG_ENV_SECRET_EXPOSED` |
| `ROUTE_` | `ROUTE_DUPLICATE_PATH`, `ROUTE_INVALID_SEGMENT` |
| `API_` | `API_METHOD_UNSUPPORTED`, `API_BODY_LIMIT_INVALID` |
| `SCHEMA_` | `SCHEMA_UNSUPPORTED_TRANSFORM`, `SCHEMA_SERIALIZER_MISSING` |
| `CACHE_` | `CACHE_UNSAFE_AUTH`, `CACHE_HEADER_CONFLICT` |
| `SEO_` | `SEO_TITLE_MISSING`, `SEO_CANONICAL_CONFLICT` |

## Locations And Source Spans

Source rules:

- Paths are relative to project root.
- Paths use POSIX separators in generated JSON.
- Line and column numbers are one-based.
- Byte offsets are optional and must not replace line and column.
- Code frames are allowed in human output, but generated JSON should include structured locations first.
- Related locations should explain cross-file conflicts, parent layouts, generated manifests, or source config.

Planned source span shape:

```ts
type DiagnosticLocation = {
  line: number
  column: number
  endLine?: number
  endColumn?: number
}
```

## Parent And Child Diagnostics

Diagnostics may include children for "why" chains.

Use child diagnostics when:

- One route conflict has several files.
- One schema failure contains nested object issues.
- One config failure comes from multiple environment sources.
- One SEO failure is caused by metadata inherited from a layout.

Child diagnostics should not repeat the parent message. They should add context, a specific location, or a narrower explanation.

## Human Output

Human output should be readable without losing machine structure.

Recommended order:

1. Code and short message.
2. Location.
3. Why this happened.
4. Suggested fix.
5. Docs link.
6. Related files when useful.

Human output may include colors, code frames, grouping, and summaries. Scripts and agents must use JSON output instead.

## JSON Output

Diagnostics appear in:

- `lumina <command> --json`
- `.lumina/routes.json`
- `.lumina/render-manifest.json`
- `.lumina/seo.report.json`
- `.lumina/perf.report.json`
- `.lumina/map.json`
- `.lumina/context/*.ctx.json`
- MCP resource responses when relevant

Rules:

- JSON diagnostics must be deterministic.
- Diagnostic arrays use stable ordering by `severity`, `code`, file, line, column, and message unless a command documents a more specific order.
- Warnings do not fail a command unless strict mode or a check command says they do.
- Diagnostics never include secrets, absolute local paths, raw environment values, stack traces, or auth-only data.

## Exit Codes

CLI exit codes remain defined in [CLI JSON Contract](cli-json-contract.md). Diagnostics decide command status:

| Diagnostic result | Default CLI status |
| --- | --- |
| No diagnostics | `ok` |
| Only `info` diagnostics | `ok` |
| One or more `warning` diagnostics | `warning` |
| One or more `error` diagnostics | `error` |

Commands may treat warnings as failures in `--strict` mode.

## Documentation Pages For Codes

The public docs site should eventually support code-specific anchors or pages.

Planned URL patterns:

```txt
/docs/reference/diagnostics
/docs/reference/diagnostics#route_duplicate_path
/docs/reference/diagnostics/route_duplicate_path
```

Before the docs site exists, diagnostics can link to the closest Markdown reference page.

## Security And Privacy

- Do not include secrets, raw env values, cookies, tokens, headers, or request bodies.
- Production runtime diagnostics exposed to users must be sanitized.
- Internal diagnostic context can be logged only when configured and must follow security docs.
- Safe-edit diagnostics must identify risk without exposing private app data.

## Fixture Requirements

Future implementation must include fixtures for:

- single-file compiler error,
- cross-file route conflict,
- config env secret exposure,
- nested schema validation issue,
- API route unsupported method,
- cache unsafe auth route,
- SEO missing title,
- manifest schema mismatch,
- runtime adapter startup failure,
- strict-mode warning failure,
- sanitized production runtime error,
- deterministic JSON ordering,
- docs-link presence after public docs routes exist.

## Related Docs

- [Public Diagnostics Reference](public/reference/diagnostics.md)
- [CLI JSON Contract](cli-json-contract.md)
- [Manifest Contracts](manifest-contracts.md)
- [Routing Contract](routing-contract.md)
- [API Route Contract](api-route-contract.md)
- [Schema Contract](schema-contract.md)
- [Cache Contract](cache-contract.md)
- [SEO Contract](seo-contract.md)
- [Runtime Contract](runtime-contract.md)
- [Security](security.md)
