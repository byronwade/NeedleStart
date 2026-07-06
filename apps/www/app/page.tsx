import { FeatureGrid } from "../components/FeatureGrid";
import { Hero } from "../components/Hero";
import { MapPreview } from "../components/MapPreview";
import { SpeedPanel } from "../components/SpeedPanel";

export default function HomePage() {
  return (
    <main>
      <Hero />
      <FeatureGrid />
      <SpeedPanel />
      <MapPreview />
    </main>
  );
}
