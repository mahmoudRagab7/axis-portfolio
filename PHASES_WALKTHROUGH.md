# AXIS Portfolio — Implementation Phases Walkthrough

> Step-by-step build guide organized by essential functions.
> Each phase produces a **working deliverable** before moving to the next.

### Project Setup Summary (Completed)

| Service | Detail |
|---------|--------|
| **Firebase Project** | `axis-portfolio-db` (Spark / Free plan) |
| **Firestore** | Production mode, security rules deployed |
| **Authentication** | Email/Password enabled |
| **Admin Account** | `mahmoud.ragab187@gmail.com` |
| **Image Hosting** | Cloudinary (Cloud: `doy677kax`, Preset: `axis_portfolio`) |
| **Env Variables** | `.env` configured with all keys |
| **Firebase Config** | `src/firebaseConfig.js` ready |

> ⚠️ **No Firebase Storage** — using Cloudinary free tier instead (no credit card required).

---

## How to Use This File

- Phases are ordered by **priority** — each one builds on the previous.
- ⚠️ **NOTE** tags = something I need from you (API key, asset, decision, etc.)
- ✅ marks completed phases.
- Work through phases **one at a time** — tell me to start a phase when you're ready.

---

## Phase Overview

| # | Phase | Focus | Est. Time | Status |
|---|-------|-------|-----------|--------|
| 1 | Project Foundation | Setup, deps, config, folder structure | ~1 hr | ⬜ |
| 2 | Public Layout Shell | Navbar, Footer, routing, layouts | ~1.5 hr | ⬜ |
| 3 | Landing Page — Static Sections | Hero, About, Services | ~3 hr | ⬜ |
| 4 | Firebase Setup & Services Layer | Firebase init, Firestore CRUD services, hooks | ~2 hr | ⬜ |
| 5 | Landing Page — Dynamic Sections | Statistics, Market Filter, Results Grid | ~3 hr | ⬜ |
| 6 | Admin Authentication | Login page, AuthContext, PrivateRoute | ~1.5 hr | ⬜ |
| 7 | Admin Dashboard — Results CRUD | Add/Edit/Delete results, image upload | ~4 hr | ⬜ |
| 8 | Admin Dashboard — Markets & Stats | Manage markets, edit statistics | ~2 hr | ⬜ |
| 9 | Polish & Deployment | Animations, responsive audit, SEO, deploy | ~2 hr | ⬜ |

---

## Phase 1: Project Foundation

**Goal:** Get the project running with all dependencies, folder structure, and configs in place.

### Tasks

- [ ] Clean up default Vite boilerplate files
- [ ] Install dependencies:
  - `react-router-dom`
  - `tailwindcss` (v4)
  - `firebase`
  - `framer-motion`
  - `axios`
- [ ] Configure Tailwind CSS v4
- [ ] Set up the full folder structure (`components/`, `pages/`, `services/`, `hooks/`, `config/`, `context/`, `routes/`, `utils/`)
- [x] ~~Create `.env` and `.env.example`~~ ✅ Already done
- [x] ~~Create `src/firebaseConfig.js`~~ ✅ Already done
- [ ] Move firebase config to `src/config/firebase.js` (proper folder structure)
- [ ] Create `src/routes/AppRoutes.jsx` with placeholder routes
- [ ] Create `src/App.jsx` wired to the router
- [ ] Verify the app runs with `npm run dev`

### ✅ NOTE — Firebase & Cloudinary Already Set Up

> All external services are configured and ready:
> - Firebase project `axis-portfolio-db` — Firestore + Auth ✅
> - Cloudinary — image hosting with unsigned upload preset ✅
> - `.env` file — all keys populated ✅
> - `firebaseConfig.js` — initialized ✅

### Deliverable

✅ Clean project running with Tailwind, routing, and empty folder structure.

---

## Phase 2: Public Layout Shell

**Goal:** Build the skeleton layout that wraps all public pages — Navbar + Footer + page routing.

### Tasks

- [ ] Build `Navbar.jsx` — logo, nav links, responsive hamburger menu
- [ ] Build `Footer.jsx` — company info, social links, quick nav
- [ ] Build `PublicLayout.jsx` — wraps Navbar + `<Outlet />` + Footer
- [ ] Set up routes: `/` (Home), `*` (404 Not Found)
- [ ] Build `NotFound.jsx` page
- [ ] Add smooth scroll navigation (clicking nav link scrolls to section)
- [ ] Ensure responsive on mobile/tablet/desktop

