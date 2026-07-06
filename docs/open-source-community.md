# Open Source Community and Vercel Program Readiness

NeedleStart is intended to be fully open source, community-driven, and built in public.

This document defines how the project should present itself for open source community participation and prepare for open source support programs such as Vercel's Open Source Program.

## Goals

- Make NeedleStart credible as an open source project.
- Build public trust through transparent status, roadmap, governance, and benchmarks.
- Prepare the project for Vercel Open Source Program eligibility.
- Make clear that any open source program credits are used only for project and community work.
- Support contributors, users, AI agents, maintainers, and reviewers with stable docs and community processes.

## Vercel Open Source Program Fit

Vercel's Open Source Program lists these expectations for projects:

- Be an open source project that is actively developed and maintained.
- Be hosted on or intended to host on Vercel.
- Show measurable impact or growth potential.
- Follow a Code of Conduct.
- Use credits exclusively for open source work and the project itself.

NeedleStart should prepare evidence for each criterion before applying.

## Current Readiness Matrix

| Criterion | NeedleStart posture | Evidence | Next step |
| --- | --- | --- | --- |
| Open source | Intended and licensed as MIT. | `LICENSE` | Keep all core framework code public. |
| Active development | Phase 0 docs and architecture work in progress. | PRs, roadmap, task backlog | Start package scaffolding and implementation PRs. |
| Hosted or intended to host on Vercel | Intended for public docs, benchmark reports, and demos. | `docs/website-content-map.md`, this file | Scaffold docs website and deploy previews once framework or temporary docs site exists. |
| Measurable impact or growth potential | Strong positioning around app-graph-native React and AI-agent-safe workflows. | `README.md`, `VISION.md`, `docs/product-strategy.md` | Track stars, forks, contributors, discussions, downloads, site traffic, and demo usage. |
| Code of Conduct | Added. | `CODE_OF_CONDUCT.md` | Enforce consistently. |
| Credits used only for OSS | Policy documented here. | Credits use policy below | Track usage transparently if accepted. |

## Vercel Hosting Intent

NeedleStart intends to use Vercel for public open source infrastructure where it makes sense:

- Public documentation website.
- Pull request preview deployments for docs.
- Public benchmark result pages.
- Public examples and demo pages.
- Launch pages and comparison pages.
- Community-facing app-graph and agent-demo showcases.

Potential future paths:

```txt
apps/website/
examples/docs-site/
examples/agent-demo/
benchmarks/results/
```

NeedleStart should not imply that Vercel is the only deployment target. The framework should remain adapter-aware and should keep Bun, Node, static, and later deployment targets honest in `adapter.manifest.json`.

## Credits Use Policy

If NeedleStart receives open source program credits, those credits must be used only for open source project work.

Allowed uses:

- Hosting the public docs website.
- Hosting preview deployments for documentation and open source PRs.
- Hosting public demo apps.
- Hosting public benchmark result pages.
- Hosting public API demos for open source examples.
- Running project-owned open source observability for demos, where appropriate.

Not allowed:

- Private commercial applications.
- Customer-specific deployments.
- Personal websites unrelated to NeedleStart.
- Closed-source product infrastructure.
- Paid consulting work.
- Non-project experiments that do not support NeedleStart.

If accepted, usage should be reviewed periodically and summarized in release or community updates when practical.

## Community Impact Metrics

Track these as the project matures:

| Metric | Why it matters |
| --- | --- |
| GitHub stars | Interest and discoverability. |
| Forks | Experimentation and adoption intent. |
| External contributors | Community health. |
| Issues opened and resolved | Usage and responsiveness. |
| Pull requests merged | Maintainer throughput. |
| npm downloads once published | Adoption signal. |
| Docs site traffic | Learning and discovery. |
| Example/demo usage | Product clarity. |
| Benchmark reproductions | Trust in performance claims. |
| Community discussions | Engagement and support needs. |
| Projects using NeedleStart | Real impact. |

Do not inflate metrics. Use honest public numbers.

## Community Infrastructure

Phase 0 and early implementation should include:

- `LICENSE`
- `CODE_OF_CONDUCT.md`
- `CONTRIBUTING.md`
- `SECURITY.md`
- `GOVERNANCE.md`
- issue templates
- pull request template
- public roadmap
- public status matrix
- docs hub
- release policy
- benchmark methodology

After packages exist, add:

- good first issues
- help wanted labels
- package READMEs
- examples with README files
- contributor setup guide verified by real commands
- public discussions or community channel
- docs website with preview deployments

## Contribution Funnel

NeedleStart should make contribution paths obvious:

1. Read README.
2. Read docs status.
3. Pick an issue labeled `good first issue`, `docs`, `test`, `fixture`, or `help wanted`.
4. Use the PR template.
5. Add tests or state why tests are deferred.
6. Update docs if behavior changes.
7. Keep planned and implemented behavior separate.

Potential labels:

- `good first issue`
- `help wanted`
- `docs`
- `testing`
- `fixture`
- `compiler`
- `map`
- `agent-kernel`
- `mcp`
- `safe-edits`
- `adapter`
- `security`
- `benchmark`
- `website`

## Open Source Positioning

NeedleStart should be presented as:

```txt
A fully open source, app-graph-native React framework where your app ships with a map.
```

Public messaging should emphasize:

- permissive open source license
- public roadmap
- transparent status
- reproducible benchmarks
- public docs
- community examples
- safe AI-agent workflows
- adapter-aware deployment
- no vendor lock-in

NeedleStart can intend to host public docs and demos on Vercel while still supporting deployment beyond Vercel.

## Application Readiness Checklist

Before applying to an open source support program:

- [ ] README clearly states the project is open source.
- [ ] License is present and correct.
- [ ] Code of Conduct exists.
- [ ] Contributing guide exists.
- [ ] Security policy exists.
- [ ] Governance doc exists.
- [ ] Public roadmap exists.
- [ ] Public status matrix exists.
- [ ] Website or docs preview exists or has a clear hosting plan.
- [ ] Community impact or growth metrics are collected.
- [ ] Credits use policy is documented.
- [ ] Maintainer contact path is clear.
- [ ] Examples or demos show project potential.
- [ ] Benchmarks do not overclaim.
- [ ] Public docs explain planned versus implemented behavior.

## Vercel Application Narrative Draft

Use this as a starting point when applications open:

```txt
NeedleStart is a fully open source, app-graph-native React framework where your app ships with a map. It helps humans and AI agents understand, audit, change, and verify large React apps through stable manifests, a semantic app graph, route context capsules, MCP read tools, and safe edit transactions.

We intend to host the public docs site, examples, benchmark reports, and open source demo deployments on Vercel. Vercel preview deployments would help contributors review docs, examples, and public benchmark reports before merge.

The project is early but has a clear growth path: React teams need better explainability, cache visibility, public HTML guarantees, and AI-agent-safe workflows. NeedleStart is built in public with MIT licensing, a Code of Conduct, public roadmap, transparent status matrix, reproducible benchmark methodology, and contributor-friendly documentation.
```

## Risks to Avoid

- Applying before the repo has enough public development activity.
- Claiming features are implemented when they are planned.
- Positioning Vercel as the only viable deployment target.
- Using credits for non-open-source work.
- Publishing benchmark claims without raw data.
- Creating community channels without maintainer capacity.

## Documentation Rule

Update this file when:

- Vercel's program criteria change.
- The docs website is scaffolded.
- Deployment previews are configured.
- Community processes change.
- Impact metrics become available.
- NeedleStart applies to or joins an open source support program.
