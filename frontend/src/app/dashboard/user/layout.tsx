import { ReactNode } from "react";

import RoleDashboardLayout from "@/components/custom/dashboard/RoleDashboardLayout";

const userNavItems = [
  { href: "/dashboard/user", label: "Overview" },
  { href: "/dashboard/user/profile", label: "Profile" },
  { href: "/dashboard/user/applications", label: "Applications" },
  { href: "/dashboard/user/saved", label: "Saved Colleges" },
];

export default function UserDashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <RoleDashboardLayout
      requiredRole="user"
      title="User Dashboard"
      subtitle="Track applications and update your profile"
      navItems={userNavItems}
    >
      {children}
    </RoleDashboardLayout>
  );
}
