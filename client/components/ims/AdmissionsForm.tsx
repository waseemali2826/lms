import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { useIMS, COURSES, CAMPUSES, PAK_CITIES } from "@/contexts/ims-store";

export default function AdmissionsForm() {
  const { addAdmission, addStudent, campus } = useIMS();
  const [fullName, setFullName] = useState("");
  const [course, setCourse] = useState("");
  const [campusSel, setCampusSel] = useState(campus);
  const [batch, setBatch] = useState("");
  const [admissionDate, setAdmissionDate] = useState<string>(new Date().toISOString().slice(0, 10));
  const [remarks, setRemarks] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !course) return;
    const studentId = addStudent({ fullName, course, campus: campusSel, status: "Current" as any });
    addAdmission({ fullName, enquiryId: undefined, studentId, course, campus: campusSel, batch: batch || undefined, admissionDate, status: "Active", remarks: remarks || undefined });
    setFullName("");
    setCourse("");
    setBatch("");
    setRemarks("");
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>New Admission (Admission Form)</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Full Name</Label>
            <Input value={fullName} onChange={(e) => setFullName(e.target.value)} required />
          </div>
          <div className="space-y-2">
            <Label>Course</Label>
            <Select value={course} onValueChange={setCourse}>
              <SelectTrigger>
                <SelectValue placeholder="Select course" />
              </SelectTrigger>
              <SelectContent>
                {COURSES.map((c) => (
                  <SelectItem key={c} value={c}>{c}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Campus</Label>
            <Select value={campusSel} onValueChange={setCampusSel}>
              <SelectTrigger>
                <SelectValue placeholder="Select campus" />
              </SelectTrigger>
              <SelectContent>
                {CAMPUSES.map((c) => (
                  <SelectItem key={c} value={c}>{c}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Batch</Label>
            <Input value={batch} onChange={(e) => setBatch(e.target.value)} />
          </div>

          <div className="space-y-2">
            <Label>Admission Date</Label>
            <Input type="date" value={admissionDate} onChange={(e) => setAdmissionDate(e.target.value)} />
          </div>

          <div className="md:col-span-2 space-y-2">
            <Label>Remarks</Label>
            <Input value={remarks} onChange={(e) => setRemarks(e.target.value)} />
          </div>

          <div className="md:col-span-2 flex justify-end">
            <Button type="submit">Save Admission</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
