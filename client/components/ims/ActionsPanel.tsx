import { useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useIMS, FollowUpChannel } from "@/contexts/ims-store";

const CHANNELS: FollowUpChannel[] = [
  "Voice Call",
  "Text Message",
  "Email",
  "Live Chat",
  "WhatsApp",
  "Walk-In",
  "Transfer Enquiry",
];

export default function ActionsPanel() {
  const { enquiries, selectedEnquiryId, addFollowUp, setStatus, updateEnquiry } = useIMS();
  const selected = useMemo(() => (selectedEnquiryId ? enquiries[selectedEnquiryId] : null), [selectedEnquiryId, enquiries]);
  const [notes, setNotes] = useState("");

  const logAction = (c: FollowUpChannel) => {
    if (!selected) return;
    addFollowUp(selected.id, c, notes || undefined);
    setNotes("");
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Follow-Up Actions</CardTitle>
      </CardHeader>
      <CardContent>
        {!selected ? (
          <div className="text-sm text-muted-foreground">Select an enquiry from a table or pipeline to log actions.</div>
        ) : (
          <div className="space-y-4">
            <div>
              <div className="text-sm text-muted-foreground">Selected Enquiry</div>
              <div className="font-medium">{selected.fullName}</div>
              <div className="text-xs text-muted-foreground">{selected.courseInterested} • {selected.city}</div>
            </div>
            <div className="space-y-2">
              <Label>Notes</Label>
              <Textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows={3} placeholder="Write a quick note (optional)" />
            </div>
            <div className="flex flex-wrap gap-2">
              {CHANNELS.map((c) => (
                <Button key={c} variant="outline" onClick={() => logAction(c)}>{c}</Button>
              ))}
            </div>
            <div className="flex gap-2 pt-2">
              <EnrollDialog onEnroll={(extra) => selected && updateEnquiry(selected.id, extra)} />
              <NotInterestedDialog onConfirm={(reason) => selected && setStatus(selected.id, "Not Interested", reason)} />
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function EnrollDialog({ onEnroll }: { onEnroll: (patch: { status: "Successfully Enrolled"; remarks?: string }) => void }) {
  const [open, setOpen] = useState(false);
  const [remarks, setRemarks] = useState("");
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Enroll Now (Admission Form)</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Admission Form</DialogTitle>
          <DialogDescription>Confirm enrolment and add any remarks.</DialogDescription>
        </DialogHeader>
        <div className="space-y-2">
          <Label>Remarks</Label>
          <Textarea rows={3} value={remarks} onChange={(e) => setRemarks(e.target.value)} />
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={() => { onEnroll({ status: "Successfully Enrolled", remarks: remarks || undefined }); setOpen(false); }}>Submit</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function NotInterestedDialog({ onConfirm }: { onConfirm: (reason: string) => void }) {
  const [open, setOpen] = useState(false);
  const [reason, setReason] = useState("");
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="destructive">Not Interested</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Mark as Not Interested</DialogTitle>
          <DialogDescription>Please provide a reason.</DialogDescription>
        </DialogHeader>
        <div className="space-y-2">
          <Label>Reason</Label>
          <Input value={reason} onChange={(e) => setReason(e.target.value)} placeholder="Reason" />
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={() => { onConfirm(reason); setOpen(false); }}>Confirm</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
