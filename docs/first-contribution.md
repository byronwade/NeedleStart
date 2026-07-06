# First Contribution Path

Status: Planned.

Audience: first-time contributors, maintainers, AI agents.

This page gives a focused path for a first contribution. Lumina is in Phase 1 scaffold, so first contributions should keep framework behavior clearly separated from scaffold and documentation work.

## Before You Start

Read these files in order:

1. [Project Status](status.md)
2. [README](../README.md)
3. [AGENTS](../AGENTS.md)
4. [Documentation Hub](README.md)
5. [Documentation Standard](documentation-standard.md)
6. [Task Backlog](task-backlog.md)

If the change touches architecture, package boundaries, runtime behavior, speed, security, or agent workflows, also read the matching contract page before editing.

## Good First Contribution Types

Good early contributions are:

- Clarifying planned docs without claiming implementation exists.
- Adding missing links between docs.
- Improving a checklist or task definition.
- Adding an ADR for a real decision.
- Tightening status language.
- Expanding public docs that clearly remain planned.

Avoid these as first contributions:

- Changing package scaffolding without following [Phase 1 Build Plan](phase-1-build-plan.md).
- Claiming framework commands pass before the implementation exists.
- Adding root-level AI playbook folders.
- Changing high-risk areas without reading [Risk Mitigation](risk-mitigation.md) and the relevant contract.

## Pick A Task

Use [Task Backlog](task-backlog.md) as the task source.

For documentation tasks, prefer a small change that has a clear verification path:

- Add one missing reference page.
- Add one checklist.
- Improve one section of public docs.
- Add one ADR.
- Fix stale navigation.

For implementation tasks that build on the scaffold, create or update a task file from [Implementation Task Template](templates/task-template.md).

## Make The Change

Keep the change scoped:

- Update the source document.
- Update the docs hub or README if the new doc needs to be discoverable.
- Update `AGENTS.md` if the change affects agent workflow, commands, generated files, package boundaries, or safety rules.
- Keep planned and implemented behavior separate.
- Prefer direct, durable language.

## Verify

Use [Documentation Verification](docs-verification.md) for the current automated checks and manual review steps.

Minimum checks for documentation-only changes:

```powershell
git diff --check
bun run docs:check
```

Run the local Markdown link check from [Documentation Verification](docs-verification.md).

If the change touches AI playbooks, verify:

```powershell
Test-Path -LiteralPath skills
Test-Path -LiteralPath subagents
Test-Path -LiteralPath docs\skills
Test-Path -LiteralPath docs\subagents
```

Expected result:

```txt
False
False
True
True
```

## Report

Summaries should include:

- What changed.
- Which docs were updated.
- Which checks ran.
- Which checks could not run and why.
- Any follow-up needed before implementation.

Do not hide missing evidence. Honest status is more useful than confident wording.
