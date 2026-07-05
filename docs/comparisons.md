# Comparison Positioning

NeedleStart should be honest about what it is, what it is not, and when another framework is the better choice.

This document is a positioning guide for contributors, docs, examples, and future launch material. It is not a benchmark claim and should not pretend that planned features are implemented.

## Core Position

NeedleStart is not trying to win by cloning existing React frameworks. It is trying to win a newer category:

```txt
Agent-native, SEO-first, graph-aware React applications.
```

The positioning order is:

1. Built for the age of AI agents building and maintaining apps.
2. SEO-perfect and Bun-fast by default.
3. Familiar React meta-framework ergonomics.

## Comparison Rules

- Be specific.
- Avoid cheap dunking.
- Explain tradeoffs.
- Do not claim performance without benchmarks.
- Do not claim parity before implementation exists.
- Include "choose the other tool when" sections.
- Keep planned behavior clearly marked as planned.

## NeedleStart vs Next.js

NeedleStart should feel familiar to developers who know file-based React frameworks, but its wedge is different.

NeedleStart aims to lead on:

- Native semantic app graph.
- Agent context capsules.
- MCP-friendly route and graph inspection.
- Safe edit transactions.
- SEO-first public route defaults.
- Explicit render modes.
- Bun default path with adapter-aware output.
- Hot API routes with generated validators and serializers.

Next.js is likely the better choice when:

- You need a mature production ecosystem today.
- You depend on established hosting integrations.
- You need mature RSC behavior now.
- You need broad community examples immediately.
- Your team wants the default industry choice more than a new agent-native workflow.

NeedleStart should not claim Next.js parity early. The first credible demo should prove the agent and graph workflow, not every framework feature.

## NeedleStart vs TanStack Start

NeedleStart shares interest in typed, explicit full-stack behavior, but it should not try to become TanStack Start with a different logo.

NeedleStart aims to lead on:

- Framework-generated semantic map.
- Agent-oriented context and safe edit APIs.
- SEO-first route auditing.
- Hot API compiler path.
- Build-time manifests as a cross-tool contract.

TanStack Start may be the better choice when:

- You want TanStack Router and ecosystem alignment.
- You prioritize type-safe routing and data APIs over agent-native workflow.
- You want a smaller conceptual framework surface.

## NeedleStart vs Remix / React Router Framework Mode

NeedleStart can learn from explicit web fundamentals, but its differentiator is the compiler and graph layer.

NeedleStart aims to lead on:

- Route graph and impact analysis.
- Agent planning and context output.
- SEO reports and generated manifests.
- Adapter-aware build output.
- Safe edit transactions.

Remix or React Router framework mode may be the better choice when:

- You want mature web-standard data APIs today.
- You value established routing conventions over a new compiler graph.
- You do not need agent-native repository workflows.

## NeedleStart vs Astro

Astro is strong for content-heavy, island-style websites. NeedleStart should be compared carefully and honestly.

NeedleStart aims to lead on:

- React-first app framework ergonomics.
- Agent-native app graph.
- Safe edit workflows.
- Full-stack API and hot API paths.
- Large React app impact analysis.

Astro may be the better choice when:

- You are primarily building a content site.
- You want mature partial hydration/island architecture today.
- You need broad content integrations immediately.
- You do not need a React app graph or agent-safe edit system.

## NeedleStart vs Vite App Plus Custom Server

NeedleStart uses Vite/Rolldown for frontend build leverage, but it adds framework intelligence around it.

NeedleStart aims to provide:

- File-based routing.
- Render modes.
- SEO manifests.
- API route conventions.
- Hot API compiler.
- Needle Map.
- Agent context and MCP.
- Safe edits.
- Adapter output.

A plain Vite app plus custom server may be better when:

- Your app is small.
- You do not need SSR/SSG conventions.
- You prefer full custom control.
- You do not need agent-native framework contracts.

## NeedleStart vs A Generic Agent Rules File

A rules file can tell agents what to do. NeedleStart aims to give agents structured framework data.

NeedleStart aims to provide:

- Route context capsules.
- Related files.
- Impact maps.
- Stable diagnostics.
- Safe edit allow-lists.
- Mutation logs.
- MCP tools.

A generic rules file may be enough when:

- The repo is small.
- Edits are simple.
- There is no need for generated graph data.
- Agent mistakes are low risk.

## What NeedleStart Should Not Compete On Early

Do not prioritize these before the wedge is proven:

- Full custom bundler.
- Full RSC parity.
- Edge runtime from day one.
- Visual editor.
- CMS product.
- ORM.
- Auth platform.
- Plugin marketplace.
- Enterprise cloud dashboard.

## Messaging Patterns

Use:

```txt
NeedleStart gives agents and humans a map of the app, not just a folder tree.
```

Use:

```txt
Bun is the speed default. Node and static adapters are planned early so Bun is not an adoption trap.
```

Use:

```txt
The compiler emits stable manifests so CLI, runtime, MCP, devtools, SEO, cache, and agents agree on the same app model.
```

Avoid:

```txt
NeedleStart is faster than everything.
```

Avoid:

```txt
NeedleStart replaces Next.js.
```

Avoid:

```txt
Agents can safely change anything.
```

## Launch Comparison Checklist

Before publishing comparison material, verify:

- Implementation status is current in `docs/status.md`.
- Performance claims have benchmark links.
- Feature claims are implemented or clearly marked planned.
- Security-sensitive claims mention safe edit gates.
- Adapter claims match `docs/deployment.md`.
- Examples exist for the workflows being promoted.

## Documentation Rule

Update this file when:

- Positioning changes.
- A major feature is deferred or removed.
- Benchmark data becomes available.
- A new comparison target becomes important.
- A launch page or README uses comparison language.
