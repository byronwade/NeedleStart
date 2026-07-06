# ADR 0001: Runtime and Build Split

Date: 2026-07-05

Status: Proposed.
Audience: maintainers, framework contributors, architecture reviewers.

## Context

Lumina needs to become credible quickly without spending the first phase building a custom bundler. The framework also needs a fast default adapter path and a place to put framework-specific intelligence.

## Decision

Use Bun as the default adapter runtime and package/test tool, Vite/Rolldown as the frontend build foundation, and a custom Lumina compiler for route graph, render modes, SEO, agent context, semantic map, API codegen, and deployment manifests.

## Consequences

This gives the project a practical path to a working prototype:

- `@lumina/adapter-bun` provides Bun-specific production request handling while Bun provides fast local tooling.
- Vite/Rolldown provides React, CSS, assets, HMR, and ecosystem leverage.
- Lumina compiler owns the differentiating framework intelligence.

The project postpones:

- Custom bundler work.
- Deep RSC integration.
- Edge runtime from day one.

## Alternatives Considered

- Build a custom bundler immediately.
- Use only Vite middleware and avoid a custom compiler.
- Start with the Node adapter instead of the Bun adapter.
