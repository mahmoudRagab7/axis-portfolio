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
| **10** | **Pricing Plans + Subscription Access** | Pricing section, blur gate, subscriber system | **~5 hr** | ⬜ |

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
  - `i18next`, `react-i18next`, and `i18next-browser-languagedetector`
- [ ] Configure Tailwind CSS v4
- [ ] Set up the full folder structure (`components/`, `pages/`, `services/`, `hooks/`, `config/`, `context/`, `routes/`, `utils/`)
- [x] ~~Create `.env` and `.env.example`~~ ✅ Already done
- [x] ~~Create `src/firebaseConfig.js`~~ ✅ Already done
- [ ] Move firebase config to `src/config/firebase.js` (proper folder structure)
- [ ] Create `src/config/i18n.js` and JSON translation files (`src/locales/en.json`, `src/locales/ar.json`)
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
- [ ] Build `LanguageSwitcher.jsx` — component with country flags (e.g., 🇺🇸 EN / 🇪🇬 AR) and add it to `Navbar`
- [ ] Build `Footer.jsx` — company info, social links, quick nav
- [ ] Build `PublicLayout.jsx` — wraps Navbar + `<Outlet />` + Footer
- [ ] Set up routes: `/` (Home), `*` (404 Not Found)
- [ ] Build `NotFound.jsx` page
- [ ] Add smooth scroll navigation (clicking nav link scrolls to section)
- [ ] Implement dynamic `dir="rtl"` toggling on the `<html>` tag for Arabic language
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
- [ ] Apply `useTranslation()` hook for all static strings in these components instead of hardcoding
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
- [ ] Create `src/config/apiClient.js` — Axios instance with `Accept-Language` header
- [ ] Ensure `cloudinaryService.js` uses `apiClient` instead of plain `axios`
- [ ] Sync Firebase Auth language with i18next in `src/config/firebase.js` (`auth.languageCode = i18n.language`)
- [ ] Create `src/hooks/useResults.js` — Fetch & filter results
- [ ] Create `src/hooks/useMarkets.js` — Fetch markets
- [ ] Create `src/hooks/useStatistics.js` — Fetch statistics
- [ ] Create `src/hooks/useLanguage.js` — Language state and toggle logic
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
- [ ] Create `src/utils/errorHandler.js` — maps Firebase error codes to localized messages
- [ ] Handle auth errors (wrong password, user not found) using `getLocalizedError()`
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

## Phase 10: Pricing Plans + Subscription Access System

**Goal:** Add a publicly visible `Pricing` section and gate premium trading results behind a lightweight subscriber check — with no payment gateway, contact is done via WhatsApp.

### Overview

This phase adds **two tightly coupled features:**

1. **Pricing Plans Section** — Displayed on the public homepage between Services and Results. Admin can manage plan names, prices, features, and WhatsApp contact numbers.
2. **Results Blur / Access Gate** — Non-subscribed visitors see only the **first result per market**; all remaining results are blurred with a CTA overlay. The admin can mark any phone number as a "subscriber" and generate a short access token (stored in `localStorage`) that unlocks the full results view.

---

### 10.1 Pricing Plans Section

#### How It Works
- Plans are stored in a new Firestore collection: `plans`
- Admin creates/edits plans from the dashboard (name, price, currency, features list, WhatsApp number, highlighted/recommended flag)
- Public page fetches and renders the plans as premium-styled cards
- Each plan card has a **"Subscribe via WhatsApp"** button that opens `https://wa.me/<number>?text=<pre-filled message>`
- No payment gateway — contact is manual, handled by the company

#### Firestore Collection: `plans`

```json
{
  "id": "auto-generated",
  "nameEn": "Premium",
  "nameAr": "مميز",
  "price": "499",
  "currency": "EGP",
  "billingPeriodEn": "/ month",
  "billingPeriodAr": "/ شهر",
  "featuresEn": ["Full access to all results", "Real-time signals", "1-on-1 consultation"],
  "featuresAr": ["وصول كامل لجميع النتائج", "توصيات فورية", "استشارة فردية"],
  "whatsappNumber": "+201234567890",
  "whatsappMessageEn": "Hello, I'm interested in the Premium plan.",
  "whatsappMessageAr": "مرحباً، أنا مهتم بالخطة المميزة.",
  "isHighlighted": true,
  "order": 2,
  "isActive": true
}
```

