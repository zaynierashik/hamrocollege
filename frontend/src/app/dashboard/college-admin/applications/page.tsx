"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import api from "@/lib/api";

type CollegeApplication = {
  id: number;
  applicant_name: string;
  program_name: string;
  status: string;
};

export default function CollegeAdminApplicationsPage() {
  const [admissions, setAdmissions] = useState<CollegeApplication[]>([]);

  useEffect(() => {
    const loadApplications = async () => {
      const response = await api.get("colleges/dashboard/applications/");
      setAdmissions(response.data as CollegeApplication[]);
    };

    loadApplications();
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl font-semibold text-slate-900">
          Applications
        </h1>
        <p className="mt-2 text-sm text-slate-600">
          Review incoming student applications and update status.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Applications</CardTitle>
          <CardDescription>
            Prioritize pending applicants for faster admissions decisions.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {admissions.map((item) => (
            <div
              key={item.id}
              className="flex flex-col gap-3 rounded-lg border border-slate-200 p-4 sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <p className="font-medium text-slate-900">
                  {item.applicant_name || "Unnamed Applicant"}
                </p>
                <p className="text-sm text-slate-600">{item.program_name}</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="inline-flex rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">
                  {item.status}
                </span>
                <Button size="sm" variant="outline">
                  View
                </Button>
              </div>
            </div>
          ))}
          {admissions.length === 0 && (
            <p className="text-sm text-slate-600">No applications yet.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
