import { existsSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, test } from "bun:test";
import * as cli from "../packages/cli/src/index";

const root = join(import.meta.dir, "..");

describe("early benchmark skeleton", () => {
  test("keeps stable benchmark and fixture paths for MVP speed evidence", () => {
    for (const path of [
      "fixtures/apps/tiny-static",
      "fixtures/apps/medium-100-routes",
      "fixtures/apps/large-1000-routes",
      "benchmarks/route-discovery.bench.ts",
      "benchmarks/manifest-size.bench.ts",
      "benchmarks/graph-query.bench.ts",
      "benchmarks/adapter-dispatch.bench.ts",
    ]) {
      expect(existsSync(join(root, path))).toBe(true);
    }
  });

  test("reports every first benchmark surface without synthetic results", async () => {
    const { benchmarkSkeletonReport } = await import("../benchmarks/status");

    expect(benchmarkSkeletonReport).toEqual({
      schemaVersion: "lumina.benchmark-status.v0",
      generatedBy: {
        package: "@lumina/compiler",
        version: "0.0.0",
      },
      benchmarks: [
        {
          name: "route-discovery",
          file: "benchmarks/route-discovery.bench.ts",
          category: "developer",
          fixture: "fixtures/apps/tiny-static",
          status: "not implemented",
        },
        {
          name: "manifest-size",
          file: "benchmarks/manifest-size.bench.ts",
          category: "developer",
          fixture: "fixtures/apps/medium-100-routes",
          status: "not implemented",
        },
        {
          name: "graph-query",
          file: "benchmarks/graph-query.bench.ts",
          category: "agent",
          fixture: "fixtures/apps/large-1000-routes",
          status: "not implemented",
        },
        {
          name: "adapter-dispatch",
          file: "benchmarks/adapter-dispatch.bench.ts",
          category: "user",
          fixture: "fixtures/apps/tiny-static",
          status: "not implemented",
        },
      ],
      notes: [
        "Skeleton status is not performance evidence.",
        "No synthetic timing numbers are reported.",
      ],
    });
  });

  test("CLI lists benchmark skeleton status as compact JSON", async () => {
    const stdout: string[] = [];
    const stderr: string[] = [];

    const exitCode = await cli.runCli(["bench", "--list", "--json"], {
      stdout: (text) => stdout.push(text),
      stderr: (text) => stderr.push(text),
    });

    expect(exitCode).toBe(0);
    expect(stderr).toEqual([]);
    expect(stdout).toHaveLength(1);

    const output = JSON.parse(stdout[0]!);
    expect(output).toEqual({
      schemaVersion: "lumina.cli.v0",
      command: "lumina bench --list",
      status: "ok",
      data: {
        schemaVersion: "lumina.benchmark-status.v0",
        generatedBy: {
          package: "@lumina/compiler",
          version: "0.0.0",
        },
        benchmarks: [
          {
            name: "route-discovery",
            file: "benchmarks/route-discovery.bench.ts",
            category: "developer",
            fixture: "fixtures/apps/tiny-static",
            status: "not implemented",
          },
          {
            name: "manifest-size",
            file: "benchmarks/manifest-size.bench.ts",
            category: "developer",
            fixture: "fixtures/apps/medium-100-routes",
            status: "not implemented",
          },
          {
            name: "graph-query",
            file: "benchmarks/graph-query.bench.ts",
            category: "agent",
            fixture: "fixtures/apps/large-1000-routes",
            status: "not implemented",
          },
          {
            name: "adapter-dispatch",
            file: "benchmarks/adapter-dispatch.bench.ts",
            category: "user",
            fixture: "fixtures/apps/tiny-static",
            status: "not implemented",
          },
        ],
        notes: [
          "Skeleton status is not performance evidence.",
          "No synthetic timing numbers are reported.",
        ],
      },
      diagnostics: [],
      meta: {
        cwd: ".",
      },
    });
    expect(stdout[0]).not.toContain("\n");
  });

  test("CLI reports one benchmark skeleton status without running measurements", async () => {
    const stdout: string[] = [];
    const stderr: string[] = [];

    const exitCode = await cli.runCli(["bench", "route-discovery", "--json"], {
      stdout: (text) => stdout.push(text),
      stderr: (text) => stderr.push(text),
    });

    expect(exitCode).toBe(0);
    expect(stderr).toEqual([]);
    expect(stdout).toHaveLength(1);

    const output = JSON.parse(stdout[0]!);
    expect(output).toEqual({
      schemaVersion: "lumina.cli.v0",
      command: "lumina bench",
      status: "ok",
      data: {
        schemaVersion: "lumina.benchmark-status.v0",
        generatedBy: {
          package: "@lumina/compiler",
          version: "0.0.0",
        },
        benchmark: {
          name: "route-discovery",
          file: "benchmarks/route-discovery.bench.ts",
          category: "developer",
          fixture: "fixtures/apps/tiny-static",
          status: "not implemented",
        },
        notes: [
          "Skeleton status is not performance evidence.",
          "This command does not run benchmarks or emit timings yet.",
        ],
      },
      diagnostics: [],
      meta: {
        cwd: ".",
      },
    });
    expect(stdout[0]).not.toContain("\n");
  });

  test("CLI runs the route-discovery benchmark with raw local metadata", async () => {
    const stdout: string[] = [];
    const stderr: string[] = [];

    const exitCode = await cli.runCli(["bench", "route-discovery", "--json", "--run"], {
      stdout: (text) => stdout.push(text),
      stderr: (text) => stderr.push(text),
    });

    expect(exitCode).toBe(0);
    expect(stderr).toEqual([]);
    expect(stdout).toHaveLength(1);

    const output = JSON.parse(stdout[0]!);
    expect(output.schemaVersion).toBe("lumina.cli.v0");
    expect(output.command).toBe("lumina bench");
    expect(output.status).toBe("ok");
    expect(output.diagnostics).toEqual([]);
    expect(output.meta).toEqual({ cwd: "." });
    expect(output.data.schemaVersion).toBe("lumina.benchmark-result.v0");
    expect(output.data.generatedBy).toEqual({
      package: "@lumina/compiler",
      version: "0.0.0",
    });
    expect(output.data.benchmark).toEqual({
      name: "route-discovery",
      file: "benchmarks/route-discovery.bench.ts",
      category: "developer",
      fixture: "fixtures/apps/tiny-static",
      status: "measured",
    });
    expect(output.data.metadata).toMatchObject({
      fixtureName: "fixtures/apps/tiny-static",
      command: "lumina bench route-discovery --json --run",
      warmups: 1,
      runs: 5,
    });
    expect(typeof output.data.metadata.commit).toBe("string");
    expect(output.data.metadata.commit.length).toBeGreaterThan(0);
    expect(typeof output.data.metadata.os).toBe("string");
    expect(typeof output.data.metadata.hardware).toBe("string");
    expect(output.data.metadata.runtimeVersions.bun).toBeDefined();
    expect(output.data.metadata.dependencyVersions["@lumina/compiler"]).toBe("0.0.0");
    expect(output.data.results).toHaveLength(5);
    for (const run of output.data.results) {
      expect(run.routeCount).toBe(1);
      expect(run.diagnosticCount).toBe(0);
      expect(typeof run.durationMs).toBe("number");
      expect(run.durationMs).toBeGreaterThanOrEqual(0);
    }
    expect(output.data.summary.status).toBe("measured");
    expect(output.data.summary.routeCount).toBe(1);
    expect(output.data.summary.diagnosticCount).toBe(0);
    expect(typeof output.data.summary.minMs).toBe("number");
    expect(typeof output.data.summary.medianMs).toBe("number");
    expect(typeof output.data.summary.maxMs).toBe("number");
    expect(typeof output.data.summary.meanMs).toBe("number");
    expect(stdout[0]).not.toContain("\n");
  });

  test("CLI runs the manifest-size benchmark with raw local metadata", async () => {
    const stdout: string[] = [];
    const stderr: string[] = [];

    const exitCode = await cli.runCli(["bench", "manifest-size", "--json", "--run"], {
      stdout: (text) => stdout.push(text),
      stderr: (text) => stderr.push(text),
    });

    expect(exitCode).toBe(0);
    expect(stderr).toEqual([]);
    expect(stdout).toHaveLength(1);

    const output = JSON.parse(stdout[0]!);
    expect(output.schemaVersion).toBe("lumina.cli.v0");
    expect(output.command).toBe("lumina bench");
    expect(output.status).toBe("ok");
    expect(output.diagnostics).toEqual([]);
    expect(output.meta).toEqual({ cwd: "." });
    expect(output.data.schemaVersion).toBe("lumina.benchmark-result.v0");
    expect(output.data.generatedBy).toEqual({
      package: "@lumina/compiler",
      version: "0.0.0",
    });
    expect(output.data.benchmark).toEqual({
      name: "manifest-size",
      file: "benchmarks/manifest-size.bench.ts",
      category: "developer",
      fixture: "fixtures/apps/medium-100-routes",
      status: "measured",
    });
    expect(output.data.metadata).toMatchObject({
      fixtureName: "fixtures/apps/medium-100-routes",
      command: "lumina bench manifest-size --json --run",
      warmups: 1,
      runs: 5,
    });
    expect(typeof output.data.metadata.commit).toBe("string");
    expect(output.data.metadata.commit.length).toBeGreaterThan(0);
    expect(typeof output.data.metadata.os).toBe("string");
    expect(typeof output.data.metadata.hardware).toBe("string");
    expect(output.data.metadata.runtimeVersions.bun).toBeDefined();
    expect(output.data.metadata.dependencyVersions["@lumina/compiler"]).toBe("0.0.0");
    expect(output.data.results).toHaveLength(5);
    for (const run of output.data.results) {
      expect(run.routeCount).toBe(100);
      expect(run.diagnosticCount).toBe(0);
      expect(run.routesBytes).toBeGreaterThan(10_000);
      expect(run.renderManifestBytes).toBeGreaterThan(5_000);
      expect(run.mapBytes).toBeGreaterThan(10_000);
      expect(run.totalBytes).toBe(run.routesBytes + run.renderManifestBytes + run.mapBytes);
      expect(typeof run.durationMs).toBe("number");
      expect(run.durationMs).toBeGreaterThanOrEqual(0);
    }
    expect(output.data.summary.status).toBe("measured");
    expect(output.data.summary.routeCount).toBe(100);
    expect(output.data.summary.diagnosticCount).toBe(0);
    expect(typeof output.data.summary.minTotalBytes).toBe("number");
    expect(typeof output.data.summary.medianTotalBytes).toBe("number");
    expect(typeof output.data.summary.maxTotalBytes).toBe("number");
    expect(typeof output.data.summary.meanTotalBytes).toBe("number");
    expect(stdout[0]).not.toContain("\n");
  });

  test("CLI runs the graph-query benchmark with raw local metadata", async () => {
    const stdout: string[] = [];
    const stderr: string[] = [];

    const exitCode = await cli.runCli(["bench", "graph-query", "--json", "--run"], {
      stdout: (text) => stdout.push(text),
      stderr: (text) => stderr.push(text),
    });

    expect(exitCode).toBe(0);
    expect(stderr).toEqual([]);
    expect(stdout).toHaveLength(1);

    const output = JSON.parse(stdout[0]!);
    expect(output.schemaVersion).toBe("lumina.cli.v0");
    expect(output.command).toBe("lumina bench");
    expect(output.status).toBe("ok");
    expect(output.diagnostics).toEqual([]);
    expect(output.meta).toEqual({ cwd: "." });
    expect(output.data.schemaVersion).toBe("lumina.benchmark-result.v0");
    expect(output.data.generatedBy).toEqual({
      package: "@lumina/compiler",
      version: "0.0.0",
    });
    expect(output.data.benchmark).toEqual({
      name: "graph-query",
      file: "benchmarks/graph-query.bench.ts",
      category: "agent",
      fixture: "fixtures/apps/large-1000-routes",
      status: "measured",
    });
    expect(output.data.metadata).toMatchObject({
      fixtureName: "fixtures/apps/large-1000-routes",
      command: "lumina bench graph-query --json --run",
      warmups: 1,
      runs: 5,
    });
    expect(typeof output.data.metadata.commit).toBe("string");
    expect(output.data.metadata.commit.length).toBeGreaterThan(0);
    expect(typeof output.data.metadata.os).toBe("string");
    expect(typeof output.data.metadata.hardware).toBe("string");
    expect(output.data.metadata.runtimeVersions.bun).toBeDefined();
    expect(output.data.metadata.dependencyVersions["@lumina/compiler"]).toBe("0.0.0");
    expect(output.data.metadata.dependencyVersions["@lumina/map"]).toBe("0.0.0");
    expect(output.data.results).toHaveLength(5);
    for (const run of output.data.results) {
      expect(run.routeCount).toBe(1000);
      expect(run.queryCount).toBe(5);
      expect(run.affectedRouteCount).toBe(5);
      expect(run.relatedFileCount).toBe(5);
      expect(run.nodeCount).toBeGreaterThanOrEqual(1003);
      expect(run.edgeCount).toBeGreaterThanOrEqual(3000);
      expect(run.diagnosticCount).toBe(0);
      expect(typeof run.durationMs).toBe("number");
      expect(run.durationMs).toBeGreaterThanOrEqual(0);
    }
    expect(output.data.summary.status).toBe("measured");
    expect(output.data.summary.routeCount).toBe(1000);
    expect(output.data.summary.queryCount).toBe(5);
    expect(output.data.summary.affectedRouteCount).toBe(5);
    expect(typeof output.data.summary.minMs).toBe("number");
    expect(typeof output.data.summary.medianMs).toBe("number");
    expect(typeof output.data.summary.maxMs).toBe("number");
    expect(typeof output.data.summary.meanMs).toBe("number");
    expect(stdout[0]).not.toContain("\n");
  }, 15_000);

  test("CLI runs the adapter-dispatch benchmark with raw local metadata", async () => {
    const stdout: string[] = [];
    const stderr: string[] = [];

    const exitCode = await cli.runCli(["bench", "adapter-dispatch", "--json", "--run"], {
      stdout: (text) => stdout.push(text),
      stderr: (text) => stderr.push(text),
    });

    expect(exitCode).toBe(0);
    expect(stderr).toEqual([]);
    expect(stdout).toHaveLength(1);

    const output = JSON.parse(stdout[0]!);
    expect(output.schemaVersion).toBe("lumina.cli.v0");
    expect(output.command).toBe("lumina bench");
    expect(output.status).toBe("ok");
    expect(output.diagnostics).toEqual([]);
    expect(output.meta).toEqual({ cwd: "." });
    expect(output.data.schemaVersion).toBe("lumina.benchmark-result.v0");
    expect(output.data.generatedBy).toEqual({
      package: "@lumina/compiler",
      version: "0.0.0",
    });
    expect(output.data.benchmark).toEqual({
      name: "adapter-dispatch",
      file: "benchmarks/adapter-dispatch.bench.ts",
      category: "user",
      fixture: "fixtures/apps/tiny-static",
      status: "measured",
    });
    expect(output.data.metadata).toMatchObject({
      fixtureName: "fixtures/apps/tiny-static",
      command: "lumina bench adapter-dispatch --json --run",
      warmups: 1,
      runs: 5,
    });
    expect(typeof output.data.metadata.commit).toBe("string");
    expect(output.data.metadata.commit.length).toBeGreaterThan(0);
    expect(typeof output.data.metadata.os).toBe("string");
    expect(typeof output.data.metadata.hardware).toBe("string");
    expect(output.data.metadata.runtimeVersions.bun).toBeDefined();
    expect(output.data.metadata.dependencyVersions["@lumina/adapter-bun"]).toBe("0.0.0");
    expect(output.data.metadata.dependencyVersions["@lumina/vite-plugin"]).toBe("0.0.0");
    expect(output.data.results).toHaveLength(5);
    for (const run of output.data.results) {
      expect(run.requestCount).toBe(2);
      expect(run.okCount).toBe(1);
      expect(run.notFoundCount).toBe(1);
      expect(run.statusCodes).toEqual([200, 404]);
      expect(run.htmlBytes).toBeGreaterThan(0);
      expect(run.notFoundBytes).toBeGreaterThan(0);
      expect(typeof run.durationMs).toBe("number");
      expect(run.durationMs).toBeGreaterThanOrEqual(0);
    }
    expect(output.data.summary.status).toBe("measured");
    expect(output.data.summary.requestCount).toBe(2);
    expect(output.data.summary.okCount).toBe(1);
    expect(output.data.summary.notFoundCount).toBe(1);
    expect(typeof output.data.summary.minMs).toBe("number");
    expect(typeof output.data.summary.medianMs).toBe("number");
    expect(typeof output.data.summary.maxMs).toBe("number");
    expect(typeof output.data.summary.meanMs).toBe("number");
    expect(stdout[0]).not.toContain("\n");
  }, 15_000);
});
