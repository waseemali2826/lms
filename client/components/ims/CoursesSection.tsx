import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { courses10 } from "@/data/courses";

export default function CoursesSection() {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
        {courses10.map((c) => (
          <Card key={c.id} className="overflow-hidden">
            <img src={c.src} alt={c.title} className="w-full h-28 object-cover border-b" />
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{c.title}</CardTitle>
                <Badge variant={c.type === "free" ? "secondary" : "default"}>{c.type.toUpperCase()}</Badge>
              </div>
            </CardHeader>
            <CardContent className="flex items-center justify-between">
              <div className="text-xs text-muted-foreground">{c.filename}</div>
              <Button size="sm" variant="outline">View</Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
