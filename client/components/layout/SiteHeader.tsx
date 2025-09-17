import { Menu } from "lucide-react";
import { SidebarTrigger } from "@/components/ui/sidebar";

export default function SiteHeader() {
  return (
    <header className="w-full border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center justify-between">
        <div className="flex items-center gap-2">
          {/* If a sidebar exists, expose its trigger here for consistency */}
          <div className="md:hidden"><SidebarTrigger className="mr-1"><Menu className="h-5 w-5" /></SidebarTrigger></div>
          <a href="/" className="font-bold tracking-tight">
            IMS – Skills Institute
          </a>
        </div>
        <nav className="hidden md:flex items-center gap-6 text-sm text-muted-foreground">
          <a href="#create" className="hover:text-foreground">Create Enquiry</a>
          <a href="#follow-up" className="hover:text-foreground">Follow-Up</a>
          <a href="#pipeline" className="hover:text-foreground">Pipeline</a>
          <a href="#admissions" className="hover:text-foreground">Admissions</a>
        </nav>
      </div>
    </header>
  );
}
