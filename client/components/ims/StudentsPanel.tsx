import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useIMS } from "@/contexts/ims-store";

export default function StudentsPanel() {
  const { students, updateStudent } = useIMS();
  const ALL = "__ALL__";
  const [courseFilter, setCourseFilter] = useState<string>(ALL);
  const [campusFilter, setCampusFilter] = useState<string>(ALL);

  const list = Object.values(students).sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  const filtered = list
    .filter((s) => (courseFilter && courseFilter !== ALL ? s.course === courseFilter : true))
    .filter((s) => (campusFilter && campusFilter !== ALL ? s.campus === campusFilter : true));

  const courses = Array.from(new Set(list.map((s) => s.course))).filter(Boolean);
  const campuses = Array.from(new Set(list.map((s) => s.campus))).filter(Boolean);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Current Students</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex gap-2 items-center mb-4">
          <div className="w-48">
            <Select value={courseFilter} onValueChange={setCourseFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter Course" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={ALL}>All</SelectItem>
                {courses.map((c) => (
                  <SelectItem key={c} value={c}>{c}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="w-48">
            <Select value={campusFilter} onValueChange={setCampusFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter Campus" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={ALL}>All</SelectItem>
                {campuses.map((c) => (
                  <SelectItem key={c} value={c}>{c}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="rounded-md border overflow-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Course</TableHead>
                <TableHead>Batch</TableHead>
                <TableHead>Campus</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((s) => (
                <TableRow key={s.id}>
                  <TableCell className="font-medium">{s.fullName}</TableCell>
                  <TableCell>{s.course}</TableCell>
                  <TableCell>{s.batch || "-"}</TableCell>
                  <TableCell>{s.campus}</TableCell>
                  <TableCell>{s.status}</TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button size="sm" variant="outline" onClick={() => updateStudent(s.id, { status: "Concluded" })}>Conclude</Button>
                    <Button size="sm" variant="destructive" onClick={() => updateStudent(s.id, { status: "Suspended" })}>Suspend</Button>
                  </TableCell>
                </TableRow>
              ))}
              {filtered.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} className="text-center text-muted-foreground">No students</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
