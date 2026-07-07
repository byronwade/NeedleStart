import type { GraphEdge, LuminaMap } from "@lumina/core";

export const luminaMapStatus = {
  name: "@lumina/map",
  phase: "implemented",
  implementsRuntimeBehavior: false,
} as const;

export type AffectedRoute = {
  id: string;
  path: string;
  sourceFile: string;
  reason: string;
};

export function getAffectedRoutes(map: LuminaMap, targetFile: string): AffectedRoute[] {
  const normalizedTarget = normalizeFile(targetFile);
  const targetNodeId = `file:${normalizedTarget}`;
  const incoming = incomingEdgesByTarget(map.edges);
  const visited = new Set<string>([targetNodeId]);
  const queue = [targetNodeId];
  const routes = new Map<string, AffectedRoute>();

  while (queue.length > 0) {
    const current = queue.shift()!;
    for (const edge of incoming.get(current) ?? []) {
      if (edge.from.startsWith("route:")) {
        const route = routeForNode(map, edge.from);
        const sourceFile = fileLabel(edge.to);
        if (route) {
          routes.set(route.path, {
            id: routeIdFromSourceEdge(edge),
            path: route.path,
            sourceFile,
            reason: affectedReason(normalizedTarget, sourceFile, route.path),
          });
        }
      }

      if (!visited.has(edge.from)) {
        visited.add(edge.from);
        queue.push(edge.from);
      }
    }
  }

  return [...routes.values()].sort((left, right) => compareStrings(left.path, right.path));
}

export function getAffectedFiles(map: LuminaMap, targetFile: string): string[] {
  const targetNodeId = `file:${normalizeFile(targetFile)}`;
  const incoming = incomingEdgesByTarget(map.edges);
  const visited = new Set<string>([targetNodeId]);
  const queue = [targetNodeId];
  const files = new Set<string>([fileLabel(targetNodeId)]);

  while (queue.length > 0) {
    const current = queue.shift()!;
    for (const edge of incoming.get(current) ?? []) {
      if (edge.from.startsWith("file:")) files.add(fileLabel(edge.from));
      if (!visited.has(edge.from)) {
        visited.add(edge.from);
        queue.push(edge.from);
      }
    }
  }

  return [...files].sort(compareStrings);
}

function incomingEdgesByTarget(edges: GraphEdge[]): Map<string, GraphEdge[]> {
  const incoming = new Map<string, GraphEdge[]>();
  for (const edge of edges) {
    incoming.set(edge.to, [...(incoming.get(edge.to) ?? []), edge]);
  }
  return incoming;
}

function routeForNode(map: LuminaMap, routeNodeId: string): { path: string } | undefined {
  const node = map.nodes.find((candidate) => candidate.id === routeNodeId && candidate.kind === "route");
  return node ? { path: node.label } : undefined;
}

function routeIdFromSourceEdge(edge: GraphEdge): string {
  const match = /^edge:route:(.+):source$/.exec(edge.id);
  return match?.[1] ?? edge.from.replace(/^route:/, "");
}

function affectedReason(targetFile: string, routeSourceFile: string, routePath: string): string {
  if (targetFile === routeSourceFile) return `${targetFile} defines ${routePath}.`;
  return `${targetFile} is imported by ${routeSourceFile}, which defines ${routePath}.`;
}

function normalizeFile(path: string): string {
  return path.replaceAll("\\", "/").replace(/^\.\//, "");
}

function fileLabel(nodeId: string): string {
  return nodeId.replace(/^file:/, "");
}

function compareStrings(left: string, right: string): number {
  return left.localeCompare(right, "en");
}
