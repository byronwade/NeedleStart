export function FeatureGrid() {
  const features = [
    "Deterministic route discovery",
    "Compact generated manifests",
    "Route-centered inspection",
    "Speed evidence without unsupported claims",
  ];

  return (
    <section>
      <h2>MVP Proof Points</h2>
      <ul>
        {features.map((feature) => (
          <li key={feature}>{feature}</li>
        ))}
      </ul>
    </section>
  );
}
