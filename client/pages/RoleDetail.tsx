import { useParams, Link } from "react-router-dom";
import { roleMap, type RoleId } from "@/data/roles";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function RoleDetail() {
  const { roleId } = useParams<{ roleId: RoleId }>();
  const role = roleId ? roleMap.get(roleId as RoleId) : undefined;

  if (!role) {
    return (
      <div className="container py-10 space-y-4">
        <h1 className="text-2xl font-bold">Role not found</h1>
        <Button asChild variant="outline">
          <Link to="/">Back to Dashboard</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container py-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">{role.title}</h1>
        <Button asChild variant="outline">
          <Link to="/">Back to Dashboard</Link>
        </Button>
      </div>

      <Card>
        <img
          src={role.image}
          alt={role.title}
          className="w-full h-40 object-cover border-b"
        />
        <CardHeader>
          <CardTitle>Overview</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">{role.summary}</p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {role.kpis.map((k) => (
              <div key={k.label} className="rounded-md border p-3">
                <div className="text-xs text-muted-foreground">{k.label}</div>
                <div className="text-lg font-semibold">{k.value}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Key Responsibilities</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc pl-5 space-y-2">
            {role.responsibilities.map((r) => (
              <li key={r}>{r}</li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <div className="flex gap-2">
        <Badge variant="secondary">{role.title}</Badge>
      </div>
    </div>
  );
}
