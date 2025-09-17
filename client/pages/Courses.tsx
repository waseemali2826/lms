import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CoursesManagementQuick } from "@/components/ims/QuickSections";

export default function Courses() {
  const categories = [
    { name: "Development", count: 8 },
    { name: "Design", count: 6 },
    { name: "Data", count: 5 },
    { name: "Marketing", count: 4 },
  ];
  return (
    <div className="container py-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Courses</h1>
        <Button>New Course</Button>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Popular Courses</CardTitle>
          </CardHeader>
          <CardContent>
            <CoursesManagementQuick />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Categories</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-3">
            {categories.map((c) => (
              <div key={c.name} className="rounded-md border p-3">
                <img src="/placeholder.svg" alt={c.name} className="w-full h-16 object-cover rounded" />
                <div className="mt-2 flex items-center justify-between">
                  <div className="font-medium">{c.name}</div>
                  <Badge variant="secondary">{c.count}</Badge>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
