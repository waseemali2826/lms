import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import AdmissionsTables from "@/components/ims/AdmissionsTables";

export default function AdmissionsTablesPage() {
  return (
    <div className="container py-6 space-y-6">
      <h1 className="text-2xl font-bold">Admissions Reports</h1>
      <img src="/placeholder.svg" alt="Admissions Reports" className="w-full h-32 object-cover rounded-md border" />
      <Card>
        <CardHeader>
          <CardTitle>Tables</CardTitle>
        </CardHeader>
        <CardContent>
          <AdmissionsTables />
        </CardContent>
      </Card>
    </div>
  );
}
