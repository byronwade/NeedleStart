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
});
