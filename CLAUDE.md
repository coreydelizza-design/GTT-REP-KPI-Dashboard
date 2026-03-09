# CLAUDE.md — GTT REP KPI Dashboard

## Project Overview

A client-side React dashboard for visualizing sales rep KPIs, team performance, and predictive analytics for GTT. The app is a single-page application with embedded default data, optional Excel upload for monthly updates, and full client-side data transformation — no backend API.

**Repository:** https://github.com/coreydelizza-design/GTT-REP-KPI-Dashboard.git

---

## Tech Stack

| Layer        | Technology           |
|-------------|----------------------|
| Framework   | React 18.2           |
| Build       | Vite 5.0             |
| Charts      | Recharts 2.10        |
| Excel I/O   | XLSX (SheetJS) 0.18  |
| Server      | Express 4.18 (production static serving) |
| Deployment  | Railway (NIXPACKS)   |

**No testing framework, linter, or formatter is configured.**

---

## Quick Start

```bash
npm install
npm run dev       # Dev server on http://localhost:3000
npm run build     # Production build to dist/
npm start         # Serve production build via Express
```

---

## Project Structure

```
/
├── index.html          # HTML entry point (includes global CSS reset)
├── package.json        # Dependencies & scripts (type: "module")
├── vite.config.js      # Vite config (port 3000, no sourcemaps in build)
├── server.js           # Express server — serves dist/ with SPA fallback
├── railway.json        # Railway deployment config
├── README.md           # User-facing documentation
├── CLAUDE.md           # This file — AI assistant guide
└── src/
    ├── main.jsx        # React root mount (StrictMode)
    └── Dashboard.jsx   # Entire application (~290 lines, compact)
```

### Key: `src/Dashboard.jsx`

This is the **single monolithic component** containing all UI, logic, data, and styling. It includes:

- **Theme system** — `DARK` / `LITE` color constant objects, toggled via `mode` state
- **Embedded default dataset** — `_TM` (34 teams array) and `_D` (143 reps array)
- **Excel parsing** — `parseExcel()` / `decode()` for client-side XLSX ingestion
- **Sub-components** defined inline — `Stat`, `Ring`, `Pill`, `PB` (progress bar), `SH` (section header)
- **5 dashboard tabs**: Overview, Teams, Rep Detail, Predictive Analytics, Methodology
- **Filtering/sorting** — by division, team, rep name

---

## Architecture & Patterns

### State Management
- Local `useState` only — no Redux, Zustand, or Context
- `useMemo` for derived/computed values
- `useRef` for file input element

### Styling
- **Inline CSS-in-JS** via `style={{...}}` objects throughout
- No CSS files, no CSS modules, no Tailwind
- Theme colors applied inline from `DARK`/`LITE` objects

### Data Model

Rep objects use short property names for compactness:

```
n   → name              tm  → team
t   → tenure            sr  → score range
h   → hunter status     mq  → monthly quota
d   → division          yq  → YTD % quota
fp  → funnel adds %     cr  → close rate
fh  → funnel health     nf  → 90-day forecast
nf120 → 120-day forecast  nf180 → 180-day forecast
risk → risk score (0-100)  dcov → coverage days
sc  → total score       qg  → quintile global
```

### Data Flow
1. Default data embedded as constants (`_TM`, `_D`)
2. User can upload Excel → parsed client-side with XLSX library
3. `decode()` maps Excel columns to internal rep objects
4. All aggregation/filtering computed in-component with `useMemo`

---

## Code Conventions

### Naming
- **Short/abbreviated** variable names: `divF` (division filter), `tmF` (team filter), `sch` (search), `sel` (selected), `bS` (bar sort)
- Constants prefixed with underscore: `_TM`, `_D`
- CamelCase for functions: `parseExcel`, `handleUpload`

### Code Style
- Compact/dense formatting — minimal whitespace
- ES module syntax (`import`/`export default`)
- No TypeScript (despite `@types/react` in deps)
- No semicolons in some places, inconsistent formatting

### When Making Changes
- Preserve the compact code style — do not reformat or prettify the entire file
- Keep inline styles consistent with existing patterns (use theme object colors)
- Maintain short property names in data structures
- New sub-components should follow the inline function pattern (e.g., `const Stat = ({...}) => (...)`)
- All data transformation should remain client-side

---

## Build & Deployment

### Vite Config (`vite.config.js`)
- React plugin via `@vitejs/plugin-react`
- Dev server: port 3000
- Build output: `dist/`
- Source maps: disabled in production

### Production Server (`server.js`)
- Express serves `dist/` as static files
- SPA fallback: all routes → `dist/index.html`
- Port from `process.env.PORT` (default 3000)

### Railway (`railway.json`)
- Builder: NIXPACKS
- Build: `npm install && npm run build`
- Start: `npm start`
- Restart policy: ON_FAILURE (max 10 retries)

---

## Common Tasks

### Add a new KPI metric
1. Add the property to the rep data model in `_D` and `decode()` mapping
2. Add visualization in the relevant tab section of `Dashboard.jsx`
3. If scoring-related, update the Methodology tab documentation

### Add a new dashboard tab
1. Add tab name to the tabs array in Dashboard
2. Add conditional rendering block for the new tab content
3. Follow existing tab patterns for layout (CSS Grid, inline styles)

### Update theme colors
Modify the `DARK` and/or `LITE` constant objects at the top of `Dashboard.jsx`

### Support new Excel column mappings
Update the `decode()` function and column index mapping in `parseExcel()`

---

## Known Limitations
- No tests — changes should be manually verified in browser
- No linting — be careful with syntax
- Monolithic single-file architecture — `Dashboard.jsx` contains everything
- No TypeScript enforcement despite type definitions in deps
- All data lives client-side — no persistence between sessions (except re-upload)
