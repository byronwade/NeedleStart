# Configuration Reference

Status: Planned.

Audience: app developers, adapter maintainers.

NeedleStart configuration is planned to live in `needle.config.ts`.

## Planned Minimal Config

```ts
import { defineConfig } from "needlestart"

export default defineConfig({
  runtime: "bun",
  adapter: "bun",
})
```

This API is planned and not implemented.

`runtime` is the planned local execution and server-code compatibility target. `adapter` is the planned production output selector: `bun` maps to `@needle/adapter-bun`, `node` maps to `@needle/adapter-node`, and `static` maps to `@needle/adapter-static`. Build output should record the resolved adapter runtime in `dist/adapter.manifest.json` as `runtime.name`.

## Source

- [Configuration Reference](../../config.md)
- [Configuration Contract](../../config-contract.md)

