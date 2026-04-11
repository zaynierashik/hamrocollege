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

type OverviewData = {
  total_applications: number;
  accepted: number;
  pending: number;
  saved_colleges: number;
};

export default function UserDashboardPage() {
  const [overview, setOverview] = useState<OverviewData | null>(null);

  useEffect(() => {
    const loadOverview = async () => {
      const response = await api.get("users/users/dashboard-overview/");
      setOverview(response.data as OverviewData);
    };

    loadOverview();
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl font-semibold text-slate-900">
          Welcome back
        </h1>
        <p className="mt-2 text-sm text-slate-600">
          This is your application hub. Track status, saved colleges, and
          profile readiness.
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
            <CardDescription>Accepted</CardDescription>
            <CardTitle className="text-3xl">
              {overview?.accepted ?? 0}
            </CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Saved Colleges</CardDescription>
            <CardTitle className="text-3xl">
              {overview?.saved_colleges ?? 0}
            </CardTitle>
          </CardHeader>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Next steps</CardTitle>
          <CardDescription>
            Complete profile and keep track of deadlines.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-slate-700">
          <p>1. Complete your profile with phone and bio.</p>
          <p>2. Review pending applications and upload required documents.</p>
          <p>3. Shortlist colleges from your saved list and apply.</p>
        </CardContent>
      </Card>
    </div>
  );
}
