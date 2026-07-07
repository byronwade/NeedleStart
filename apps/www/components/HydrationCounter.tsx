"use client";

import { useState } from "react";
import { MousePointerClick } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardTitle } from "./ui/card";

export function HydrationCounter() {
  const [count, setCount] = useState(0);

  return (
    <section aria-label="Hydration proof" className="section-shell counter-shell">
      <Card>
        <CardContent className="counter-card">
          <div>
            <CardTitle>Browser hydration proof</CardTitle>
            <p>The production and dev bundles hydrate this route and keep local interaction state.</p>
          </div>
          <Button type="button" onClick={() => setCount((current) => current + 1)}>
            <MousePointerClick aria-hidden="true" size={18} />
            Hydrated clicks: {count}
          </Button>
        </CardContent>
      </Card>
    </section>
  );
}