#### New Files

| File | Purpose |
|------|---------|
| `src/components/home/Pricing.jsx` | Public-facing pricing cards section |
| `src/components/admin/PlanModal.jsx` | Add/Edit modal for plans |
| `src/pages/admin/Plans.jsx` | Admin CRUD page for plans |
| `src/services/planService.js` | Firestore CRUD for `plans` collection |
| `src/hooks/usePlans.js` | Fetch plans hook |

#### Admin Dashboard — Plans Management
- Admin can **add, edit, delete** plans
- Editable fields (bilingual EN/AR):
  - Plan name (English + Arabic)
  - Price + currency + billing period (English + Arabic)
  - Features list (English + Arabic, one per line)
  - WhatsApp number (international format, e.g. `+201234567890`)
  - Pre-filled WhatsApp message (English + Arabic)
  - Highlighted/recommended flag (shows a badge)
  - Display order
  - Active toggle
- Plan added to the admin sidebar under a new **"Plans"** nav item

#### Pricing Card Design
- Dark card with gold border on highlighted plan
- Shows: plan name, price, billing period, feature list with ✓ checkmarks
- Gold "Recommended" badge on highlighted plan
- Gold button: **"📱 Subscribe via WhatsApp"** — opens WhatsApp deep link
- WhatsApp link format: `https://wa.me/<whatsappNumber>?text=<urlEncoded message>`
- Message is rendered in the **currently active language** (EN or AR)
- Full RTL support for Arabic

---

### 10.2 Results Blur / Access Gate System

#### Access Levels & Two-Layer UX

Instead of cluttering the homepage, we use a two-layer system:

**Layer 1: Homepage Preview (Free Preview)**
- Shows up to **4 results** per market.
- No blur here. Guests and subscribers see the same preview.
- A **"See All Results →"** button appears if the market has more than 4 results.

**Layer 2: Full-Screen Results Overlay (Gated)**
- Clicking "See All Results" opens a beautiful, full-screen slide-up panel (not a new page).
- Contains the full grid of results with market tabs.
- **For Guests:** The first result is clearly visible, but the remaining results are blurred out with the **Access Gate CTA** overlaying them.
- **For Subscribers:** All results are fully visible.

#### Subscription Check Mechanism

> ⚠️ **No Firebase Auth for public users** — this uses a lightweight, admin-generated token system.

**How it works:**

1. Admin goes to the `Subscribers` page in the dashboard
2. Admin enters the subscriber's **phone number** (WhatsApp number they used to contact)
3. Admin clicks **"Generate Access Token"**
4. System generates a secure random token and stores it in Firestore under a new `subscribers` collection
5. Admin **sends the token to the subscriber via WhatsApp** (token shown in dashboard, easy to copy)
6. Subscriber visits the site, clicks the **"Enter Access Token"** button in the Results section
7. User types in their token → system validates it against Firestore
8. If valid: token is saved to `localStorage` → full results unlock immediately
9. If invalid: error message shown (localized)
10. `localStorage` is checked on every page load — no re-entry needed until they clear storage or token expires

#### Firestore Collection: `subscribers`

```json
{
  "id": "auto-generated",
  "phoneNumber": "+201234567890",
  "token": "ax_7f3b9e2c1a4d",
  "planId": "premium-plan-id",
  "planNameEn": "Premium",
  "isActive": true,
  "expiresAt": "2026-12-31T23:59:59Z",
  "createdAt": "2026-06-01T12:00:00Z",
  "note": "Referred by Instagram"
}
```

#### Token Format
- Prefix: `ax_` (AXIS prefix for branding)
- Random alphanumeric string: 12 characters
- Example: `ax_7f3b9e2c1a4d`
- Admin can revoke any token by setting `isActive: false`
- Optional: `expiresAt` field — if set, token becomes invalid after this date

#### Security Considerations

> ⚠️ **Important:** This system is designed for a **trusted community / WhatsApp-based business model**, not high-security SaaS. The blur is a UX gate, not a cryptographic lock (since all data still comes from Firestore which is publicly readable). If you need stronger security in the future, Firebase Auth for public users + Firestore rules would be the upgrade path.

