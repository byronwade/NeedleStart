# Engineering Standards

Status: Planned.

Audience: maintainers, contributors, AI agents, open source program reviewers.

NeedleStart should read and operate like a serious engineering project from the first commit. This document defines the working standards expected from humans and AI agents.

The standard is not "look busy" or "sound enterprise." The standard is evidence, ownership, review discipline, clear contracts, small safe changes, and honest docs.

## Operating Principles

1. Own the contract: every package, command, manifest, and public helper needs a clear owner surface in docs.
2. Prefer small complete slices: each change should be narrow enough to review and broad enough to prove behavior.
3. Make decisions durable: architecture changes need ADRs or documented tradeoffs.
4. Keep runtime boring: production runtime code should be small, explicit, and generated-artifact driven.
5. Treat docs as product: docs must be updated in the same change as behavior.
6. Treat agents as contributors: AI-assisted work gets the same review, tests, and accountability as human work.
7. Require evidence: implemented behavior needs tests; performance claims need raw data; security claims need threat analysis.
8. Preserve reversibility: high-risk changes should have rollback, undo, or migration plans.

## Engineering Review Bar

Every non-trivial change should answer:

- What behavior changes?
- Which packages or docs own that behavior?
- What contracts or generated files change?
- What tests or checks prove it?
- What is intentionally out of scope?
- What risks were considered?
- What docs were updated or intentionally left unchanged?

If those answers are unclear, the change is not ready.

## Area Standards

| Area | Standard |
| --- | --- |
| Compiler | Deterministic output, stable IDs, normalized paths, schema versions, no duplicate local models. |
| Runtime and adapters | Small request path, generated manifests, no source rediscovery, no Bun-only leakage into user apps. |
| Routing | File conventions are documented, deterministic, and tested with fixtures. |
| SEO | Public routes produce meaningful HTML and machine-readable audit output when implemented. |
| Needle Map | Every edge includes `kind`, `source`, `confidence`, and `why`. Safety-critical decisions need more than graph inference. |
| Agent Kernel and MCP | Stable compact JSON, safe edit validation, no production agent metadata, shared write path with CLI. |
| Safe edits | AST-based, previewable, logged, check-backed, reversible. |
| Performance | Speed-sensitive changes use `docs/speed-strategy.md`; claims require `docs/benchmark-methodology.md`. |
| Security | High-risk areas require threat notes, validation, tests, and explicit review. |
| Documentation | Follow `docs/documentation-standard.md`, `docs/docs-freshness-policy.md`, and `docs/docs-maintenance-checklist.md`. |

## Definition Of Ready

A task is ready to implement when:

- It has a clear goal.
- Scope and out-of-scope are documented.
- Affected packages are known.
- Required docs are known.
- Required tests or verification are known.
- Security, performance, and agent-safety implications are identified.
- The task fits the roadmap or has an ADR explaining why it jumps the queue.

## Definition Of Done

A task is done when:

- Behavior is implemented or the doc clearly says it is planned.
- Tests or checks prove the implemented behavior.
- Generated artifacts are documented.
- README, AGENTS, status, roadmap, package map, and reference docs are current where relevant.
- Benchmark, security, and compatibility claims have evidence.
- The PR template is fully answered.
- Remaining follow-up work is explicit.

## Review Culture

Reviews should be specific and evidence-based:

- Prefer file and line references.
- Explain risk, not preference alone.
- Ask for tests when behavior changes.
- Ask for docs when contracts change.
- Block status dishonesty, unsafe edits, hidden runtime complexity, or unsupported performance claims.
- Do not block on style preferences that are not documented.

## Incident And Regression Discipline

When a regression is found:

1. Document the failing behavior.
2. Add or identify the missing test.
3. Fix the smallest responsible contract.
4. Update docs if user-visible behavior or workflow changes.
5. Add a follow-up task if broader prevention is needed.

## AI-Agent Engineering Rules

AI agents must:

- Read `AGENTS.md` before editing.
- Keep planned and implemented behavior separate.
- Use stable repo contracts instead of guessing.
- Update docs with behavior changes.
- Run available checks.
- State when checks cannot run.
- Avoid touching high-risk areas without reading the relevant safety docs.

## Out Of Scope

- Bureaucracy without evidence.
- Process that hides unclear engineering decisions.
- Claims of maturity that the repository cannot prove.
- Large unreviewable rewrites when a scoped slice would work.

