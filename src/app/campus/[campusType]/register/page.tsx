"use client";
import { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { getCampusConfig, isValidCampus } from "@/lib/campus-config";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

export default function CampusRegisterPage() {
  const params = useParams();
  const campusType = (params.campusType as string) || "shs";
  
  // Validate campus and get config
  if (!isValidCampus(campusType)) {
    return (
      <div className="container mx-auto p-6 min-h-screen flex items-center justify-center">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Invalid campus type. Please return to the <a href="/campus" className="underline">campus selector</a>.
          </AlertDescription>
        </Alert>
      </div>
    );
  }
  
  const campus = getCampusConfig(campusType)!;
  const Icon = campus.icon;

  const [name, setName] = useState("");
  const [school, setSchool] = useState("");
  const [schoolSearch, setSchoolSearch] = useState("");
  const [level, setLevel] = useState("");
  const [parentPhone, setParentPhone] = useState("");
  const router = useRouter();

  const filteredSchools = campus.schools.filter(s => 
    s.toLowerCase().includes(schoolSearch.toLowerCase())
  );

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    localStorage.setItem(`${campusType}Profile`, JSON.stringify({ 
      name, 
      school, 
      level, 
      parentPhone,
      campusType,
      registeredAt: new Date().toISOString()
    }));
    router.push(`/campus/${campusType}/game`);
  }

  return (
    <div className="container mx-auto px-4 py-12 min-h-screen flex items-center justify-center">
      <Card className="w-full max-w-lg">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="p-4 rounded-full bg-primary/10">
              <Icon className="h-10 w-10 text-primary" />
            </div>
          </div>
          <CardTitle className="text-3xl">{campus.displayName} Registration</CardTitle>
          <CardDescription>
            Complete your profile to access {campus.displayName} features and track your progress.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                type="text"
                placeholder="Enter your full name"
                value={name}
                onChange={e => setName(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="schoolSearch">School</Label>
              <Input
                id="schoolSearch"
                type="text"
                placeholder="Search for your school..."
                value={schoolSearch}
                onChange={e => setSchoolSearch(e.target.value)}
                className="mb-2"
              />
              <Select value={school} onValueChange={setSchool} required>
                <SelectTrigger>
                  <SelectValue placeholder="Select your school" />
                </SelectTrigger>
                <SelectContent>
                  {filteredSchools.map(schoolName => (
                    <SelectItem key={schoolName} value={schoolName}>
                      {schoolName}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="level">Year Level</Label>
              <Select value={level} onValueChange={setLevel} required>
                <SelectTrigger>
                  <SelectValue placeholder="Select your level" />
                </SelectTrigger>
                <SelectContent>
                  {campus.levels.map(lvl => (
                    <SelectItem key={lvl} value={lvl}>
                      {lvl}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="parentPhone">Parent/Guardian Phone</Label>
              <Input
                id="parentPhone"
                type="tel"
                placeholder="e.g., 0244123456"
                value={parentPhone}
                onChange={e => setParentPhone(e.target.value)}
                required
              />
            </div>

            <Button type="submit" className="w-full" size="lg">
              Register & Start Learning
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
