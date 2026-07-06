# Maintainer Guide

Status: Planned.

Audience: maintainers, area reviewers, open source program reviewers.

This guide collects the operational responsibilities that keep NeedleStart honest as it moves from planning to implementation.

Use `docs/operating-cadence.md` for planned active-development, phase-boundary, release, and AI-agent review rhythms.

## Maintainer Principles

- Uphold `docs/engineering-standards.md`.
- Protect status honesty.
- Require tests for implemented behavior.
- Require raw data for benchmark claims.
- Require threat model notes for high-risk features.
- Keep public docs and agent docs synchronized.
- Use decision records for long-lived architecture choices.

## Review Areas

| Area | Primary docs | Review focus |
| --- | --- | --- |
| Compiler and IR | `docs/compiler-ir.md`, `docs/manifest-contracts.md` | Determinism, schema versions, stable manifests |
| Runtime and adapters | `docs/runtime-contract.md`, `docs/adapters.md`, `docs/deployment.md` | Small runtime, adapter boundaries, no Bun leakage |
| Needle Map | `docs/needle-map.md`, `docs/risk-mitigation.md` | Edge confidence, source, why, safety limits |
| Agent Kernel and MCP | `docs/agent-kernel.md`, `docs/mcp-server.md`, `docs/safe-edit-transactions.md` | Stable JSON, safe writes, rollback, no production metadata |
| SEO and performance | `docs/seo-engine.md`, `docs/performance.md`, `docs/benchmarks.md` | Public HTML, SEO reports, evidence-backed claims |
| Governance and release | `GOVERNANCE.md`, `docs/release.md`, `SECURITY.md` | Review process, supported versions, security intake |

## Merge Checklist

- Engineering standards were applied.
- Scope matches roadmap and task backlog.
- README is accurate.
- AGENTS is accurate.
- Status doc is accurate.
- Relevant reference docs are updated.
- New generated artifacts are documented.
- Tests or explicit "not runnable yet" notes are included.
- High-risk changes have stronger review.

## Release Checklist

Before any release:

- All required checks pass.
- Changelog or release notes exist.
- Supported versions are documented.
- Security policy is current.
- Migration notes exist for breaking changes.
- Benchmarks are updated if performance is mentioned.
- Public docs do not claim unverified behavior.
