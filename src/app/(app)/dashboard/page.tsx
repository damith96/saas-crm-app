import {
  Users,
  BriefcaseBusiness,
  TrendingUp,
  Trophy,
  ListTodo,
  Clock,
  Phone,
  Mail,
  CalendarDays,
  FileText,
  ArrowUpRight,
  ArrowRight,
} from "lucide-react";

const metrics = [
  {
    title: "Total Contacts",
    value: "248",
    description: "Active contacts",
    icon: Users,
  },
  {
    title: "Total Deals",
    value: "42",
    description: "Across all stages",
    icon: BriefcaseBusiness,
  },
  {
    title: "Open Deals",
    value: "28",
    description: "Currently in pipeline",
    icon: TrendingUp,
  },
  {
    title: "Won Deals",
    value: "14",
    description: "Successfully closed",
    icon: Trophy,
  },
  {
    title: "Pending Tasks",
    value: "18",
    description: "Awaiting completion",
    icon: ListTodo,
  },
  {
    title: "Overdue Tasks",
    value: "5",
    description: "Require attention",
    icon: Clock,
  },
];

const recentActivities = [
  {
    id: 1,
    type: "Call",
    subject: "Follow-up call with ABC Solutions",
    date: "Today, 10:30 AM",
    icon: Phone,
  },
  {
    id: 2,
    type: "Email",
    subject: "Proposal sent to XYZ Technologies",
    date: "Today, 9:15 AM",
    icon: Mail,
  },
  {
    id: 3,
    type: "Meeting",
    subject: "Product discussion with John Smith",
    date: "Yesterday, 3:00 PM",
    icon: CalendarDays,
  },
  {
    id: 4,
    type: "Note",
    subject: "Updated customer requirements",
    date: "Yesterday, 11:45 AM",
    icon: FileText,
  },
];

const dealStages = [
  { name: "New", count: 12, percentage: 43 },
  { name: "Qualified", count: 8, percentage: 29 },
  { name: "Proposal", count: 5, percentage: 18 },
  { name: "Negotiation", count: 3, percentage: 10 },
];

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Page heading */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Dashboard</h1>
          <p className="text-sm text-muted-foreground">
            Here's an overview of your company's CRM activities.
          </p>
        </div>

        <div className="text-sm text-muted-foreground">Overview</div>
      </div>

      {/* Metrics */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {metrics.map((metric) => {
          const Icon = metric.icon;

          return (
            <div key={metric.title} className="rounded-xl border bg-card p-5">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-muted-foreground">
                  {metric.title}
                </p>

                <div className="rounded-lg bg-muted p-2">
                  <Icon className="size-4 text-muted-foreground" />
                </div>
              </div>

              <div className="mt-4">
                <h2 className="text-2xl font-semibold tracking-tight">
                  {metric.value}
                </h2>
                <p className="mt-1 text-xs text-muted-foreground">
                  {metric.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Pipeline and activities */}
      <div className="grid gap-6 xl:grid-cols-2">
        {/* Deal pipeline */}
        <section className="rounded-xl border bg-card p-5">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-semibold">Deal Pipeline</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Overview of deals by stage
              </p>
            </div>

            <BriefcaseBusiness className="size-5 text-muted-foreground" />
          </div>

          <div className="mt-6 space-y-5">
            {dealStages.map((stage) => (
              <div key={stage.name} className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">{stage.name}</span>
                  <span className="text-muted-foreground">
                    {stage.count} deals
                  </span>
                </div>

                <div className="h-2 overflow-hidden rounded-full bg-muted">
                  <div
                    className="h-full rounded-full bg-primary"
                    style={{ width: `${stage.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 border-t pt-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Total open deals</span>
              <span className="font-semibold">28</span>
            </div>
          </div>
        </section>

        {/* Recent activities */}
        <section className="rounded-xl border bg-card p-5">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-semibold">Recent Activities</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Latest interactions with your customers
              </p>
            </div>

            <button className="flex items-center gap-1 text-sm font-medium text-primary hover:underline">
              View all
              <ArrowRight className="size-4" />
            </button>
          </div>

          <div className="mt-5 divide-y">
            {recentActivities.map((activity) => {
              const Icon = activity.icon;

              return (
                <div
                  key={activity.id}
                  className="flex items-start gap-3 py-4 first:pt-0 last:pb-0"
                >
                  <div className="rounded-lg bg-muted p-2">
                    <Icon className="size-4 text-muted-foreground" />
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium">
                      {activity.subject}
                    </p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {activity.type} · {activity.date}
                    </p>
                  </div>

                  <ArrowUpRight className="size-4 shrink-0 text-muted-foreground" />
                </div>
              );
            })}
          </div>
        </section>
      </div>

      {/* Pipeline value */}
      <section className="rounded-xl border bg-card p-5">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-semibold">Pipeline Value</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Total value of deals currently in progress
            </p>
          </div>

          <TrendingUp className="size-5 text-muted-foreground" />
        </div>

        <div className="mt-4">
          <p className="text-3xl font-semibold tracking-tight">$125,000</p>
          <p className="mt-1 text-xs text-muted-foreground">
            Across 28 open deals
          </p>
        </div>
      </section>
    </div>
  );
}
