import { create } from 'zustand'

export const useFrictionStore = create((set, get) => ({
    currentView: 'checkout',
    currentStep: 1,
    interactions: [],
    frustrationScore: 0,

    setView: (view) => set({ currentView: view }),
    setStep: (step) => set({ currentStep: step }),

    logInteraction: (event) => {
        // console.log('🔴 store logInteraction called:', event.type)
        const { interactions, frustrationScore } = get()
        // console.log('store received:', event.type, '| current score:', frustrationScore)
        const newInteractions = [...interactions, event]

        let addedFrustration = 0
        let decayAmount = 0

        if (event.type === 'rage') {
            addedFrustration = 25
        } else if (event.type === 'hover') {
            addedFrustration = 10
        } else {
            decayAmount = 2
        }

        const finalScore = Math.max(0, Math.min(frustrationScore + addedFrustration - decayAmount, 100))

        set({
            interactions: newInteractions,
            frustrationScore: finalScore,
        })
    },

    resetFrustration: () => set({ frustrationScore: 0 }),
}))