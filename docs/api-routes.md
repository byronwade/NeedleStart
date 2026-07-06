# API Routes

Status: Planned.

Audience: app developers, framework contributors, AI agents.

NeedleStart plans to support API route files under `app/api/`.

API route discovery is part of the planned [Routing Contract](routing-contract.md). Handler argument and response typing will be finalized when the API route implementation exists.

The planned handler contract, return normalization, schemas, diagnostics, security requirements, manifest fields, and fixture expectations are defined in [API Route Contract](api-route-contract.md).

## Planned Example

```ts
export async function GET() {
  return { ok: true }
}
```

## Requirements

- Common HTTP methods work.
- Dynamic API params work.
- Plain objects become JSON responses.
- Response objects pass through.
- Errors are readable in development and hidden in production.
- Hot API routes can opt into generated validation and serialization.

See [Hot API Path](hot-api-path.md), [Schema](schema.md), and [Public API Routes Reference](public/reference/api-routes.md).

## Out Of Scope

- Final handler argument types before implementation.
- Auth, sessions, or rate limiting in the early API route scope.
- Hot API benchmarking before benchmark fixtures exist.
