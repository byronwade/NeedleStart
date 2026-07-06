import { getBenchmarkDefinition } from "./status";

export const manifestSizeBenchmark = getBenchmarkDefinition("manifest-size");

if (import.meta.main) {
  console.log(JSON.stringify(manifestSizeBenchmark));
}
