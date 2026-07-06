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

- Keep governance lightweight in Phase 0, but document decision records, review ownership, and escalation paths early.

## Patterns NeedleStart Should Copy

- Clear "Start here" path.
- Separate guide and reference lanes.
- Exact file-convention reference.
- Strong API/config/CLI reference.
- Deployment and compatibility pages.
- Status and version labels.
- Governance and security pages before public growth.
- Evidence-backed benchmark docs.

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

