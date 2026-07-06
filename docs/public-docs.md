# Public Docs Readiness

Status: Planned.

Audience: future website visitors, docs maintainers, open source reviewers.

This page defines what must be true before repository docs become public website content.

The future public website Markdown source lives in `docs/public/`.

## Requirements

- Each public page has a clear audience.
- Each feature page has a status label.
- Planned APIs are marked as planned.
- Code examples are verified or marked as draft.
- Performance claims link to benchmark evidence.
- Security claims link to implementation and tests.
- Navigation matches `docs/website-content-map.md`.
- Public-facing pages in `docs/public/` link back to source-of-truth reference docs.

## Public Page Readiness Checklist

- Page has status and audience.
- Page has a one-paragraph summary.
- Page links to reference docs for exact APIs.
- Page links to related guides when appropriate.
- Page does not overstate implementation.
- Page avoids unsupported comparisons.
- Page has examples that are verified or marked planned.
- Page has no local-only file paths except repository links.

## Public Website Tone

- Lead with the app-graph-native promise: "Your app ships with a map."
- Explain why the graph helps humans and agents.
- Keep SEO and benchmark claims evidence-backed.
- Use competitor comparisons to explain fit, not to attack.

## Not Ready For Public Launch Until

- Phase 1 scaffold exists.
- At least one verified app example exists.
- Quick-start commands are real.
- The docs site navigation is implemented.
- Security, governance, and release docs have maintainer contact details.

## Public Content Source

Use `docs/public/README.md` as the public content index.

Public pages should stay concise and reader-facing. Deep implementation detail should remain in root docs and be linked from public pages.
