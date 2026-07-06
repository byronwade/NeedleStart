# Create An API Route

Status: Planned.

Audience: app developers, framework contributors.

This guide describes the planned API route workflow.

## Planned File

```txt
app/api/health.ts
```

## Planned Example

```ts
export async function GET() {
  return { ok: true }
}
```

## Planned Behavior

- Common HTTP methods work.
- Plain objects become JSON responses.
- Response objects pass through.
- Errors are readable in development and hidden in production.

## Source

- [API Routes](../../api-routes.md)
- [Create A Hot API Route](hot-api.md)

