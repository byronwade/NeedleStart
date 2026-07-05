# Public Docs Publishing Contract

NeedleStart docs should be useful in two places:

1. The repository, where contributors need source-of-truth contracts.
2. The future public website, where users need guides, references, examples, benchmarks, and comparison pages.

This document defines how repository docs become public-facing website docs without turning the website into a filing cabinet with CSS.

## Goals

- Treat `docs/` as the source-of-truth library.
- Make every public page status-aware.
- Prevent planned behavior from being published as implemented behavior.
- Keep internal governance docs useful without forcing them into the main website nav.
- Support future `llms.txt`, `llms-full.txt`, search indexes, and agent context generation.
- Let the future NeedleStart website dogfood NeedleStart once the framework exists.

## Non-Goals

Initially out of scope:

- Building the website app.
- Choosing a final design system.
- Publishing every repo doc as a top-level website page.
- Hiding project governance from contributors.
- Claiming implemented behavior from planned docs.

## Source of Truth

Repository markdown remains the canonical source until a website build pipeline exists.

The future website should ingest or mirror docs from:

```txt
README.md
VISION.md
CONTRIBUTING.md
SECURITY.md
docs/**/*.md
```

The website may add page-specific framing, but should not fork technical truth away from the repository docs.

## Public Docs Frontmatter

Website-ready docs should eventually include metadata.

Draft frontmatter:

```md
---
title: Routing
description: File-based routing, layouts, dynamic params, route groups, and API route conventions.
status: planned
audience:
  - app-developer
  - framework-contributor
public: true
website:
  section: Framework
  order: 20
  slug: /docs/routing
  sidebar: Routing
sourceOfTruth: docs/routing.md
lastReviewed: 2026-07-05
---
```

Rules:

- `title` is required for public pages.
- `description` is required for public pages.
- `status` must use labels from `docs/status.md`.
- `public` controls website eligibility.
- `website.slug` must be stable once published.
- `sourceOfTruth` points back to the repo file.
- `lastReviewed` should update when public claims change.

Do not add frontmatter to every doc immediately unless the website pipeline requires it. This contract defines the target.

## Public Status Language

Use clear labels on public pages:

| Status | Public wording |
| --- | --- |
| `planned` | Planned. Not implemented yet. |
| `drafted` | Contract drafted. Implementation not complete. |
| `scaffolded` | Package or file structure exists. Behavior may be incomplete. |
| `implemented` | Implemented. Verification may still be limited. |
| `verified` | Implemented and verified against documented commands or fixtures. |
| `deferred` | Not in the current prototype. |
| `removed` | No longer part of the plan. |

Public pages must not say a command works unless `docs/status.md` marks it implemented or verified.

## Audience Labels

Allowed audience labels:

- `app-developer`
- `framework-contributor`
- `agent-developer`
- `maintainer`
- `security-reviewer`
- `benchmark-reader`
- `adopter`

A page can have multiple audiences.

## Public Docs Taxonomy

| Bucket | Meaning | Examples |
| --- | --- | --- |
| Public guide | Friendly website page for users. | Quick Start, Routing, SEO, API Routes. |
| Public reference | Detailed API or contract page. | CLI, Config, Manifest Contracts, Schema DSL. |
| Public concept | Product/category explanation. | Vision, Comparisons, Needle Map. |
| Contributor doc | Public but contributor-oriented. | Contributing, Testing, Package Map. |
| Governance doc | Useful for repository process, not main nav. | ADRs, CODEOWNERS, PR templates. |
| Security-sensitive doc | Public summary with careful details. | Security, MCP write rules, safe edits. |
| Future or hidden doc | Not website-ready yet. | Raw status tables, unfinished implementation notes. |

## Public Eligibility Rules

A doc can be public-facing when:

- It has a clear audience.
- It clearly marks planned vs implemented behavior.
- It does not expose secrets, private data, or unsafe operational details.
- It links to source-of-truth contracts.
- It has no broken local links.
- It uses durable language.
- It avoids benchmark or performance claims without raw data.
- It includes out-of-scope notes where useful.

A doc should stay repo-only or contributor-only when:

- It is mostly process scaffolding.
- It contains temporary planning notes.
- It is likely to confuse users before implementation exists.
- It references high-risk internal workflows without enough framing.

## Content Transformation Rules

When generating public website pages from repo docs:

- Preserve technical contracts.
- Add user-friendly introductions where needed.
- Keep status banners visible.
- Keep code examples aligned with `docs/cli.md` and `docs/config.md`.
- Keep manifest examples aligned with `docs/manifest-contracts.md`.
- Do not remove safety warnings from MCP, safe edit, security, deployment, or benchmark pages.
- Do not publish internal TODO notes as public guidance.

## Public Docs Gate

Future command:

```bash
needle docs check-public
```

Until the CLI exists, this can be implemented as a docs CI script.

Checks should verify:

- Every public page has title, description, status, audience, and slug.
- Every public page status matches `docs/status.md`.
- No public page overclaims planned behavior.
- No public page contains secret-like strings.
- No local links are broken.
- Every benchmark claim links to methodology and raw data.
- Every comparison page has a "choose the other tool when" section.
- Every public page has canonical source metadata.

## Website Dogfooding Plan

Once NeedleStart can build real apps, the docs website should become a NeedleStart app.

Potential location:

```txt
apps/website/
```

or:

```txt
examples/docs-site/
```

The docs website should prove:

- Static public docs.
- SEO metadata.
- Sitemap and robots output.
- Structured data.
- Public search index.
- `llms.txt` and `llms-full.txt` generation.
- Route-level docs status.
- Generated docs manifest.
- Needle Map over the docs themselves.

## LLM and Agent Consumption

Public docs should support agents without requiring repo-wide reading.

Future generated files may include:

```txt
llms.txt
llms-full.txt
.needle/context/docs.ctx.json
.needle/context/docs-index.json
```

Rules:

- Agent-facing docs must not include secrets.
- Long-form docs should have concise summaries.
- Public docs should expose status and source-of-truth links.
- Agents should be able to distinguish guide text from contracts.

## Public Docs Review Checklist

Before a doc becomes public-facing:

- [ ] Status is accurate.
- [ ] Audience is clear.
- [ ] Title and description are useful.
- [ ] Commands are canonical.
- [ ] Planned behavior is not overclaimed.
- [ ] Security-sensitive details are framed safely.
- [ ] Benchmarks have methodology and raw data links, if present.
- [ ] Links work.
- [ ] Out-of-scope notes are included where useful.

## Documentation Rule

Update this file when:

- Website content structure changes.
- Public docs metadata changes.
- Docs publishing rules change.
- `llms.txt` or agent docs generation behavior changes.
- Benchmark or comparison pages become public.
