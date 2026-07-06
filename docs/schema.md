# Schema

Status: Planned.

Audience: app developers, framework contributors, AI agents.

The schema package is planned to provide validation and serialization contracts for hot APIs, route params, request bodies, responses, and generated OpenAPI output.

The planned schema DSL, `SchemaResult`, `SchemaIssue`, `InferInput`, `InferOutput`, query coercion rules, serializer requirements, OpenAPI mapping, diagnostics, manifest fields, and fixtures are defined in [Schema Contract](schema-contract.md). API route schema exports are planned in [API Route Contract](api-route-contract.md). Hot API schema behavior is planned in [Hot API Path](hot-api-path.md).

## Initial Scope

- `string`
- `number`
- `boolean`
- `enum`
- `array`
- `object`
- `uint64`
- optional fields
- default values

## Rules

- Schemas used by hot APIs must be deterministic.
- Validation result shape must stay recognizable as `SchemaResult`.
- Validation issue shape must stay recognizable as `SchemaIssue`.
- Validation errors must be structured.
- Response serializers must be tested against fixtures.
- OpenAPI output must be stable.
- Input and output type inference through `InferInput` and `InferOutput` must be documented before public helpers are marked implemented.
- Query coercion must be explicit and test-backed.
- Unsupported schema features must produce `SCHEMA_` diagnostics instead of partial generated output.
- Manifest references must stay stable and source-linked.

## Out Of Scope

- Full Zod compatibility in the first schema path.
- Arbitrary custom runtime validators.
- Cross-language client generation before the hot API path is proven.
