# Configuration Contract

NeedleStart configuration is planned. This document defines the target shape for `needle.config.ts`, defaults, validation rules, and diagnostics.

The config contract should live in shared types so compiler, CLI, runtime adapters, SEO, cache, map, agent, MCP, and devtools agree on one source of truth.

## Goals

- Keep project configuration explicit and typed.
- Make defaults safe for SEO and production runtime behavior.
- Keep user app code portable across Bun, Node, and static adapters.
- Keep secrets out of manifests and agent output.
- Make adapter capabilities visible before deployment.
- Prefer build-time decisions over runtime magic.

## Config File

Default config path:

```txt
needle.config.ts
```

Supported planned names, in priority order:

1. `needle.config.ts`
2. `needle.config.mts`
3. `needle.config.js`
4. `needle.config.mjs`

TypeScript config is preferred. JSON config is not planned for the first prototype because helper functions and typed route policies are part of the design.

## Minimal Config

```ts
import { defineConfig } from "needlestart"

export default defineConfig({})
```

## Full Draft

```ts
import { defineConfig } from "needlestart"

export default defineConfig({
  app: {
    root: "app",
    basePath: "/",
    trailingSlash: false,
  },
  runtime: "bun",
  adapter: "bun",
  server: {
    host: "127.0.0.1",
    port: 3000,
    health: {
      enabled: true,
      path: "/_needle/health",
      exposeInProduction: false,
    },
  },
  seo: {
    siteUrl: "https://example.com",
    defaultTitle: "Example",
    defaultDescription: "Example site built with NeedleStart.",
    sitemap: true,
    robots: {
      index: true,
      follow: true,
    },
  },
  performance: {
    budgets: {
      publicPageJs: "80kb",
      routeCss: "30kb",
      lcpImageMaxBytes: "180kb",
      maxHydrationComponents: 12,
    },
    failBuildOnBudget: true,
  },
  cache: {
    defaultHtml: "no-store",
    staticAssets: "immutable",
    manifest: true,
  },
  agent: {
    context: true,
    llmsTxt: true,
    safeEdits: true,
  },
  mcp: {
    enabled: true,
    defaultMode: "read-only",
  },
  experimental: {
    streaming: false,
    rsc: false,
    partialPrerendering: false,
  },
})
```

## Config Shape

```ts
export type NeedleConfig = {
  app?: AppConfig
  runtime?: "bun" | "node"
  adapter?: "bun" | "node" | "static" | string
  server?: ServerConfig
  seo?: SeoConfig
  performance?: PerformanceConfig
  cache?: CacheConfig
  agent?: AgentConfig
  mcp?: McpConfig
  experimental?: ExperimentalConfig
}
```

## Defaults

| Field | Default | Notes |
| --- | --- | --- |
| `app.root` | `app` | Source directory for routes. |
| `app.basePath` | `/` | URL base path. |
| `app.trailingSlash` | `false` | URLs do not end with slash unless root. |
| `runtime` | `bun` | Local/default runtime target. |
| `adapter` | `bun` | Production output adapter. |
| `server.host` | `127.0.0.1` | Dev/start default host. |
| `server.port` | `3000` | Dev/start default port. |
| `server.health.enabled` | `true` | Health endpoint can be emitted. |
| `server.health.path` | `/_needle/health` | Must not collide with user routes. |
| `server.health.exposeInProduction` | `false` | Production exposure requires opt-in. |
| `seo.sitemap` | `true` | Generate sitemap for public routes. |
| `seo.robots.index` | `true` | Public routes indexable unless excluded. |
| `seo.robots.follow` | `true` | Follow links unless excluded. |
| `performance.failBuildOnBudget` | `false` in dev, `true` in CI when configured | Exact policy can evolve. |
| `cache.defaultHtml` | `no-store` for SSR and API | Static and prerendered routes use route mode. |
| `cache.staticAssets` | `immutable` for hashed assets | HTML is never treated as hashed asset. |
| `agent.context` | `true` in dev/build, excluded from production bundles | Agent files are build artifacts, not runtime payload. |
| `mcp.defaultMode` | `read-only` | Write tools require safe edits. |
| `experimental.*` | `false` | Experimental features are opt-in. |

## App Config

```ts
export type AppConfig = {
  root?: string
  basePath?: string
  trailingSlash?: boolean
  routeGroups?: boolean
}
```

Rules:

- `root` must be a relative path inside the project root.
- `basePath` must start with `/`.
- `basePath` must not end with `/` unless it is `/`.
- `trailingSlash` must be applied consistently across route manifest, sitemap, canonical URLs, and generated links.
- Route groups are enabled by default because they are part of the planned routing convention.

## Runtime and Adapter

`runtime` describes the default local execution target.

`adapter` controls production build output.

```ts
export default defineConfig({
  runtime: "bun",
  adapter: "bun",
})
```

Initial adapters:

| Adapter | Purpose |
| --- | --- |
| `bun` | Default production adapter using Bun APIs internally. |
| `node` | Compatibility adapter for teams that cannot deploy Bun. |
| `static` | Static export adapter for fully static route sets. |

User application code must not require Bun-only APIs. Bun-specific behavior belongs inside adapter packages.

