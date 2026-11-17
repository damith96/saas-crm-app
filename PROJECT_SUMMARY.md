# Vertex CRM — Project Summary

## What This Is

A SaaS CRM web app called **Vertex CRM**, built with **Next.js 16 (App Router)**, **React 19**, **TypeScript**, and **Tailwind CSS v4**. The UI component library is **shadcn/ui** (Radix-based). Forms use **React Hook Form + Zod**. HTTP calls go through **Axios** with a custom instance. Notifications use **Sonner** (toast).

---

## Tech Stack

| Layer | Tech |
|---|---|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| UI Components | shadcn/ui + Base UI (`@base-ui/react`) |
| Forms | React Hook Form + Zod |
| HTTP | Axios (custom instance with interceptors) |
| Toasts | Sonner |
| Icons | Lucide React |
| Progress Bar | NProgress (`nprogress`) |

---

## Project Structure

```
src/
├── app/
│   ├── layout.tsx            ← Root layout (AuthProvider, Toaster, TopProgressBar)
│   ├── page.tsx              ← Root redirect (always goes to /auth/login right now)
│   ├── globals.css
│   ├── auth/
│   │   ├── layout.tsx        ← Auth layout: 2-column (marketing panel left, form right)
│   │   ├── login/page.tsx
│   │   ├── register/page.tsx
│   │   ├── forgot-password/page.tsx
│   │   └── reset-password/page.tsx
│   └── (app)/                ← Protected app group
│       ├── layout.tsx        ← Wraps everything in AuthGuard + AppLayout
│       ├── menuItems.ts
│       ├── dashboard/page.tsx
│       ├── companies/
│       ├── contacts/
│       ├── leads/
│       ├── deals/
│       ├── tasks/
│       ├── reports/
│       └── settings/
├── components/
│   ├── app-layout.tsx        ← SidebarProvider + AppSidebar + TopNavbar
│   ├── app-sidebar.tsx       ← Collapsible sidebar, uses menuItems
│   ├── top-navbar.tsx        ← Header with sidebar trigger + search input
│   ├── top-progress-bar.tsx  ← NProgress bar on route changes
│   ├── async-filter.tsx      ← Debounced async search/select component
│   ├── custom-bar.tsx
│   └── ui/                   ← shadcn/ui components
│       ├── button, input, card, avatar
│       ├── sidebar, sheet, dropdown-menu
│       ├── field, label, checkbox
│       ├── skeleton, tooltip, separator
│       └── progress
├── services/
│   ├── axiosInstance.ts      ← Axios instance, request/response interceptors
│   ├── auth.service.ts       ← login, register, refreshToken, forgotPassword, resetPassword
│   └── interceptors/
│       └── error.interceptor.ts
├── contexts/
│   └── auth.context.tsx      ← isAuthenticated, isLoading, login(), logout()
├── guards/
│   └── auth.guard.tsx        ← Redirects to /auth/login if not authenticated
├── interfaces/
│   ├── auth.ts               ← ILoginRequest, IRegisterRequest, IAuthResponse, etc.
│   ├── common-response.ts    ← ICommonResponse<T>
│   └── error-response.ts     ← IErrorResponse, ApiError class
├── hooks/
│   └── use-mobile.ts
├── lib/
│   └── utils.ts              ← cn() utility
└── proxy.ts                  ← Next.js middleware stub (passes all requests through)
```

---

## What Has Been Built

### ✅ Auth Flow (fully wired UI, needs a real backend)
- **Login page** — email + password + remember me checkbox, Zod validation, posts to `/auth/login`, stores JWT in `localStorage`
- **Register page** — first/last name, email, password + confirm, terms checkbox, password strength rules, show/hide toggle
- **Forgot password page** — email input, submits to `/auth/forgot-password`, shows success state
- **Reset password page** — token + new password + confirm, submits to `/auth/reset-password`
- **Auth layout** — split-screen: animated marketing panel on left (fake dashboard preview), form on right

### ✅ Auth Infrastructure
- `AuthContext` — provides `isAuthenticated`, `isLoading`, `login(token)`, `logout()` globally
- `AuthGuard` — protects all `(app)` routes, redirects unauthenticated users to `/auth/login`
- `axiosInstance` — base URL from `BACKEND_URL` env var (falls back to `/api`), attaches `Authorization: Bearer <token>` on every request
- Token refresh — on 401 with `x-token-expired: true` header, calls `/auth/refresh-token`, retries original request; force-logout if refresh also fails
- `errorInterceptor` — parses API error messages, rejects with typed `ApiError`

### ✅ App Shell
- **Sidebar** — collapsible (icon-only mode), lists all 8 nav items: Dashboard, Companies, Contacts, Leads, Deals, Tasks, Reports, Settings
- **Top navbar** — sidebar toggle trigger + basic search input
- **TopProgressBar** — NProgress loading bar on navigation

### ✅ Shared Components
- `AsyncFilter` — debounced async dropdown/search component (reusable)
- Full shadcn/ui component set: Button, Input, Card, Avatar, Sidebar, Sheet, DropdownMenu, Field, Label, Checkbox, Skeleton, Tooltip, Separator, Progress

---

## What Is NOT Done Yet (Empty / Placeholder)

All the main CRM pages are empty route shells with no content:

- `/dashboard` — has a heading and an `AsyncFilter` test, no real data or widgets
- `/companies` — empty
- `/contacts` — empty
- `/leads` — empty
- `/deals` — empty
- `/tasks` — empty
- `/reports` — empty
- `/settings` — empty

The **root page** (`/`) always redirects to `/auth/login` even when already logged in (there's a commented-out redirect to `/dashboard` — likely a bug or TODO).

There is **no backend**. All API calls assume a REST backend at `BACKEND_URL`. No database, no API routes built in Next.js yet.

---

## Known Issues / Things to Watch

1. `page.tsx` root redirect — always sends to `/auth/login` even if authenticated (dashboard redirect is commented out)
2. Register page calls `data.token` but the interface/service returns `data.data.accessToken` — likely a bug
3. `proxy.ts` is a no-op middleware stub (just calls `NextResponse.next()`)
4. `custom-bar.tsx` exports a `CustomeSidebarTrigger` (typo: "Custome") — imported in `top-navbar.tsx` but not rendered
5. Dashboard page has an `AsyncFilter` with hardcoded test data — just for component testing

---

## Environment Variables Needed

```env
BACKEND_URL=http://localhost:4000   # Your REST API base URL
```

---

## What To Do Next (Suggestions)

1. **Fix the root redirect bug** — authenticated users should go to `/dashboard`
2. **Fix the register page** — `data.token` → `data.data.accessToken`
3. **Build a backend** (or connect to one) — all auth endpoints need to exist
4. **Build the Dashboard page** — stats cards (total leads, open deals, revenue), charts
5. **Build the CRM entity pages** — start with Companies or Contacts (list view, detail view, create/edit forms)
6. **Add user profile** to the sidebar footer (avatar, name, logout button)
7. **Add route-level active state** to sidebar nav items
8. **Set up a real middleware** — replace the `proxy.ts` stub with actual auth-based route protection at the edge
