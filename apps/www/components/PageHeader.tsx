import type { ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { Badge } from "./ui/badge";
import { buttonVariants } from "./ui/button";

export function PageHeader({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow: string;
  title: string;
  description: string;
  children?: ReactNode;
}) {
  return (
    <section className="page-hero">
      <Badge variant="success">{eyebrow}</Badge>
      <div className="page-hero-copy">
        <h1>{title}</h1>
        <p>{description}</p>
      </div>
      {children ? <div className="page-hero-actions">{children}</div> : null}
    </section>
  );
}

export function DocsCta() {
  return (
    <a className={buttonVariants({ size: "lg" })} href="/docs">
      Read the docs
      <ArrowRight aria-hidden="true" size={16} />
    </a>
  );
}
