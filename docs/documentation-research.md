# Documentation Research Notes

Status: Draft.

Audience: maintainers, documentation contributors, future website editors, AI agents.

This document records primary-source lessons from leading framework and developer-tool documentation. It supports the strategy in `docs/documentation-audit.md`.

## Research Method

The research focused on current official documentation and public open source governance guidance. The goal is not to copy another project's navigation, but to identify patterns NeedleStart should adapt for an app-graph-native, SEO-first, agent-safe framework.

## Reference Projects

### Next.js

Primary source: <https://nextjs.org/docs>

What it does exceptionally well:

- Separates getting started material, guides, API reference, architecture, and deployment.
- Gives beginners a clear default path.
- Gives advanced users precise API and file-convention references.
- Includes AI-agent guidance and bundled docs awareness in recent documentation.

What becomes hard:

- The App Router and Pages Router history creates a larger navigation surface.
- Advanced behavior can require jumping across concept pages, file conventions, and API reference.

NeedleStart lesson:

- Use Next.js-level navigation clarity, but avoid multiple historical router modes before the product is stable.

### Astro

Primary source: <https://docs.astro.build/>

What it does exceptionally well:

- Strong beginner path.
- Clear recipes for practical tasks.
- Friendly contribution culture around docs.
- Good separation of core concepts, guides, reference, and integrations.

What becomes hard:

- Some topics can be split between recipes, guides, and reference pages.

NeedleStart lesson:

- Use recipes/guides for tasks, but keep exact contracts in reference pages.

### TanStack Start

Primary source: <https://tanstack.com/start/latest/docs/framework/react/overview>

What it does exceptionally well:

- Strong full-stack and type-safety framing.
- Clear relationship to TanStack Router.
- Modern app architecture vocabulary.

What becomes hard:

- Younger docs surface than long-established frameworks.

NeedleStart lesson:

- Be explicit about typed route and app-graph contracts from the beginning.

### TanStack Router

Primary source: <https://tanstack.com/router/latest/docs/framework/react/overview>

What it does exceptionally well:

- Treats routing as a typed contract.
- Provides precise APIs for route definitions and route trees.
- Helps advanced users reason about route behavior.

What becomes hard:

- Type-driven concepts can be dense for new users.

NeedleStart lesson:

- Make graph and route contracts exact, but pair them with beginner examples and diagrams.

### React Router And Remix

Primary sources:

- <https://reactrouter.com/>
- <https://v2.remix.run/docs>

What they do exceptionally well:

- Strong route-module mental model.
- Clear data loading and mutation concepts.
- Mature community and migration history.

What becomes hard:

- Product evolution can create naming and migration confusion.

NeedleStart lesson:

- Keep route conventions stable and document migration scope honestly.

### Vite

Primary source: <https://vite.dev/>

What it does exceptionally well:

- Concise guide/reference split.
- Precise config reference.
- Clear plugin and build concepts.

What becomes hard:

- Vite is not an app framework, so users need higher-level framework docs elsewhere.

NeedleStart lesson:

- Keep low-level config and adapter reference compact and exact.

### SvelteKit

Primary source: <https://svelte.dev/docs/kit>

What it does exceptionally well:

- Detailed routing and file-convention reference.
- Clear deployment adapter model.
- Strong explanation of special files.

What becomes hard:

- Dense reference pages can overwhelm beginners.

NeedleStart lesson:

- Give file conventions their own exact reference, then link from beginner guides.

### Nuxt

Primary source: <https://nuxt.com/docs>

What it does exceptionally well:

- Clear directory conventions.
- Strong deployment and module documentation.
- Good split between getting started, guide, API, and examples.

What becomes hard:

- Large module ecosystems can make navigation broad quickly.

NeedleStart lesson:

- Document core package and adapter boundaries before adding ecosystem content.

### Supabase

Primary source: <https://supabase.com/docs>

What it does exceptionally well:

- Product docs are organized around user jobs and product surfaces.
- Strong quickstarts and references.
- Clear local development and platform management docs.

