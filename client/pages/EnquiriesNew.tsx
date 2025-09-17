import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import EnquiryForm from "@/components/ims/EnquiryForm";

export default function EnquiriesNew() {
  return (
    <div className="container py-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Create New Enquiry</h1>
        <Button variant="outline" asChild>
          <a href="/">Back to Dashboard</a>
        </Button>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Enquiry Form</CardTitle>
        </CardHeader>
        <CardContent>
          <EnquiryForm />
        </CardContent>
      </Card>
    </div>
  );
}
