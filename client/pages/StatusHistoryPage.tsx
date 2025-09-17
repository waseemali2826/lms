import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import StatusHistory from "@/components/ims/StatusHistory";

export default function StatusHistoryPage() {
  return (
    <div className="container py-6 space-y-6">
      <h1 className="text-2xl font-bold">Status History</h1>
      <img
        src="/placeholder.svg"
        alt="Status History"
        className="w-full h-32 object-cover rounded-md border"
      />
      <Card>
        <CardHeader>
          <CardTitle>Recent Changes</CardTitle>
        </CardHeader>
        <CardContent>
          <StatusHistory />
        </CardContent>
      </Card>
    </div>
  );
}
