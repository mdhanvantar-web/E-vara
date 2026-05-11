# E-Vara — Digital Reputation Protector 🛡️

> E-Vara is a modern identity monitoring web app that helps users detect possible misuse of their public digital identity signals and investigate them quickly.

---

## What E-Vara Does

E-Vara combines identity setup, face capture, simulated live monitoring, and structured identity intelligence analysis into one dashboard.

Instead of only showing raw search links, E-Vara now converts search-style results into **clear signal cards** with:
- signal type,
- detected platform,
- confidence score,
- risk level,
- human-readable reason.

This makes triage much faster and easier for users.

---

## Key Features (Current)

### 1) Authentication & Session
- User auth flow for accessing the dashboard.
- Identity data is loaded/saved per user session in the app flow.

### 2) Face Verification Capture (Experimental)
- Camera-based face snapshot capture flow.
- Includes fallback behavior if camera access is unavailable.
- Includes an explicit disclaimer that face verification is experimental.

### 3) Identity Profile Setup
- Capture core identity attributes such as:
  - full name,
  - username,
  - social/profile link,
  - custom keywords.

### 4) Live Monitoring Feed (Simulated)
- Start/stop monitoring mode.
- Rolling alert feed with severity levels (low/medium/high).
- Quick external search links (Google/Bing) for investigation.
- Real-time-style indicator and timestamped alert entries.

### 5) Structured Identity Intelligence Analysis
- Search-result analysis engine classifies each result into:
  - **Verified Platform Match**,
  - **Possible Identity Match**,
  - **Username Similarity Detected**,
  - **Public Mention Detected**.
- Confidence scoring + risk mapping:
  - 80–100: High Risk,
  - 50–79: Medium Risk,
  - 20–49: Low Risk,
  - <20: Ignored.
- URL-based platform detection (e.g., Twitter, Instagram, LinkedIn, Facebook, etc.).
- Deduplication + sorting + top-N limiting for cleaner signals.

### 6) Signal Card UI
- Each signal is rendered as a clear card with:
  - type,
  - platform,
  - confidence,
  - risk,
  - reason,
  - metadata markers,
  - source actions (open/copy link).

### 7) Neon/3D UI Treatment
- Neon ambient background effects.
- Glass-like neon panel styling.
- Lift-on-hover 3D card interactions.
- Neon action button glow styling.

### 8) Dashboard Metrics & History
- Dashboard summary cards for scan and monitoring status.
- Alert history view for review of generated alerts.

---

## Tech Stack

This project is currently built as a **React + Vite + TypeScript** frontend app.

- **Framework/UI**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS + custom design tokens/effects
- **UI primitives/icons**: Radix UI, Lucide React
- **State/data utilities**: React Query (TanStack)
- **Validation/forms**: React Hook Form, Zod
- **Optional backend integration path**: Supabase SDK included

> Note: Some monitoring/intelligence data is intentionally mocked/simulated in the MVP UX.

---

## Project Structure

```text
E-vara/
├── public/
├── src/
│   ├── components/
│   │   ├── FaceScan.tsx
│   │   ├── MonitoringFeed.tsx
│   │   ├── SearchResultsIntelligence.tsx
│   │   ├── IdentityIntelligenceCard.tsx
│   │   └── ...
│   ├── lib/
│   │   ├── identity-analysis.ts
│   │   └── ...
│   ├── pages/
│   │   └── Dashboard.tsx
│   └── ...
├── package.json
└── README.md
```

---

## Getting Started

### Prerequisites
- Node.js 20.x (recommended by project engines)
- npm

### Run locally

```bash
git clone https://github.com/SHAURYASANYAL3/E-vara.git
cd E-vara
npm install
npm run dev
```

### Common scripts

```bash
npm run dev      # start local dev server
npm run build    # create production build
npm run preview  # preview production build locally
npm run lint     # lint project
npm run test     # run tests (if present)
```

---

## Product Notes

- E-Vara is an evolving MVP/prototype.
- Some feeds and detections are simulated to demonstrate UX and workflows.
- Use only on identities and data you are authorized to monitor.

---

## Roadmap Ideas

- Real search-provider integration (backend proxy).
- Persistent alert storage and case management.
- Expanded platform/entity detection rules.
- Better confidence calibration and explainability.
- Optional compliance-focused monitoring modes.

---

## Contributing

Contributions are welcome.

If you want to contribute:
1. Fork the repo.
2. Create a feature branch.
3. Make changes with clear commits.
4. Open a PR with context and screenshots for UI changes.

---

## License

This project is licensed under the MIT License (see `LICENSE`).

---

## Author

- GitHub: [@SHAURYASANYAL3](https://github.com/SHAURYASANYAL3)
- LinkedIn: [Shaurya Sanyal](https://www.linkedin.com/in/shaurya-sanyal-7b57a0382/)
