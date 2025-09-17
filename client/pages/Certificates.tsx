import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CertificateManagementQuick } from "@/components/ims/QuickSections";

export default function Certificates() {
  return (
    <div className="container py-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Certificates</h1>
        <Button variant="outline">New Request</Button>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Recent Requests</CardTitle>
          </CardHeader>
          <CardContent>
            <CertificateManagementQuick />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Preview</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <img src="/placeholder.svg" alt="Certificate Preview" className="w-full h-40 object-cover rounded-md border" />
            <div className="text-sm text-muted-foreground">Sample certificate layout for reference.</div>
            <Button size="sm" className="w-full">Download Template</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
