import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

export function generateLargeRoutes(targetRoot: string): void {
  mkdirSync(join(targetRoot, "app"), { recursive: true });
  writeFileSync(
    join(targetRoot, "app", "layout.tsx"),
    [
      "export default function RootLayout({ children }: { children: unknown }) {",
      "  return <html lang=\"en\"><body>{children}</body></html>;",
      "}",
      "",
    ].join("\n"),
    "utf8",
  );

  for (let index = 1; index <= 1000; index += 1) {
    const routeName = `route-${index.toString().padStart(4, "0")}`;
    const routeDir = join(targetRoot, "app", routeName);
    mkdirSync(routeDir, { recursive: true });
    writeFileSync(
      join(routeDir, "page.tsx"),
      [
        `export default function Route${index.toString().padStart(4, "0")}Page() {`,
        `  return <main><h1>${routeName}</h1></main>;`,
        "}",
        "",
      ].join("\n"),
      "utf8",
    );
  }
}

if (import.meta.main) {
  const targetRoot = process.argv[2];
  if (!targetRoot) {
    console.error("Usage: bun fixtures/apps/large-1000-routes/scripts/generate-routes.ts <targetRoot>");
    process.exit(2);
  }

  generateLargeRoutes(targetRoot);
  console.log("generated 1000 deterministic routes");
}
