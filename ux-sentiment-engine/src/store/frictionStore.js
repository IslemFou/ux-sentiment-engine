import { create } from 'zustand';

export const useFrictionStore = create((set, get) => ({
    currentStep: 1,
    interactions: [],
    frustrationScore: 0, // 0 to 100

    setStep: (step) => set({ currentStep: step }),

    logInteraction: (event) => {
        const { interactions, frustrationScore } = get();
        const newInteractions = [...interactions, event];

        //Basic Analysis Engine: Detect a "Rage Click"
        // (e.g., multiple clicks in the same spot within 500ms)
        let addedFrustration = 0;
        const recentClicks = newInteractions.filter(i =>
            i.type === 'click' && (Date.now() - i.timestamp) < 500
        );

        if (recentClicks.length > 3) {
            addedFrustration += 20; // Big penalty for rage clicking
        }

        set({
            interactions: newInteractions,
            frustrationScore: Math.min(frustrationScore + addedFrustration, 100)
        });
    }
}))