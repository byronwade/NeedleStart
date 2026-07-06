# Your App Ships With A Map

Status: Planned.

Audience: app developers, AI agents, future website visitors.

NeedleStart is app-graph-native. The framework is planned to generate a semantic map of the application so humans and AI agents can understand what each file affects.

## The Problem

Large React apps become hard to change because relationships are scattered:

- Routes use components.
- Components depend on schemas.
- Metadata affects SEO.
- Cache tags affect invalidation.
- Tests cover only parts of the surface.
- Ownership and risk are often implicit.

AI agents struggle when they have to infer all of this by reading the whole repository.

## The NeedleStart Approach

Needle Map is planned to connect:

- Routes.
- Layouts.
- Pages.
- Components.
- APIs.
- Schemas.
- Tests.
- Metadata.
- Cache tags.
- Owners.
- Risk zones.

Every graph edge must include `kind`, `source`, `confidence`, and `why`.

## What This Enables

Planned workflows:

- Ask what uses a component.
- Ask what breaks if a schema changes.
- Find affected routes and tests.
- Explain why two files are related.
- Give agents route-specific context.
- Run affected checks instead of guessing.

## Source

- [Needle Map](../../needle-map.md)
- [Manifest Contracts](../reference/manifest-contracts.md)
- [Machine-Readable Documentation](../../machine-readable-docs.md)

