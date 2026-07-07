import { FeatureGrid } from "../components/FeatureGrid";
import { Hero } from "../components/Hero";
import { HydrationCounter } from "../components/HydrationCounter";
import { MapPreview } from "../components/MapPreview";
import { SpeedPanel } from "../components/SpeedPanel";

export default function HomePage() {
  return (
    <main className="home-page" id="main-content">
      <Hero />
      <FeatureGrid />
      <SpeedPanel />
      <HydrationCounter />
      <MapPreview />
    </main>
  );
}
