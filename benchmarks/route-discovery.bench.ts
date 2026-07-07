import { readFileSync } from "node:fs";
import { cpus, totalmem, type } from "node:os";
import { join, resolve } from "node:path";
import { spawnSync } from "node:child_process";
import { createRoutesManifest } from "@lumina/compiler";
import { getBenchmarkDefinition, type BenchmarkDefinition } from "./status";

export const routeDiscoveryBenchmark = getBenchmarkDefinition("route-discovery");

export type BenchmarkRunResult = {
  run: number;
  durationMs: number;
  routeCount: number;
  diagnosticCount: number;
};

export type RouteDiscoveryBenchmarkResult = {
  schemaVersion: "lumina.benchmark-result.v0";
  generatedBy: {
    package: "@lumina/compiler";
    version: "0.0.0";
  };
  benchmark: BenchmarkDefinition;
  metadata: {
    commit: string;
    fixtureName: string;
    command: "lumina bench route-discovery --json --run";
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
  results: BenchmarkRunResult[];
  summary: {
    status: "measured";
    routeCount: number;
    diagnosticCount: number;
    minMs: number;
    medianMs: number;
    maxMs: number;
    meanMs: number;
  };
  notes: string[];
};

const repoRoot = resolve(import.meta.dir, "..");

export function runRouteDiscoveryBenchmark(options: {
  warmups?: number;
  runs?: number;
} = {}): RouteDiscoveryBenchmarkResult {
  const warmups = options.warmups ?? 1;
  const runs = options.runs ?? 5;
  const appRoot = join(repoRoot, ...routeDiscoveryBenchmark.fixture.split("/"));

  for (let index = 0; index < warmups; index += 1) {
    createRoutesManifest({ appRoot });
  }

  const results = Array.from({ length: runs }, (_, index) => measureRouteDiscovery(appRoot, index + 1));
  const durations = results.map((result) => result.durationMs).sort((left, right) => left - right);
  const routeCount = results.at(-1)?.routeCount ?? 0;
  const diagnosticCount = results.at(-1)?.diagnosticCount ?? 0;

  return {
    schemaVersion: "lumina.benchmark-result.v0",
    generatedBy: {
      package: "@lumina/compiler",
      version: "0.0.0",
    },
    benchmark: {
      ...routeDiscoveryBenchmark,
      status: "measured",
    },
    metadata: {
      commit: currentCommit(),
      fixtureName: routeDiscoveryBenchmark.fixture,
      command: "lumina bench route-discovery --json --run",
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
      routeCount,
      diagnosticCount,
      minMs: durations[0] ?? 0,
      medianMs: median(durations),
      maxMs: durations.at(-1) ?? 0,
      meanMs: round3(durations.reduce((total, value) => total + value, 0) / Math.max(durations.length, 1)),
    },
    notes: [
      "Local route-discovery benchmark output is raw lab metadata, not a public performance comparison.",
      "Results are not persisted until benchmark result review and storage policy are implemented.",
    ],
  };
}

function measureRouteDiscovery(appRoot: string, run: number): BenchmarkRunResult {
  const startedAt = performance.now();
  const manifest = createRoutesManifest({ appRoot });
  const durationMs = round3(performance.now() - startedAt);

  return {
    run,
    durationMs,
    routeCount: manifest.routes.length,
    diagnosticCount: manifest.diagnostics.length,
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
  const compilerPackage = JSON.parse(readFileSync(join(repoRoot, "packages", "compiler", "package.json"), "utf8")) as {
    version?: string;
    dependencies?: Record<string, string>;
  };

  return {
    "@lumina/compiler": compilerPackage.version ?? "0.0.0",
    ...Object.fromEntries(Object.entries(compilerPackage.dependencies ?? {}).sort(([left], [right]) => left.localeCompare(right, "en"))),
  };
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
  console.log(JSON.stringify(runRouteDiscoveryBenchmark()));
}
