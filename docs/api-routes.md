# API Routes

Status: Planned.

Audience: app developers, framework contributors, AI agents.

NeedleStart plans to support API route files under `app/api/`.

API route discovery is part of the planned [Routing Contract](routing-contract.md). Handler argument and response typing will be finalized when the API route implementation exists.

The planned `ApiRouteContext`, method exports, Web `Request` and `Response` behavior, return normalization, schemas, diagnostics, security requirements, generated manifests, and fixture expectations are defined in [API Route Contract](api-route-contract.md).

## Planned Example

```ts
export async function GET() {
  return { ok: true }
}
```

## Requirements

- Common HTTP methods should work.
- Dynamic API params should work.
- Handlers receive Web `Request` and route metadata through the planned `ApiRouteContext`.
- Plain objects should become JSON responses.
- Response objects should pass through.
- Validation failures use the planned `VALIDATION_FAILED` response shape.
- API routes default to `no-store` unless explicit cache config opts in.
- Route config may include planned `bodyLimit` behavior.
- API route diagnostics use `API_METHOD_` and related `API_` codes.
- Generated manifests should list methods, schemas, cache behavior, diagnostics, and hot API status.
- Errors should be readable in development and hidden in production.
- Hot API routes can opt into generated validation and serialization.

See [Hot API Path](hot-api-path.md), [Schema](schema.md), and [Public API Routes Reference](public/reference/api-routes.md).

## Out Of Scope

- Final handler argument types before implementation.
- Auth, sessions, or rate limiting in the early API route scope.
- Hot API benchmarking before benchmark fixtures exist.
