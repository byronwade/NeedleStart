# Schema

Status: Planned.

Audience: app developers, AI agents.

Lumina plans a small schema DSL for API route validation, hot API serializers, and generated API documentation. The exact planned contract lives in [Schema Contract](../../schema-contract.md).

## Planned Helpers

Initial helpers:

- `schema.string()`
- `schema.number()`
- `schema.boolean()`
- `schema.enum([...])`
- `schema.array(item)`
- `schema.object(shape)`
- `schema.uint64()`
- `.optional()`
- `.default(value)`

## Planned API Route Usage

```ts
import { schema } from "lumina"

export const params = schema.object({
  id: schema.uint64(),
})

export const response = schema.object({
  id: schema.uint64(),
  name: schema.string(),
})
```

Schemas are planned to validate params, query strings, request bodies, and responses. Hot API routes should use schemas to generate faster validators and serializers.

## Planned Result And Type Shapes

- Safe parsing should return a `SchemaResult`.
- Validation issues should use a `SchemaIssue` shape.
- Public type helpers should include `InferInput` and `InferOutput`.
- Query coercion rules must be explicit before implementation.
- Response serializers must be deterministic and fixture-tested.
- OpenAPI mapping should produce stable generated output for supported schemas.
- Unsupported schema features should produce `SCHEMA_` diagnostics instead of partial output.
- Manifest references should stay stable and source-linked.

## Current Status

This behavior is not implemented yet. The repository is in Phase 1 scaffold, so examples are target API design rather than verified commands.

## Source

- [Schema](../../schema.md)
- [Schema Contract](../../schema-contract.md)
- [API Route Contract](../../api-route-contract.md)
- [Hot API Path](../../hot-api-path.md)
