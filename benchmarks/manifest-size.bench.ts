import { Buffer } from "node:buffer";
import { readFileSync, mkdtempSync, rmSync } from "node:fs";
import { cpus, tmpdir, totalmem, type } from "node:os";
import { join, resolve } from "node:path";
import { spawnSync } from "node:child_process";
import {
  createLuminaMap,
  createRenderManifest,
  createRoutesManifest,
} from "@lumina/compiler";
import { generateMediumRoutes } from "../fixtures/apps/medium-100-routes/scripts/generate-routes";
import { getBenchmarkDefinition, type BenchmarkDefinition } from "./status";

export const manifestSizeBenchmark = getBenchmarkDefinition("manifest-size");

export type ManifestSizeBenchmarkRun = {
  run: number;
  durationMs: number;
  routeCount: number;
  diagnosticCount: number;
  routesBytes: number;
  renderManifestBytes: number;
  mapBytes: number;
  totalBytes: number;
};

export type ManifestSizeBenchmarkResult = {
  schemaVersion: "lumina.benchmark-result.v0";
  generatedBy: {
    package: "@lumina/compiler";
    version: "0.0.0";
  };
  benchmark: BenchmarkDefinition;
  metadata: {
    commit: string;
    fixtureName: string;
    command: "lumina bench manifest-size --json --run";
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
  results: ManifestSizeBenchmarkRun[];
  summary: {
    status: "measured";
    routeCount: number;
    diagnosticCount: number;
    minTotalBytes: number;
    medianTotalBytes: number;
    maxTotalBytes: number;
    meanTotalBytes: number;
  };
  notes: string[];
};

const repoRoot = resolve(import.meta.dir, "..");

export function runManifestSizeBenchmark(options: {
  warmups?: number;
  runs?: number;
} = {}): ManifestSizeBenchmarkResult {
  const warmups = options.warmups ?? 1;
  const runs = options.runs ?? 5;
  const appRoot = mkdtempSync(join(tmpdir(), "lumina-manifest-size-"));

  try {
    generateMediumRoutes(appRoot);

    for (let index = 0; index < warmups; index += 1) {
      measureManifestSize(appRoot, 0);
    }

    const results = Array.from({ length: runs }, (_, index) => measureManifestSize(appRoot, index + 1));
    const totalBytes = results.map((result) => result.totalBytes).sort((left, right) => left - right);
    const routeCount = results.at(-1)?.routeCount ?? 0;
    const diagnosticCount = results.at(-1)?.diagnosticCount ?? 0;

    return {
      schemaVersion: "lumina.benchmark-result.v0",
      generatedBy: {
        package: "@lumina/compiler",
        version: "0.0.0",
      },
      benchmark: {
        ...manifestSizeBenchmark,
        status: "measured",
      },
      metadata: {
        commit: currentCommit(),
        fixtureName: manifestSizeBenchmark.fixture,
        command: "lumina bench manifest-size --json --run",
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
        minTotalBytes: totalBytes[0] ?? 0,
        medianTotalBytes: median(totalBytes),
        maxTotalBytes: totalBytes.at(-1) ?? 0,
        meanTotalBytes: round3(totalBytes.reduce((total, value) => total + value, 0) / Math.max(totalBytes.length, 1)),
      },
      notes: [
        "Local manifest-size benchmark output is raw lab metadata, not a public performance comparison.",
        "Results are not persisted until benchmark result review and storage policy are implemented.",
      ],
    };
  } finally {
    rmSync(appRoot, { recursive: true, force: true });
  }
}

function measureManifestSize(appRoot: string, run: number): ManifestSizeBenchmarkRun {
  const startedAt = performance.now();
  const routesManifest = createRoutesManifest({ appRoot });
  const renderManifest = createRenderManifest({ appRoot });
  const map = createLuminaMap({ appRoot });
  const durationMs = round3(performance.now() - startedAt);
  const routesBytes = jsonBytes(routesManifest);
  const renderManifestBytes = jsonBytes(renderManifest);
  const mapBytes = jsonBytes(map);

  return {
    run,
    durationMs,
    routeCount: routesManifest.routes.length,
    diagnosticCount: routesManifest.diagnostics.length + renderManifest.diagnostics.length + map.diagnostics.length,
    routesBytes,
    renderManifestBytes,
    mapBytes,
    totalBytes: routesBytes + renderManifestBytes + mapBytes,
  };
}

function jsonBytes(value: unknown): number {
  return Buffer.byteLength(JSON.stringify(value), "utf8");
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
  console.log(JSON.stringify(runManifestSizeBenchmark()));
}
