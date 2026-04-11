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

type ProfileData = {
  first_name: string;
  last_name: string;
  email: string;
  phone?: string;
  bio?: string;
};

export default function UserProfilePage() {
  const [profile, setProfile] = useState<ProfileData>({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    bio: "",
  });

  useEffect(() => {
    const loadProfile = async () => {
      const response = await api.get("users/users/me/");
      setProfile(response.data as ProfileData);
    };

    loadProfile();
  }, []);

  const fullName =
    `${profile.first_name || ""} ${profile.last_name || ""}`.trim();

  const onSave = async () => {
    const [firstName, ...rest] = fullName.split(" ");
    await api.patch("users/users/me/", {
      first_name: firstName || "",
      last_name: rest.join(" "),
      phone: profile.phone || "",
      bio: profile.bio || "",
    });
    toast("Profile updated.");
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl font-semibold text-slate-900">
          Profile
        </h1>
        <p className="mt-2 text-sm text-slate-600">
          Update your personal details and contact information.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
          <CardDescription>
            This form is UI-ready and can be connected to your profile API.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-1.5 sm:col-span-2">
            <Label htmlFor="full-name">Full Name</Label>
            <Input
              id="full-name"
              placeholder="Rashik Sharma"
              value={fullName}
              onChange={(event) => {
                const [firstName, ...rest] = event.target.value.split(" ");
                setProfile((prev) => ({
                  ...prev,
                  first_name: firstName || "",
                  last_name: rest.join(" "),
                }));
              }}
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" value={profile.email} disabled />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="phone">Phone</Label>
            <Input
              id="phone"
              placeholder="98XXXXXXXX"
              value={profile.phone || ""}
              onChange={(event) =>
                setProfile((prev) => ({ ...prev, phone: event.target.value }))
              }
            />
          </div>
          <div className="space-y-1.5 sm:col-span-2">
            <Label htmlFor="bio">Bio</Label>
            <Input
              id="bio"
              placeholder="Tell colleges about your goals"
              value={profile.bio || ""}
              onChange={(event) =>
                setProfile((prev) => ({ ...prev, bio: event.target.value }))
              }
            />
          </div>
          <div className="sm:col-span-2">
            <Button className="h-10" onClick={onSave}>
              Save Changes
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
