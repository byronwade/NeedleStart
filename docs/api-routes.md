# API Routes

Status: Planned.

Audience: app developers, framework contributors, AI agents.

NeedleStart plans to support API route files under `app/api/`.

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

See `docs/hot-api-path.md` and `docs/schema.md`.

## Out Of Scope

- Final handler argument types before implementation.
- Auth, sessions, or rate limiting in the early API route scope.
- Hot API benchmarking before benchmark fixtures exist.
