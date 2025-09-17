import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { BatchTimeTableQuick } from "@/components/ims/QuickSections";

export default function Batches() {
  const trainers = [
    { name: "Ayesha Khan", course: "Web Dev", img: "/placeholder.svg" },
    { name: "Umair Farooq", course: "Data Science", img: "/placeholder.svg" },
    { name: "Hira Ali", course: "Graphic Design", img: "/placeholder.svg" },
  ];
  const rooms = [
    { name: "Lab A", capacity: 30 },
    { name: "Lab B", capacity: 25 },
    { name: "Studio 1", capacity: 20 },
  ];
  return (
    <div className="container py-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Batches & Timetable</h1>
        <Button>New Batch</Button>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Current Schedule</CardTitle>
          </CardHeader>
          <CardContent>
            <BatchTimeTableQuick />
          </CardContent>
        </Card>
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Active Trainers</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {trainers.map((t) => (
                <div key={t.name} className="flex items-center gap-3">
                  <Avatar className="h-9 w-9">
                    <AvatarImage src={t.img} alt={t.name} />
                    <AvatarFallback>
                      {t.name.slice(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="font-medium">{t.name}</div>
                    <div className="text-xs text-muted-foreground">
                      {t.course}
                    </div>
                  </div>
                  <Badge variant="secondary">On duty</Badge>
                </div>
              ))}
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Rooms</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {rooms.map((r) => (
                <div key={r.name} className="flex items-center justify-between">
                  <div className="font-medium">{r.name}</div>
                  <div className="text-xs text-muted-foreground">
                    Capacity {r.capacity}
                  </div>
                </div>
              ))}
              <Separator />
              <Button size="sm" variant="outline" className="w-full">
                Manage Rooms
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
