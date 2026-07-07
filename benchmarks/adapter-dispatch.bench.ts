import { cpSync, mkdirSync, mkdtempSync, readFileSync, rmSync } from "node:fs";
import { cpus, totalmem, type } from "node:os";
import { join, resolve } from "node:path";
import { spawnSync } from "node:child_process";
import { startBuiltLuminaApp } from "@lumina/adapter-bun";
import { buildLuminaStaticApp } from "@lumina/vite-plugin";
import { getBenchmarkDefinition, type BenchmarkDefinition } from "./status";

export const adapterDispatchBenchmark = getBenchmarkDefinition("adapter-dispatch");

export type AdapterDispatchBenchmarkRun = {
  run: number;
  durationMs: number;
  requestCount: number;
  okCount: number;
  notFoundCount: number;
  statusCodes: number[];
  htmlBytes: number;
  notFoundBytes: number;
};

export type AdapterDispatchBenchmarkResult = {
  schemaVersion: "lumina.benchmark-result.v0";
  generatedBy: {
    package: "@lumina/compiler";
    version: "0.0.0";
  };
  benchmark: BenchmarkDefinition;
  metadata: {
    commit: string;
    fixtureName: string;
    command: "lumina bench adapter-dispatch --json --run";
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
  results: AdapterDispatchBenchmarkRun[];
  summary: {
    status: "measured";
    requestCount: number;
    okCount: number;
    notFoundCount: number;
    minMs: number;
    medianMs: number;
    maxMs: number;
    meanMs: number;
  };
  notes: string[];
};

const repoRoot = resolve(import.meta.dir, "..");
const requestPaths = ["/", "/missing"] as const;

export async function runAdapterDispatchBenchmark(options: {
  warmups?: number;
  runs?: number;
} = {}): Promise<AdapterDispatchBenchmarkResult> {
  const warmups = options.warmups ?? 1;
  const runs = options.runs ?? 5;
  const scratchRoot = join(repoRoot, ".tmp");
  mkdirSync(scratchRoot, { recursive: true });
  const appRoot = mkdtempSync(join(scratchRoot, "lumina-adapter-dispatch-"));
  const sourceRoot = join(repoRoot, ...adapterDispatchBenchmark.fixture.split("/"));
  let server: Awaited<ReturnType<typeof startBuiltLuminaApp>> | undefined;

  try {
    cpSync(sourceRoot, appRoot, { recursive: true });
    await buildLuminaStaticApp({
      appRoot,
      logLevel: "silent",
    });
    server = await startBuiltLuminaApp({
      appRoot,
      port: 0,
    });

    for (let index = 0; index < warmups; index += 1) {
      await measureAdapterDispatch(server.url, 0);
    }

    const results: AdapterDispatchBenchmarkRun[] = [];
    for (let index = 0; index < runs; index += 1) {
      results.push(await measureAdapterDispatch(server.url, index + 1));
    }

    const durations = results.map((result) => result.durationMs).sort((left, right) => left - right);
    const latest = results.at(-1);

    return {
      schemaVersion: "lumina.benchmark-result.v0",
      generatedBy: {
        package: "@lumina/compiler",
        version: "0.0.0",
      },
      benchmark: {
        ...adapterDispatchBenchmark,
        status: "measured",
      },
      metadata: {
        commit: currentCommit(),
        fixtureName: adapterDispatchBenchmark.fixture,
        command: "lumina bench adapter-dispatch --json --run",
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
        requestCount: latest?.requestCount ?? requestPaths.length,
        okCount: latest?.okCount ?? 0,
        notFoundCount: latest?.notFoundCount ?? 0,
        minMs: durations[0] ?? 0,
        medianMs: median(durations),
        maxMs: durations.at(-1) ?? 0,
        meanMs: round3(durations.reduce((total, value) => total + value, 0) / Math.max(durations.length, 1)),
      },
      notes: [
        "Local adapter-dispatch benchmark output is raw lab metadata, not a public performance comparison.",
        "The measured path starts a built @lumina/adapter-bun app and sends static HTML plus 404 requests.",
        "Results are not persisted until benchmark result review and storage policy are implemented.",
      ],
    };
  } finally {
    if (server) await server.close();
    rmSync(appRoot, { recursive: true, force: true });
  }
}

async function measureAdapterDispatch(baseUrl: string, run: number): Promise<AdapterDispatchBenchmarkRun> {
  const startedAt = performance.now();
  const responses = [];
  for (const path of requestPaths) {
    const response = await fetch(`${baseUrl}${path}`, {
      signal: AbortSignal.timeout(5_000),
    });
    responses.push({
      status: response.status,
      body: await response.text(),
    });
  }
  const durationMs = round3(performance.now() - startedAt);
  const statusCodes = responses.map((response) => response.status);
  const htmlBytes = byteLength(responses[0]?.body ?? "");
  const notFoundBytes = byteLength(responses[1]?.body ?? "");

  return {
    run,
    durationMs,
    requestCount: responses.length,
    okCount: statusCodes.filter((status) => status >= 200 && status < 300).length,
    notFoundCount: statusCodes.filter((status) => status === 404).length,
    statusCodes,
    htmlBytes,
    notFoundBytes,
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
  const adapterPackage = readPackageJson(join(repoRoot, "packages", "adapters", "bun", "package.json"));
  const vitePluginPackage = readPackageJson(join(repoRoot, "packages", "vite-plugin", "package.json"));

  return {
    "@lumina/adapter-bun": adapterPackage.version ?? "0.0.0",
    "@lumina/vite-plugin": vitePluginPackage.version ?? "0.0.0",
    ...Object.fromEntries(Object.entries(adapterPackage.dependencies ?? {}).sort(([left], [right]) => left.localeCompare(right, "en"))),
    ...Object.fromEntries(Object.entries(vitePluginPackage.dependencies ?? {}).sort(([left], [right]) => left.localeCompare(right, "en"))),
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

function byteLength(value: string): number {
  return new TextEncoder().encode(value).length;
}

if (import.meta.main) {
  console.log(JSON.stringify(await runAdapterDispatchBenchmark()));
}
