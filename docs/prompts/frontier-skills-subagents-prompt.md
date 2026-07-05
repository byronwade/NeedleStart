# Frontier Skills and Subagents Builder Prompt

This prompt is designed to work across leading frontier models and agent platforms. It avoids vendor-specific syntax and asks the model to produce portable skills, subagents, routing rules, verification contracts, and adaptation notes.

Use it when you want a model to design a reusable agent system for a project, product, repository, company workflow, or software framework.

## Purpose

The prompt builds a cross-model operating layer made of:

- Skills: reusable procedures a model can execute reliably.
- Subagents: specialized roles with scope, inputs, outputs, tools, limits, and escalation rules.
- Routers: decision rules that choose which skill or subagent should handle a task.
- Contracts: stable schemas for handoffs, task briefs, reports, validation, and memory.
- Adapters: notes for running the same system in plain chat, tool-enabled assistants, IDE agents, CI agents, MCP clients, or repository bots.

## Design Rules

The generated system should be portable across frontier models.

It must not depend on:

- Hidden chain-of-thought disclosure.
- One vendor's tool format.
- One model's memory feature.
- One IDE agent's config file.
- Unavailable background execution.
- Implicit trust in generated code or edits.

It should depend on:

- Clear role definitions.
- Explicit inputs and outputs.
- Stable JSON or Markdown contracts.
- Verification steps.
- Safety gates.
- Human approval for high-risk operations.
- Small reusable procedures.

## Copy-Paste Prompt

