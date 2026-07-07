import { Gauge, MonitorCheck, TimerReset } from "lucide-react";
import { Badge } from "./ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Separator } from "./ui/separator";

export function SpeedPanel() {
  const rows = [
    {
      icon: Gauge,
      label: "Developer speed",
      detail: "Route discovery, inspect output, and static build paths are available in the current scaffold.",
      status: "Active",
    },
    {
      icon: MonitorCheck,
      label: "User speed",
      detail: "Static HTML output and production hydration bundles exist; measured browser budgets remain planned.",
      status: "Partial",
    },
    {
      icon: TimerReset,
      label: "Agent speed",
      detail: "Lumina Map output is file-level today, with richer agent context planned after the MVP slice.",
      status: "Early",
    },
  ];

  return (
    <section className="section-shell speed-layout" aria-labelledby="speed-status-title">
      <div className="section-heading">
        <Badge variant="warning">Speed status</Badge>
        <h2 id="speed-status-title">Fast has to mean something measurable.</h2>
        <p>
          Developer, user, and agent speed each need their own evidence. Current benchmark files are
          skeletons and do not publish measured results.
        </p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Current evidence lanes</CardTitle>
          <CardDescription>No benchmark comparisons are claimed from this page.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="speed-list">
            {rows.map((row, index) => {
              const Icon = row.icon;
              return (
                <div className="speed-row" key={row.label}>
                  <span className="speed-icon">
                    <Icon aria-hidden="true" size={18} />
                  </span>
                  <span>
                    <strong>{row.label}</strong>
                    <span>{row.detail}</span>
                  </span>
                  <Badge variant={index === 0 ? "success" : "outline"}>{row.status}</Badge>
                </div>
              );
            })}
          </div>
          <Separator />
        </CardContent>
      </Card>
    </section>
  );
}
