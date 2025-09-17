import React, { createContext, useCallback, useContext, useEffect, useMemo, useReducer } from "react";

export type Role =
  | "Front Desk Representative"
  | "Telesales Representative"
  | "Admissions Coordinator"
  | "Program Manager"
  | "Campus Head"
  | "Owner"
  | "Admin";

export type Gender = "Male" | "Female";

export type PipelineStage =
  | "Prospective"
  | "Need Analysis"
  | "Proposal"
  | "Negotiation";

export type FollowUpChannel =
  | "Voice Call"
  | "Text Message"
  | "Email"
  | "Live Chat"
  | "WhatsApp"
  | "Walk-In"
  | "Transfer Enquiry";

export type Status = "New" | "Successfully Enrolled" | "Not Interested";

export interface FollowUpEntry {
  id: string;
  enquiryId: string;
  channel: FollowUpChannel;
  notes?: string;
  at: string; // ISO timestamp
  byRole: Role;
}

export interface Enquiry {
  id: string;
  fullName: string;
  courseInterested: string;
  primaryContactNumber: string;
  emailAddress?: string;
  gender: Gender;
  country: string; // Default Pakistan
  city: string;
  area: string;
  possibleJoiningDate?: string; // ISO date
  marketingSource: string[]; // multiple
  preferredCampus: string;
  nextFollowUp?: string; // ISO datetime
  probability: number; // 10..100
  remarks?: string;
  stage: PipelineStage;
  status: Status;
  createdAt: string; // ISO
  updatedAt: string; // ISO
  notInterestedReason?: string;
}

export interface Admission {
  id: string;
  enquiryId?: string;
  fullName: string;
  studentId?: string;
  course: string;
  campus: string;
  batch?: string;
  admissionDate: string; // ISO
  status: "New" | "Active" | "Concluded" | "Suspended" | "Not Completed";
  remarks?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Student {
  id: string;
  fullName: string;
  course: string;
  batch?: string;
  campus: string;
  status: "Current" | "Concluded" | "Not Completed" | "Suspended" | "Alumni";
  createdAt: string;
  updatedAt: string;
}

export interface Batch {
  id: string;
  course: string;
  name: string;
  startDate?: string;
  endDate?: string;
  status: "Upcoming" | "In Progress" | "Ended" | "Paused";
  createdAt: string;
}

export interface Course {
  id: string;
  title: string;
  category?: string;
  featured?: boolean;
  upcoming?: boolean;
  description?: string;
  createdAt: string;
}

export interface Campus {
  id: string;
  name: string;
  status: "Active" | "Suspended";
  createdAt: string;
}

export interface Employee {
  id: string;
  name: string;
  role: Role | string;
  campus: string;
  status: "Active" | "Terminated" | "Resigned" | "Transferred";
  createdAt: string;
}

export interface AppUser {
  id: string;
  name: string;
  email: string;
  roles: Role[];
  campus?: string;
  status: "Active" | "Suspended";
  createdAt: string;
}

export interface EventItem {
  id: string;
  title: string;
  date?: string;
  upcoming?: boolean;
  createdAt: string;
}

export interface Expense {
  id: string;
  type: string;
  amount: number;
  date: string;
  notes?: string;
  createdAt: string;
}

export type CertificateStatus =
  | "Pending Approval"
  | "Approved"
  | "On Printing"
  | "Ready to Collect"
  | "Delivered";

export interface CertificateRequest {
  id: string;
  studentId: string;
  batchId?: string;
  status: CertificateStatus;
  createdAt: string;
  updatedAt?: string;
}

export interface IMSState {
  enquiries: Record<string, Enquiry>;
  followUps: Record<string, FollowUpEntry[]>; // by enquiryId
  selectedEnquiryId: string | null;
  role: Role;
  campus: string;

