export type PackageStatus = {
  name: string;
  phase: "scaffold";
  implementsRuntimeBehavior: false;
};

export const needleCoreStatus = {
  name: "@needle/core",
  phase: "scaffold",
  implementsRuntimeBehavior: false,
} as const satisfies PackageStatus;

export type RenderMode =
  | "static"
  | "prerender"
  | "ssr"
  | "stream"
  | "client-only"
  | "api"
  | "hot-api";

export type GraphEdgeConfidence = "high" | "medium" | "low";

export type GraphEdgeSource =
  | "file"
  | "contract"
  | "convention"
  | "static-analysis"
  | "manual";

export type GraphEdge = {
  id: string;
  from: string;
  to: string;
  kind: string;
  source: GraphEdgeSource;
  confidence: GraphEdgeConfidence;
  why: string;
};

export type DiagnosticSeverity = "info" | "warning" | "error";

export type NeedleDiagnostic = {
  code: string;
  severity: DiagnosticSeverity;
  message: string;
  docsUrl?: string;
  source?: {
    file: string;
    line?: number;
    column?: number;
  };
};

export type CachePlan =
  | {
      mode: "no-store";
    }
  | {
      mode: "public";
      ttlSeconds: number;
      staleWhileRevalidateSeconds?: number;
      tags?: string[];
    };

export type RouteNode = {
  id: string;
  path: string;
  sourceFile: string;
  renderMode: RenderMode;
  cache?: CachePlan;
};

export type NeedleApp = {
  name: string;
  root: string;
  routes: RouteNode[];
  diagnostics: NeedleDiagnostic[];
};

export type AdapterManifest = {
  schemaVersion: string;
  adapter: "bun" | "node" | "static" | string;
  package: string;
  runtime: {
    name: "bun" | "node" | "static" | string;
    versionRange?: string;
  };
  entry?: string;
  publicDir?: string;
  capabilities: Record<string, boolean | string | number>;
  unsupported: Array<{
    feature: string;
    reason: string;
  }>;
};

export function createGraphEdge(edge: GraphEdge): GraphEdge {
  if (!edge.kind || !edge.source || !edge.confidence || !edge.why) {
    throw new Error("GraphEdge requires kind, source, confidence, and why.");
  }

  return edge;
}
