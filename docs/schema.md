# Schema

Status: Planned.

Audience: app developers, framework contributors, AI agents.

The schema package is planned to provide validation and serialization contracts for hot APIs, route params, request bodies, responses, and generated OpenAPI output.

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
- Validation errors must be structured.
- Response serializers must be tested against fixtures.
- OpenAPI output must be stable.

## Out Of Scope

- Full Zod compatibility in the first schema path.
- Arbitrary custom runtime validators.
- Cross-language client generation before the hot API path is proven.
