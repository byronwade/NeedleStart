import { readFileSync, mkdtempSync, rmSync } from "node:fs";
import { cpus, tmpdir, totalmem, type } from "node:os";
import { join, resolve } from "node:path";
import { spawnSync } from "node:child_process";
import { createLuminaMap } from "@lumina/compiler";
import { getAffectedFiles, getAffectedRoutes } from "@lumina/map";
import type { LuminaMap } from "@lumina/core";
import { generateLargeRoutes } from "../fixtures/apps/large-1000-routes/scripts/generate-routes";
import { getBenchmarkDefinition, type BenchmarkDefinition } from "./status";

export const graphQueryBenchmark = getBenchmarkDefinition("graph-query");

export type GraphQueryBenchmarkRun = {
  run: number;
  durationMs: number;
  routeCount: number;
  nodeCount: number;
  edgeCount: number;
  diagnosticCount: number;
  queryCount: number;
  affectedRouteCount: number;
  relatedFileCount: number;
};

export type GraphQueryBenchmarkResult = {
  schemaVersion: "lumina.benchmark-result.v0";
  generatedBy: {
    package: "@lumina/compiler";
    version: "0.0.0";
  };
  benchmark: BenchmarkDefinition;
  metadata: {
    commit: string;
    fixtureName: string;
    command: "lumina bench graph-query --json --run";
    runtimeVersions: {
      bun: string;
      node: string;
    };
    dependencyVersions: Record<string, string>;
    os: string;
    hardware: string;
    warmups: number;
    runs: number;
  };
  results: GraphQueryBenchmarkRun[];
  summary: {
    status: "measured";
    routeCount: number;
    nodeCount: number;
    edgeCount: number;
    diagnosticCount: number;
    queryCount: number;
    affectedRouteCount: number;
    relatedFileCount: number;
    minMs: number;
    medianMs: number;
    maxMs: number;
    meanMs: number;
  };
  notes: string[];
};

const repoRoot = resolve(import.meta.dir, "..");
const queryTargets = [
  "app/route-0001/page.tsx",
  "app/route-0250/page.tsx",
  "app/route-0500/page.tsx",
  "app/route-0750/page.tsx",
  "app/route-1000/page.tsx",
];

export function runGraphQueryBenchmark(options: {
  warmups?: number;
  runs?: number;
} = {}): GraphQueryBenchmarkResult {
  const warmups = options.warmups ?? 1;
  const runs = options.runs ?? 5;
  const appRoot = mkdtempSync(join(tmpdir(), "lumina-graph-query-"));

  try {
    generateLargeRoutes(appRoot);
    const map = createLuminaMap({ appRoot });

    for (let index = 0; index < warmups; index += 1) {
      measureGraphQueries(map, 0);
    }

    const results = Array.from({ length: runs }, (_, index) => measureGraphQueries(map, index + 1));
    const durations = results.map((result) => result.durationMs).sort((left, right) => left - right);
    const latest = results.at(-1);

    return {
      schemaVersion: "lumina.benchmark-result.v0",
      generatedBy: {
        package: "@lumina/compiler",
        version: "0.0.0",
      },
      benchmark: {
        ...graphQueryBenchmark,
        status: "measured",
      },
      metadata: {
        commit: currentCommit(),
        fixtureName: graphQueryBenchmark.fixture,
        command: "lumina bench graph-query --json --run",
        runtimeVersions: {
          bun: Bun.version,
          node: process.version,
        },
        dependencyVersions: dependencyVersions(),
        os: `${type()} ${process.platform} ${process.arch}`,
        hardware: hardwareSummary(),
        warmups,
        runs,
      },
      results,
      summary: {
        status: "measured",
        routeCount: latest?.routeCount ?? 0,
        nodeCount: latest?.nodeCount ?? 0,
        edgeCount: latest?.edgeCount ?? 0,
        diagnosticCount: latest?.diagnosticCount ?? 0,
        queryCount: latest?.queryCount ?? 0,
        affectedRouteCount: latest?.affectedRouteCount ?? 0,
        relatedFileCount: latest?.relatedFileCount ?? 0,
        minMs: durations[0] ?? 0,
        medianMs: median(durations),
        maxMs: durations.at(-1) ?? 0,
        meanMs: round3(durations.reduce((total, value) => total + value, 0) / Math.max(durations.length, 1)),
      },
      notes: [
        "Local graph-query benchmark output is raw lab metadata, not a public performance comparison.",
        "The measured query set uses direct route source files from the deterministic 1000-route fixture.",
        "Results are not persisted until benchmark result review and storage policy are implemented.",
      ],
    };
  } finally {
    rmSync(appRoot, { recursive: true, force: true });
  }
}

function measureGraphQueries(map: LuminaMap, run: number): GraphQueryBenchmarkRun {
  const startedAt = performance.now();
  const queryResults = queryTargets.map((target) => ({
    affectedRoutes: getAffectedRoutes(map, target),
    relatedFiles: getAffectedFiles(map, target),
  }));
  const durationMs = round3(performance.now() - startedAt);

  return {
    run,
    durationMs,
    routeCount: map.nodes.filter((node) => node.kind === "route").length,
    nodeCount: map.nodes.length,
    edgeCount: map.edges.length,
    diagnosticCount: map.diagnostics.length,
    queryCount: queryTargets.length,
    affectedRouteCount: queryResults.reduce((total, result) => total + result.affectedRoutes.length, 0),
    relatedFileCount: queryResults.reduce((total, result) => total + result.relatedFiles.length, 0),
  };
}

function currentCommit(): string {
  const result = spawnSync("git", ["rev-parse", "--short", "HEAD"], {
    cwd: repoRoot,
    encoding: "utf8",
  });
  const commit = result.stdout.trim();
  return commit.length > 0 ? commit : "unknown";
}

function dependencyVersions(): Record<string, string> {
  const compilerPackage = readPackageJson(join(repoRoot, "packages", "compiler", "package.json"));
  const mapPackage = readPackageJson(join(repoRoot, "packages", "map", "package.json"));

  return {
    "@lumina/compiler": compilerPackage.version ?? "0.0.0",
    "@lumina/map": mapPackage.version ?? "0.0.0",
    ...Object.fromEntries(Object.entries(compilerPackage.dependencies ?? {}).sort(([left], [right]) => left.localeCompare(right, "en"))),
  };
}

function readPackageJson(path: string): {
  version?: string;
  dependencies?: Record<string, string>;
} {
  return JSON.parse(readFileSync(path, "utf8"));
}

function hardwareSummary(): string {
  const firstCpu = cpus()[0]?.model ?? "unknown CPU";
  const memoryGb = Math.round(totalmem() / 1024 / 1024 / 1024);
  return `${firstCpu}; ${cpus().length} logical cores; ${memoryGb}GB RAM`;
}

function median(values: number[]): number {
  if (values.length === 0) return 0;
  const midpoint = Math.floor(values.length / 2);
  if (values.length % 2 === 1) return values[midpoint] ?? 0;
  return round3(((values[midpoint - 1] ?? 0) + (values[midpoint] ?? 0)) / 2);
}

function round3(value: number): number {
  return Math.round(value * 1000) / 1000;
}

if (import.meta.main) {
  console.log(JSON.stringify(runGraphQueryBenchmark()));
}
