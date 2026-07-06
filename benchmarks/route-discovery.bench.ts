import { getBenchmarkDefinition } from "./status";

export const routeDiscoveryBenchmark = getBenchmarkDefinition("route-discovery");

if (import.meta.main) {
  console.log(JSON.stringify(routeDiscoveryBenchmark));
}
