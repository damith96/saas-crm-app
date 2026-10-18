// TEST DELAY — remove this before production
const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export default async function LeadsPage() {
  await wait(3000); // 3-second delay so the progress bar is visible

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Leads</h1>
        <p className="text-muted-foreground">Track and manage your sales leads</p>
      </div>

      <div>
        {/* Add leads table/kanban here */}
      </div>
    </div>
  );
}
