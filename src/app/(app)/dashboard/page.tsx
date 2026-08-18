import { AsyncFilter } from "@/components/async-filter";

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Overview of your CRM metrics and activities
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {/* Add dashboard cards/widgets here */}
      </div>
      <AsyncFilter />
    </div>
  );
}
