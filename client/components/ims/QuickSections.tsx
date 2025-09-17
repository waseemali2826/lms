import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";

export function BatchTimeTableQuick() {
  const batches = [
    { code: "WD-101", course: "Web Dev Fundamentals", trainer: "Ayesha Khan", room: "Lab A", days: "Mon, Wed, Fri", time: "10:00–12:00", start: "2025-10-01", seats: 30, filled: 24, status: "Active" as const },
    { code: "DS-202", course: "Data Science Basics", trainer: "Umair Farooq", room: "Lab B", days: "Tue, Thu", time: "14:00–16:00", start: "2025-10-05", seats: 25, filled: 18, status: "Enrolling" as const },
    { code: "GD-301", course: "Graphic Design Pro", trainer: "Hira Ali", room: "Studio 1", days: "Sat, Sun", time: "11:00–14:00", start: "2025-10-12", seats: 20, filled: 20, status: "Full" as const },
  ];

  return (
    <div className="space-y-4">
      <img src="/placeholder.svg" alt="Timetable" className="w-full h-28 object-cover rounded-md border" />
      <div className="grid grid-cols-7 gap-2 text-xs font-medium text-muted-foreground">
        <div>Batch</div>
        <div>Course</div>
        <div>Trainer</div>
        <div>Room</div>
        <div>Schedule</div>
        <div>Seats</div>
        <div>Status</div>
      </div>
      <Separator />
      <div className="space-y-3">
        {batches.map((b) => (
          <div key={b.code} className="grid grid-cols-7 gap-2 items-center text-sm">
            <div className="font-medium">{b.code}</div>
            <div>{b.course}</div>
            <div>{b.trainer}</div>
            <div>{b.room}</div>
            <div className="text-xs text-muted-foreground">{b.days} • {b.time}</div>
            <div className="text-xs">{b.filled}/{b.seats}</div>
            <div>
              <Badge variant={b.status === "Active" ? "default" : b.status === "Full" ? "destructive" : "secondary"}>{b.status}</Badge>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-end pt-2">
        <Button size="sm" variant="outline">View Full Timetable</Button>
      </div>
    </div>
  );
}

export function CoursesManagementQuick() {
  const courses = [
    { id: "wd", title: "Web Development", duration: "12 weeks", fee: "PKR 45,000", enrollments: 128 },
    { id: "ds", title: "Data Science", duration: "10 weeks", fee: "PKR 55,000", enrollments: 96 },
    { id: "gd", title: "Graphic Design", duration: "8 weeks", fee: "PKR 35,000", enrollments: 74 },
    { id: "dm", title: "Digital Marketing", duration: "6 weeks", fee: "PKR 30,000", enrollments: 61 },
  ];
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {courses.map((c, i) => (
          <div key={c.id} className="flex items-center gap-3 rounded-md border p-3">
            <img src="/placeholder.svg" alt={c.title} className="h-16 w-16 rounded object-cover border" />
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between">
                <div className="font-medium truncate">{c.title}</div>
                <Badge variant="secondary">{c.duration}</Badge>
              </div>
              <div className="text-xs text-muted-foreground">Fee: {c.fee} • Enrolled: {c.enrollments}</div>
              <div className="mt-2 flex gap-2">
                <Button size="xs" variant="outline">View</Button>
                <Button size="xs">Edit</Button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-end">
        <Button size="sm" variant="outline">Manage Courses</Button>
      </div>
    </div>
  );
}

export function CertificateManagementQuick() {
  const requests = [
    { id: "REQ-1001", student: "Ali Raza", course: "Web Development", date: "2025-09-20", status: "Pending" as const },
    { id: "REQ-1002", student: "Sana Malik", course: "Graphic Design", date: "2025-09-18", status: "Printed" as const },
    { id: "REQ-1003", student: "Bilal Ahmed", course: "Data Science", date: "2025-09-15", status: "Delivered" as const },
  ];
  const statusVariant = (s: string) => (s === "Delivered" ? "default" : s === "Printed" ? "secondary" : "destructive");
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        {requests.map((r) => (
          <div key={r.id} className="flex items-center gap-3 rounded-md border p-3">
            <img src="/placeholder.svg" alt="Certificate" className="h-12 w-12 rounded object-cover border" />
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between">
                <div className="font-medium truncate">{r.student} • {r.course}</div>
                <Badge variant={statusVariant(r.status)}>{r.status}</Badge>
              </div>
              <div className="text-xs text-muted-foreground">Req: {r.id} • {r.date}</div>
            </div>
            <Button size="xs" variant="outline">Details</Button>
          </div>
        ))}
      </div>
      <div className="flex justify-end">
        <Button size="sm" variant="outline">View All Requests</Button>
      </div>
    </div>
  );
}

export function CampusEmployeesQuick() {
  const campuses = [
    { name: "Karachi – Main", students: 520, staff: 24 },
    { name: "Lahore – Gulberg", students: 310, staff: 16 },
  ];
  const employees = [
    { name: "Ayesha", img: "/placeholder.svg" },
    { name: "Umair", img: "/placeholder.svg" },
    { name: "Hira", img: "/placeholder.svg" },
    { name: "Bilal", img: "/placeholder.svg" },
  ];
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {campuses.map((c) => (
          <div key={c.name} className="rounded-md border overflow-hidden">
            <img src="/placeholder.svg" alt={c.name} className="w-full h-20 object-cover" />
            <div className="p-3">
              <div className="font-medium">{c.name}</div>
              <div className="text-xs text-muted-foreground">Students: {c.students} • Staff: {c.staff}</div>
              <div className="mt-2"><Button size="xs" variant="outline">Open</Button></div>
            </div>
          </div>
        ))}
      </div>
      <div>
        <div className="text-sm font-medium mb-2">Key Employees</div>
        <div className="flex items-center gap-3">
          {employees.map((e) => (
            <div key={e.name} className="flex items-center gap-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src={e.img} alt={e.name} />
                <AvatarFallback>{e.name.slice(0,2).toUpperCase()}</AvatarFallback>
              </Avatar>
              <span className="text-sm">{e.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