```txt
You are designing a portable skills and subagents system that can run across leading frontier AI models and agent platforms.

Your job is to turn the project context below into a complete, model-agnostic agent operating system.

PROJECT CONTEXT

Project name:
<PROJECT_NAME>

Project purpose:
<PROJECT_PURPOSE>

Primary users:
<PRIMARY_USERS>

Repository or workspace shape:
<REPOSITORY_OR_WORKSPACE_SHAPE>

Current phase:
<CURRENT_PHASE>

Important docs, contracts, or policies:
<IMPORTANT_DOCS_AND_POLICIES>

Available tools:
<AVAILABLE_TOOLS>

Unavailable tools or constraints:
<UNAVAILABLE_TOOLS_OR_CONSTRAINTS>

High-risk areas:
<HIGH_RISK_AREAS>

Workflows to support:
<WORKFLOWS_TO_SUPPORT>

Quality bar:
<QUALITY_BAR>

OUTPUT GOAL

Produce a complete skills and subagents blueprint that can be used by OpenAI-style assistants, Anthropic-style assistants, Gemini-style assistants, local coding agents, IDE agents, MCP clients, CI agents, and plain chat models.

The system must be portable. Do not assume a specific vendor, model, IDE, file format, or tool protocol unless you also provide an adapter note.

DEFINITIONS

A skill is a reusable procedure. It should describe when to use it, required inputs, steps, outputs, checks, failure modes, and examples.

A subagent is a specialized worker role. It should describe mission, scope, inputs, outputs, tools, skills used, handoff rules, safety gates, and when it must escalate to a human or a lead agent.

A router is a decision layer. It should decide which skill or subagent should handle a task.

A contract is a stable schema. It should make handoffs, task briefs, reports, checks, and memory portable across models.

REQUIREMENTS

1. Start by summarizing the project in 5 to 10 durable bullets.
2. Identify the major work domains.
3. Create a skill inventory.
4. Create subagent specs.
5. Create routing rules.
6. Create handoff contracts.
7. Create verification and quality gates.
8. Create memory and context rules.
9. Create safety and escalation rules.
10. Create adapter notes for different model and agent environments.
11. Create a recommended rollout plan.
12. Include examples of task routing and handoff payloads.

SKILL SPEC FORMAT

For each skill, use this format:

- Skill name
- Purpose
- When to use
- When not to use
- Required inputs
- Optional inputs
- Procedure
- Output contract
- Verification checks
- Failure modes
- Escalation rules
- Example prompt
- Example output

SUBAGENT SPEC FORMAT

For each subagent, use this format:

- Subagent name
- Mission
- Owns
- Does not own
- Required context
- Allowed tools
- Disallowed tools
- Skills used
- Input contract
- Output contract
- Handoff rules
- Done criteria
- Safety gates
- Escalation rules
- Example assignment
- Example report

ROUTER FORMAT

Create a routing table with these columns:

- Task pattern
- Primary subagent
- Supporting subagents
- Required skills
- Risk level
- Required checks
- Human approval needed

CONTRACTS TO INCLUDE

Create these portable contracts:

1. Task brief
2. Subagent assignment
3. Subagent result report
4. Review report
5. Risk assessment
6. Verification report
7. Memory note
8. Handoff packet
9. Change summary
10. Human approval request

For each contract, provide:

- Purpose
- Markdown form
- JSON form
- Required fields
- Optional fields
- Validation rules

VERIFICATION REQUIREMENTS

Every subagent result must include:

- What changed or was learned
- Evidence used
- Files or artifacts touched
- Commands run, if any
- Checks passed
- Checks skipped with reason
- Known risks
- Follow-up work
- Confidence level

SAFETY REQUIREMENTS

The system must require human approval for high-risk actions, including:

- auth or session changes
- billing or payments
- secrets or environment variables
- production deployment
- data deletion or migration
- file-system write tools outside an approved workspace
- automated writes from MCP or external tools
- dependency upgrades with security impact
- generated code that affects runtime request routing
- cache invalidation or persistence behavior

The system must reject or escalate when:

- required context is missing
- task scope is ambiguous and high impact
- a tool is unavailable
- validation cannot be run
- evidence is insufficient
- a requested operation violates policy

MODEL-AGNOSTIC ADAPTERS

Include adaptation notes for:

- Plain chat model with no tools
- Tool-enabled assistant
- Coding agent inside an IDE
- Repository bot
- MCP client
- CI agent
- Local model with limited context window
- Long-context model
- Multi-agent orchestrator

For each adapter, explain:

- What works directly
- What needs manual handoff
- What should be disabled
- What output format to prefer
- How to handle verification

STYLE

Use direct, durable language.

Avoid hype.

Be specific enough that a team could implement the system.

Keep hidden reasoning private. Provide concise rationales, evidence summaries, and explicit uncertainty instead of hidden chain-of-thought.

OUTPUT STRUCTURE

Return the blueprint in this order:

1. Project summary
2. Work domains
3. Skill inventory table
4. Detailed skill specs
5. Subagent inventory table
6. Detailed subagent specs
7. Router table
8. Handoff and report contracts
9. Verification gates
10. Safety and escalation gates
11. Memory and context rules
12. Adapter notes
13. Rollout plan
14. Example task flows
15. Open questions

Before finalizing, self-review the blueprint for:

- missing high-risk workflows
- unclear ownership
- overlapping subagents
- missing verification
- vendor-specific assumptions
- unportable tool dependencies
- overclaims about what agents can do safely

Then provide the final blueprint.
```

## Recommended Input for NeedleStart

Use this filled project context when generating NeedleStart-specific skills and subagents.

