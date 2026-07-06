# API Routes

Status: Planned.

Audience: app developers, AI agents.

NeedleStart plans to support API route files under `app/api/`. This public reference summarizes the target developer-facing behavior. The exact planned compiler and runtime contract lives in [API Route Contract](../../api-route-contract.md).

## Planned File Convention

```txt
app/
  api/
    health.ts
    users/
      [id].ts
```

| File | Route |
| --- | --- |
| `app/api/health.ts` | `/api/health` |
| `app/api/users/[id].ts` | `/api/users/:id` |

## Planned Handler Exports

```ts
export async function GET({ params, query, request }) {
  return { ok: true }
}
```

Planned method exports include `GET`, `POST`, `PUT`, `PATCH`, `DELETE`, `HEAD`, and `OPTIONS`.

Handlers are planned to receive Web `Request` and route metadata through `ApiRouteContext`.

## Planned Return Behavior

- `Response` values pass through.
- Plain objects and arrays become JSON responses.
- Strings become text responses unless a helper marks another response type.
- `null` or `undefined` should become an explicit empty response or diagnostic depending on method and strictness.

## Planned Validation

API routes may export schemas for params, query, body, and response values once the schema package exists.

```ts
import { schema } from "needlestart"

export const params = schema.object({
  id: schema.uint64(),
})
```

Hot API routes use the same schema direction with generated validators and serializers.

Validation failures should use the planned `VALIDATION_FAILED` response shape.

## Planned Config And Manifests

- API routes default to `no-store` unless explicit cache config opts in.
- Route config may include planned `bodyLimit` behavior.
- Generated manifests should list methods, schemas, cache behavior, diagnostics, and hot API status.
- API route diagnostics should use `API_METHOD_` and related `API_` codes.
- Production security behavior must hide stack traces, secrets, and local paths.

## Current Status

This behavior is not implemented yet. The repository is in Phase 1 scaffold, so examples are target API design rather than verified commands.

## Source

- [API Routes](../../api-routes.md)
- [API Route Contract](../../api-route-contract.md)
- [Routing Contract](../../routing-contract.md)
- [Schema](../../schema.md)
- [Hot API Path](../../hot-api-path.md)
