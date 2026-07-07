import {
  BookOpen,
  Boxes,
  Compass,
  FileCode2,
  GitBranch,
  Rocket,
  ShieldCheck,
  TerminalSquare,
  Users,
  Workflow,
} from "lucide-react";
import type { ComponentType } from "react";

export type DocsStatus = "Current" | "Scaffolded" | "Planned";

export type DocsArticle = {
  slug: string;
  href: string;
  lane: string;
  title: string;
  description: string;
  status: DocsStatus;
  source: string;
  icon: ComponentType<{ "aria-hidden"?: boolean; size?: number; className?: string }>;
  sections: Array<{
    title: string;
    body: string;
  }>;
  links: Array<{
    label: string;
    href: string;
  }>;
};

export const docsArticles: DocsArticle[] = [
  {
    slug: "start",
    href: "/docs/start",
    lane: "Start",
    title: "Getting Started",
    description: "Use the current scaffold commands without confusing them for the future published create-app flow.",
    status: "Current",
    source: "docs/getting-started.md",
    icon: TerminalSquare,
    sections: [
      {
        title: "What works today",
        body: "The local checkout can install with Bun, discover routes, inspect route evidence, build static output, and start built HTML through the Bun adapter. Package publication and the public create command are still planned.",
      },
      {
        title: "Recommended first read",
        body: "Start with the repository status, then route discovery, render modes, and generated manifests. Those pages define the verified scaffold before broader framework behavior appears.",
      },
      {
        title: "Proof before claims",
        body: "Every command shown in public docs should either be backed by the current repository checks or clearly marked as target behavior until the implementation lands.",
      },
    ],
    links: [
      { label: "MVP Alpha scope", href: "/docs/guides/create-app" },
      { label: "Examples", href: "/examples" },
      { label: "Roadmap", href: "/roadmap" },
    ],
  },
  {
    slug: "concepts",
    href: "/docs/concepts",
    lane: "Concepts",
    title: "Concepts",
    description: "Understand the product ideas behind app-graph-native routing, SEO-safe defaults, and agent-safe workflows.",
    status: "Scaffolded",
    source: "docs/public/concepts/*",
    icon: Compass,
    sections: [
      {
        title: "The app graph is the product",
        body: "Lumina treats routes, files, render modes, generated artifacts, and future semantic contracts as a graph that humans and agents can inspect.",
      },
      {
        title: "Static first, explicit later",
        body: "The current implementation proves static pages and early SSR boundaries. Future render modes stay planned until fixtures and generated manifests prove them.",
      },
      {
        title: "Agents read evidence",
        body: "Agent workflows should depend on compiler output and source contracts instead of broad repository guessing.",
      },
    ],
    links: [
      { label: "App graph", href: "/docs/concepts/app-graph" },
      { label: "Lumina Map", href: "/docs/reference/routing" },
      { label: "Agent-safe workflows", href: "/docs/community" },
    ],
  },
  {
    slug: "concepts/app-graph",
    href: "/docs/concepts/app-graph",
    lane: "Concepts",
    title: "App Graph",
    description: "The route and file relationship model that makes a Lumina app explain itself.",
    status: "Current",
    source: "docs/lumina-map.md",
    icon: GitBranch,
    sections: [
      {
        title: "Route evidence",
        body: "The implemented map connects discovered routes to source files and direct local imports with stable edge metadata.",
      },
      {
        title: "Semantic contracts",
        body: "Higher-confidence component, API, schema, cache, ownership, and risk edges remain planned. Docs should name them as planned until implementation and tests exist.",
      },
      {
        title: "Human and agent use",
        body: "The graph is meant to answer what changed, which routes are affected, and why a route renders the way it does.",
      },
    ],
    links: [
      { label: "Routing reference", href: "/docs/reference/routing" },
      { label: "CLI reference", href: "/docs/reference/cli" },
      { label: "Manifest contracts", href: "/docs/reference/manifest-contracts" },
    ],
  },
  {
    slug: "guides",
    href: "/docs/guides",
    lane: "Guides",
    title: "Guides",
    description: "Task-oriented public docs for creating apps, adding pages, reading the map, and staying honest about planned APIs.",
    status: "Planned",
    source: "docs/public/guides/*",
    icon: BookOpen,
    sections: [
      {
        title: "Guides should be task-shaped",
        body: "Each guide should teach one job, link to the exact reference contract, and avoid hiding incomplete behavior behind polished copy.",
      },
      {
        title: "Create app remains target UX",
        body: "The public create flow is planned. Current local setup uses repository commands until package publication and starter generation exist.",
      },
      {
        title: "Examples prove the path",
        body: "Guides should link to verified fixtures when they exist and use planned labels for examples that are still scaffold-only.",
      },
    ],
    links: [
      { label: "Create app", href: "/docs/guides/create-app" },
      { label: "Examples", href: "/examples" },
      { label: "Reference", href: "/docs/reference" },
    ],
  },
  {
    slug: "guides/create-app",
    href: "/docs/guides/create-app",
    lane: "Guides",
    title: "Create An App",
    description: "The public starter path Lumina is building toward, separated from the commands that work in this repo today.",
    status: "Planned",
    source: "docs/public/guides/create-app.md",
    icon: Rocket,
    sections: [
      {
        title: "Target developer flow",
        body: "The intended public flow is bun create lumina, then dev, build, and start scripts inside the generated app. That command is not published yet.",
      },
      {
        title: "Current local equivalent",
        body: "Use the repository commands to inspect apps/www and examples/basic while the create package remains planned.",
      },
      {
        title: "Readiness gate",
        body: "This guide should become current only after starter generation, package scripts, route discovery, build, start, and generated artifact evidence all pass.",
      },
    ],
    links: [
      { label: "Getting started", href: "/docs/start" },
      { label: "Examples", href: "/examples" },
      { label: "MVP scope", href: "/roadmap" },
    ],
  },
  {
    slug: "reference",
    href: "/docs/reference",
    lane: "Reference",
    title: "Reference",
    description: "Contract-first documentation for CLI output, routing, manifests, config, adapters, security, and performance.",
    status: "Scaffolded",
    source: "docs/*-contract.md",
    icon: FileCode2,
    sections: [
      {
        title: "Reference pages define exact contracts",
        body: "Reference docs should name fields, commands, manifests, generated files, status values, and diagnostics without marketing language.",
      },
      {
        title: "Implemented versus planned",
        body: "Current references include implemented route discovery, render manifests, map output, dev/build/start slices, and many planned contracts.",
      },
      {
        title: "Machine-readable later",
        body: "The future docs renderer should expose reference metadata to docs-index.json, llms.txt, and llms-full.txt after parser support exists.",
      },
    ],
    links: [
      { label: "CLI", href: "/docs/reference/cli" },
      { label: "Routing", href: "/docs/reference/routing" },
      { label: "Manifest contracts", href: "/docs/reference/manifest-contracts" },
    ],
  },
  {
    slug: "reference/cli",
    href: "/docs/reference/cli",
    lane: "Reference",
    title: "CLI Reference",
    description: "Implemented local commands and planned automation surfaces for route, inspect, map, build, start, and bench workflows.",
    status: "Current",
    source: "docs/cli.md",
    icon: TerminalSquare,
    sections: [
      {
        title: "Implemented command slice",
        body: "The repository verifies routes, inspect, inspect why, map affected, dev, build, start, and benchmark listing commands through Bun scripts and tests.",
      },
      {
        title: "JSON contract discipline",
        body: "Agent-facing CLI output should stay compact, deterministic, schema-versioned where applicable, and documented before automation depends on it.",
      },
      {
        title: "Planned command surface",
        body: "Broader check, test, seo, workspace, agent, mcp, edit, migrate, and benchmark execution commands remain target behavior.",
      },
    ],
    links: [
      { label: "Routing", href: "/docs/reference/routing" },
      { label: "Getting started", href: "/docs/start" },
      { label: "Benchmarks", href: "/benchmarks" },
    ],
  },
  {
    slug: "reference/routing",
    href: "/docs/reference/routing",
    lane: "Reference",
    title: "Routing",
    description: "File routes, route IDs, params, route groups, diagnostics, and current fixture coverage.",
    status: "Current",
    source: "docs/routing-contract.md",
    icon: Workflow,
    sections: [
      {
        title: "Route discovery",
        body: "Lumina currently discovers page routes from app/page.tsx files, supports nested static routes, dynamic segments, catch-all segments, route groups, and layouts.",
      },
      {
        title: "Generated contracts",
        body: "Route discovery writes .lumina/routes.json, render information writes .lumina/render-manifest.json, and the early map writes .lumina/map.json.",
      },
      {
        title: "Future routing work",
        body: "API routes, broader render modes, cache plans, SEO diagnostics, and richer map relationships stay planned until contract-specific tests land.",
      },
    ],
    links: [
      { label: "Manifest contracts", href: "/docs/reference/manifest-contracts" },
      { label: "App graph", href: "/docs/concepts/app-graph" },
      { label: "Guides", href: "/docs/guides" },
    ],
  },
  {
    slug: "reference/manifest-contracts",
    href: "/docs/reference/manifest-contracts",
    lane: "Reference",
    title: "Manifest Contracts",
    description: "Generated file names, source inputs, deployment copies, and planned schema-versioned artifacts.",
    status: "Current",
    source: "docs/manifest-contracts.md",
    icon: Boxes,
    sections: [
      {
        title: "Current generated artifacts",
        body: "The current app slice emits route, render, map, build trace, performance report, routes manifest, render manifest, and adapter manifest files.",
      },
      {
        title: "Production runtime boundary",
        body: "The Bun adapter serves built output from dist/public and generated server artifacts instead of rediscovering source route files on each request.",
      },
      {
        title: "Planned artifacts",
        body: "SEO reports, cache reports, graph expansions, context capsules, workspace graph, and safe-edit mutation logs remain planned unless implementation evidence exists.",
      },
    ],
    links: [
      { label: "CLI", href: "/docs/reference/cli" },
      { label: "Routing", href: "/docs/reference/routing" },
      { label: "Deployment", href: "/docs/deployment" },
    ],
  },
  {
    slug: "deployment",
    href: "/docs/deployment",
    lane: "Operations",
    title: "Deployment And Operations",
    description: "Adapter boundaries, build output, compatibility, benchmark honesty, and launch-readiness checks.",
    status: "Scaffolded",
    source: "docs/deployment.md",
    icon: ShieldCheck,
    sections: [
      {
        title: "Adapter-aware output",
        body: "The verified path builds static output and adapter manifests, then serves built files through @lumina/adapter-bun.",
      },
      {
        title: "Compatibility stays evidence-based",
        body: "Node, static, edge, worker, and API production behavior must stay planned until implementation and fixture coverage prove them.",
      },
      {
        title: "Operations need proof",
        body: "Release, security, benchmark, and compatibility pages should cite exact checks or raw evidence before public claims move beyond target behavior.",
      },
    ],
    links: [
      { label: "Benchmarks", href: "/benchmarks" },
      { label: "Reference", href: "/docs/reference" },
      { label: "Roadmap", href: "/roadmap" },
    ],
  },
  {
    slug: "community",
    href: "/docs/community",
    lane: "Community",
    title: "Community",
    description: "Contribution, governance, review discipline, public launch readiness, and agent collaboration rules.",
    status: "Scaffolded",
    source: "docs/open-source-community.md",
    icon: Users,
    sections: [
      {
        title: "Contributors work from contracts",
        body: "Human and AI contributors use the same docs, checks, and review gates. Planned behavior should not be presented as implemented.",
      },
      {
        title: "Review is evidence-first",
        body: "Changes need clear scope, source-of-truth docs, appropriate tests, and explicit remaining follow-up when a feature is still planned.",
      },
      {
        title: "Public launch is not just polish",
        body: "The docs site needs navigation, accessibility review, maintainer contact paths, and verified user-facing behavior before launch readiness.",
      },
    ],
    links: [
      { label: "About", href: "/about" },
      { label: "Roadmap", href: "/roadmap" },
      { label: "Docs start", href: "/docs/start" },
    ],
  },
];

export const docsNavGroups = [
  {
    title: "Start",
    links: docsArticles.filter((article) => article.slug === "start"),
  },
  {
    title: "Concepts",
    links: docsArticles.filter((article) => article.slug === "concepts" || article.slug === "concepts/app-graph"),
  },
  {
    title: "Guides",
    links: docsArticles.filter((article) => article.slug === "guides" || article.slug === "guides/create-app"),
  },
  {
    title: "Reference",
    links: docsArticles.filter((article) => article.slug.startsWith("reference")),
  },
  {
    title: "Operations",
    links: docsArticles.filter((article) => article.slug === "deployment" || article.slug === "community"),
  },
];

export function getDocsArticle(slug: string): DocsArticle {
  const article = docsArticles.find((candidate) => candidate.slug === slug);
  if (!article) {
    throw new Error(`Unknown docs article: ${slug}`);
  }
  return article;
}
