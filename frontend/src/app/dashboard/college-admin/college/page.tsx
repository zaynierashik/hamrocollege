"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import api from "@/lib/api";

type CollegeProfile = {
  name: string;
  email: string;
  phone: string;
  address: string;
};

export default function CollegeAdminCollegePage() {
  const [college, setCollege] = useState<CollegeProfile>({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  useEffect(() => {
    const loadCollege = async () => {
      const response = await api.get("colleges/dashboard/college/");
      setCollege(response.data as CollegeProfile);
    };

    loadCollege();
  }, []);

  const saveCollege = async () => {
    await api.patch("colleges/dashboard/college/", college);
    toast("College profile updated.");
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl font-semibold text-slate-900">
          College Profile
        </h1>
        <p className="mt-2 text-sm text-slate-600">
          Manage public details students see before applying.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Institution Details</CardTitle>
          <CardDescription>
            Keep this information accurate for better trust and visibility.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-1.5 sm:col-span-2">
            <Label htmlFor="college-name">College Name</Label>
            <Input
              id="college-name"
              placeholder="Hamro College"
              value={college.name}
              onChange={(event) =>
                setCollege((prev) => ({ ...prev, name: event.target.value }))
              }
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="college-email">Email</Label>
            <Input
              id="college-email"
              type="email"
              placeholder="info@hamrocollege.edu.np"
              value={college.email}
              onChange={(event) =>
                setCollege((prev) => ({ ...prev, email: event.target.value }))
              }
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="college-phone">Phone</Label>
            <Input
              id="college-phone"
              placeholder="01-4XXXXX"
              value={college.phone}
              onChange={(event) =>
                setCollege((prev) => ({ ...prev, phone: event.target.value }))
              }
            />
          </div>
          <div className="space-y-1.5 sm:col-span-2">
            <Label htmlFor="college-address">Address</Label>
            <Input
              id="college-address"
              placeholder="Kathmandu, Nepal"
              value={college.address}
              onChange={(event) =>
                setCollege((prev) => ({ ...prev, address: event.target.value }))
              }
            />
          </div>
          <div className="sm:col-span-2">
            <Button className="h-10" onClick={saveCollege}>
              Save Profile
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
