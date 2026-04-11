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

type CollegeProgram = {
  id: number;
  course_name: string;
  details: string;
};

export default function CollegeAdminProgramsPage() {
  const [programs, setPrograms] = useState<CollegeProgram[]>([]);

  useEffect(() => {
    const loadPrograms = async () => {
      const response = await api.get("colleges/dashboard/programs/");
      setPrograms(response.data as CollegeProgram[]);
    };

    loadPrograms();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-display text-3xl font-semibold text-slate-900">
            Programs
          </h1>
          <p className="mt-2 text-sm text-slate-600">
            Manage available programs, seats, and admissions status.
          </p>
        </div>
        <Button size="sm">Add Program</Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Program List</CardTitle>
          <CardDescription>
            Current academic offerings in your college listing.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {programs.map((item) => (
            <div
              key={item.id}
              className="flex flex-col gap-2 rounded-lg border border-slate-200 p-4 sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <p className="font-medium text-slate-900">{item.course_name}</p>
                <p className="text-sm text-slate-600">
                  {item.details || "No additional details"}
                </p>
              </div>
              <span className="inline-flex w-fit rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">
                Active
              </span>
            </div>
          ))}
          {programs.length === 0 && (
            <p className="text-sm text-slate-600">No programs found.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
