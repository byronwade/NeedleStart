# API Routes Contract

NeedleStart API routes are planned. This document defines the target API route conventions, handler signatures, response behavior, error behavior, schema integration, hot API relationship, manifests, diagnostics, and tests.

API routes are server routes. They must not render React.

## Goals

- Support familiar file-based API routes.
- Keep API route discovery aligned with page routing.
- Distinguish normal API routes from hot API routes.
- Make response normalization predictable.
- Keep errors safe in production and useful in development.
- Support schema-backed validation and serialization for hot paths.
- Feed APIs into Needle Map, OpenAPI output, agent context, and affected checks.

## Route Files

API routes live under `app/api`.

| File | URL |
| --- | --- |
| `app/api/health.ts` | `/api/health` |
| `app/api/users/[id].ts` | `/api/users/:id` |
| `app/api/search.ts` | `/api/search` |

The routing rules for static, dynamic, catch-all, and route group segments should match `docs/routing.md`.

## HTTP Methods

Supported planned method exports:

```ts
export async function GET(ctx) {}
export async function POST(ctx) {}
export async function PUT(ctx) {}
export async function PATCH(ctx) {}
export async function DELETE(ctx) {}
export async function OPTIONS(ctx) {}
export async function HEAD(ctx) {}
```

Rules:

- Method names are uppercase.
- A file with no valid method export is invalid.
- Unsupported methods should return 405 with an `Allow` header.
- `HEAD` may use `GET` behavior without body if `HEAD` is not explicitly exported, but this must be documented in runtime behavior once implemented.

## Handler Context

Draft context:

```ts
export type ApiContext = {
  request: Request
  params: Record<string, string | string[]>
  url: URL
  headers: Headers
  cookies?: RequestCookies
  env?: Record<string, string | undefined>
}
```

Rules:

- `params` comes from route matching.
- Catch-all params are arrays of strings.
- `url` is normalized and should respect base path.
- `env` must not be dumped into logs, manifests, or errors.
- Cookie helper support is deferred until sessions/auth decisions are clearer.

## Basic Handler Example

```ts
export async function GET() {
  return { ok: true }
}
```

Plain objects should become JSON responses.

Equivalent intent:

```ts
return Response.json({ ok: true })
```

## Dynamic API Example

```ts
export async function GET({ params }) {
  return {
    id: params.id,
  }
}
```

For unvalidated normal API routes, dynamic params are strings. Hot API routes can validate and refine params through schemas.

## Response Normalization

| Returned value | Planned response behavior |
| --- | --- |
| `Response` | Passed through unchanged. |
| Plain object | JSON response. |
| Array | JSON response. |
| `string` | Text response. |
| `null` | JSON `null` response unless method semantics require otherwise. |
| `undefined` | 204 No Content or diagnostic, final behavior must be explicit before implementation. |

Initial recommendation:

- Treat `undefined` as invalid for API handlers to avoid silent mistakes.
- Require explicit `new Response(null, { status: 204 })` for no-content responses.

## Status Codes

Handlers can return `Response` to control status:

```ts
export async function POST() {
  return Response.json({ created: true }, { status: 201 })
}
```

Future helpers may exist, but direct `Response` passthrough is enough for the first prototype.

## Request Body

Normal API route handlers can read the body from `request`:

```ts
export async function POST({ request }) {
  const body = await request.json()
  return { received: body }
}
```

Rules:

- Normal API routes do not automatically validate body.
- Hot API routes validate body when a `body` schema is exported.
- Body parsing errors should produce clear development errors and safe production responses.

## Error Behavior

Development:

- Return useful stack traces.
- Include route and source file when available.
- Include diagnostic codes when possible.

Production:

- Hide internal stack traces.
- Return stable 500 response.
- Log error details through adapter logging.
- Preserve explicit status codes.
- Do not expose secrets.

## 404 and 405

| Case | Behavior |
| --- | --- |
| No route matches | 404. |
| API file exists but method is not exported | 405 with `Allow` header. |
| Route matches page, not API | Page routing handles it. |
| Route matches API, but handler throws | Error behavior by environment. |

## Hot API Relationship

A hot API route is an API route with `apiHot()` render mode.

```ts
import { apiHot, schema } from "needlestart"

export const render = apiHot({
  validate: true,
  serialize: "generated",
})

export const params = schema.object({
  id: schema.uint64(),
})

export const response = schema.object({
  id: schema.uint64(),
  name: schema.string(),
})

export async function GET({ params }) {
  return {
    id: params.id,
    name: "Ada",
  }
}
```