| Risk | Mitigation |
|------|------------|
| Token guessing | 12-char random alphanumeric = 36^12 combinations — practically impossible to guess |
| Token sharing | Admin can revoke tokens; monitor subscriber count vs. token count |
| Image URLs exposed | Blurred images still load (CSS blur) — if you need server-level blocking, this requires a backend proxy (future enhancement) |
| localStorage clearing | User loses access if they clear browser data — they contact admin for re-entry (acceptable for this model) |

#### New Files for Blur System

| File | Purpose |
|------|---------|
| `src/hooks/useSubscriber.js` | Reads token from `localStorage`, validates against Firestore, returns `{ isSubscribed, loading }` |
| `src/components/public/AccessGate.jsx` | Blurred overlay + token entry modal shown over locked results |
| `src/services/subscriberService.js` | Firestore calls: `validateToken(token)`, `addSubscriber(data)`, `revokeToken(id)` |
| `src/pages/admin/Subscribers.jsx` | Admin CRUD for subscribers — view, add, generate token, revoke |
| `src/components/admin/SubscriberModal.jsx` | Add subscriber modal with auto token generation |

#### PublicResults.jsx — Updated Logic

```
Homepage Preview:
  Show result[0..3] → Always visible (max 4)
  If results.length > 4 → Show "See All Results →" button

Full-Screen Overlay (When "See All Results" clicked):
  Show market filter tabs
  For selected market:
    Show result[0] → Always visible
    Show result[1..n] → Only if isSubscribed === true
                      → Otherwise: render blurred grid with AccessGate overlay covering them

The AccessGate overlay shows:
  - Lock icon 🔐
  - "Premium Content: Subscribe to unlock all trading results" (localized)
  - "🔑 Enter Access Token" button → opens token input modal
  - "📦 View Plans" button → closes overlay and scrolls to Pricing section
```

#### Access Gate & Full-Screen UX Design
- **Full-Screen Overlay:** Slides up smoothly from the bottom. Has a close button (X) and responds to `Esc` key. Keeps the user on the homepage (no routing required).
- **Blurred results:** Uses CSS `filter: blur(12px)` + `pointer-events: none` on the container of locked results.
- **Overlay card:** Covers the blurred content area with a glassmorphism panel.
- Shows: lock icon, localized message, two buttons.
- **Token input modal:** Small inline modal. Has an input field + Submit button + loading state + error state.
- **On success:** Overlay fades out, blurred results transition to clear with a smooth animation.
- **On error:** Shakes the input, shows localized error.

---

### 10.3 Admin Dashboard — Subscribers Management

**Page:** `/admin/subscribers`
**Sidebar Item:** "Subscribers" 👥

#### Table Columns
| Column | Description |
|--------|-------------|
| Phone Number | Subscriber's WhatsApp number |
| Plan | Which plan they subscribed to |
| Token | The generated access token (click to copy) |
| Status | Active / Expired / Revoked |
| Expires At | Expiry date (or "Lifetime") |
| Note | Internal note (e.g. "from IG ad") |
| Actions | Copy Token / Revoke / Delete |

#### Admin Actions
- **Add Subscriber** → Enter phone, select plan, set expiry → token auto-generated
- **Copy Token** → One-click copy to clipboard (to paste into WhatsApp chat)
- **Revoke** → Sets `isActive: false` immediately
- **Delete** → Removes from Firestore
- **Filter** by status (Active / Expired / Revoked)

---

### 10.4 i18n — New Translation Keys

New keys to add in both `en.json` and `ar.json`:

