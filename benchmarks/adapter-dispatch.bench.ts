import { getBenchmarkDefinition } from "./status";

export const adapterDispatchBenchmark = getBenchmarkDefinition("adapter-dispatch");

if (import.meta.main) {
  console.log(JSON.stringify(adapterDispatchBenchmark));
}
