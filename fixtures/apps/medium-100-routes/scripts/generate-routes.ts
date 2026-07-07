import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

export function generateMediumRoutes(targetRoot: string): void {
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

  for (let index = 1; index <= 100; index += 1) {
    const routeName = `route-${index.toString().padStart(3, "0")}`;
    const routeDir = join(targetRoot, "app", routeName);
    mkdirSync(routeDir, { recursive: true });
    writeFileSync(
      join(routeDir, "page.tsx"),
      [
        `export default function Route${index.toString().padStart(3, "0")}Page() {`,
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
    console.error("Usage: bun fixtures/apps/medium-100-routes/scripts/generate-routes.ts <targetRoot>");
    process.exit(2);
  }

  generateMediumRoutes(targetRoot);
  console.log("generated 100 deterministic routes");
}
