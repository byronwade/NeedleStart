# Glossary

## Agent Kernel

The framework subsystem that generates agent context, safe edit plans, mutation logs, and MCP integrations.

## Agent-Safe

A workflow or feature is agent-safe when it is structured, scoped, previewable, logged, check-backed, reversible where possible, and honest about risk.

## App Graph

The structured map of an application: routes, layouts, components, APIs, schemas, tests, metadata, cache tags, generated files, content, ownership, and risk relationships.

## App-Graph-Native

A framework design where the app graph is a first-class contract, not a devtools add-on. App-graph-native behavior means the framework can answer what exists, what depends on it, why it behaves that way, and what changes are safe.

## Context Capsule

A compact JSON document describing one route, API, or app surface for agents. It includes source files, mode, SEO status, cache summary, related components, safe edits, danger zones, and checks.

## Explanation

A compact reason attached to a framework decision, such as why a route is static, why an API is not cached, why a page is indexable, or why a graph edge exists.

## Hot API

An API route compiled into a specialized handler with generated validation, serialization, and optional micro-caching.

## Needle Map

The file-level and semantic graph of a NeedleStart application. Needle Map is the product spine: it powers affected checks, agent context, MCP queries, safe edit planning, ownership, cache visibility, SEO impact, and explainability.

## Render Mode

The execution strategy for a route, such as static, prerendered, SSR, streaming, client-only, API, or hot API.

## Safe Edit

A constrained edit operation that validates the target, applies an AST patch, formats files, regenerates graph data, runs affected checks, writes a mutation log, and supports rollback where possible.

## Semantic Graph

A graph that goes beyond imports and represents application meaning, such as route-to-layout, component-to-schema, metadata-to-SEO, cache-tag-to-route, test-to-component, owner-to-package, and risk-to-edit relationships.

## Static-First

The principle that public routes should emit static HTML whenever it is safe, and only use SSR or client-only rendering when needed.

## Why Output

A human- and agent-readable explanation surfaced by CLI, manifests, diagnostics, or MCP tools. `needle inspect why` is the planned command family for inspecting why the framework made render, cache, route, SEO, adapter, or graph decisions.
