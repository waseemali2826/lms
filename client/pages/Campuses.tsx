import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CampusEmployeesQuick } from "@/components/ims/QuickSections";

export default function Campuses() {
  const org = [
    { name: "Campus Head", people: ["Zainab"] },
    { name: "Program Managers", people: ["Fahad", "Nimra"] },
    { name: "Admissions", people: ["Ali", "Sana", "Bilal"] },
  ];
  return (
    <div className="container py-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Campuses & Employees</h1>
        <Button>New Campus</Button>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Campuses</CardTitle>
          </CardHeader>
          <CardContent>
            <CampusEmployeesQuick />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Org Chart (Simple)</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {org.map((g) => (
              <div key={g.name}>
                <div className="font-medium mb-2">{g.name}</div>
                <div className="flex flex-wrap gap-3">
                  {g.people.map((p) => (
                    <div key={p} className="flex items-center gap-2">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src="/placeholder.svg" alt={p} />
                        <AvatarFallback>
                          {p.slice(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-sm">{p}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
