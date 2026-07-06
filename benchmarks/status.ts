export type BenchmarkStatus = "measured" | "not implemented" | "skipped" | "failed";

export type BenchmarkCategory = "developer" | "user" | "agent";

export type BenchmarkDefinition = {
  name: string;
  file: string;
  category: BenchmarkCategory;
  fixture: string;
  status: BenchmarkStatus;
};

export const benchmarkSkeletonReport = {
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
} as const satisfies {
  schemaVersion: "lumina.benchmark-status.v0";
  generatedBy: {
    package: "@lumina/compiler";
    version: "0.0.0";
  };
  benchmarks: BenchmarkDefinition[];
  notes: string[];
};

export function getBenchmarkDefinition(name: BenchmarkDefinition["name"]): BenchmarkDefinition {
  const definition = benchmarkSkeletonReport.benchmarks.find((benchmark) => benchmark.name === name);
  if (!definition) throw new Error(`Unknown benchmark skeleton: ${name}`);
  return definition;
}
