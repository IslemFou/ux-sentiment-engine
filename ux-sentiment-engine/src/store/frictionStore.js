import { create } from 'zustand';

export const useFrictionStore = create((set, get) => ({
    currentView: 'checkout',
    currentStep: 1,
    interactions: [],
    frustrationScore: 0, // 0 to 100

    setView: (view) => set({ currentView: view }),
    setStep: (step) => set({ currentStep: step }),

    logInteraction: (event) => {
        const { interactions, frustrationScore } = get();
        const newInteractions = [...interactions, event];

        //Basic Analysis Engine: Detect a "Rage Click"
        // (e.g., multiple clicks in the same spot within 500ms)
        let addedFrustration = 0;
        let decayAmount = 0;

        // 1. Fixed Rage Click Detection (Look back relative to the CURRENT event's timestamp)
        const currentTimestamp = event.timestamp;
        const rapidClicksInWindow = newInteractions.filter(i =>
            i.type === 'click' &&
            (currentTimestamp - i.timestamp) <= 500 // Checks past events within a rolling 500ms window
        );

        if (rapidClicksInWindow.length >= 3) {
            addedFrustration += 25; // Big penalty for rage clicking
        } else if (event.type !== 'click') {
            //2.Friction Decay: If they are interacting calmly, decay their stress score slightly
            //Only decay score on non-aggressive events (like normal typing/scrolling)
            // or separate this into a periodic timer later.
            decayAmount = 2;
        }
        // Calculate final score bounds clamped tightly between 0 and 100
        const intermediateScore = frustrationScore + addedFrustration - decayAmount;
        const finalScore = Math.max(0, Math.min(intermediateScore, 100));

        set({
            interactions: newInteractions,
            frustrationScore: finalScore
        });
    },
    resetFrustration: () => set({ frustrationScore: 0 }),
}))