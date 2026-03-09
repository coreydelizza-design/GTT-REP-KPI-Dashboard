# Sales KPI Scorecard Dashboard

Interactive sales performance dashboard with 143 reps, 5 tabs, predictive analytics, and light/dark mode.

## Local Development

```bash
npm install
npm run dev
```

Opens at `http://localhost:3000`

## Deploy to Railway

### Option 1: GitHub Integration (Recommended)

1. Push this repo to GitHub
2. Go to [railway.app](https://railway.app) → New Project → Deploy from GitHub Repo
3. Select your repo — Railway auto-detects the config
4. Deploy triggers automatically. Done.

### Option 2: Railway CLI

```bash
npm install -g @railway/cli
railway login
railway init
railway up
```

## Production Build

```bash
npm run build    # Builds to dist/
npm start        # Serves dist/ via Express on PORT
```

## Stack

- **React 18** + **Vite 5** — frontend
- **Recharts** — charts and visualizations
- **Express** — production static server
- **Railway** — hosting (auto-scales, zero config)

## Dashboard Tabs

| Tab | Description |
|-----|-------------|
| Overview | Org-level KPIs, tier distribution, pipeline matrix, health breakdown, top/bottom 10 |
| Teams | 34 teams with gauge rings, expandable rep chips |
| Rep Detail | Expandable cards per rep with full KPI breakdown, behavior scoring, projections |
| Predictive Analytics | 90/120/180-day forecasts, risk scoring, trajectory classification, sortable table |
| Methodology | Complete scoring formulas, thresholds, risk model, tier definitions |

## Monthly Data Updates

Click **↑ Upload** in the header to load a new Sales Scorecard Excel file. The dashboard parses the "By Rep Scoring" tab client-side and refreshes all metrics instantly.

**Requirements for the uploaded file:**
- Excel format (.xlsx or .xls)
- Must contain a sheet with "By Rep" in its name (or uses the first sheet)
- Header row must include "Sales Rep" as a column name
- Expected columns: Sales Rep, Tenure, Hunter for Scoring, Division, Sales Region, Sales Team, Score Range, YTD % Quota Sales Total, Current Month Quota, Funnel Adds %, Funnel Adds Score, 180 Day Total Funnel, 180 Day Funnel %, 180 Day Score, % Quota Sales Total, Last 12 months Quota Sales Total Score, Completed Activities YTD Score, % 2025 TBR Target Achievement, TBR Results Score, Total Score, Quintile Global, Quintile Americas, Quintile Europe

All derived metrics (Close Rate, Funnel Health, Forecasts, Risk Score, Coverage Days, Trajectories) are automatically recalculated from the uploaded data. Click **Reset** to revert to the embedded default dataset.

No data is sent to any server — all parsing happens in the browser.
