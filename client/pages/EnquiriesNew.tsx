import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import EnquiryForm from "@/components/ims/EnquiryForm";
import { TodaysEnquiriesTable, TodaysFollowUpTable } from "@/components/ims/EnquiriesTable";

export default function EnquiriesNew() {
  return (
    <div className="container py-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Create New Enquiry</h1>
        <Button variant="outline" asChild><a href="/">Back to Dashboard</a></Button>
      </div>
      <img src="/placeholder.svg" alt="Enquiries" className="w-full h-32 object-cover rounded-md border" />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Enquiry Form</CardTitle>
          </CardHeader>
          <CardContent>
            <EnquiryForm />
          </CardContent>
        </Card>
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Today's Follow-ups</CardTitle>
            </CardHeader>
            <CardContent>
              <TodaysFollowUpTable />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Today's Enquiries</CardTitle>
            </CardHeader>
            <CardContent>
              <TodaysEnquiriesTable />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
