import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { dirname, join, relative, resolve } from "node:path";

const root = resolve(import.meta.dir, "..");
const failures: string[] = [];

const requiredDocs = [
  "README.md",
  "AGENTS.md",
  "docs/README.md",
  "docs/status.md",
  "docs/phase-1-build-plan.md",
  "docs/package-map.md",
  "docs/docs-verification.md",
  "docs/review-checklist.md",
  "docs/threat-model.md",
  "docs/benchmark-fixtures.md",
  "docs/examples-catalog.md",
  "docs/docs-site-build-plan.md",
  "docs/checklists/README.md",
  "docs/decisions/README.md",
];

const requiredEntryLinks = [
  "docs/phase-1-build-plan.md",
  "docs/package-map.md",
  "docs/docs-verification.md",
  "docs/review-checklist.md",
  "docs/threat-model.md",
  "docs/benchmark-fixtures.md",
  "docs/examples-catalog.md",
  "docs/docs-site-build-plan.md",
];

function rel(path: string): string {
  return relative(root, path).replaceAll("\\", "/");
}

function read(path: string): string {
  return readFileSync(join(root, path), "utf8");
}

function walkMarkdown(dir: string): string[] {
  const found: string[] = [];
  for (const entry of readdirSync(dir)) {
    const path = join(dir, entry);
    const stats = statSync(path);
    if (stats.isDirectory()) {
      if (entry === "node_modules" || entry === ".git") continue;
      found.push(...walkMarkdown(path));
    } else if (entry.endsWith(".md")) {
      found.push(path);
    }
  }
  return found;
}

for (const doc of requiredDocs) {
  if (!existsSync(join(root, doc))) {
    failures.push(`Missing required doc: ${doc}`);
  }
}

if (existsSync(join(root, "skills"))) {
  failures.push("Root skills/ must not exist; use docs/skills/.");
}

if (existsSync(join(root, "subagents"))) {
  failures.push("Root subagents/ must not exist; use docs/subagents/.");
}

for (const dir of ["docs/skills", "docs/subagents"]) {
  if (!existsSync(join(root, dir))) {
    failures.push(`Missing docs-level agent playbook directory: ${dir}`);
  }
}

for (const doc of requiredEntryLinks) {
  const plain = doc.replaceAll("\\", "/");
  const markdownTarget = plain.startsWith("docs/") ? plain.slice("docs/".length) : plain;
  const readmeHasLink = read("README.md").includes(plain);
  const docsHubHasLink = read("docs/README.md").includes(markdownTarget);
  const agentsHasRule = read("AGENTS.md").includes(plain);

  if (!readmeHasLink) failures.push(`README.md does not link ${plain}`);
  if (!docsHubHasLink) failures.push(`docs/README.md does not link ${markdownTarget}`);
  if (!agentsHasRule) failures.push(`AGENTS.md does not mention ${plain}`);
}

for (const file of walkMarkdown(root)) {
  const content = readFileSync(file, "utf8");
  const fileDir = dirname(file);
  const matches = content.matchAll(/\[[^\]]+\]\(([^)#][^)]*)\)/g);

  for (const match of matches) {
    const target = match[1]?.trim();
    if (!target || /^[a-zA-Z][a-zA-Z0-9+.-]*:/.test(target)) continue;
    const pathOnly = target.split("#")[0];
    if (!pathOnly) continue;
    const resolved = resolve(fileDir, pathOnly);
    if (!existsSync(resolved)) {
      failures.push(`${rel(file)} has broken local link: ${target}`);
    }
  }
}

const docsVerification = read("docs/docs-verification.md");
for (const term of [
  "Root Playbook Placement Check",
  "Navigation Coverage Check",
  "Review, Threat, Fixture, Example, And Docs-Site Check",
]) {
  if (!docsVerification.includes(term)) {
    failures.push(`docs/docs-verification.md is missing check section: ${term}`);
  }
}

if (failures.length) {
  console.error("Documentation checks failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Documentation checks passed.");
