# API Route Contract

Status: Planned.

Audience: framework contributors, app developers, runtime adapter authors, security reviewers, AI agents.

This page defines the planned contract for Lumina API route files. It is not implemented yet. The goal is to make API route behavior precise before `@lumina/compiler`, `@lumina/router`, `@lumina/schema`, `@lumina/adapter-bun`, `@lumina/adapter-node`, and `@lumina/adapter-static` depend on it.

## Contract Goals

API route behavior must be:

- familiar to developers who know modern file-based routers,
- based on Web `Request` and `Response` primitives where practical,
- deterministic enough for generated manifests and tests,
- explicit about validation, serialization, cache, and error behavior,
- small enough for runtime adapters to execute without rediscovering source files,
- safe enough for security-sensitive endpoints, webhooks, and agent inspection.

## Source Files

Lumina plans API route files under `app/api/`.

```txt
app/
  api/
    health.ts
    users/
      [id].ts
```

Route discovery rules are defined in [Routing Contract](routing-contract.md). API route files should compile into route nodes with `kind: "api"`.

## Supported Methods

Planned method exports:

```ts
export async function GET(ctx) {}
export async function POST(ctx) {}
export async function PUT(ctx) {}
export async function PATCH(ctx) {}
export async function DELETE(ctx) {}
export async function HEAD(ctx) {}
export async function OPTIONS(ctx) {}
```

Only uppercase HTTP method exports should be treated as handlers. Other exports may define route config, schemas, cache behavior, or helpers.

Unsupported method exports should produce diagnostics rather than silently becoming dead code.

## Handler Context

Draft handler context:

```ts
type ApiRouteContext = {
  request: Request
  params: Record<string, string | string[]>
  query: URLSearchParams
  headers: Headers
  cookies: RequestCookies
  env: LuminaPublicRuntimeEnv
  route: {
    id: string
    path: string
    sourceFile: string
  }
}
```

The exact type belongs in `@lumina/core` once implementation starts. The stable design rule is that handlers receive a Web-standard request and structured route metadata; they should not depend on Express-style `req` and `res` mutation.

## Return Values

Planned return normalization:

| Handler return | Response behavior |
| --- | --- |
| `Response` | Should pass through unchanged. |
| Plain object | Should become a JSON response with `content-type: application/json; charset=utf-8`. |
| Array | Should become a JSON response with `content-type: application/json; charset=utf-8`. |
| `string` | Should become a text response with `content-type: text/plain; charset=utf-8` unless a helper marks HTML. |
| `null` or `undefined` | Should become `204 No Content` for methods where an empty response is valid; diagnostic in strict mode. |

Response helper names are not final. If helpers are added, they must be documented in [API Reference](api-reference.md) and versioned through [Versioning And Upgrades](versioning-and-upgrades.md).

## Request Body Rules

The first implementation should keep body parsing explicit.

Planned behavior:

- `ctx.request` should expose the raw Web `Request`.
- Handlers should be able to call `request.json()`, `request.text()`, `request.formData()`, or `request.arrayBuffer()`.
- The framework should not parse request bodies unless a schema or helper asks it to.
- Body parsing failures should produce structured diagnostics in development and stable error responses in production.
- Body size limits should be adapter-configurable before public release.

## Params And Query

Dynamic API route params come from the route manifest.

```txt
app/api/users/[id].ts -> /api/users/:id
```

Planned context:

```ts
export async function GET({ params, query }) {
  return {
    id: params.id,
    expand: query.get("expand"),
  }
}
```

Params are strings unless the route uses a schema. Catch-all params are string arrays.

## Schema Exports

Planned schema exports:

```ts
import { schema } from "lumina"

export const params = schema.object({
  id: schema.uint64(),
})

export const query = schema.object({
  expand: schema.enum(["profile", "billing"]).optional(),
})

export const body = schema.object({
  name: schema.string(),
})

export const response = schema.object({
  id: schema.uint64(),
  name: schema.string(),
})
```

Schema behavior is defined in [Schema](schema.md) and [Schema Contract](schema-contract.md). Hot API behavior is defined in [Hot API Path](hot-api-path.md).

Validation failures should return stable error responses:

```json
{
  "error": {
    "code": "VALIDATION_FAILED",
    "message": "Request validation failed.",
    "issues": [
      { "path": "params.id", "message": "Expected uint64." }
    ]
  }
}
```

The final error shape must align with CLI diagnostics and generated API docs where practical, but runtime API errors and CLI errors do not need identical envelopes.

## Route Config

Planned API route config:

```ts
export const config = {
  runtime: "bun",
  cache: "no-store",
  bodyLimit: "1mb",
}
```

The exact config object is not final. Config fields that affect runtime behavior must be reflected in generated manifests and documented in [Configuration Contract](config-contract.md) and [Cache Contract](cache-contract.md).

## Caching Defaults

Default behavior:

