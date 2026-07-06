# Schema Contract

Status: Planned.

Audience: framework contributors, app developers, API route authors, runtime adapter authors, AI agents.

This page defines the planned schema contract for Lumina. The schema package is not implemented yet. This contract exists so API routes, hot APIs, generated serializers, OpenAPI output, CLI diagnostics, and agent context use the same validation vocabulary from the beginning.

## Contract Goals

Lumina schemas should:

- validate unknown input at API boundaries,
- infer stable TypeScript input and output types,
- produce deterministic validation issues,
- generate fast serializers for hot API responses,
- map predictably to OpenAPI and JSON Schema-compatible shapes,
- stay small and tree-shakable enough for hot paths,
- avoid arbitrary runtime hooks in the first implementation.

## Initial DSL

The first schema path should cover only the types needed for route params, query strings, JSON bodies, and API responses.

Planned helpers:

| Helper | Purpose | OpenAPI direction |
| --- | --- | --- |
| `schema.string()` | UTF-8 string values. | `{ "type": "string" }` |
| `schema.number()` | Finite JSON number values. | `{ "type": "number" }` |
| `schema.boolean()` | Boolean values. | `{ "type": "boolean" }` |
| `schema.enum([...])` | Fixed string union. | `{ "type": "string", "enum": [...] }` |
| `schema.array(item)` | Homogeneous arrays. | `{ "type": "array", "items": ... }` |
| `schema.object(shape)` | JSON objects with known fields. | `{ "type": "object", "properties": ... }` |
| `schema.uint64()` | Unsigned 64-bit integer represented safely for APIs. | String or integer mapping must be decided before implementation. |
| `.optional()` | Field may be omitted. | Omit from `required`. |
| `.default(value)` | Apply default when input is absent. | Emit default when compatible. |

Out-of-scope for the first implementation:

- arbitrary custom validators,
- transforms that change output shape,
- async validation,
- unions beyond string enums,
- recursive schemas,
- branded or nominal types,
- full compatibility with Zod, Valibot, or other schema libraries.

## Input And Output Types

Schemas should distinguish input and output types.

Example:

```ts
const Query = schema.object({
  page: schema.number().default(1),
  tag: schema.string().optional(),
})
```

Planned type direction:

```ts
type QueryInput = InferInput<typeof Query>
type QueryOutput = InferOutput<typeof Query>
```

Defaults and optional fields can make input and output differ. Implementation must document those differences before exposing public types.

## Parse Results

Lumina should provide a throwing parse path for tests and internal compiler checks, plus a non-throwing safe parse path for request handling.

Draft result shape:

```ts
type SchemaResult<T> =
  | { ok: true; value: T }
  | { ok: false; issues: SchemaIssue[] }
```

Draft issue shape:

```ts
type SchemaIssue = {
  code: string
  path: Array<string | number>
  message: string
  expected?: string
  received?: string
}
```

Rules:

- Issue order must be deterministic.
- Paths must use object keys and array indexes.
- Messages must be concise and stable enough for tests.
- Sensitive input values must not be included by default.
- Public API error responses may wrap schema issues, but the issue shape should remain recognizable.

## API Route Integration

API routes may export schemas for params, query, body, and response values.

```ts
export const params = schema.object({
  id: schema.uint64(),
})

export const body = schema.object({
  name: schema.string(),
})

export const response = schema.object({
  id: schema.uint64(),
  name: schema.string(),
})
```

See [API Route Contract](api-route-contract.md).

Planned behavior:

- Params schemas validate route params after route matching.
- Query schemas validate `URLSearchParams` after deterministic coercion rules are applied.
- Body schemas validate parsed JSON request bodies only when a body schema exists.
- Response schemas validate or serialize handler output in development, tests, and hot API paths.
- Validation failures return stable API error responses.

## Query Coercion

Query strings are not JSON. Coercion rules must be explicit before implementation.

Planned conservative default:

- Raw query values start as strings.
- Repeated query keys produce arrays only when the schema expects an array.
- `schema.number()` may coerce from decimal string only when the route opts into schema validation.
- `schema.boolean()` may accept only `true` and `false` strings when coerced.
- Unknown query keys are ignored or rejected according to an object policy that must be documented before release.

No hidden coercion should happen outside schema validation.

## Object Policy

