# Prototype Acceptance Demo

Status: Planned.
Audience: maintainers, framework contributors, product reviewers.

The first public prototype should prove the wedge end to end.

Scope note: this is broader than the first working slice in `docs/risk-mitigation.md`. The working slice is intended to prove create app, SEO-safe pages, `@lumina/adapter-bun` serving, basic map, agent inspection, and safe metadata edit before the public prototype expands into API routes, hot API, read-only MCP tools, adapter-aware server output, and documented Node/static paths.

## Demo Script

```bash
bun create lumina demo
cd demo
bun run dev
```

Browser should show:

- Home page rendered with React.
- SEO metadata present.
- Devtools link visible in terminal.

Then:

```bash
lumina routes
lumina seo
lumina map route /
lumina agent context --route / --json
lumina mcp
```

Then ask an AI agent:

```txt
Add a static /enterprise page with SEO metadata, hero, feature grid,
FAQ structured data, and a CTA to /contact. Use Lumina tools.
Run affected checks.
```

The agent should:

1. Inspect route graph.
2. Create page.
3. Add metadata.
4. Add blocks or components.
5. Generate tests.
6. Run SEO check.
7. Run affected tests.
8. Show mutation log.

The safe edit flow should:

1. Dry-run the metadata change.
2. Return a `SafeEditTransaction`.
3. Apply only after checks pass.
4. Write `.lumina/mutations.json`.
5. Allow `lumina edit undo <mutationId>`.

Then:

```bash
bun run build
bun run start
```

Production output from `@lumina/adapter-bun` should serve:

- `/`
- `/enterprise`
- `/sitemap.xml`
- `/robots.txt`
- `/api/health`

## Acceptance Criteria

The prototype is credible when it can:

- Create a React app.
- Render SEO-safe pages.
- Serve static and SSR routes through `@lumina/adapter-bun`.
- Run API routes.
- Run a hot API route.
- Generate a route manifest.
- Generate a Lumina Map.
- Generate route context for agents.
- Expose read-only MCP tools.
- Apply a safe metadata edit.
- Run affected checks.
- Generate an adapter-aware server entry.
- Demonstrate Bun default with documented Node/static paths.

## Explicit Non-Goals

The prototype does not need:

- Full RSC support.
- Edge runtime support.
- All deployment adapters.
- Visual editor.
- Production-grade devtools.
- Full auth story.
- Full image optimizer.
