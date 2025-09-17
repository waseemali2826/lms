import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import AdmissionsForm from "@/components/ims/AdmissionsForm";
import StudentsPanel from "@/components/ims/StudentsPanel";

export default function Admissions() {
  return (
    <div className="container py-6 space-y-6">
      <h1 className="text-2xl font-bold">Admissions</h1>
      <img
        src="/placeholder.svg"
        alt="Admissions"
        className="w-full h-32 object-cover rounded-md border"
      />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Admissions Form</CardTitle>
          </CardHeader>
          <CardContent>
            <AdmissionsForm />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Students</CardTitle>
          </CardHeader>
          <CardContent>
            <StudentsPanel />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
