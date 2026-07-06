# Create A Hot API Route

Status: Planned.

Audience: advanced app developers, performance reviewers.

Hot API routes are planned for performance-critical endpoints that need generated validation and serialization.

## Planned Example

```ts
import { apiHot, schema } from "needlestart"

export const render = apiHot({
  validate: true,
  serialize: "generated",
})

export const params = schema.object({
  id: schema.uint64(),
})
```

## Evidence Requirement

Hot API performance claims require benchmark methodology and raw results. Do not claim this path is faster until benchmarks exist.

## Source

- [Hot API Path](../../hot-api-path.md)
- [Schema](../../schema.md)
- [Benchmark Honesty](../deployment/benchmarks.md)

