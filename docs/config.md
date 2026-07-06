# Configuration Reference

Status: Planned.

Audience: app developers, framework contributors, adapter maintainers, AI agents.

NeedleStart configuration is planned to live in `needle.config.ts`.

## Planned Minimal Config

```ts
import { defineConfig } from "needlestart"

export default defineConfig({
  runtime: "bun",
  adapter: "bun",
})
```

## Planned Config Areas

- Runtime target.
- Production adapter.
- Route behavior.
- SEO defaults.
- Cache defaults.
- Generated output paths.
- Agent and MCP behavior.
- Devtools.
- Performance budgets.

## Rules

- Config should be typed.
- Defaults should be explicit in reference docs.
- Runtime adapter options must not leak Bun-only APIs into user app code.
- Config changes that affect generated artifacts must update manifest docs.

## Out Of Scope

- Final config defaults before package implementation.
- Host-specific deployment config.
- Secret management beyond documented environment-variable safety rules.