What becomes hard:

- Broad platform scope makes navigation large.

NeedleStart lesson:

- Segment docs by audience and job, especially app developers vs maintainers vs agents.

### Stripe

Primary sources:

- <https://docs.stripe.com/>
- <https://docs.stripe.com/api>

What it does exceptionally well:

- Excellent API reference.
- Strong quickstarts.
- Versioning and test-mode concepts are explicit.
- Examples focus on concrete outcomes.

What becomes hard:

- Domain complexity requires many cross-links.

NeedleStart lesson:

- Treat CLI, config, manifest, and JSON schemas as first-class references with versioning.

### Vercel

Primary sources:

- <https://vercel.com/docs>
- <https://vercel.com/docs/build-output-api>

What it does exceptionally well:

- Connects guides, platform concepts, API reference, deployments, and build output.
- Documents build artifacts as contracts.

What becomes hard:

- Platform-specific docs can blur framework-neutral guidance.

NeedleStart lesson:

- Document adapter and build output contracts without tying the framework to one host.

### Open Source Governance References

Primary source: <https://opensource.guide/leadership-and-governance/>

What it does exceptionally well:

- Makes governance roles and decision models explicit.
- Explains why project leadership should be documented before growth.

NeedleStart lesson:

- Keep governance lightweight during the scaffold phase, but document decision records, review ownership, and escalation paths early.

## Patterns NeedleStart Should Copy

- Clear "Start here" path.
- Separate guide and reference lanes.
- Exact file-convention reference.
- Strong API/config/CLI reference.
- Deployment and compatibility pages.
- Status and version labels.
- Governance and security pages before public growth.
- Evidence-backed benchmark docs.

## 2026 Research Refresh

Recent documentation patterns reinforce three priorities for NeedleStart:

