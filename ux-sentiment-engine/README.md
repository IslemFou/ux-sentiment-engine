# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

## The AI slide-out Panel
when frustration hits 40, a panel slides in from the right edge and Claude types a personalized question in real time:

┌─────────────────────────────┐
│                    ┌────────────────┐
│   Checkout form    │ 🤖 AI Assistant│
│                    │                │
│                    │ "We noticed    │
│                    │  you clicked   │
│                    │  the CVV field │
│                    │  several times"│
│                    │                │
│                    │ ○ Option 1     │
│                    │ ○ Option 2     │
│                    │ ○ Option 3     │
└─────────────────────────────┘────────┘
## Milestone 7 — AI Insight Generator
This is the final piece. A button in the analytics dashboard that sends real session data to Claude and gets back 4 prioritized design recommendations rendered as cards.
┌─────────────────────────────────────────────┐
│  [Generate AI Insights]                     │
├─────────────────────────────────────────────┤
│  🔴 CRITICAL  Add CVV tooltip               │
│  Users rage-clicked CVV 4x. Add a '?' icon  │
│  Est. impact: 18% drop-off reduction        │
├─────────────────────────────────────────────┤
│  🟡 HIGH  Clarify expiry format             │
│  ...                                        │
└─────────────────────────────────────────────┘