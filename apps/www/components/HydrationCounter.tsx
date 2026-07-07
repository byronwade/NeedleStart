"use client";

import { useState } from "react";

export function HydrationCounter() {
  const [count, setCount] = useState(0);

  return (
    <section aria-label="Hydration proof">
      <button type="button" onClick={() => setCount((current) => current + 1)}>
        Hydrated clicks: {count}
      </button>
    </section>
  );
}
