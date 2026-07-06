# Skill: Documentation Maintainer

Status: Scaffolded.
Audience: AI agents, documentation contributors, maintainers.

## Purpose

Use this skill to keep NeedleStart documentation accurate, synchronized, and honest about planned versus implemented behavior.

## When To Use

- Editing README, AGENTS, VISION, ARCHITECTURE, or files under `docs/`.
- Adding public positioning, roadmap, architecture, package, safety, or setup information.
- Reconciling conflicting docs after another change.

## Required Context

Read before editing:

1. `../../AGENTS.md`
2. `../../README.md`
3. The specific docs being changed.
4. `../README.md` when adding or reorganizing docs.
5. `../documentation-standard.md` when creating or reorganizing docs.
6. `../phase-1-build-plan.md` when setup, package structure, or scaffolding status changes.

## Workflow

1. Identify whether the change affects setup, commands, package structure, phase, safety rules, generated files, or public positioning.
2. Update README.md when user-facing status, public positioning, setup, package structure, or prototype status changes.
3. Update AGENTS.md when commands, workflow, safety rules, generated files, package ownership, or high-risk areas change.
4. Keep docs direct, durable, and aligned with the documentation lanes in `../documentation-standard.md`.
5. Mark planned features as planned unless implementation exists and has been verified.
6. Link new documentation guidance from README.md and `../README.md` when it helps discovery.

## Outputs

- Synchronized documentation updates.
- Explicit notes about what changed and why.
- Any remaining doc debt called out in the final handoff.

## Quality Bar

A new contributor should be able to read README.md, AGENTS.md, and the relevant docs and understand current repository status without relying on chat history.
