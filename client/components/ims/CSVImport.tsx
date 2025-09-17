import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useIMS } from "@/contexts/ims-store";

const HEADERS = [
  "Full Name",
  "Course Interested",
  "Primary Contact Number",
  "Email Address",
  "Gender",
  "Country",
  "City",
  "Area",
  "Possible Joining Date",
  "Marketing Source",
  "Preferred Campus",
  "Next Follow-up",
  "Probability",
  "Remarks",
];

function toCSV(rows: string[][]) {
  return rows
    .map((r) => r.map((v) => (/[",\n]/.test(v) ? `"${v.replace(/"/g, '""')}"` : v)).join(","))
    .join("\n");
}

function parseCSV(text: string): string[][] {
  const rows: string[][] = [];
  let i = 0;
  let cur: string[] = [];
  let field = "";
  let inQuotes = false;
  const pushField = () => {
    cur.push(field);
    field = "";
  };
  const pushRow = () => {
    rows.push(cur);
    cur = [];
  };
  while (i < text.length) {
    const ch = text[i];
    if (inQuotes) {
      if (ch === '"') {
        if (text[i + 1] === '"') {
          field += '"';
          i += 2;
          continue;
        } else {
          inQuotes = false;
          i++;
          continue;
        }
      } else {
        field += ch;
        i++;
        continue;
      }
    } else {
      if (ch === '"') {
        inQuotes = true;
        i++;
        continue;
      }
      if (ch === ",") {
        pushField();
        i++;
        continue;
      }
      if (ch === "\n" || ch === "\r") {
        // handle CRLF or LF
        if (ch === "\r" && text[i + 1] === "\n") i++;
        pushField();
        pushRow();
        i++;
        continue;
      }
      field += ch;
      i++;
    }
  }
  // flush last field
  if (field.length > 0 || cur.length > 0) {
    pushField();
    pushRow();
  }
  return rows.filter((r) => r.length && r.some((c) => c.trim() !== ""));
}

export default function CSVImport() {
  const fileRef = useRef<HTMLInputElement>(null);
  const { importEnquiries, campus } = useIMS();
  const [preview, setPreview] = useState<string[][]>([]);

  const downloadSample = () => {
    const sampleRows = [
      HEADERS,
      [
        "Ali Khan",
        "Web Development",
        "+92 300 1234567",
        "ali@example.com",
        "Male",
        "Pakistan",
        "Karachi",
        "Gulshan",
        "2025-10-01",
        "Facebook|Website",
        campus,
        "2025-10-05T15:00",
        "70",
        "Interested in evening batch",
      ],
    ];
    const blob = new Blob([toCSV(sampleRows)], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "ims-sample-enquiries.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  const onUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const text = await file.text();
    const rows = parseCSV(text);
    if (!rows.length) return;
    const [header, ...data] = rows;
    // If file has headers, skip them; if not, assume order matches HEADERS
    let body = data;
    const normalizedHeader = header.map((h) => h.trim().toLowerCase());
    if (normalizedHeader.join("|") !== HEADERS.map((h) => h.toLowerCase()).join("|")) {
      body = rows; // assume no header
    }
    setPreview(body.slice(0, 5));
    const toImport = body.map((r) => ({
      fullName: r[0] || "",
      courseInterested: r[1] || "",
      primaryContactNumber: r[2] || "",
      emailAddress: r[3] || undefined,
      gender: (r[4] as any) === "Female" ? "Female" : "Male",
      country: r[5] || "Pakistan",
      city: r[6] || "",
      area: r[7] || "",
      possibleJoiningDate: r[8] || undefined,
      marketingSource: (r[9] || "").split("|").filter(Boolean),
      preferredCampus: r[10] || campus,
      nextFollowUp: r[11] || undefined,
      probability: parseInt(r[12] || "50"),
      remarks: r[13] || undefined,
    }));
    importEnquiries(toImport);
    e.target.value = "";
  };

  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between">
        <div>
          <CardTitle>Import Bulk Enquiries</CardTitle>
          <CardDescription>Download sample CSV and upload filled data</CardDescription>
        </div>
        <div className="flex gap-2">
          <Button type="button" variant="outline" onClick={downloadSample}>Download Sample CSV</Button>
          <Button type="button" onClick={() => fileRef.current?.click()}>Upload CSV</Button>
          <input ref={fileRef} type="file" accept=".csv,text/csv" hidden onChange={onUpload} />
        </div>
      </CardHeader>
      {preview.length > 0 && (
        <CardContent>
          <div className="text-sm text-muted-foreground mb-2">Preview (first 5 rows)</div>
          <div className="rounded-md border overflow-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  {HEADERS.map((h) => (
                    <TableHead key={h}>{h}</TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {preview.map((r, i) => (
                  <TableRow key={i}>
                    {HEADERS.map((_, idx) => (
                      <TableCell key={idx}>{r[idx] || ""}</TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      )}
    </Card>
  );
}
