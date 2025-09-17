import { DemoResponse } from "@shared/api";
import { useEffect, useState } from "react";

import { IMSProvider, useIMS, CAMPUSES, Role } from "@/contexts/ims-store";
import EnquiryForm from "@/components/ims/EnquiryForm";
import CSVImport from "@/components/ims/CSVImport";
import FollowUpBoard from "@/components/ims/FollowUpBoard";
import ActionsPanel from "@/components/ims/ActionsPanel";
import StatusHistory from "@/components/ims/StatusHistory";
import AdmissionsForm from "@/components/ims/AdmissionsForm";
import AdmissionsTables from "@/components/ims/AdmissionsTables";
import StudentsPanel from "@/components/ims/StudentsPanel";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Building2, LayoutDashboard, Upload, Users } from "lucide-react";

export default function Index() {
  return (
    <IMSProvider>
      <DashboardShell />
    </IMSProvider>
  );
}

function DashboardShell() {
  const { role, setRole, campus, setCampus } = useIMS();

  useEffect(() => {
    document.title = "IMS – Skills Institute";
  }, []);

  const roles: Role[] = [
    "Front Desk Representative",
    "Telesales Representative",
    "Admissions Coordinator",
    "Program Manager",
    "Campus Head",
    "Owner",
    "Admin",
  ];

  return (
    <SidebarProvider>
      <Sidebar collapsible="icon">
        <SidebarHeader>
          <div className="px-2 py-3 rounded-md bg-gradient-to-r from-primary to-accent text-white">
            <div className="text-xs uppercase tracking-widest opacity-90">Institute Management System</div>
            <div className="font-bold">Skills Institute</div>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel><span className="flex items-center gap-2"><LayoutDashboard className="h-4 w-4" /> Dashboard</span></SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <a href="#create">Create New Enquiry</a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <a href="#follow-up">Enquiry Follow-Up</a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <a href="#pipeline">Pipeline</a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <a href="#import">Import Bulk Enquiries</a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
          <SidebarGroup>
            <SidebarGroupLabel><span className="flex items-center gap-2"><Users className="h-4 w-4" /> User Roles</span></SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {roles.map((r) => (
                  <SidebarMenuItem key={r}>
                    <SidebarMenuButton isActive={r === role} onClick={() => setRole(r)}>
                      <span>{r}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          <div className="text-xs text-muted-foreground px-2">v1.0</div>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <header className="flex h-14 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger />
          <Separator orientation="vertical" className="mr-2 h-5" />
          <div className="flex-1 font-semibold">IMS – Skills Institute</div>
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="hidden md:inline">{role}</Badge>
            <Select value={role} onValueChange={(v) => setRole(v as Role)}>
              <SelectTrigger className="w-[220px]">
                <SelectValue placeholder="Select role" />
              </SelectTrigger>
              <SelectContent>
                {roles.map((r) => (
                  <SelectItem key={r} value={r}>
                    {r}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={campus} onValueChange={setCampus}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Select campus" />
              </SelectTrigger>
              <SelectContent>
                {CAMPUSES.map((c) => (
                  <SelectItem key={c} value={c}>
                    <span className="flex items-center gap-2"><Building2 className="h-4 w-4" /> {c}</span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </header>
        <main className="p-4 md:p-6 space-y-6">
          <section id="create" className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2"><EnquiryForm /></div>
            <div className="space-y-6">
              <div id="follow-up"><SmallFollowUp /></div>
              <div><SmallToday /></div>
            </div>
          </section>

          <section id="import">
            <CSVImport />
          </section>

          <section id="pipeline">
            <FollowUpBoard />
          </section>

          <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ActionsPanel />
            <StatusHistory />
          </section>

          <section id="admissions" className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2"><AdmissionsForm /></div>
            <div><StudentsPanel /></div>
          </section>

          <section id="admissions-tables">
            <AdmissionsTables />
          </section>

          <section id="batches" className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Batch &amp; Time Table (Quick)</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-sm text-muted-foreground">Manage batches from the sidebar (CRUD placeholder)</div>
                </CardContent>
              </Card>
            </div>
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Courses Management (Quick)</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-sm text-muted-foreground">Create courses and landing pages from the sidebar (placeholder)</div>
                </CardContent>
              </Card>
            </div>
          </section>

          <section id="certificates" className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Certificate Management (Quick)</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-sm text-muted-foreground">Request &amp; track certificates from the sidebar.</div>
                </CardContent>
              </Card>
            </div>
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Campus &amp; Employees (Quick)</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-sm text-muted-foreground">Add campuses, employees and manage users from the sidebar.</div>
                </CardContent>
              </Card>
            </div>
          </section>

        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}

import { TodaysEnquiriesTable, TodaysFollowUpTable } from "@/components/ims/EnquiriesTable";
function SmallFollowUp() {
  return <TodaysFollowUpTable />;
}
function SmallToday() {
  return <TodaysEnquiriesTable />;
}