### ⚠️ NOTE — Company Logo

> Do you have a company logo file? If yes, send it to me.
> If not, I'll create a text-based logo using the company name. Let me know the **company name** to display.

### Deliverable

✅ Responsive navbar + footer wrapping an empty homepage, with working 404 page.

---

## Phase 3: Landing Page — Static Sections

**Goal:** Build all visually static sections of the public homepage (no Firebase data yet).

### Tasks

- [ ] Build `Hero.jsx` — full-screen hero with headline, subtitle, CTA buttons, animated background
- [ ] Build `About.jsx` — company story, mission, vision with icons/imagery
- [ ] Build `Services.jsx` — service cards (Signals, Analysis, Advisory, Education)
- [ ] Build `SectionHeader.jsx` — reusable section title component
- [ ] Build `Button.jsx` — reusable button with variants (primary, secondary, outline)
- [ ] Build `Card.jsx` — reusable card wrapper
- [ ] Add Google Fonts (Inter, Space Grotesk)
- [ ] Add Framer Motion scroll reveal animations to each section
- [ ] Mobile responsiveness for all sections

### ⚠️ NOTE — Content Needed

> I'll use placeholder text for now. If you have specific text for:
> - Company tagline / hero headline
> - About section content
> - Service descriptions
>
> Send them to me at any time and I'll update the content.

### Deliverable

✅ Beautiful, animated landing page with Hero → About → Services sections.

---

## Phase 4: Firebase & Cloudinary Services Layer

**Goal:** Build the data service layer and image upload service that all dynamic features will use.

### Tasks

- [ ] Finalize `src/config/firebase.js` with exports (auth, db)
- [ ] Create `src/services/resultService.js` — CRUD operations for results collection
- [ ] Create `src/services/marketService.js` — CRUD for markets collection
- [ ] Create `src/services/statisticsService.js` — Read/update statistics
- [ ] Create `src/services/cloudinaryService.js` — Upload images to Cloudinary
- [ ] Create `src/hooks/useResults.js` — Fetch & filter results
- [ ] Create `src/hooks/useMarkets.js` — Fetch markets
- [ ] Create `src/hooks/useStatistics.js` — Fetch statistics
- [ ] Seed initial data into Firestore:
  - 5 default markets (US, Egypt, Saudi, Crypto, Forex)
  - 1 statistics document with default values
- [x] ~~Firestore security rules~~ ✅ Already deployed

### ✅ NOTE — All Config Already Done

> Firebase config, Cloudinary config, and `.env` are all set up.
> No additional keys or setup needed for this phase.

### Deliverable

✅ Full Firebase + Cloudinary integration — services, hooks, seeded data.

---

## Phase 5: Landing Page — Dynamic Sections

**Goal:** Build the results showcase and statistics sections powered by live Firestore data.

### Tasks

- [ ] Build `Statistics.jsx` — animated counter section pulling from Firestore
- [ ] Build `MarketFilter.jsx` — interactive tab/filter bar from markets collection
- [ ] Build `ResultCard.jsx` — card showing stock name, images, percentage, date, market
- [ ] Build `ResultsGrid.jsx` — filterable grid of result cards
- [ ] Build `Modal.jsx` — reusable modal for result detail view (before/after comparison)
- [ ] Build `Loader.jsx` — loading skeleton components
- [ ] Implement market filtering logic (click tab → filter results)
- [ ] Add "All Markets" default tab
- [ ] Handle empty states (no results for a market)
- [ ] Handle loading states (skeletons)
- [ ] Handle error states
- [ ] Connect everything to Firestore via custom hooks

### Deliverable

✅ Fully dynamic landing page — statistics, market filter, and results grid all pulling live data.

---

## Phase 6: Admin Authentication

**Goal:** Build the admin login system and protect admin routes.

### Tasks

- [ ] Build `src/context/AuthContext.jsx` — auth state provider
- [ ] Build `src/hooks/useAuth.js` — login, logout, auth state
- [ ] Build `src/pages/admin/Login.jsx` — styled login form
- [ ] Build `src/routes/PrivateRoute.jsx` — redirects to login if not authenticated
- [ ] Set up admin routes under `/admin/*`
- [ ] Build `AdminLayout.jsx` — sidebar + content area
- [ ] Handle auth errors (wrong password, network error)
- [ ] Add loading state during auth check
- [ ] Persist session across page refreshes