  // New sections
  admissions: Record<string, Admission>;
  students: Record<string, Student>;
  batches: Record<string, Batch>;
  courses: Record<string, Course>;
  campuses: Record<string, Campus>;
  employees: Record<string, Employee>;
  users: Record<string, AppUser>;
  events: Record<string, EventItem>;
  expenses: Record<string, Expense>;
  certificates: Record<string, CertificateRequest>;
}

export type IMSAction =
  | { type: "SET_ROLE"; role: Role }
  | { type: "SET_CAMPUS"; campus: string }
  | { type: "SELECT_ENQUIRY"; id: string | null }
  | { type: "ADD_ENQUIRY"; payload: Enquiry }
  | { type: "UPDATE_ENQUIRY"; id: string; patch: Partial<Enquiry> }
  | { type: "ADD_FOLLOWUP"; payload: FollowUpEntry }
  | { type: "SET_STATUS"; id: string; status: Status; reason?: string }
  | { type: "IMPORT_ENQUIRIES"; payload: Enquiry[] }
  | { type: "RESET" }
  | { type: "ADD_ADMISSION"; payload: Admission }
  | { type: "UPDATE_ADMISSION"; id: string; patch: Partial<Admission> }
  | { type: "ADD_STUDENT"; payload: Student }
  | { type: "UPDATE_STUDENT"; id: string; patch: Partial<Student> }
  | { type: "ADD_BATCH"; payload: Batch }
  | { type: "ADD_COURSE"; payload: Course }
  | { type: "ADD_CAMPUS"; payload: Campus }
  | { type: "ADD_EMPLOYEE"; payload: Employee }
  | { type: "ADD_USER"; payload: AppUser }
  | { type: "ADD_EVENT"; payload: EventItem }
  | { type: "ADD_EXPENSE"; payload: Expense }
  | { type: "REQUEST_CERT"; payload: CertificateRequest }
  | { type: "UPDATE_CERT"; id: string; status: CertificateStatus };

const DEFAULT_ROLE: Role = "Front Desk Representative";
const DEFAULT_CAMPUS = "Karachi Campus";

const STORAGE_KEY = "ims-store-v1";

const initialState: IMSState = {
  enquiries: {
    "enq-1": {
      id: "enq-1",
      fullName: "Ayesha Khan",
      courseInterested: "Web Development",
      primaryContactNumber: "03001234567",
      emailAddress: "ayesha.khan@example.com",
      gender: "Female",
      country: "Pakistan",
      city: "Karachi",
      area: "Gulshan",
      possibleJoiningDate: new Date().toISOString().slice(0,10),
      marketingSource: ["Facebook", "Referral"],
      preferredCampus: "Karachi Campus",
      nextFollowUp: new Date(Date.now() + 2 * 24 * 3600 * 1000).toISOString(),
      probability: 50,
      remarks: "Interested in weekend batch",
      stage: "Prospective",
      status: "New",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    "enq-2": {
      id: "enq-2",
      fullName: "Ali Ahmed",
      courseInterested: "Digital Marketing",
      primaryContactNumber: "03007654321",
      emailAddress: "ali.ahmed@example.com",
      gender: "Male",
      country: "Pakistan",
      city: "Lahore",
      area: "DHA",
      possibleJoiningDate: undefined,
      marketingSource: ["Instagram", "Website"],
      preferredCampus: "Lahore Campus",
      nextFollowUp: undefined,
      probability: 30,
      remarks: "Wants more details on course content",
      stage: "Need Analysis",
      status: "New",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  },
  followUps: {
    "enq-1": [
      {
        id: "f1",
        enquiryId: "enq-1",
        channel: "WhatsApp",
        notes: "Sent course brochure and fees",
        at: new Date().toISOString(),
        byRole: DEFAULT_ROLE,
      },
    ],
  },
  selectedEnquiryId: null,
  role: DEFAULT_ROLE,
  campus: DEFAULT_CAMPUS,

  admissions: {},
  students: {},
  batches: {
    "batch-1": {
      id: "batch-1",
      course: "Web Development",
      name: "WD - Weekend - Sep",
      startDate: new Date(Date.now() + 7 * 24 * 3600 * 1000).toISOString(),
      endDate: new Date(Date.now() + 97 * 24 * 3600 * 1000).toISOString(),
      status: "Upcoming",
      createdAt: new Date().toISOString(),
    },
  },
  courses: {
    "course-1": { id: "course-1", title: "Web Development", category: "IT", featured: true, createdAt: new Date().toISOString() },
    "course-2": { id: "course-2", title: "Digital Marketing", category: "Marketing", upcoming: true, createdAt: new Date().toISOString() },
    "course-3": { id: "course-3", title: "Graphic Design", category: "Design", createdAt: new Date().toISOString() },
  },
  campuses: {
    "camp-1": { id: "camp-1", name: "Karachi Campus", status: "Active", createdAt: new Date().toISOString() },
    "camp-2": { id: "camp-2", name: "Lahore Campus", status: "Active", createdAt: new Date().toISOString() },
  },
  employees: {
    "emp-1": { id: "emp-1", name: "Sara Malik", role: "Admissions Coordinator", campus: "Karachi Campus", status: "Active", createdAt: new Date().toISOString() },
  },
  users: {
    "user-1": { id: "user-1", name: "Front Desk", email: "front.desk@example.com", roles: [DEFAULT_ROLE], campus: "Karachi Campus", status: "Active", createdAt: new Date().toISOString() },
  },
  events: {},
  expenses: {},
  certificates: {},
};

function reducer(state: IMSState, action: IMSAction): IMSState {
  switch (action.type) {
    case "SET_ROLE":
      return { ...state, role: action.role };
    case "SET_CAMPUS":
      return { ...state, campus: action.campus };
    case "SELECT_ENQUIRY":
      return { ...state, selectedEnquiryId: action.id };
    case "ADD_ENQUIRY": {
      const e = action.payload;
      return {
        ...state,
        enquiries: { ...state.enquiries, [e.id]: e },
        selectedEnquiryId: e.id,
      };
    }
    case "UPDATE_ENQUIRY": {
      const e = state.enquiries[action.id];
      if (!e) return state;
      const updated: Enquiry = { ...e, ...action.patch, updatedAt: new Date().toISOString() };
      return { ...state, enquiries: { ...state.enquiries, [action.id]: updated } };
    }
    case "ADD_FOLLOWUP": {
      const f = action.payload;
      const list = state.followUps[f.enquiryId] || [];
      const updated = [...list, f];
      return { ...state, followUps: { ...state.followUps, [f.enquiryId]: updated } };
    }
    case "SET_STATUS": {
      const e = state.enquiries[action.id];
      if (!e) return state;
      const patch: Partial<Enquiry> = { status: action.status, updatedAt: new Date().toISOString() };
      if (action.status === "Not Interested" && action.reason) patch.notInterestedReason = action.reason;
      return reducer(state, { type: "UPDATE_ENQUIRY", id: action.id, patch });
    }
    case "IMPORT_ENQUIRIES": {
      const map: Record<string, Enquiry> = { ...state.enquiries };
      for (const e of action.payload) map[e.id] = e;
      return { ...state, enquiries: map };
    }

    // Admissions & Students
    case "ADD_ADMISSION": {
      const a = action.payload;
      return { ...state, admissions: { ...state.admissions, [a.id]: a } };
    }
    case "UPDATE_ADMISSION": {
      const a = state.admissions[action.id];
      if (!a) return state;
      const updated = { ...a, ...action.patch, updatedAt: new Date().toISOString() };
      return { ...state, admissions: { ...state.admissions, [action.id]: updated } };
    }
    case "ADD_STUDENT": {
      const s = action.payload;
      return { ...state, students: { ...state.students, [s.id]: s } };
    }
    case "UPDATE_STUDENT": {
      const s = state.students[action.id];
      if (!s) return state;
      const updated = { ...s, ...action.patch, updatedAt: new Date().toISOString() };
      return { ...state, students: { ...state.students, [action.id]: updated } };
    }
    case "ADD_BATCH": {
      const b = action.payload;
      return { ...state, batches: { ...state.batches, [b.id]: b } };
    }
    case "ADD_COURSE": {
      const c = action.payload;
      return { ...state, courses: { ...state.courses, [c.id]: c } };
    }
    case "ADD_CAMPUS": {
      const c = action.payload;
      return { ...state, campuses: { ...state.campuses, [c.id]: c } };
    }
    case "ADD_EMPLOYEE": {
      const emp = action.payload;
      return { ...state, employees: { ...state.employees, [emp.id]: emp } };
    }
    case "ADD_USER": {
      const u = action.payload;
      return { ...state, users: { ...state.users, [u.id]: u } };
    }
    case "ADD_EVENT": {
      const ev = action.payload;
      return { ...state, events: { ...state.events, [ev.id]: ev } };
    }
    case "ADD_EXPENSE": {
      const ex = action.payload;
      return { ...state, expenses: { ...state.expenses, [ex.id]: ex } };
    }
    case "REQUEST_CERT": {
      const cr = action.payload;
      return { ...state, certificates: { ...state.certificates, [cr.id]: cr } };
    }
    case "UPDATE_CERT": {
      const cert = state.certificates[action.id];
      if (!cert) return state;
      const updated = { ...cert, status: action.status, updatedAt: new Date().toISOString() };
      return { ...state, certificates: { ...state.certificates, [action.id]: updated } };
    }

    case "RESET":
      return initialState;
    default:
      return state;
  }
}

interface IMSContextValue extends IMSState {
  addEnquiry: (input: Omit<Enquiry, "id" | "createdAt" | "updatedAt" | "status" | "stage">) => string;
  updateEnquiry: (id: string, patch: Partial<Enquiry>) => void;
  addFollowUp: (enquiryId: string, channel: FollowUpChannel, notes?: string) => void;
  setStatus: (id: string, status: Status, reason?: string) => void;
  selectEnquiry: (id: string | null) => void;
  setRole: (role: Role) => void;
  setCampus: (campus: string) => void;
  importEnquiries: (rows: Omit<Enquiry, "id" | "createdAt" | "updatedAt" | "status" | "stage">[]) => void;

  // new methods
  addAdmission: (input: Omit<Admission, "id" | "createdAt" | "updatedAt" | "status">) => string;
  updateAdmission: (id: string, patch: Partial<Admission>) => void;
  addStudent: (input: Omit<Student, "id" | "createdAt" | "updatedAt">) => string;
  updateStudent: (id: string, patch: Partial<Student>) => void;
  addBatch: (input: Omit<Batch, "id" | "createdAt">) => string;
  addCourse: (input: Omit<Course, "id" | "createdAt">) => string;
  addCampusItem: (name: string) => string;
  addEmployee: (input: Omit<Employee, "id" | "createdAt">) => string;
  addUser: (input: Omit<AppUser, "id" | "createdAt">) => string;
  addEvent: (input: Omit<EventItem, "id" | "createdAt">) => string;
  addExpense: (input: Omit<Expense, "id" | "createdAt">) => string;
  requestCertificate: (studentId: string, batchId?: string) => string;
  updateCertificateStatus: (id: string, status: CertificateStatus) => void;
}

const IMSContext = createContext<IMSContextValue | null>(null);

export function IMSProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState, (init) => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return init;
      return { ...init, ...JSON.parse(raw) } as IMSState;
    } catch {
      return init;
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const addEnquiry: IMSContextValue["addEnquiry"] = useCallback((input) => {
    const id = crypto.randomUUID();
    const now = new Date().toISOString();
    const e: Enquiry = {
      id,
      createdAt: now,
      updatedAt: now,
      status: "New",
      stage: "Prospective",
      ...input,
    };
    dispatch({ type: "ADD_ENQUIRY", payload: e });
    return id;
  }, []);

  const updateEnquiry = useCallback((id: string, patch: Partial<Enquiry>) => {
    dispatch({ type: "UPDATE_ENQUIRY", id, patch });
  }, []);

  const addFollowUp = useCallback(
    (enquiryId: string, channel: FollowUpChannel, notes?: string) => {
      const entry: FollowUpEntry = {
        id: crypto.randomUUID(),
        enquiryId,
        at: new Date().toISOString(),
        channel,
        notes,
        byRole: state.role,
      };
      dispatch({ type: "ADD_FOLLOWUP", payload: entry });
    },
    [state.role],
  );

  const setStatus = useCallback((id: string, status: Status, reason?: string) => {
    dispatch({ type: "SET_STATUS", id, status, reason });
  }, []);

  const selectEnquiry = useCallback((id: string | null) => {
    dispatch({ type: "SELECT_ENQUIRY", id });
  }, []);

  const setRole = useCallback((role: Role) => {
    dispatch({ type: "SET_ROLE", role });
  }, []);

  const setCampus = useCallback((campus: string) => {
    dispatch({ type: "SET_CAMPUS", campus });
  }, []);

  const importEnquiries: IMSContextValue["importEnquiries"] = useCallback((rows) => {
    const now = new Date().toISOString();
    const items: Enquiry[] = rows.map((r) => ({
      id: crypto.randomUUID(),
      createdAt: now,
      updatedAt: now,
      status: "New",
      stage: "Prospective",
      ...r,
    }));
    dispatch({ type: "IMPORT_ENQUIRIES", payload: items });
  }, []);

  // Admissions / Students / Courses / Batches / Campus / Employees / Users / Events / Expenses / Certificates
  const addAdmission = useCallback((input: Omit<Admission, "id" | "createdAt" | "updatedAt" | "status">) => {
    const id = crypto.randomUUID();
    const now = new Date().toISOString();
    const admission: Admission = {
      id,
      createdAt: now,
      updatedAt: now,
      status: "New",
      ...input,
    } as Admission;
    dispatch({ type: "ADD_ADMISSION", payload: admission });
    return id;
  }, []);

  const updateAdmission = useCallback((id: string, patch: Partial<Admission>) => {
    dispatch({ type: "UPDATE_ADMISSION", id, patch });
  }, []);

  const addStudent = useCallback((input: Omit<Student, "id" | "createdAt" | "updatedAt">) => {
    const id = crypto.randomUUID();
    const now = new Date().toISOString();
    const s: Student = { id, createdAt: now, updatedAt: now, ...input } as Student;
    dispatch({ type: "ADD_STUDENT", payload: s });
    return id;
  }, []);

  const updateStudent = useCallback((id: string, patch: Partial<Student>) => {
    dispatch({ type: "UPDATE_STUDENT", id, patch });
  }, []);

  const addBatch = useCallback((input: Omit<Batch, "id" | "createdAt">) => {
    const id = crypto.randomUUID();
    const now = new Date().toISOString();
    const b: Batch = { id, createdAt: now, ...input } as Batch;
    dispatch({ type: "ADD_BATCH", payload: b });
    return id;
  }, []);

  const addCourse = useCallback((input: Omit<Course, "id" | "createdAt">) => {
    const id = crypto.randomUUID();
    const now = new Date().toISOString();
    const c: Course = { id, createdAt: now, ...input } as Course;
    dispatch({ type: "ADD_COURSE", payload: c });
    return id;
  }, []);

  const addCampusItem = useCallback((name: string) => {
    const id = crypto.randomUUID();
    const now = new Date().toISOString();
    const c: Campus = { id, name, status: "Active", createdAt: now };
    dispatch({ type: "ADD_CAMPUS", payload: c });
    return id;
  }, []);

  const addEmployee = useCallback((input: Omit<Employee, "id" | "createdAt">) => {
    const id = crypto.randomUUID();
    const now = new Date().toISOString();
    const emp: Employee = { id, createdAt: now, ...input } as Employee;
    dispatch({ type: "ADD_EMPLOYEE", payload: emp });
    return id;
  }, []);

  const addUser = useCallback((input: Omit<AppUser, "id" | "createdAt">) => {
    const id = crypto.randomUUID();
    const now = new Date().toISOString();
    const u: AppUser = { id, createdAt: now, ...input } as AppUser;
    dispatch({ type: "ADD_USER", payload: u });
    return id;
  }, []);

  const addEvent = useCallback((input: Omit<EventItem, "id" | "createdAt">) => {
    const id = crypto.randomUUID();
    const now = new Date().toISOString();
    const ev: EventItem = { id, createdAt: now, ...input } as EventItem;
    dispatch({ type: "ADD_EVENT", payload: ev });
    return id;
  }, []);

  const addExpense = useCallback((input: Omit<Expense, "id" | "createdAt">) => {
    const id = crypto.randomUUID();
    const now = new Date().toISOString();
    const ex: Expense = { id, createdAt: now, ...input } as Expense;
    dispatch({ type: "ADD_EXPENSE", payload: ex });
    return id;
  }, []);

  const requestCertificate = useCallback((studentId: string, batchId?: string) => {
    const id = crypto.randomUUID();
    const now = new Date().toISOString();
    const req: CertificateRequest = { id, studentId, batchId, status: "Pending Approval", createdAt: now };
    dispatch({ type: "REQUEST_CERT", payload: req });
    return id;
  }, []);

  const updateCertificateStatus = useCallback((id: string, status: CertificateStatus) => {
    dispatch({ type: "UPDATE_CERT", id, status });
  }, []);

  const value: IMSContextValue = useMemo(
    () => ({
      ...state,
      addEnquiry,
      updateEnquiry,
      addFollowUp,
      setStatus,
      selectEnquiry,
      setRole,
      setCampus,
      importEnquiries,

      addAdmission,
      updateAdmission,
      addStudent,
      updateStudent,
      addBatch,
      addCourse,
      addCampusItem,
      addEmployee,
      addUser,
      addEvent,
      addExpense,
      requestCertificate,
      updateCertificateStatus,
    }),
    [
      state,
      addEnquiry,
      updateEnquiry,
      addFollowUp,
      setStatus,
      selectEnquiry,
      setRole,
      setCampus,
      importEnquiries,
      addAdmission,
      updateAdmission,
      addStudent,
      updateStudent,
      addBatch,
      addCourse,
      addCampusItem,
      addEmployee,
      addUser,
      addEvent,
      addExpense,
      requestCertificate,
      updateCertificateStatus,
    ],
  );

  return <IMSContext.Provider value={value}>{children}</IMSContext.Provider>;
}

export function useIMS() {
  const ctx = useContext(IMSContext);
  if (!ctx) throw new Error("useIMS must be used within IMSProvider");
  return ctx;
}

export const COURSES = [
  "Web Development",
  "Graphic Design",
  "Digital Marketing",
  "Data Science",
  "Accounting",
  "English Language",
];

export const PAK_CITIES = [
  "Karachi",
  "Lahore",
  "Islamabad",
  "Rawalpindi",
  "Peshawar",
  "Quetta",
  "Multan",
  "Faisalabad",
  "Hyderabad",
  "Sialkot",
];

export const CAMPUSES = ["Karachi Campus", "Lahore Campus", "Islamabad Campus"];

export const MARKETING_SOURCES = [
  "Facebook",
  "Instagram",
  "Google Ads",
  "Referral",
  "Website",
  "Walk-In",
  "Other",
];
