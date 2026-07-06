export function PostCard({ title, slug }: { title: string; slug: string }) {
  return (
    <article>
      <h2>{title}</h2>
      <a href={`/blog/${slug}`}>Read post</a>
    </article>
  );
}