The first object policy should be strict enough for generated serializers and predictable API docs.

Planned default:

- Required fields must exist unless marked optional or defaulted.
- Unknown object keys are rejected for request bodies in strict mode.
- Unknown object keys are dropped or rejected for responses according to a route-level policy.
- Object field order in generated schemas and serializers follows source declaration order, then stable sort if source order cannot be preserved.

The exact default must be finalized with tests before implementation is marked complete.

## Serialization

Hot API routes may use schemas to generate response serializers.

Serializer requirements:

- Output JSON field order must be deterministic.
- Missing required response fields fail in development and tests.
- Extra response fields follow the object policy.
- `uint64` serialization must be stable across Bun and Node.
- Serializer fixtures must compare normal API and hot API output for the same route.

## OpenAPI Mapping

Lumina should generate OpenAPI-compatible schema output after the schema DSL and API routes exist.

Rules:

- Generated OpenAPI must be deterministic.
- Schema names must be stable and derived from route IDs or explicit names.
- Unsupported schema features must produce diagnostics instead of partial or misleading OpenAPI.
- Public OpenAPI claims require generated fixture evidence.

OpenAPI version choice belongs in the implementation task. OpenAPI 3.1 aligns closely with JSON Schema 2020-12, but the final choice should consider ecosystem compatibility.

## Diagnostics

Required planned diagnostics:

| Code | Severity | When |
| --- | --- | --- |
| `SCHEMA_UNSUPPORTED_TYPE` | `error` | A schema helper is not supported by the current compiler/runtime path. |
| `SCHEMA_INVALID_DEFAULT` | `error` | A default value does not satisfy its schema. |
| `SCHEMA_QUERY_COERCION_FAILED` | `error` | A query value cannot be coerced according to schema rules. |
| `SCHEMA_RESPONSE_MISMATCH` | `error` in tests/dev | Handler output does not satisfy response schema. |
| `SCHEMA_OPENAPI_UNSUPPORTED` | `warning` or `error` | A schema cannot be represented accurately in OpenAPI output. |
| `SCHEMA_SERIALIZER_UNSUPPORTED` | `error` | A hot API response schema cannot produce a safe serializer. |

Diagnostics must include normalized source file, exported schema name when known, route ID when relevant, and a concise remediation.

## Manifest Fields And References

`.lumina/routes.json` and `.lumina/render-manifest.json` should expose schema usage through stable manifest references without embedding large schema definitions in every route entry.

Draft route fields:

```json
{
  "schemas": {
    "params": "app/api/users/[id].ts#params",
    "query": null,
    "body": "app/api/users/[id].ts#body",
    "response": "app/api/users/[id].ts#response"
  }
}
```

Draft schema index entry:

```json
{
  "id": "schema.app.api.users.$id.response",
  "sourceFile": "app/api/users/[id].ts",
  "exportName": "response",
  "kind": "object",
  "usedBy": ["app.api.users.$id.api"]
}
```

The exact schema manifest can live in `.lumina/graph.json`, `.lumina/map.json`, or a future schema manifest. The important invariant is that schema references are stable and source-linked.

## Fixture Requirements

The first schema implementation should include fixtures for:

- primitive validation,
- object required fields,
- optional fields,
- defaults,
- arrays,
- enums,
- `uint64`,
- query coercion success and failure,
- request body validation,
- response validation failure,
- response serialization stability,
- OpenAPI output for supported schemas,
- unsupported schema diagnostics.

Tests must run deterministically on supported operating systems and runtimes.

## Research Notes

This contract adapts current patterns from schema and API documentation:

- Zod documents schema definitions, `parse`, non-throwing `safeParse`, and error formatting.
- Valibot documents modular schemas, parse variants, safe parse results, and input/output type inference.
- Standard Schema shows the ecosystem value of common validation interfaces and consistent issue shapes.
- OpenAPI 3.1 models data with Schema Objects aligned with JSON Schema concepts, so generated API docs need explicit schema mapping rules.

Lumina should learn from these systems without promising full compatibility before the small first schema path is implemented and benchmarked.

## Out Of Scope

- Full Zod compatibility.
- Full Valibot compatibility.
- Arbitrary transforms and refinements.
- Runtime plugin validators in hot API paths.
- Cross-language SDK generation.
- Public OpenAPI guarantees before generated fixture output exists.