```json
{
  "pricing": {
    "section_title": "Simple, Transparent Pricing",
    "subtitle": "Choose the plan that fits your trading goals.",
    "recommended": "Recommended",
    "per_month": "/ month",
    "subscribe_whatsapp": "Subscribe via WhatsApp",
    "free_trial": "Start Free Trial"
  },
  "access_gate": {
    "locked_title": "Premium Content",
    "locked_desc": "Subscribe to unlock all trading results across every market.",
    "enter_token": "Enter Access Token",
    "view_plans": "View Plans",
    "token_placeholder": "e.g. ax_7f3b9e2c1a4d",
    "token_submit": "Unlock Access",
    "token_loading": "Validating...",
    "token_success": "Access granted! Welcome.",
    "token_error": "Invalid or expired token. Please try again.",
    "token_label": "Access Token"
  },
  "admin": {
    "plans": {
      "title": "Plans Management",
      "add_new": "Add New Plan",
      "edit_plan": "Edit Plan",
      "name": "Plan Name (English)",
      "name_ar": "Plan Name (Arabic)",
      "price": "Price",
      "currency": "Currency",
      "billing_period": "Billing Period (e.g. / month)",
      "billing_period_ar": "Billing Period (Arabic)",
      "features": "Features (English, one per line)",
      "features_ar": "Features (Arabic, one per line)",
      "whatsapp": "WhatsApp Number (+country code)",
      "whatsapp_msg": "Pre-filled WhatsApp Message (English)",
      "whatsapp_msg_ar": "Pre-filled WhatsApp Message (Arabic)",
      "highlighted": "Mark as Recommended",
      "is_active": "Active",
      "order": "Display Order",
      "save": "Save Plan",
      "cancel": "Cancel",
      "delete_confirm": "Are you sure you want to delete this plan?",
      "success_add": "Plan added successfully!",
      "success_edit": "Plan updated successfully!",
      "success_delete": "Plan deleted successfully!"
    },
    "subscribers": {
      "title": "Subscribers Management",
      "add_new": "Add Subscriber",
      "phone": "WhatsApp Phone Number",
      "plan": "Plan",
      "token": "Access Token",
      "status": "Status",
      "expires_at": "Expires At",
      "lifetime": "Lifetime",
      "note": "Internal Note",
      "actions": "Actions",
      "copy_token": "Copy Token",
      "revoke": "Revoke",
      "delete": "Delete",
      "generate_token": "Generate Token",
      "token_copied": "Token copied to clipboard!",
      "revoke_confirm": "Are you sure you want to revoke this token?",
      "delete_confirm": "Are you sure you want to delete this subscriber?",
      "status_active": "Active",
      "status_expired": "Expired",
      "status_revoked": "Revoked",
      "set_expiry": "Set Expiry Date (optional)",
      "no_expiry": "No expiry (lifetime)",
      "success_add": "Subscriber added successfully!",
      "success_revoke": "Token revoked successfully!",
      "success_delete": "Subscriber deleted successfully!"
    }
  }
}
```

---

### 10.5 Firestore Security Rules — Updates Needed

Add these rules alongside existing ones:

```javascript
// Plans — public read, admin write
match /plans/{planId} {
  allow read: if true;
  allow write: if request.auth != null;
}

// Subscribers — admin only (never expose tokens to public)
match /subscribers/{subId} {
  allow read: if request.auth != null;  // Admin only
  allow write: if request.auth != null;
  // Special: allow read for token validation only
  // (See subscriberService.js — query by token field, return only isActive)
}
```

> ⚠️ **Important Firestore Rule Note:** The `subscribers` collection must NOT be publicly readable by default. The token validation query is the one exception — `subscriberService.js` will query by `token` field but the Firestore rule should be carefully scoped. Consider using a Firebase Cloud Function for token validation in the future for higher security.

---

### 10.6 Updated Folder Structure

```
src/
├── components/
│   ├── home/
│   │   └── Pricing.jsx                  # NEW — Public pricing cards section
│   ├── public/
│   │   └── AccessGate.jsx               # NEW — Blur overlay + token input
│   └── admin/
│       ├── PlanModal.jsx                # NEW — Add/Edit plan modal
│       └── SubscriberModal.jsx          # NEW — Add subscriber + show token
├── pages/
│   └── admin/
│       ├── Plans.jsx                    # NEW — Admin plans CRUD page
│       └── Subscribers.jsx              # NEW — Admin subscribers management
├── services/
│   ├── planService.js                   # NEW — Firestore CRUD for plans
│   └── subscriberService.js             # NEW — Firestore CRUD + token validation
└── hooks/
    ├── usePlans.js                      # NEW — Fetch & subscribe to plans
    └── useSubscriber.js                 # NEW — Token validation + localStorage
```

