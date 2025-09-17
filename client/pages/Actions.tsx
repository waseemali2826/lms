import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ActionsPanel from "@/components/ims/ActionsPanel";

export default function Actions() {
  return (
    <div className="container py-6 space-y-6">
      <h1 className="text-2xl font-bold">Actions</h1>
      <img src="/placeholder.svg" alt="Actions" className="w-full h-32 object-cover rounded-md border" />
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <ActionsPanel />
        </CardContent>
      </Card>
    </div>
  );
}
