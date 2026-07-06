export function ExampleCard({ name, status, path }: { name: string; status: string; path: string }) {
  return (
    <article>
      <h2>{name}</h2>
      <p>Status: {status}</p>
      <p>Path: {path}</p>
    </article>
  );
}