---

### 10.7 Homepage Section Order (Updated)

```
Homepage
  ├── Hero
  ├── About
  ├── Services
  ├── Statistics
  ├── Pricing          ← NEW (Phase 10)
  ├── Results          ← Updated with blur gate (Phase 10)
  └── Contact & Footer
```

---

### Tasks Checklist

#### Firestore & Services
- [ ] Create `plans` collection in Firestore (seed 2-3 default plans)
- [ ] Create `subscribers` collection in Firestore
- [ ] Update Firestore security rules for `plans` and `subscribers`
- [ ] Create `src/services/planService.js` (CRUD)
- [ ] Create `src/services/subscriberService.js` (CRUD + `validateToken(token)`)
- [ ] Create `src/hooks/usePlans.js`
- [ ] Create `src/hooks/useSubscriber.js` (reads localStorage, validates against Firestore)

#### Public — Pricing Section
- [ ] Build `src/components/home/Pricing.jsx` — dynamic plan cards from Firestore
- [ ] Add WhatsApp deep link button to each plan card
- [ ] Support bilingual plan names, prices, features (EN/AR)
- [ ] Add "Recommended" badge logic
- [ ] Add to `Home.jsx` page between Services and Results sections
- [ ] Add translation keys to `en.json` and `ar.json`

#### Public — Access Gate / Blur System
- [ ] Update `src/components/public/PublicResults.jsx`:
  - Show only first result per market for non-subscribers
  - Blur remaining results with `filter: blur(12px)`
  - Render `AccessGate` overlay on blurred results
- [ ] Build `src/components/public/AccessGate.jsx`:
  - Lock icon + localized message
  - "Enter Access Token" button (opens inline modal)
  - "View Plans" button (scrolls to Pricing)
  - Token input modal with validation UX
- [ ] Animate result reveal when token is validated
- [ ] Persist access token in `localStorage`
- [ ] Check access on every page load

#### Admin — Plans Management
- [ ] Build `src/pages/admin/Plans.jsx` — table with Add/Edit/Delete
- [ ] Build `src/components/admin/PlanModal.jsx` — bilingual form
- [ ] Add "Plans" link to AdminLayout sidebar
- [ ] Add translation keys to en.json / ar.json

#### Admin — Subscribers Management
- [ ] Build `src/pages/admin/Subscribers.jsx` — table with all subscriber data
- [ ] Build `src/components/admin/SubscriberModal.jsx`:
  - Phone number input
  - Plan dropdown
  - Optional expiry date picker
  - Internal note field
  - Auto-generate token on submit (prefix `ax_` + 12 random chars)
  - Show generated token with one-click copy
- [ ] Copy token to clipboard action
- [ ] Revoke token action (sets `isActive: false`)
- [ ] Filter by status (Active / Expired / Revoked)
- [ ] Add "Subscribers" link to AdminLayout sidebar
- [ ] Add translation keys to en.json / ar.json

#### Polish
- [ ] Responsive audit for Pricing section (mobile/tablet/desktop)
- [ ] RTL audit for Pricing + AccessGate in Arabic
- [ ] Test full flow: Admin adds subscriber → copies token → user enters token → results unlock
- [ ] Test expiry: expired token should be rejected
- [ ] Test revocation: revoked token should be rejected
- [ ] Build verification: `npm run build` passes

---

### ⚠️ NOTE — WhatsApp Numbers

> When implementing, you will need to supply the **real WhatsApp phone numbers** for each plan (in international format, e.g. `+201234567890`).
> These are stored in Firestore and editable via the admin dashboard — you can enter/change them at any time without code changes.

### ⚠️ NOTE — Firestore Rule for Token Validation

> The current Firestore security design marks `subscribers` as **admin-read-only**.
> For the public token validation query to work without exposing all subscriber data, the `subscriberService.js` will need to query by the `token` field only and return minimal data (`isActive`, `expiresAt`).
> A more secure approach (future upgrade) is to handle token validation in a **Firebase Cloud Function** — but for this phase, client-side validation with restricted Firestore reads is acceptable.

### Deliverable

✅ Public Pricing section with WhatsApp-linked plans + subscriber-gated trading results with admin-managed access tokens.

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