## Server Config

```ts
export type ServerConfig = {
  host?: string
  port?: number
  health?: {
    enabled?: boolean
    path?: string
    exposeInProduction?: boolean
  }
  logging?: {
    requests?: boolean
    format?: "pretty" | "json"
  }
}
```

Rules:

- Health endpoint path must not collide with app routes.
- Production health exposure must be explicit.
- Request logging must not include secrets, authorization headers, or full cookie values.

## SEO Config

```ts
export type SeoConfig = {
  siteUrl?: string
  defaultTitle?: string
  defaultDescription?: string
  sitemap?: boolean | SitemapConfig
  robots?: RobotsConfig
  openGraph?: {
    defaultImage?: string
  }
  feeds?: {
    rss?: boolean
    atom?: boolean
    json?: boolean
  }
}
```

Rules:

- `siteUrl` is required before generating absolute canonical URLs for production.
- Public indexable routes should have explicit title, description, and canonical URL.
- A default title or description may be used for development diagnostics, but production SEO checks should prefer route-level metadata.
- `robots` output must agree with sitemap inclusion and route-level metadata.

## Performance Config

```ts
export type PerformanceConfig = {
  budgets?: {
    publicPageJs?: string
    routeCss?: string
    lcpImageMaxBytes?: string
    maxHydrationComponents?: number
  }
  failBuildOnBudget?: boolean
}
```

Rules:

- Size strings use base-10 `kb` and `mb` units unless implementation decides otherwise and documents it.
- Budget diagnostics must include the route, metric, measured value, limit, and recommendation.
- Public page budgets should be stricter by default than authenticated app routes.

## Cache Config

```ts
export type CacheConfig = {
  defaultHtml?: "no-store" | "private" | "public"
  staticAssets?: "immutable" | "public" | "no-store"
  manifest?: boolean
  microCache?: {
    enabled?: boolean
    maxTtl?: string
  }
}
```

Rules:

- No invisible caching.
- Every cacheable route, function, component, or API response must expose a cache plan in a manifest.
- SSR and API routes default to `no-store` unless route config opts in.
- Hot API micro-cache must be explicit and bounded.

## Agent Config

```ts
export type AgentConfig = {
  context?: boolean
  llmsTxt?: boolean
  llmsFullTxt?: boolean
  safeEdits?: boolean
  productionBundlesExcludeContext?: boolean
}
```

Rules:

- Agent metadata must not ship in production runtime bundles.
- `llms-full.txt` can be large and should be excluded from production output unless explicitly requested.
- Safe edit settings must not lower risk gates silently.

## MCP Config

```ts
export type McpConfig = {
  enabled?: boolean
  defaultMode?: "read-only" | "write-gated"
  transport?: "stdio" | "http"
  host?: string
  port?: number
}
```

Rules:

- Initial MCP implementation should be read-only.
- HTTP MCP must bind to localhost by default.
- Write tools must use the same safe edit transaction path as CLI write commands.
- MCP tools must not expose secrets.

## Experimental Config

```ts
export type ExperimentalConfig = {
  streaming?: boolean
  rsc?: boolean
  partialPrerendering?: boolean
  devtools?: boolean
}
```

Rules:

- Experimental flags are opt-in.
- Experimental output must be clearly marked in manifests and diagnostics.
- RSC must not become the default render path before stable SSR, SSG, streaming, and route compiler exist.

## Environment Variables

Configuration may read environment variables, but generated manifests must not include secret values.

Allowed in public manifests:

- Names of required environment variables.
- Whether a required variable is present.
- Public values explicitly prefixed or configured as public.

Not allowed in public manifests:

- Secret values.
- Authorization headers.
- Cookies.
- API tokens.
- Full connection strings.

## Config Diagnostics

Potential diagnostic codes:

| Code | Meaning |
| --- | --- |
| `NS_CONFIG_NOT_FOUND` | Required config file was not found. |
| `NS_CONFIG_LOAD_FAILED` | Config file could not be loaded. |
| `NS_CONFIG_INVALID` | Config shape failed validation. |
| `NS_CONFIG_BASE_PATH_INVALID` | `app.basePath` is malformed. |
| `NS_CONFIG_ADAPTER_UNKNOWN` | Adapter is unknown or not installed. |
| `NS_CONFIG_ADAPTER_UNSUPPORTED` | Adapter cannot support requested route output. |
| `NS_CONFIG_HEALTH_COLLISION` | Health endpoint collides with an app route. |
| `NS_CONFIG_SECRET_EXPOSED` | Config attempted to expose a secret. |

## Implementation Notes

- Config loading should happen before route discovery.
- The normalized config should be part of `NeedleApp`.
- CLI, compiler, runtime adapters, map, SEO, MCP, and agent packages must read normalized config instead of reparsing config independently.
- The compiler may emit a redacted config summary in build manifests.
- Adapter-specific config must remain behind adapter boundaries.

## Documentation Rule

When a config field is added, update:

- this file
- `docs/manifest-contracts.md` if it affects generated output
- `docs/cli.md` if a flag maps to the field
- `docs/adapters.md` or `docs/deployment.md` if it affects runtime output
- `AGENTS.md` if agents need to know the rule