- API routes default to `no-store`.
- Cache opt-in must be explicit.
- Cache headers and micro-cache behavior must be visible in generated manifests.
- Authenticated routes must not become cacheable by inference.

Hot API micro-caching is opt-in and belongs to [Hot API Path](hot-api-path.md) and [Cache Contract](cache-contract.md).

## Errors

Development behavior:

- Include helpful stack traces.
- Include route ID and source file.
- Include diagnostic codes for framework errors.

Production behavior:

- Hide stack traces.
- Preserve explicit status codes.
- Return stable 500 responses for unhandled errors.
- Log details through the selected adapter.

Security-sensitive routes should follow [Security](security.md) and must not leak secrets or internal paths in production responses.

## Generated Manifest Fields

API routes should appear in `.lumina/routes.json`, `.lumina/render-manifest.json`, `dist/routes.manifest.json`, and `dist/render.manifest.json` when adapter output exists.

Draft route entry extension:

```json
{
  "id": "app.api.users.$id.api",
  "kind": "api",
  "path": "/api/users/:id",
  "sourceFile": "app/api/users/[id].ts",
  "methods": ["GET", "PATCH"],
  "params": [{ "name": "id", "type": "string", "required": true }],
  "schemas": {
    "params": true,
    "query": false,
    "body": true,
    "response": true
  },
  "cache": { "mode": "no-store" },
  "hot": false,
  "diagnostics": []
}
```

Generated handler registries should use the manifest instead of scanning source files at request time.

## Diagnostics

Required planned diagnostic cases:

| Code | Severity | When |
| --- | --- | --- |
| `API_METHOD_MISSING` | `warning` | API file exports no supported HTTP method. |
| `API_METHOD_UNSUPPORTED` | `error` | API file exports a method-like name that Lumina does not support. |
| `API_BODY_SCHEMA_WITHOUT_BODY_METHOD` | `warning` | Body schema is exported for a method where body parsing is unexpected. |
| `API_RESPONSE_SCHEMA_MISMATCH` | `error` in tests/dev | Handler output fails the declared response schema. |
| `API_CACHE_UNSAFE_DEFAULT` | `error` | Auth/session-sensitive API route opts into cache without required explicit policy. |
| `API_HOT_SCHEMA_REQUIRED` | `error` | `apiHot()` route is missing required params, body, or response schema. |

Diagnostics must include normalized source file, route ID when known, method when relevant, and a concise remediation.

## Security Requirements

Before API routes ship publicly:

- Request body limits must be documented and tested.
- Production errors must hide stack traces and local paths.
- Webhook examples must document raw-body needs if supported.
- Auth/session examples must be explicitly out of scope until those systems exist.
- Cacheable API routes must require explicit cache policy.
- Environment variables must follow [Configuration Contract](config-contract.md) and [Security](security.md).

## Fixture Requirements

The first API route implementation should include fixtures for:

- GET returning a plain object.
- GET returning a `Response`.
- POST reading JSON explicitly.
- Dynamic params.
- Query params.
- Missing method export.
- Unsupported method export.
- Validation failure for params or body.
- Response schema failure in development or tests.
- Production error response hiding stack traces.
- Cache default and explicit cache opt-in.
- Hot API route with generated params and response schema.

Tests should include manifest snapshots, HTTP behavior, diagnostics, and adapter parity for Bun and Node once both adapters exist.

## Public Docs Requirements

When API routes are implemented, update:

- [API Routes](api-routes.md).
- [Public API Routes Reference](public/reference/api-routes.md).
- [Routing Contract](routing-contract.md).
- [Manifest Contracts](manifest-contracts.md).
- [Runtime Contract](runtime-contract.md).
- [Schema](schema.md).
- [Schema Contract](schema-contract.md).
- [Hot API Path](hot-api-path.md).
- [Security](security.md).
- [Cache Contract](cache-contract.md).
- [Testing](testing.md).

Do not mark API route docs implemented until handler behavior, manifests, diagnostics, and tests agree.

## Research Notes

This contract adapts current patterns from mature endpoint systems:

- Next.js route handlers use file conventions, HTTP method exports, and Web `Request`/`Response` APIs.
- SvelteKit server routes use method exports and document content negotiation alongside route files.
- Astro endpoints expose API routes through file-based endpoint files and distinguish static build-time endpoints from live SSR endpoints.
- Hono shows the value of small request/response abstractions, explicit validation middleware, route params, and OpenAPI integration.

Lumina should keep the API route surface familiar while making schemas, generated manifests, cache defaults, and diagnostics first-class from the beginning.

## Out Of Scope

- Auth, sessions, rate limiting, and CSRF protection in the first API route milestone.
- Webhook raw-body signing before request body policy is implemented.
- Streaming request or response bodies beyond Web `Response` pass-through.
- Full OpenAPI generation before schema and hot API behavior are proven.
- Cross-language client generation.
