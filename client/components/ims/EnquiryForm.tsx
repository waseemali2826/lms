import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useIMS, COURSES, MARKETING_SOURCES, PAK_CITIES } from "@/contexts/ims-store";

export default function EnquiryForm() {
  const { addEnquiry, campus } = useIMS();
  const [fullName, setFullName] = useState("");
  const [courseInterested, setCourseInterested] = useState("");
  const [primaryContactNumber, setPrimaryContactNumber] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [gender, setGender] = useState<"Male" | "Female">("Male");
  const [country] = useState("Pakistan");
  const [city, setCity] = useState("");
  const [area, setArea] = useState("");
  const [possibleJoiningDate, setPossibleJoiningDate] = useState("");
  const [marketingSource, setMarketingSource] = useState<string[]>([]);
  const [preferredCampus, setPreferredCampus] = useState(campus);
  const [nextFollowUp, setNextFollowUp] = useState("");
  const [probability, setProbability] = useState(50);
  const [remarks, setRemarks] = useState("");

  const toggleSource = (s: string, checked: boolean) => {
    setMarketingSource((prev) => (checked ? [...prev, s] : prev.filter((x) => x !== s)));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !courseInterested || !primaryContactNumber || !city) return;
    addEnquiry({
      fullName,
      courseInterested,
      primaryContactNumber,
      emailAddress: emailAddress || undefined,
      gender,
      country,
      city,
      area,
      possibleJoiningDate: possibleJoiningDate || undefined,
      marketingSource,
      preferredCampus,
      nextFollowUp: nextFollowUp || undefined,
      probability,
      remarks: remarks || undefined,
    });
    setFullName("");
    setCourseInterested("");
    setPrimaryContactNumber("");
    setEmailAddress("");
    setGender("Male");
    setCity("");
    setArea("");
    setPossibleJoiningDate("");
    setMarketingSource([]);
    setPreferredCampus(campus);
    setNextFollowUp("");
    setProbability(50);
    setRemarks("");
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create New Enquiry</CardTitle>
        <CardDescription>Anyone can create a new enquiry</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Full Name</Label>
            <Input value={fullName} onChange={(e) => setFullName(e.target.value)} required />
          </div>
          <div className="space-y-2">
            <Label>Course Interested</Label>
            <Select value={courseInterested} onValueChange={setCourseInterested}>
              <SelectTrigger>
                <SelectValue placeholder="Select course" />
              </SelectTrigger>
              <SelectContent>
                {COURSES.map((c) => (
                  <SelectItem key={c} value={c}>
                    {c}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Primary Contact Number</Label>
            <Input value={primaryContactNumber} onChange={(e) => setPrimaryContactNumber(e.target.value)} required />
          </div>
          <div className="space-y-2">
            <Label>Email Address (Optional)</Label>
            <Input type="email" value={emailAddress} onChange={(e) => setEmailAddress(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label>Gender</Label>
            <RadioGroup value={gender} onValueChange={(v) => setGender(v as "Male" | "Female")} className="flex gap-6 pt-2">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Male" id="g-male" />
                <Label htmlFor="g-male">Male</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Female" id="g-female" />
                <Label htmlFor="g-female">Female</Label>
              </div>
            </RadioGroup>
          </div>
          <div className="space-y-2">
            <Label>Country</Label>
            <Input value={country} readOnly />
          </div>
          <div className="space-y-2">
            <Label>City</Label>
            <Select value={city} onValueChange={setCity}>
              <SelectTrigger>
                <SelectValue placeholder="Select city" />
              </SelectTrigger>
              <SelectContent>
                {PAK_CITIES.map((c) => (
                  <SelectItem key={c} value={c}>
                    {c}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Area</Label>
            <Input value={area} onChange={(e) => setArea(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label>Possible Joining Date</Label>
            <Input type="date" value={possibleJoiningDate} onChange={(e) => setPossibleJoiningDate(e.target.value)} />
          </div>
          <div className="space-y-2 md:col-span-2">
            <Label>Marketing Source</Label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 pt-1">
              {MARKETING_SOURCES.map((s) => (
                <label key={s} className="flex items-center gap-2 text-sm">
                  <Checkbox checked={marketingSource.includes(s)} onCheckedChange={(c) => toggleSource(s, !!c)} />
                  {s}
                </label>
              ))}
            </div>
          </div>
          <div className="space-y-2">
            <Label>Preferred Campus</Label>
            <Input value={preferredCampus} onChange={(e) => setPreferredCampus(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label>Next Follow-up</Label>
            <Input type="datetime-local" value={nextFollowUp} onChange={(e) => setNextFollowUp(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label>Probability</Label>
            <Select value={String(probability)} onValueChange={(v) => setProbability(parseInt(v))}>
              <SelectTrigger>
                <SelectValue placeholder="Probability" />
              </SelectTrigger>
              <SelectContent>
                {Array.from({ length: 10 }, (_, i) => (i + 1) * 10).map((p) => (
                  <SelectItem key={p} value={String(p)}>
                    {p}%
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2 md:col-span-2">
            <Label>Remarks</Label>
            <Textarea value={remarks} onChange={(e) => setRemarks(e.target.value)} rows={3} />
          </div>
          <div className="md:col-span-2 flex gap-3 justify-end pt-2">
            <Button type="submit">Save Enquiry</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
