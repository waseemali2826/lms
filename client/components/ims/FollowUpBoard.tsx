import { useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useIMS, PipelineStage } from "@/contexts/ims-store";

const STAGES: PipelineStage[] = ["Prospective", "Need Analysis", "Proposal", "Negotiation"];

export default function FollowUpBoard() {
  const { enquiries, updateEnquiry, selectEnquiry } = useIMS();

  const grouped = useMemo(() => {
    const g: Record<PipelineStage, string[]> = {
      Prospective: [],
      "Need Analysis": [],
      Proposal: [],
      Negotiation: [],
    };
    for (const e of Object.values(enquiries)) g[e.stage].push(e.id);
    return g;
  }, [enquiries]);

  const onDrop = (stage: PipelineStage, e: React.DragEvent<HTMLDivElement>) => {
    const id = e.dataTransfer.getData("text/plain");
    if (!id) return;
    updateEnquiry(id, { stage });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Pipeline (Pending Enquiries)</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {STAGES.map((stage) => (
            <div
              key={stage}
              className="rounded-lg border bg-muted/20 min-h-64 p-3"
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => onDrop(stage, e)}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="font-medium">{stage}</div>
                <Badge variant="secondary">{grouped[stage]?.length ?? 0}</Badge>
              </div>
              <div className="space-y-2">
                {grouped[stage].map((id) => {
                  const e = enquiries[id];
                  return (
                    <div
                      key={id}
                      draggable
                      onDragStart={(ev) => ev.dataTransfer.setData("text/plain", id)}
                      onClick={() => selectEnquiry(id)}
                      className="rounded-md border bg-card p-3 cursor-move hover:border-primary"
                    >
                      <div className="font-medium truncate">{e.fullName}</div>
                      <div className="text-xs text-muted-foreground truncate">{e.courseInterested}</div>
                      <div className="text-xs mt-1 flex items-center justify-between">
                        <span>Prob: {e.probability}%</span>
                        <span>{e.nextFollowUp ? new Date(e.nextFollowUp).toLocaleString() : ""}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