### ✅ NOTE — Admin Account Already Created

> Admin user is already set up in Firebase Authentication:
> - **Email:** `mahmoud.ragab187@gmail.com`
> - **Provider:** Email/Password
> - No additional setup needed for this phase.

### Deliverable

✅ Working login page → authenticated admin dashboard shell with sidebar.

---

## Phase 7: Admin Dashboard — Results CRUD

**Goal:** Build the core admin functionality — manage trading results with image uploads.

### Tasks

- [ ] Build `src/components/admin/Sidebar.jsx` — navigation sidebar
- [ ] Build `src/pages/admin/Dashboard.jsx` — overview with stats cards (total results, per market)
- [ ] Build `src/pages/admin/Results.jsx` — results table with edit/delete actions
- [ ] Build `src/components/admin/ResultsTable.jsx` — sortable data table
- [ ] Build `src/pages/admin/AddResult.jsx` — form with:
  - Stock name input
  - Market dropdown (from Firestore markets)
  - Success percentage slider/input
  - Description textarea
  - Date picker
  - Before image upload with preview
  - After image upload with preview
- [ ] Build `src/pages/admin/EditResult.jsx` — pre-filled edit form
- [ ] Implement image upload to Cloudinary (via cloudinaryService.js)
- [ ] Implement delete with confirmation modal
- [ ] Add form validation (required fields, % range 0-100, file type/size)
- [ ] Add toast notifications for success/error
- [ ] Add loading states for all async operations

### Deliverable

✅ Full CRUD dashboard for trading results with image upload.

---

## Phase 8: Admin Dashboard — Markets & Statistics Management

**Goal:** Allow admin to manage market categories and public statistics.

### Tasks

- [ ] Build `src/pages/admin/Markets.jsx` — list, add, edit, delete, toggle active, reorder
- [ ] Build `src/components/admin/MarketManager.jsx` — inline edit form
- [ ] Build `src/pages/admin/Statistics.jsx` — edit form for public stats (total trades, success rate, etc.)
- [ ] Build `src/components/admin/StatsEditor.jsx` — number inputs with save
- [ ] Add validation (positive numbers, required fields)
- [ ] Add success/error feedback
- [ ] Test full admin workflow end-to-end:
  1. Login → Dashboard → Add Result → View on public site
  2. Edit Result → Verify changes
  3. Delete Result → Verify removal
  4. Add Market → Verify in filter
  5. Update Stats → Verify counters

### Deliverable

✅ Complete admin dashboard with all management features.

---

## Phase 9: Polish & Deployment

**Goal:** Final quality pass and production deployment.

### Tasks

- [ ] Responsive audit — test every page on 375px, 768px, 1024px, 1440px
- [ ] Cross-browser test — Chrome, Firefox, Edge
- [ ] Animation polish — entrance animations, hover states, transitions
- [ ] Performance — lazy load images, code-split routes
- [ ] SEO — meta tags, Open Graph, favicon, page titles
- [ ] Accessibility — alt texts, keyboard navigation, focus states
- [ ] Error boundaries — graceful error handling
- [ ] Build production bundle: `npm run build`
- [ ] Deploy to Vercel/Netlify
- [ ] Connect custom domain (if available)
- [ ] Final QA walkthrough

### ⚠️ NOTE — Deployment Accounts

> You'll need:
> - A **GitHub** account (to push the code)
> - A **Vercel** or **Netlify** account (free tier is fine)
> - Optionally: a **custom domain** if you have one
>
> Let me know which hosting platform you prefer (Vercel or Netlify).

### Deliverable

✅ Production-ready application deployed and live.

---

## Quick Reference — What I'll Need From You

| When | What I Need | Priority | Status |
|------|------------|----------|--------|
| Before Phase 2 | Company name / logo | Nice to have | ⬜ |
| Before Phase 3 | Company text content (optional — I'll use placeholders) | Optional | ⬜ |
| ~~Before Phase 4~~ | ~~Firebase config object (API keys)~~ | ~~Required~~ | ✅ Done |
| ~~Before Phase 6~~ | ~~Admin account created in Firebase Auth~~ | ~~Required~~ | ✅ Done |
| Before Phase 9 | GitHub + Vercel/Netlify accounts | 🔴 Required | ⬜ |
| Anytime | Custom domain name | Optional | ⬜ |

---

## Ready?

All external services are configured. Tell me **"Start Phase 1"** and I'll begin building! 🚀
