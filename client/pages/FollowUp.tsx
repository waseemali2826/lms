import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import FollowUpBoard from "@/components/ims/FollowUpBoard";

export default function FollowUp() {
  return (
    <div className="container py-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Enquiry Follow-Up</h1>
        <Button variant="outline" asChild><a href="/">Back to Dashboard</a></Button>
      </div>
      <img src="/placeholder.svg" alt="Follow Up" className="w-full h-32 object-cover rounded-md border" />
      <Card>
        <CardHeader>
          <CardTitle>Follow-Up Board</CardTitle>
        </CardHeader>
        <CardContent>
          <FollowUpBoard />
        </CardContent>
      </Card>
    </div>
  );
}
