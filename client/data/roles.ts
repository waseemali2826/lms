export type RoleId =
  | "front-desk-representative"
  | "telesales-representative"
  | "admissions-coordinator"
  | "program-manager"
  | "campus-head"
  | "owner"
  | "admin";

export interface RoleInfo {
  id: RoleId;
  title: string;
  summary: string;
  responsibilities: string[];
  kpis: { label: string; value: string }[];
  image: string;
}

export const ROLES: RoleInfo[] = [
  {
    id: "front-desk-representative",
    title: "Front Desk Representative",
    summary:
      "Handles walk-ins, initial enquiry capture, appointment scheduling, and front office support.",
    responsibilities: [
      "Greet visitors and capture enquiries",
      "Schedule follow-up appointments",
      "Provide basic course information",
      "Route enquiries to relevant staff",
    ],
    kpis: [
      { label: "Walk-ins Today", value: "12" },
      { label: "Enquiries Logged", value: "9" },
      { label: "Avg. Wait Time", value: "4m" },
    ],
    image: "/placeholder.svg",
  },
  {
    id: "telesales-representative",
    title: "Telesales Representative",
    summary:
      "Conducts outbound calls, qualifies leads, and schedules counselling sessions.",
    responsibilities: [
      "Call new leads and log outcomes",
      "Send brochures and fee details",
      "Book counselling sessions",
      "Update pipeline stages",
    ],
    kpis: [
      { label: "Calls Today", value: "45" },
      { label: "Qualified Leads", value: "17" },
      { label: "Bookings", value: "6" },
    ],
    image: "/placeholder.svg",
  },
  {
    id: "admissions-coordinator",
    title: "Admissions Coordinator",
    summary:
      "Manages application processing, documentation, and admission confirmations.",
    responsibilities: [
      "Collect required documents",
      "Verify eligibility and approvals",
      "Issue fee challans",
      "Confirm admissions and assign batches",
    ],
    kpis: [
      { label: "New Admissions", value: "8" },
      { label: "Pending Docs", value: "3" },
      { label: "Batch Assignments", value: "5" },
    ],
    image: "/placeholder.svg",
  },
  {
    id: "program-manager",
    title: "Program Manager",
    summary:
      "Oversees course delivery, trainer allocation, and student outcomes.",
    responsibilities: [
      "Plan batches and timetables",
      "Assign trainers and labs",
      "Monitor attendance",
      "Review feedback and outcomes",
    ],
    kpis: [
      { label: "Active Batches", value: "6" },
      { label: "Trainer Utilization", value: "82%" },
      { label: "Satisfaction", value: "4.6/5" },
    ],
    image: "/placeholder.svg",
  },
  {
    id: "campus-head",
    title: "Campus Head",
    summary:
      "Leads campus operations, ensures compliance, and manages performance.",
    responsibilities: [
      "Oversee daily campus ops",
      "Set and track KPIs",
      "Resolve escalations",
      "Coordinate with owners",
    ],
    kpis: [
      { label: "Revenue (M)", value: "3.2" },
      { label: "Expenses (M)", value: "1.9" },
      { label: "Net Margin", value: "41%" },
    ],
    image: "/placeholder.svg",
  },
  {
    id: "owner",
    title: "Owner",
    summary:
      "Strategic oversight of business, growth, and investments.",
    responsibilities: [
      "Approve budgets",
      "Set growth targets",
      "Review monthly performance",
      "Decide on expansions",
    ],
    kpis: [
      { label: "YoY Growth", value: "+18%" },
      { label: "EBITDA", value: "22%" },
      { label: "Cash Runway", value: "11 mo" },
    ],
    image: "/placeholder.svg",
  },
  {
    id: "admin",
    title: "Admin",
    summary:
      "System administration, user management, roles, and permissions.",
    responsibilities: [
      "Manage users & roles",
      "Configure campuses & courses",
      "Maintain data hygiene",
      "Audit logs and access",
    ],
    kpis: [
      { label: "Active Users", value: "57" },
      { label: "Open Tickets", value: "2" },
      { label: "Incidents", value: "0" },
    ],
    image: "/placeholder.svg",
  },
];

export const roleMap = new Map(ROLES.map((r) => [r.id, r]));
