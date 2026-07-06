export default function RootLayout({ children }: { children: unknown }) {
  return (
    <html lang="en">
      <body>
        <header>
          <a href="/">Lumina</a>
          <nav aria-label="Primary">
            <a href="/about">About</a>
            <a href="/docs">Docs</a>
            <a href="/benchmarks">Benchmarks</a>
            <a href="/examples">Examples</a>
            <a href="/roadmap">Roadmap</a>
          </nav>
        </header>
        {children}
      </body>
    </html>
  );
}
