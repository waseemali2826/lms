import { useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useIMS } from "@/contexts/ims-store";

function sameMonth(a: Date, b: Date) {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth();
}
function sameYear(a: Date, b: Date) {
  return a.getFullYear() === b.getFullYear();
}

export default function AdmissionsTables() {
  const { admissions } = useIMS();
  const ALL = "__ALL__";
  const [courseFilter, setCourseFilter] = useState<string>(ALL);
  const [campusFilter, setCampusFilter] = useState<string>(ALL);

  const all = Object.values(admissions).sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  const today = new Date();

  const todays = useMemo(() => all.filter((a) => new Date(a.admissionDate).toDateString() === today.toDateString()), [all]);
  const month = useMemo(() => all.filter((a) => sameMonth(new Date(a.admissionDate), today)), [all]);
  const year = useMemo(() => all.filter((a) => sameYear(new Date(a.admissionDate), today)), [all]);

  const filterList = (list: typeof all) =>
    list
      .filter((a) => (courseFilter && courseFilter !== ALL ? a.course === courseFilter : true))
      .filter((a) => (campusFilter && campusFilter !== ALL ? a.campus === campusFilter : true));

  const renderTable = (items: typeof all) => (
    <div className="rounded-md border overflow-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Student</TableHead>
            <TableHead>Course</TableHead>
            <TableHead>Campus</TableHead>
            <TableHead>Admission Date</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.map((a) => (
            <TableRow key={a.id}>
              <TableCell className="font-medium">{a.fullName}</TableCell>
              <TableCell>{a.course}</TableCell>
              <TableCell>{a.campus}</TableCell>
              <TableCell>{new Date(a.admissionDate).toLocaleDateString()}</TableCell>
              <TableCell>{a.status}</TableCell>
            </TableRow>
          ))}
          {items.length === 0 && (
            <TableRow>
              <TableCell colSpan={5} className="text-center text-muted-foreground">No items</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );

  const courses = Array.from(new Set(all.map((a) => a.course))).filter(Boolean);
  const campuses = Array.from(new Set(all.map((a) => a.campus))).filter(Boolean);

  return (
    <div className="space-y-4">
      <div className="flex gap-2 items-center">
        <div className="w-48">
          <Select value={courseFilter} onValueChange={setCourseFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Filter by Course" />
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
              <SelectValue placeholder="Filter by Campus" />
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

      <Card>
        <CardHeader>
          <CardTitle>Today&apos;s Admissions</CardTitle>
        </CardHeader>
        <CardContent>{renderTable(filterList(todays))}</CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Current Month Admissions</CardTitle>
        </CardHeader>
        <CardContent>{renderTable(filterList(month))}</CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Current Year Admissions</CardTitle>
        </CardHeader>
        <CardContent>{renderTable(filterList(year))}</CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>All Admissions</CardTitle>
        </CardHeader>
        <CardContent>{renderTable(filterList(all))}</CardContent>
      </Card>
    </div>
  );
}