- Next.js docs expose a project-structure reference as a first-class getting-started page and now include AI-agent guidance plus generated `llms-full.txt` access. NeedleStart should keep project structure and AI context discoverable from the public docs landing.
- Vite keeps config documentation concise and reference-oriented. NeedleStart should avoid hiding config, adapter, and build-output contracts inside tutorials.
- AI-native docs providers such as Mintlify and framework docs such as the Vercel AI SDK expose `llms.txt` or `llms-full.txt` for agent consumption. NeedleStart should treat `llms.txt`, `llms-full.txt`, and `docs-index.json` as generated docs products once tooling exists.
- Documentation quality systems such as Diataxis, Google developer documentation guidance, Microsoft Learn guidance, and OpenAPI's source-controlled contract model all point to the same operational need: separate content types, consistent style, source-controlled machine-readable contracts, and repeatable checks.
- Versioning and upgrade docs from Next.js, Vite, and Stripe reinforce that breaking changes need dedicated upgrade guides, changelogs, compatibility evidence, and versioned API or schema contracts.
- Docs-site frameworks such as VitePress, Docusaurus, Nextra, and Mintlify all use page metadata, frontmatter or config files, sidebar models, and route conventions. NeedleStart should define those contracts before building the public docs surface.
- CLI design guidance from clig.dev, GitHub CLI, Google Cloud CLI, and Heroku reinforces that human output and machine-readable output should be treated differently: JSON output and exit codes are automation contracts, while human text can evolve.
- Vite, Next.js, and Astro documentation show that config loading and environment-variable exposure need explicit rules because build-time, runtime, server-only, and public client variables behave differently.
- Current routing docs from Next.js, SvelteKit, Nuxt, and Astro show that mature file-based routers document segment grammar, route groups, catch-all behavior, route handlers or endpoints, and precedence rules explicitly. NeedleStart should keep a separate routing contract so the public overview stays readable while compiler fixtures have exact expectations.
- Current endpoint docs from Next.js, SvelteKit, Astro, and Hono show that API route documentation should name method exports, Web request/response behavior, route params, explicit body parsing, validation, and generated API documentation boundaries. NeedleStart should keep normal API routes and hot API generated paths connected but distinct.
- Current schema docs from Zod, Valibot, Standard Schema, JSON Schema, and OpenAPI show that validation docs need to separate definition, parse behavior, safe parse behavior, issue formatting, input/output type inference, and schema-to-API-documentation mapping. NeedleStart should keep its first schema DSL small and document unsupported features explicitly.
- Current cache docs from MDN, Next.js, SvelteKit, and Astro show that cache behavior needs both HTTP vocabulary and framework-specific invalidation rules. NeedleStart should document cache plans, tags, revalidation, headers, manifests, and unsafe-cache diagnostics together instead of hiding them in runtime docs.
- Current SEO docs from Next.js, Nuxt, SvelteKit, Astro, and Google Search Central show that metadata, sitemap output, robots output, structured data, canonical URLs, and initial HTML checks need one contract. NeedleStart should document robots.txt limits, sitemap canonical behavior, JSON-LD escaping, metadata merge rules, and SEO diagnostics before implementing `@needle/seo`.
- Current accessibility docs from W3C/WAI, MDN, and Next.js show that framework-owned public HTML needs explicit semantic HTML, keyboard, focus, form error, and diagnostic expectations before examples or docs UI can be called verified.
- Current security guidance from OWASP, GitHub, and SLSA/OpenSSF shows that high-risk framework work needs explicit threat models, secret handling, production error behavior, advisory workflow, and supply-chain provenance plans before public security claims.
- Current performance guidance from web.dev, Google Search, Chrome Lighthouse, Vite, React, Bun, and MDN shows that framework speed docs need route budgets, Core Web Vitals targets, lab-vs-field language, report artifacts, benchmark methodology, and a concrete decision record plus coverage audit for Vite/Rolldown, Bun adapters, React Compiler, React streaming, resource hints, fetch priority, 103 Early Hints, speculation rules, bfcache, images, fonts, compression, payload budgets, hot APIs, explicit caching, and rejected defaults.
- Current diagnostics docs from TypeScript, rustc, ESLint, Rollup, Vite, and Next.js show that high-quality developer tools separate stable machine-readable diagnostics from improving human output. NeedleStart should document diagnostic codes, nested explanations, source spans, remediations, JSON ordering, docs links, and production sanitization before compiler and runtime implementation starts.
- Current testing docs from Bun, Vitest, Playwright, Testing Library, and Next.js show that framework testing docs need separate guidance for runner commands, snapshots, browser tests, traces/artifacts, user-facing assertions, and production-like end-to-end checks. NeedleStart should document fixture layout, snapshot review, CI gates, no-network defaults, and contract-to-test mapping before adding packages.
- Current adapter and deployment docs from Bun, Node, SvelteKit, Astro, and Vercel show that deployment behavior needs a concrete adapter contract, not just high-level support claims. NeedleStart should document adapter inputs, generated output, capability manifests, environment variables, static export failure rules, health checks, and compatibility evidence before shipping Bun, Node, or static paths.
- Current example and template docs from Next.js, Astro, and Vite show that starter apps are part of onboarding. NeedleStart should not link examples from public onboarding until the examples have current verification evidence.

Sources checked during this refresh:

