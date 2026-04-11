"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import api from "@/lib/api";

type CollegeOverview = {
  total_applications: number;
  pending_review: number;
  active_programs: number;
};

export default function CollegeAdminDashboardPage() {
  const [overview, setOverview] = useState<CollegeOverview | null>(null);

  useEffect(() => {
    const loadOverview = async () => {
      const response = await api.get("colleges/dashboard/overview/");
      setOverview(response.data as CollegeOverview);
    };

    loadOverview();
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl font-semibold text-slate-900">
          College Admin Overview
        </h1>
        <p className="mt-2 text-sm text-slate-600">
          Monitor applications, program availability, and profile completion.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Total Applications</CardDescription>
            <CardTitle className="text-3xl">
              {overview?.total_applications ?? 0}
            </CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Pending Review</CardDescription>
            <CardTitle className="text-3xl">
              {overview?.pending_review ?? 0}
            </CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Active Programs</CardDescription>
            <CardTitle className="text-3xl">
              {overview?.active_programs ?? 0}
            </CardTitle>
          </CardHeader>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Admin checklist</CardTitle>
          <CardDescription>
            Stay on top of admissions operations each day.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-slate-700">
          <p>1. Review pending applications and mark shortlisted students.</p>
          <p>2. Update seat availability for active programs.</p>
          <p>3. Keep college profile details accurate and current.</p>
        </CardContent>
      </Card>
    </div>
  );
}
