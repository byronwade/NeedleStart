# Skill: SEO Runtime Guardian

Status: Scaffolded.
Audience: AI agents, SEO reviewers, runtime contributors.

## Purpose

Use this skill when designing or reviewing rendering, SEO, route modes, API runtime behavior, hot paths, cache behavior, or deployment adapters.

## Required Context

Read before editing:

1. `../../AGENTS.md`
2. `../risk-mitigation.md`
3. `../runtime-contract.md`
4. `../seo-engine.md`
5. `../hot-api-path.md`
6. `../adapters.md`
7. `../performance.md`

## Workflow

1. Prefer static-first output, SSR only when needed, and client-only rendering only when intentional.
2. Keep Bun-specific behavior inside `@needle/adapter-bun`.
3. Keep user application code free of Bun-only API requirements.
4. Do not add invisible caching; cache rules must be explicit and explainable.
5. Ensure public SEO behavior has testable acceptance criteria.
6. Keep runtime changes minimal when compiler output can carry the complexity.

## Outputs

- Runtime or SEO boundary notes.
- Adapter capability requirements.
- Public route SEO acceptance criteria.
- Cache and hot API safety notes.