- <https://nextjs.org/docs>
- <https://nextjs.org/docs/app/getting-started/project-structure>
- <https://nextjs.org/docs/app/guides/ai-agents>
- <https://nextjs.org/docs/llms-full.txt>
- <https://vite.dev/config/>
- <https://www.mintlify.com/docs/ai/llmstxt>
- <https://ai-sdk.dev/docs/introduction>
- <https://diataxis.fr/>
- <https://developers.google.com/style>
- <https://learn.microsoft.com/en-us/contribute/content/style-quick-start>
- <https://swagger.io/specification/>
- <https://learn.openapis.org/best-practices.html>
- <https://nextjs.org/docs/pages/guides/upgrading>
- <https://vite.dev/guide/migration>
- <https://docs.stripe.com/api/versioning>
- <https://docs.stripe.com/changelog>
- <https://vitepress.dev/reference/frontmatter-config>
- <https://vitepress.dev/reference/default-theme-sidebar>
- <https://docusaurus.io/docs/sidebar>
- <https://docusaurus.io/docs/next/sidebar/autogenerated>
- <https://nextra.site/docs/file-conventions/meta-file>
- <https://www.mintlify.com/docs/organize/pages>
- <https://www.mintlify.com/docs/organize/navigation>
- <https://clig.dev/>
- <https://cli.github.com/manual/gh_help_formatting>
- <https://docs.cloud.google.com/sdk/docs/scripting-gcloud>
- <https://devcenter.heroku.com/articles/heroku-cli-commands>
- <https://vite.dev/config/>
- <https://vite.dev/guide/env-and-mode>
- <https://nextjs.org/docs/pages/guides/environment-variables>
- <https://docs.astro.build/en/guides/environment-variables/>
- <https://docs.astro.build/en/reference/configuration-reference/>
- <https://nextjs.org/docs/app/getting-started/project-structure>
- <https://nextjs.org/docs/app/api-reference/file-conventions/route-groups>
- <https://nextjs.org/docs/app/api-reference/file-conventions/dynamic-routes>
- <https://nextjs.org/docs/app/api-reference/file-conventions/route>
- <https://svelte.dev/docs/kit/routing>
- <https://svelte.dev/docs/kit/advanced-routing>
- <https://nuxt.com/docs/4.x/directory-structure/app/pages>
- <https://docs.astro.build/en/guides/routing/>
- <https://docs.astro.build/en/guides/endpoints/>
- <https://nextjs.org/docs/app/getting-started/route-handlers>
- <https://hono.dev/docs/api/request>
- <https://hono.dev/docs/guides/validation>
- <https://hono.dev/examples/hono-openapi>
- <https://zod.dev/api>
- <https://zod.dev/basics>
- <https://zod.dev/error-formatting>
- <https://valibot.dev/guides/parse-data/>
- <https://valibot.dev/guides/infer-types/>
- <https://github.com/standard-schema/standard-schema>
- <https://json-schema.org/specification>
- <https://spec.openapis.org/oas/v3.1.0.html>
- <https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Cache-Control>
- <https://nextjs.org/docs/app/api-reference/functions/revalidateTag>
- <https://nextjs.org/docs/app/getting-started/revalidating>
- <https://svelte.dev/tutorial/kit/headers>
- <https://docs.astro.build/en/guides/caching/>
- <https://nextjs.org/docs/app/api-reference/functions/generate-metadata>
- <https://nextjs.org/docs/app/guides/json-ld>
- <https://nuxt.com/docs/4.x/api/composables/use-seo-meta>
- <https://svelte.dev/docs/kit/seo>
- <https://docs.astro.build/en/guides/integrations-guide/sitemap/>
- <https://developers.google.com/search/docs/crawling-indexing/robots/intro>
- <https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap>
- <https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data>
- <https://www.w3.org/TR/WCAG22/>
- <https://www.w3.org/WAI/standards-guidelines/wcag/>
- <https://www.w3.org/WAI/ARIA/apg/>
- <https://www.w3.org/WAI/ARIA/apg/practices/keyboard-interface/>
- <https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Accessibility/HTML>
- <https://developer.mozilla.org/en-US/docs/Web/Accessibility/Guides/Understanding_WCAG/Keyboard>
- <https://nextjs.org/docs/architecture/accessibility>
- <https://owasp.org/www-project-application-security-verification-standard/>
- <https://cheatsheetseries.owasp.org/index.html>
- <https://cheatsheetseries.owasp.org/cheatsheets/Secrets_Management_Cheat_Sheet.html>
- <https://cheatsheetseries.owasp.org/cheatsheets/REST_Security_Cheat_Sheet.html>
- <https://cheatsheetseries.owasp.org/cheatsheets/Error_Handling_Cheat_Sheet.html>
- <https://cheatsheetseries.owasp.org/cheatsheets/HTTP_Headers_Cheat_Sheet.html>
- <https://docs.github.com/code-security/security-advisories/guidance-on-reporting-and-writing/privately-reporting-a-security-vulnerability>
- <https://docs.github.com/code-security/security-advisories/repository-security-advisories/about-repository-security-advisories>
- <https://slsa.dev/>
- <https://slsa.dev/blog/2023/05/bringing-improved-supply-chain-security-to-the-nodejs-ecosystem>
- <https://web.dev/articles/vitals>
- <https://developers.google.com/search/docs/appearance/core-web-vitals>
- <https://developer.chrome.com/docs/lighthouse/overview>
- <https://developer.chrome.com/docs/lighthouse/performance/performance-scoring>
- <https://web.dev/articles/use-lighthouse-for-performance-budgets>
- <https://developers.google.com/web/tools/lighthouse/variability>
- <https://vite.dev/guide/performance>
- <https://vite.dev/guide/build>
- <https://react.dev/blog/2024/12/05/react-19>
- <https://react.dev/learn/react-compiler>
- <https://react.dev/reference/react-dom/preload>
- <https://bun.com/docs/runtime/http/server>
- <https://web.dev/learn/performance/image-performance>
- <https://web.dev/learn/performance/optimize-web-fonts>
- <https://web.dev/learn/performance/resource-hints>
- <https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Attributes/fetchpriority>
- <https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status/103>
- <https://developer.mozilla.org/en-US/docs/Web/Performance/Guides/Speculative_loading>
- <https://web.dev/articles/bfcache>
- <https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Accept-Encoding>
- <https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Content-Encoding>
- <https://www.typescriptlang.org/docs/handbook/2/understanding-errors.html>
- <https://doc.rust-lang.org/rustc/json.html>
- <https://doc.rust-lang.org/error-index.html>
- <https://eslint.org/docs/latest/use/formatters/>
- <https://rollupjs.org/plugin-development/>
- <https://vite.dev/guide/troubleshooting>
- <https://nextjs.org/docs/app/getting-started/error-handling>
- <https://nextjs.org/docs/app/api-reference/file-conventions/error>
- <https://bun.com/docs/test>
- <https://bun.com/docs/guides/test/update-snapshots>
- <https://vitest.dev/guide/snapshot>
- <https://vitest.dev/>
- <https://playwright.dev/docs/test-configuration>
- <https://playwright.dev/docs/trace-viewer>
- <https://testing-library.com/docs/guiding-principles/>
- <https://nextjs.org/docs/pages/guides/testing/playwright>
- <https://bun.com/docs/runtime/http/server>
- <https://nodejs.org/api/http.html>
- <https://svelte.dev/docs/kit/adapters>
- <https://svelte.dev/docs/kit/adapter-auto>
- <https://docs.astro.build/en/guides/on-demand-rendering/>
- <https://vercel.com/docs/build-output-api/configuration>
- <https://vercel.com/docs/project-configuration>
- <https://nextjs.org/docs/app/api-reference/cli/create-next-app>
- <https://nextjs.org/docs/app/getting-started/project-structure>
- <https://docs.astro.build/en/getting-started/>
- <https://contribute.docs.astro.build/guides/recipe-writing/>
- <https://vite.dev/guide/>
- <https://vite.dev/guide/ssr>

## Patterns NeedleStart Should Adapt

- AI-agent guidance should be first-class, not just an appendix.
- Manifest and graph contracts should be documented like public APIs.
- Generated docs outputs should include `llms.txt`, `llms-full.txt`, and `docs-index.json`.
- Safe edit and MCP docs should include risk tiers, schemas, and rollback behavior.

## Patterns NeedleStart Should Avoid

- Bloated navigation before implementation exists.
- Hiding exact API behavior inside tutorials.
- Mixing historical modes in the primary beginner path.
- Performance claims without raw data.
- Security claims without threat models and tests.
- Agent-facing prose without stable JSON contracts.

