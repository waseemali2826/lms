import { useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
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

export default function StatusHistory() {
  const { enquiries, followUps, selectedEnquiryId } = useIMS();
  const selected = selectedEnquiryId ? enquiries[selectedEnquiryId] : null;
  const entries = selected ? followUps[selected.id] || [] : [];

  const byChannel = useMemo(() => {
    const map: Record<FollowUpChannel, typeof entries> = {
      "Voice Call": [],
      "Text Message": [],
      Email: [],
      "Live Chat": [],
      WhatsApp: [],
      "Walk-In": [],
      "Transfer Enquiry": [],
    };
    for (const e of entries) map[e.channel].push(e);
    return map;
  }, [entries]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Status Tracking</CardTitle>
      </CardHeader>
      <CardContent>
        {!selected ? (
          <div className="text-sm text-muted-foreground">Select an enquiry to view history.</div>
        ) : (
          <div className="space-y-4">
            <div className="flex flex-wrap gap-4 text-sm">
              <div>
                <span className="text-muted-foreground">Current Status: </span>
                <span className="font-medium">{selected.status}</span>
              </div>
              {selected.notInterestedReason && (
                <div>
                  <span className="text-muted-foreground">Reason: </span>
                  <span className="font-medium">{selected.notInterestedReason}</span>
                </div>
              )}
            </div>
            <Separator />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {CHANNELS.map((c) => (
                <div key={c} className="rounded-md border p-3">
                  <div className="font-medium mb-2">{c}</div>
                  <div className="space-y-2">
                    {byChannel[c].length === 0 && (
                      <div className="text-sm text-muted-foreground">No entries</div>
                    )}
                    {byChannel[c]
                      .slice()
                      .sort((a, b) => b.at.localeCompare(a.at))
                      .map((f) => (
                        <div key={f.id} className="text-sm">
                          <div className="font-medium">{new Date(f.at).toLocaleString()}</div>
                          {f.notes && <div className="text-muted-foreground">{f.notes}</div>}
                          <div className="text-xs text-muted-foreground">By: {f.byRole}</div>
                        </div>
                      ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
