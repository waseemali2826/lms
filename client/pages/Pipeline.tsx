import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import FollowUpBoard from "@/components/ims/FollowUpBoard";

export default function Pipeline() {
  return (
    <div className="container py-6 space-y-6">
      <h1 className="text-2xl font-bold">Pipeline</h1>
      <img
        src="/placeholder.svg"
        alt="Pipeline"
        className="w-full h-32 object-cover rounded-md border"
      />
      <Card>
        <CardHeader>
          <CardTitle>Stages</CardTitle>
        </CardHeader>
        <CardContent>
          <FollowUpBoard />
        </CardContent>
      </Card>
    </div>
  );
}
