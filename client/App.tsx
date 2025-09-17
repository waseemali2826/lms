import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Batches from "./pages/Batches";
import Courses from "./pages/Courses";
import Certificates from "./pages/Certificates";
import Campuses from "./pages/Campuses";
import EnquiriesNew from "./pages/EnquiriesNew";
import FollowUp from "./pages/FollowUp";
import Pipeline from "./pages/Pipeline";
import ImportEnquiries from "./pages/ImportEnquiries";
import Actions from "./pages/Actions";
import StatusHistoryPage from "./pages/StatusHistoryPage";
import Admissions from "./pages/Admissions";
import AdmissionsTablesPage from "./pages/AdmissionsTablesPage";
import RoleDetail from "./pages/RoleDetail";
import SiteHeader from "@/components/layout/SiteHeader";
import SiteFooter from "@/components/layout/SiteFooter";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="min-h-screen flex flex-col">
          <SiteHeader />
          <div className="flex-1">
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/batches" element={<Batches />} />
              <Route path="/courses" element={<Courses />} />
              <Route path="/certificates" element={<Certificates />} />
              <Route path="/campuses" element={<Campuses />} />
              <Route path="/enquiries/new" element={<EnquiriesNew />} />
              <Route path="/follow-up" element={<FollowUp />} />
              <Route path="/pipeline" element={<Pipeline />} />
              <Route path="/enquiries/import" element={<ImportEnquiries />} />
              <Route path="/actions" element={<Actions />} />
              <Route path="/status-history" element={<StatusHistoryPage />} />
              <Route path="/admissions" element={<Admissions />} />
              <Route
                path="/admissions/tables"
                element={<AdmissionsTablesPage />}
              />
              <Route path="/roles/:roleId" element={<RoleDetail />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
          <SiteFooter />
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

createRoot(document.getElementById("root")!).render(<App />);
