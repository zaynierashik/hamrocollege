import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const savedColleges = [
  { name: "Kathford College", location: "Kathmandu" },
  { name: "Pokhara Engineering College", location: "Pokhara" },
];

export default function UserSavedPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl font-semibold text-slate-900">
          Saved Colleges
        </h1>
        <p className="mt-2 text-sm text-slate-600">
          Quickly revisit colleges you bookmarked for later.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Bookmarked</CardTitle>
          <CardDescription>
            Use this list to compare and apply when ready.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {savedColleges.map((item) => (
            <div
              key={item.name}
              className="flex flex-col gap-3 rounded-lg border border-slate-200 p-4 sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <p className="font-medium text-slate-900">{item.name}</p>
                <p className="text-sm text-slate-600">{item.location}</p>
              </div>
              <Button size="sm" variant="outline">
                View Details
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
