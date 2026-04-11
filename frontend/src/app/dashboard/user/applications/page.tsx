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

type UserApplication = {
  id: number;
  college_name: string;
  program_name: string;
  status: string;
};

export default function UserApplicationsPage() {
  const [applications, setApplications] = useState<UserApplication[]>([]);

  useEffect(() => {
    const loadApplications = async () => {
      const response = await api.get("users/users/my-applications/");
      setApplications(response.data as UserApplication[]);
    };

    loadApplications();
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl font-semibold text-slate-900">
          My Applications
        </h1>
        <p className="mt-2 text-sm text-slate-600">
          Check the latest status of your submitted applications.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Application List</CardTitle>
          <CardDescription>
            All recent applications from your account.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {applications.map((item) => (
            <div
              key={item.id}
              className="flex flex-col gap-2 rounded-lg border border-slate-200 p-4 sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <p className="font-medium text-slate-900">
                  {item.college_name}
                </p>
                <p className="text-sm text-slate-600">{item.program_name}</p>
              </div>
              <span className="inline-flex w-fit rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">
                {item.status}
              </span>
            </div>
          ))}
          {applications.length === 0 && (
            <p className="text-sm text-slate-600">No applications yet.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
