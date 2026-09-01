export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="grid min-h-screen w-full md:grid-cols-2">
      <div className="relative hidden overflow-hidden bg-slate-950 p-8 text-white lg:flex lg:flex-col lg:p-12 xl:p-16">
        {/* Background decoration */}
        <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-indigo-600/20 blur-3xl" />
        <div className="absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-violet-600/20 blur-3xl" />

        {/* Branding */}
        <div className="relative z-10">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-indigo-500 text-lg font-bold">
              V
            </div>

            <div>
              <div className="text-xl font-semibold tracking-wide">VERTEX</div>

              <div className="text-xs font-medium tracking-widest text-slate-400">
                CRM
              </div>
            </div>
          </div>
        </div>

        {/* Main message */}
        <div className="relative z-10 mt-20 max-w-md">
          <div className="mb-4 inline-flex rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-slate-300">
            Customer Relationship Management
          </div>

          <h1 className="text-4xl font-semibold leading-tight tracking-tight">
            Customer relationships,{" "}
            <span className="bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">
              simplified.
            </span>
          </h1>

          <p className="mt-5 text-base leading-7 text-slate-400">
            Manage leads, close deals, and build stronger customer relationships
            with Vertex CRM.
          </p>
        </div>

        {/* Dashboard Preview */}
        <div className="relative z-10 mt-auto pt-10">
          <div className="overflow-hidden rounded-xl border border-white/10 bg-white shadow-2xl shadow-black/30">
            {/* Fake dashboard header */}
            <div className="flex items-center justify-between border-b bg-slate-50 px-4 py-3">
              <div className="flex items-center gap-2">
                <div className="flex h-6 w-6 items-center justify-center rounded-md bg-slate-950 text-[10px] font-bold text-white">
                  V
                </div>

                <span className="text-xs font-semibold text-slate-800">
                  VERTEX
                </span>
              </div>

              <div className="h-6 w-32 rounded-md border bg-white" />
            </div>

            <div className="flex">
              {/* Fake sidebar */}
              <div className="hidden w-32 border-r bg-slate-50 p-3 sm:block">
                <div className="space-y-2">
                  {[
                    "Dashboard",
                    "Companies",
                    "Contacts",
                    "Leads",
                    "Deals",
                    "Tasks",
                  ].map((item, index) => (
                    <div
                      key={item}
                      className={`rounded-md px-2 py-1.5 text-[9px] ${
                        index === 0
                          ? "bg-slate-200 font-medium text-slate-900"
                          : "text-slate-500"
                      }`}
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </div>

              {/* Fake dashboard content */}
              <div className="flex-1 p-4">
                <div className="text-sm font-semibold text-slate-900">
                  Dashboard
                </div>

                <div className="mt-3 grid grid-cols-3 gap-2">
                  {[
                    ["Total Deals", "128"],
                    ["Open Deals", "32"],
                    ["Revenue", "$24.5k"],
                  ].map(([label, value]) => (
                    <div key={label} className="rounded-lg border bg-white p-2">
                      <div className="text-[8px] text-slate-400">{label}</div>

                      <div className="mt-1 text-xs font-semibold text-slate-900">
                        {value}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Fake chart */}
                <div className="mt-3 rounded-lg border p-3">
                  <div className="text-[9px] font-medium text-slate-700">
                    Deals Overview
                  </div>

                  <div className="mt-3 flex h-20 items-end gap-1">
                    {[30, 42, 35, 55, 48, 65, 58, 78, 70, 88].map(
                      (height, index) => (
                        <div
                          key={index}
                          className="flex-1 rounded-t-sm bg-gradient-to-t from-indigo-500 to-violet-400"
                          style={{ height: `${height}%` }}
                        />
                      ),
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <main>{children}</main>
    </div>
  );
}
