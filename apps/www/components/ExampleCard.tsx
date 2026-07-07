import { ArrowUpRight } from "lucide-react";
import { Badge } from "./ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

export function ExampleCard({ name, status, path }: { name: string; status: string; path: string }) {
  return (
    <Card className="example-card">
      <CardHeader>
        <div className="card-title-row">
          <CardTitle>{name}</CardTitle>
          <ArrowUpRight aria-hidden="true" size={17} />
        </div>
      </CardHeader>
      <CardContent>
        <p>Fixture path</p>
        <code>{path}</code>
        <Badge variant={status === "Verified" ? "success" : "secondary"}>{status}</Badge>
      </CardContent>
    </Card>
  );
}
