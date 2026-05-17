# Smart UX Sentiment Engine

A real-time friction detection system that watches how users behave, identifies frustration patterns, and uses AI to intervene with personalized help — then surfaces everything in an analytics dashboard for developers.

![Tech Stack](https://img.shields.io/badge/React-18-61dafb?style=flat&logo=react)
![Vite](https://img.shields.io/badge/Vite-5-646cff?style=flat&logo=vite)
![Zustand](https://img.shields.io/badge/Zustand-state-orange?style=flat)
![Claude](https://img.shields.io/badge/Claude-AI-6c63ff?style=flat)
![Chart.js](https://img.shields.io/badge/Chart.js-analytics-ff6384?style=flat)

---

## What it does

```
[User rage-clicks / hover-dwells on form]
              ↓
[Friction Tracker detects the pattern]
              ↓
[Frustration score updates in real time]
              ↓
[AI panel slides in — Claude types a personalized question]
              ↓
[User submits feedback — frustration resets]
              ↓
[Analytics dashboard captures everything]
              ↓
[Generate AI Insights → Claude returns 4 design recommendations]
```

---

## Features

### 🔴 Rage Click Detection
Detects when a user clicks the same element 3+ times within a 2-second window — a reliable signal of confusion or frustration.

### 🟡 Hover Dwell Detection
Detects when a user's mouse lingers on a field for 2.5+ seconds without interacting — signals hesitation or uncertainty.

### 🤖 AI Slide-out Panel
When frustration crosses a threshold, an animated panel slides in from the right. Claude generates a personalized, empathetic question based on exactly what the user was doing — with multiple-choice response options.

### 📊 Analytics Dashboard
- Live metric cards (rage clicks, hover frictions, frustration score, AI triggers)
- Friction timeline chart (7-day view)
- Friction by checkout step (bar chart)
- Frustration heatmap (10×8 grid, hot zones glow red)

### ✦ AI Insight Generator
One button sends all session friction data to Claude and returns 4 prioritized design recommendations — each with severity level, affected zone, actionable fix, and estimated impact.

---

## Architecture

```
src/
├── components/
│   ├── Sidebar.jsx              ← navigation + live stats
│   ├── CheckoutView.jsx         ← mock 3-step checkout form
│   ├── AnalyticsView.jsx        ← dashboard layout
│   ├── SentimentPanel.jsx       ← AI slide-out panel
│   ├── checkout/
│   │   ├── StepIndicator.jsx
│   │   ├── StepContact.jsx
│   │   ├── StepPayment.jsx
│   │   ├── StepReview.jsx
│   │   ├── Field.jsx
│   │   └── SmartHelpAlert.jsx   ← inline help at frustration >= 40%
│   └── analytics/
│       ├── MetricCard.jsx
│       ├── TimelineChart.jsx
│       ├── StepsChart.jsx
│       ├── FrictionHeatmap.jsx
│       └── AIInsights.jsx       ← Claude API integration
├── hooks/
│   └── useFrictionTracker.js    ← rage click + hover dwell engine
├── store/
│   └── frictionStore.js         ← Zustand global state
├── lib/
│   └── chartSetup.js            ← Chart.js registration
└── App.jsx
```

### How the friction tracker works

The `useFrictionTracker` hook attaches event listeners to the checkout form container. It maintains two registries:

**Click registry** — tracks click counts per element within a rolling 2-second window. When the same element reaches 3 clicks, it fires a `rage` event to the store.

**Hover timers** — starts a 2.5-second countdown on `mouseover`. If the mouse leaves before the timer fires, the countdown clears. If it completes, it fires a `hover` event to the store.

The store calls `useFrictionStore.getState()` directly from the hook to avoid React stale closure issues — this ensures the hook always writes to the live store instance.

### How the AI panel works

When frustration crosses 40%, `openPanel()` fires with context about what triggered it (field ID + trigger type). The `SentimentPanel` component calls the Anthropic API with a prompt that includes this context, then streams the response character by character using `setInterval` — creating a realistic typing effect.

### How AI insights work

The `AIInsights` component aggregates real session data from the store (rage clicks, hover frictions, frustration score, top friction zones by field ID) and sends it to Claude with a structured prompt requesting a JSON array of 4 recommendations. The response is parsed and rendered as severity-coded cards.

---

## How this applies to real websites

This project simulates a single checkout flow. In production, you'd deploy the friction tracker as a standalone script companies paste into their site — exactly like Google Analytics or Hotjar:

```html
<!-- Company adds this one line to their site -->
<script src="https://yourplatform.com/tracker.js" data-site-id="acme-corp"></script>
```

The tracker runs invisibly in visitors' browsers, sends friction events to your backend, and companies log into your analytics dashboard to see their heatmaps and AI recommendations — filtered by their site ID.

---

## Tech stack

| Tool | Purpose |
|------|---------|
| React 18 + Vite | UI framework + dev server |
| Zustand | Global state management |
| Chart.js + react-chartjs-2 | Analytics charts |
| Anthropic Claude API | AI questions + design insights |
| Vanilla CSS-in-JS | Styling (no CSS framework needed) |

---

## Getting started

### Prerequisites
- Node.js 18+
- An Anthropic API key (get one at [console.anthropic.com](https://console.anthropic.com))

### Installation

```bash
git clone https://github.com/IslemFou/ux-sentiment-engine.git
cd ux-sentiment-engine
npm install
```

### Environment setup

Create `.env.local` at the project root:

```
VITE_ANTHROPIC_API_KEY=your_key_here
```

> The app works without an API key — it falls back to hardcoded questions and example insights. Add a key to unlock the real Claude integration.

### Run locally

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

---

## Usage

**Testing rage click detection**
Click any form field 3 times rapidly. Watch the sidebar frustration score jump and the AI panel slide in.

**Testing hover dwell detection**
Move your mouse over a form field label and hold still for 2.5 seconds. The hover friction counter increments.

**Testing the AI panel**
Either trigger friction naturally or keep clicking until frustration hits 40%. The panel slides in, Claude types a personalized question, select an option and submit to reset.

**Viewing analytics**
Click "Analytics" in the sidebar after generating some friction events. All charts and the heatmap update with your live session data.

**Generating AI insights**
In the Analytics view, click "✦ Generate Insights". Claude analyzes your session data and returns 4 prioritized design recommendations.

---

## Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for full Vercel deployment instructions.

---

## Design decisions

**Why `useFrictionStore.getState()` in the hook instead of `useFrictionStore()`?**
React hooks inside `useEffect` capture their dependencies at mount time. If `logInteraction` were captured as a closure, it would reference a stale version of the store. Calling `getState()` directly always reads the current live state, bypassing the closure entirely.

**Why Zustand over Context?**
Multiple unrelated components (Sidebar, CheckoutView, SentimentPanel, AnalyticsView) all need to read and write the same state. Context would require wrapping the entire tree and cause unnecessary re-renders. Zustand's subscription model re-renders only components that read the specific state that changed.

**Why a frustration score (0–100) instead of a boolean flag?**
A continuous score enables future features — different intervention thresholds for different contexts, decay over time as users calm down, weighted events (rage click on payment field = more frustration than rage click on search bar).

---

## License

MIT