Hot API routes may generate:

- Specialized route matcher.
- Params parser.
- Query parser.
- JSON body validator.
- Response serializer.
- Micro-cache lookup.
- OpenAPI schema.
- Typed client later.

## Validation

Normal API routes:

- No automatic schema validation initially.
- Params are strings or arrays of strings.
- Handler owns body parsing and validation.

Hot API routes:

- Validate `params`, `query`, and `body` when schemas are exported.
- Return structured 400 responses for invalid input.
- Validate or serialize response according to route config.

## OpenAPI Output

Initial OpenAPI generation can be limited to hot API routes because those have schema contracts.

OpenAPI output should include:

- Path.
- Method.
- Params schema.
- Query schema.
- Body schema.
- Response schema.
- Status codes when known.
- Diagnostics for unsupported schema features.

## API Manifest Data

API routes should appear in the route manifest:

```json
{
  "id": "app.api.users.$id",
  "path": "/api/users/:id",
  "file": "app/api/users/[id].ts",
  "kind": "api",
  "params": [{ "name": "id", "type": "string" }],
  "layouts": []
}
```

Render manifest entry:

```json
{
  "id": "app.api.users.$id",
  "path": "/api/users/:id",
  "mode": "api-hot",
  "cache": {
    "mode": "micro",
    "ttl": "100ms",
    "reason": "Route declares apiHot micro-cache."
  },
  "generatedFiles": ["dist/server/api/users.$id.js"]
}
```

## Needle Map Integration

API routes should create graph nodes and edges.

Planned node types:

- `api`
- `schema`
- `cacheTag`
- `test`
- `envVar`

Planned edges:

- `validatesWithSchema`
- `serializesWithSchema`
- `usesCacheTag`
- `usesEnv`
- `coveredByTest`
- `callsServerFn`

Every edge must include `source`, `confidence`, and `why`.

## Agent Context

Agent context for an API route may include:

```json
{
  "route": "/api/users/:id",
  "source": "app/api/users/[id].ts",
  "mode": "api-hot",
  "schemas": {
    "params": "UserParams",
    "response": "UserPublic"
  },
  "cache": {
    "mode": "micro",
    "ttl": "100ms",
    "tags": ["user"]
  },
  "checks": ["schema", "api", "map", "typecheck"],
  "dangerZones": []
}
```

## Security Rules

- API errors must not expose secrets in production.
- Request logs must redact authorization headers and cookies.
- Route params and query strings may contain sensitive data and should be handled carefully in logs.
- API route context must not expose raw environment values to manifests or MCP.
- File-system writes from API routes are application code, not safe edit operations.

## Diagnostics

| Code | Meaning |
| --- | --- |
| `NS_API_NO_METHOD` | API file has no valid HTTP method export. |
| `NS_API_INVALID_METHOD_EXPORT` | Method export is not a function. |
| `NS_API_UNSUPPORTED_METHOD` | Request method is not supported by route. |
| `NS_API_INVALID_RETURN` | Handler returned unsupported value. |
| `NS_API_BODY_PARSE_FAILED` | Request body could not be parsed. |
| `NS_API_SCHEMA_INVALID` | Schema export is malformed. |
| `NS_API_VALIDATION_FAILED` | Hot API input validation failed. |
| `NS_API_RESPONSE_INVALID` | Hot API response failed schema. |
| `NS_API_CACHE_INVALID` | API cache config is invalid. |
| `NS_API_OPENAPI_UNSUPPORTED` | API schema cannot be represented in current OpenAPI output. |

## Testing Requirements

API tests should cover:

- GET, POST, PUT, PATCH, DELETE, OPTIONS, and HEAD.
- Dynamic params.
- Catch-all params once catch-all APIs exist.
- Plain object JSON response.
- Array JSON response.
- Response passthrough.
- Invalid return rejection.
- 404 behavior.
- 405 behavior and `Allow` header.
- Development error format.
- Production error format.
- Hot API params validation.
- Hot API query validation.
- Hot API body validation.
- Hot API response serialization.
- OpenAPI generation.
- Cache headers and micro-cache behavior.

## Out of Scope Initially

- Auth/session framework.
- Middleware/proxy system.
- WebSockets.
- Streaming request body abstractions.
- Multipart helpers.
- RPC client generation.
- Server actions.
- Automatic database integration.
