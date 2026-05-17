# UX Sentiment Engine 🧠⚡

An adaptive, telemetry-driven multi-step checkout wizard that monitors real-time user behavior, quantifies interaction friction (stress levels), and injects context-aware inline micro-interventions to minimize cart abandonment.

---

## 🚀 Features

- **Contextual Multi-Step Flow:** A seamless, unified checkout pipeline split across three logical checkpoints: `Contact Info` → `Payment Details` → `Review & Submit`.
- **Zustand Telemetry Stream:** A unified global state store capturing layout positions, current progression indices, and event tracking signatures.
- **Rolling Stress Analytics:** An inline heuristic algorithm tracking interaction frequency thresholds within a rolling 500ms matrix to isolate "rage clicks."
- **Friction Decay System:** An automated cooling mechanic that lowers the active frustration score when user inputs normalize or transition away from aggressive click events.
- **Inline Smart-Help Alerts:** A non-intrusive, context-aware assistance layout that surfaces tailored layout hints based precisely on the form view where user stress spiked.

---

## 📂 Architecture & File Structure

The project separates state mechanics from styling interfaces using an atomic file structure layout:

```text
src/
├── components/
│   ├── checkout/
│   │   ├── Field.jsx           # Reusable controlled input wrapper
│   │   ├── StepContact.jsx     # Step 1: User metadata & capture fields
│   │   ├── StepIndicator.jsx   # Visual progression state block
│   │   ├── StepPayment.jsx     # Step 2: Payment forms & processing
│   │   ├── StepReview.jsx      # Step 3: Confirmation summary view
│   │   └── SmartHelpAlert.jsx  # Inline automated assistance module
│   └── CheckoutView.jsx        # Parent container & telemetry interceptor
│
└── store/
    └── frictionStore.js        # Core Zustand logic, heuristics, & decay engine
```
--- 

## ⚙️ How the Engine Works
1. Telemetry CaptureThe parent wrapper CheckoutView.jsx attaches an event listener hook to its active viewport scope using a React useRef reference. Every interaction is mapped to a structured object:JavaScript{
  type: e.type,
  target: e.target.tagName,
  step: currentStep,
  timestamp: Date.now()
}
2. Heuristic Scoring & WindowingInside frictionStore.js, the engine monitors incoming clicks against previous history using rolling relative windows. If the click counts within a $500\text{ms}$ range cross the critical threshold ($\ge 3$), a localized stress penalty ($+25$) is stacked against the global frustrationScore.3. Smart InterventionsWhen the telemetry store calculates an absolute frustrationScore >= 40, an interactive inline conditional layout opens:Step 1 Stress: Tips outlining formatting structures and security usage constraints.Step 2 Stress: Inline alternate processor routes (e.g., Apple Pay, PayPal hints) to guide users through processing failures.🛠️ Installation & SetupClone the repository:Bashgit clone [https://github.com/your-username/ux-sentiment-engine.git](https://github.com/your-username/ux-sentiment-engine.git)
cd ux-sentiment-engine
Install dependencies:Bashnpm install zustand
# or
yarn add zustand
Run the local development server:Bashnpm run dev


---

## 🔮 Roadmap / Next Milestones

- [x] **Milestone 3:** Core step views structure and step management mapping.
- [x] **Milestone 4:** Global telemetry interceptors and event windowing routines.
- [x] **Milestone 5:** Contextual inline micro-interventions using responsive assistance layouts.
- [ ] **Milestone 6:** Analytics dashboard to visualize historical interaction drop-off