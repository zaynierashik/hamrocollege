import { ReactNode } from "react";

import RoleDashboardLayout from "@/components/custom/dashboard/RoleDashboardLayout";

const collegeAdminNavItems = [
  { href: "/dashboard/college-admin", label: "Overview" },
  { href: "/dashboard/college-admin/college", label: "College Profile" },
  { href: "/dashboard/college-admin/programs", label: "Programs" },
  { href: "/dashboard/college-admin/applications", label: "Applications" },
];

export default function CollegeAdminDashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <RoleDashboardLayout
      requiredRole="college_admin"
      title="College Admin"
      subtitle="Manage your institution and admissions"
      navItems={collegeAdminNavItems}
    >
      {children}
    </RoleDashboardLayout>
  );
}