```txt
PROJECT CONTEXT

Project name:
NeedleStart

Project purpose:
NeedleStart is an agent-native, SEO-first React framework for fast, large-scale web applications. It provides file-based routes, render modes, metadata, API routes, hot API paths, adapter-aware deployment, a semantic Needle Map, MCP tools, context capsules, and safe edit transactions.

Primary users:
Framework contributors, application developers, AI coding agents, maintainers, documentation writers, and teams adopting agent-native React workflows.

Repository or workspace shape:
A planned Bun monorepo with packages for CLI, core types, compiler, Vite plugin, React helpers, router, SEO, map, agent, MCP, cache, schema, devtools, and adapters for Bun, Node, and static output. The repo is currently in Phase 0 with documentation and planning artifacts but no runtime implementation.

Current phase:
Phase 0: project constitution and implementation contracts. Next phases are monorepo skeleton, core data model, adapter package baseline, and route discovery.

Important docs, contracts, or policies:
README.md, AGENTS.md, ARCHITECTURE.md, CONTRIBUTING.md, SECURITY.md, docs/status.md, docs/cli.md, docs/config.md, docs/routing.md, docs/manifest-contracts.md, docs/runtime-contract.md, docs/adapters.md, docs/deployment.md, docs/security.md, docs/testing.md, docs/needle-map.md, docs/agent-kernel.md, docs/mcp-server.md, docs/safe-edit-transactions.md, docs/risk-mitigation.md, docs/task-backlog.md.

Available tools:
Repository read/write tools, code search, file editing, pull requests, eventual local commands after monorepo scaffolding, future MCP tools, future CLI commands, and future test fixtures.

Unavailable tools or constraints:
No runtime implementation exists yet. Do not claim commands pass until package scaffolding exists and checks are run. Do not assume background execution. Do not expose hidden chain-of-thought. Do not rely on a single vendor's agent runtime.

High-risk areas:
Auth and sessions, billing or payments, cache invalidation, deployment adapters, file-system write tools, safe edit APIs, MCP write tools, environment variable handling, runtime request routing, schema validators and serializers, server functions, production bundle contents, generated manifests that could expose secrets.

Workflows to support:
Documentation hardening, monorepo scaffolding, core data model implementation, route discovery, Vite dev integration, SSR/hydration, render modes, SEO engine, API routes, hot API compiler, cache manifests, Needle Map generation, agent context capsules, MCP read tools, safe metadata edits, Node/static adapter compatibility, migration prototype, tests, security review, release prep.

Quality bar:
Planned vs implemented behavior must stay honest. Generated JSON must be stable and schema-versioned. Graph edges must include source, confidence, and why. Safe edits must be AST-based, previewable, logged, check-backed, and reversible. Production output must exclude agent metadata. Tests must include rejection paths for safety-sensitive behavior.
```

## Suggested NeedleStart Subagents

A model running the prompt should consider these subagents, but it may refine or split them.

| Subagent | Mission |
| --- | --- |
| Project Steward | Maintains status, roadmap, task sequencing, and planned-vs-implemented truth. |
| Docs Architect | Keeps docs clear, linked, and contract-driven. |
| CLI Contract Agent | Owns command behavior, flags, JSON envelopes, and exit codes. |
| Config Contract Agent | Owns `needle.config.ts`, defaults, validation, and environment rules. |
| Routing Compiler Agent | Owns route discovery, route IDs, params, layouts, and diagnostics. |
| Manifest Stability Agent | Owns generated output contracts, schema versions, stable sorting, and redaction. |
| Runtime Adapter Agent | Owns Bun, Node, static adapter boundaries and production request behavior. |
| SEO Agent | Owns metadata, sitemap, robots, structured data, and SEO diagnostics. |
| API and Schema Agent | Owns API route behavior, schema DSL, validation, serialization, and OpenAPI. |
| Cache Agent | Owns cache plans, tags, invalidation semantics, and cache manifests. |
| Needle Map Agent | Owns graph nodes, edges, confidence rules, affected queries, and explainability. |
| Agent Kernel Agent | Owns context capsules, task skeletons, AGENTS generation, and mutation logs. |
| MCP Agent | Owns MCP read tools, future write-tool gating, and protocol-safe outputs. |
| Safe Edit Agent | Owns safe edit transaction design, AST edits, dry runs, mutation logs, and undo. |
| Security Agent | Reviews secrets, MCP, file writes, runtime exposure, and production bundle safety. |
| Testing Agent | Owns fixture strategy, stable JSON tests, HTTP tests, security tests, and benchmark gates. |
| Release Agent | Owns versions, changelogs, schema compatibility, prereleases, and verification gates. |
| Examples Agent | Owns examples as proof vehicles and test fixtures. |
| Accessibility Agent | Owns semantic HTML, accessibility diagnostics, and agent-safe content edits. |

## Portable Output Tip

When asking another model to use the generated blueprint, request this loop:

```txt
1. Read the task.
2. Choose the subagent or skill using the router.
3. Produce a task brief.
4. Execute only the allowed scope.
5. Return a result report with evidence and checks.
6. Escalate if risk or uncertainty crosses the defined threshold.
```

This keeps the system useful even when the runtime only supports a single chat model. The subagents become explicit modes of work rather than magical background workers.
