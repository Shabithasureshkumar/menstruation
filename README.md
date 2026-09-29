# Cycle Tracker (frontend)

React 19 + TypeScript + Vite + Tailwind CSS 3.

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # tsc -b && vite build
npm run lint     # oxlint
```

## Demo build: data storage

There is no backend yet. Every service uses a **local demo adapter**:

- Daily logs, medications and settings are stored in this browser's `localStorage`
  (`cycleTracker.dailyLogs`, `cycleTracker.medications`, `cycleTracker.settings`,
  versioned as `{ version: 1, data }`). This is **plain text and not encrypted**. Do not use it for
  real patient data.
- Patient and clinician identity come from `src/mocks/demoIdentity.ts` and are shown with a
  "Demo data" badge.
- Cycle day, phase and predictions are estimated by `src/services/cycle/localCycleEngine.ts`
  from the last period date, cycle length and period length in Settings. Nothing is shown
  until a last period date is entered.
- The Cycle Assistant is a rule-based demo (`src/services/api/assistantApi.ts`), not an AI model.

Stored data is validated when it's read. Corrupted or outdated keys are cleared individually,
and the app falls back to empty defaults instead of crashing.

## Routing

`/overview`, `/calendar`, `/daily-log`, `/insights`, `/settings` (History API; see `src/lib/router.ts`).
Production hosting must serve `index.html` for these paths (SPA fallback).

## Architecture

```
Component  →  hook (src/hooks)  →  provider (src/context)  →  service contract (src/services/api)  →  local adapter today / HTTP later
```

| Area        | Hook              | Service contract         | Future endpoint(s)                                   |
|-------------|-------------------|--------------------------|------------------------------------------------------|
| Identity    | `usePatient`      | `patientApi.ts`          | `GET /me`, `GET /patients/{id}`                      |
| Settings    | `useSettings`     | `settingsApi.ts`         | `GET/PUT /settings`                                  |
| Daily logs  | `useDailyLog`     | `dailyLogApi.ts`         | `GET /daily-logs`, `PUT/DELETE /daily-logs/{date}`   |
| Medications | `useDailyLog`     | `medicationApi.ts`       | `GET/POST /medications`, `PATCH/DELETE /medications/{id}` |
| Cycle       | `useCycle`        | `cycleApi.ts`            | `GET /cycle/current`, `GET /cycle/predictions`       |
| Insights    | `useInsights`     | `insightsApi.ts`         | `GET /insights`                                      |
| Assistant   | (modal)           | `assistantApi.ts`        | `POST /assistant/messages`                           |

To connect the backend, implement each contract with `apiRequest` from
`src/services/api/client.ts` and switch the exported instance (for example `dailyLogApi`).
Components don't call `fetch` directly.

Conventions:

- Dates are `YYYY-MM-DD` date-only strings in the user's local time zone (`src/lib/date.ts`).
  Never use `new Date('YYYY-MM-DD')`.
- Times are `HH:mm` (24h).
- `null` means "not recorded". New logs are empty, never pre-filled.
- Only non-secret config (e.g. `VITE_API_BASE_URL`) may use `VITE_*` variables. They are public.
