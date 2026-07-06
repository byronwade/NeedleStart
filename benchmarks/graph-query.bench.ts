import { getBenchmarkDefinition } from "./status";

export const graphQueryBenchmark = getBenchmarkDefinition("graph-query");

if (import.meta.main) {
  console.log(JSON.stringify(graphQueryBenchmark));
}
