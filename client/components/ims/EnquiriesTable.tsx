import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useIMS } from "@/contexts/ims-store";

function sameDay(a: Date, b: Date) {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}

function EnquiriesTable({ title, filter }: { title: string; filter: (id: string) => boolean }) {
  const { enquiries, selectEnquiry } = useIMS();
  const list = Object.values(enquiries)
    .filter((e) => filter(e.id))
    .sort((a, b) => b.updatedAt.localeCompare(a.updatedAt))
    .slice(0, 50);

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Course</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead>City</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {list.map((e) => (
              <TableRow key={e.id}>
                <TableCell className="font-medium">{e.fullName}</TableCell>
                <TableCell>{e.courseInterested}</TableCell>
                <TableCell>{e.primaryContactNumber}</TableCell>
                <TableCell>{e.city}</TableCell>
                <TableCell>{e.status}</TableCell>
                <TableCell className="text-right space-x-2">
                  <Button size="sm" variant="outline" onClick={() => selectEnquiry(e.id)}>Follow Up</Button>
                </TableCell>
              </TableRow>
            ))}
            {list.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} className="text-center text-muted-foreground">No items</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

export function TodaysFollowUpTable() {
  const { enquiries } = useIMS();
  const today = new Date();
  const filter = (id: string) => {
    const e = enquiries[id];
    if (!e.nextFollowUp) return false;
    const dt = new Date(e.nextFollowUp);
    return sameDay(dt, today);
  };
  return <EnquiriesTable title="Today’s Follow Up" filter={filter} />;
}

export function TodaysEnquiriesTable() {
  const { enquiries } = useIMS();
  const today = new Date();
  const filter = (id: string) => {
    const e = enquiries[id];
    const dt = new Date(e.createdAt);
    return sameDay(dt, today);
  };
  return <EnquiriesTable title="Today’s Enquiries" filter={filter} />;
}
