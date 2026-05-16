import { useRef } from 'react' // Added useEffect for Milestone 4 tracking
import { useFrictionStore } from '../store/frictionStore'
import { useFrictionTracker } from '../hooks/useFrictionTracker'
import StepIndicator from './checkout/StepIndicator'
import StepContact from './checkout/StepContact'
import StepPayment from './checkout/StepPayment'
import StepReview from './checkout/StepReview'
//Injecting SmartHelpAlert to display this helper alert whenever the engine senses the user's frustration crosses a threshold (let's say a frustrationScore of 40 or higher).
import SmartHelpAlert from './checkout/SmartHelpAlert'

export default function CheckoutView() {
    const containerRef = useRef(null)

    // Milestone 4: Destructure step state, frustration metrics, and tracking handlers
    const { currentStep, setStep, frustrationScore, logInteraction } = useFrictionStore()

    // Milestone 4: Wire the UX sentiment engine tracking listeners to the form container
    // useEffect(() => {
    //     const container = containerRef.current
    //     if (!container || !logInteraction) return

    //     const handleInteraction = (e) => {
    //         // Logs interactions within the container to feed your stress heuristics algorithm
    //         logInteraction({
    //             type: e.type,
    //             target: e.target.tagName,
    //             step: currentStep,
    //             timestamp: Date.now()
    //         })
    //     }

    //     // Capture user events inside the target DOM workspace
    //     container.addEventListener('click', handleInteraction)
    //     return () => {
    //         // Always clean up event listeners to prevent performance memory leaks
    //         container.removeEventListener('click', handleInteraction)
    //     }
    // }, [currentStep, logInteraction])

    //------------------------- replacing useEffect by :

    useFrictionTracker(containerRef)

    return (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', minHeight: '100vh' }}>

            {/* Form area — ref attached, tracker monitors user friction events inside this scope */}
            <div ref={containerRef} style={{ padding: '40px 40px', position: 'relative' }}>

                {/* Visual indicator of current engine stress levels (Optional debugging element) */}
                {frustrationScore > 0 && (
                    <div style={{ position: 'absolute', top: 10, right: 40, fontSize: 11, color: '#ff6b6b', fontFamily: 'DM Mono' }}>
                        Engine Stress: {frustrationScore}%
                    </div>
                )}

                <StepIndicator currentStep={currentStep} />
                {/* 2. Inline Intervention: Appears directly inside the form workflow if they are struggling */}
                {frustrationScore >= 40 && <SmartHelpAlert />}
                {currentStep === 1 && <StepContact onNext={() => setStep(2)} />}
                {currentStep === 2 && <StepPayment onNext={() => setStep(3)} onBack={() => setStep(1)} />}
                {currentStep === 3 && <StepReview onBack={() => setStep(2)} />}
            </div>

            {/* Order sidebar */}
            <div style={{ background: '#14141a', borderLeft: '1px solid rgba(255,255,255,0.08)', padding: 32 }}>
                <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 20 }}>Your order</div>
                <div style={{ display: 'flex', gap: 14, alignItems: 'center', marginBottom: 20 }}>
                    <div style={{ width: 48, height: 48, borderRadius: 8, background: 'rgba(108,99,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 }}>🎧</div>
                    <div>
                        <div style={{ fontSize: 13, fontWeight: 600 }}>AuralPro Max</div>
                        <div style={{ fontSize: 12, color: '#888899', fontFamily: 'DM Mono' }}>Midnight Black</div>
                    </div>
                    <div style={{ marginLeft: 'auto', fontSize: 14, fontFamily: 'DM Mono', fontWeight: 600 }}>€299</div>
                </div>
                <div style={{ height: 1, background: 'rgba(255,255,255,0.08)', marginBottom: 16 }} />
                <div style={{ fontSize: 13, fontFamily: 'DM Mono', color: '#888899', lineHeight: 2.2 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>Subtotal</span><span>€299.00</span></div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>VAT 20%</span><span>€59.80</span></div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', color: '#f0f0f5', fontWeight: 700, fontSize: 15, marginTop: 4 }}><span>Total</span><span style={{ color: '#6c63ff' }}>€358.80</span></div>
                </div>
            </div>

        </div>
    )
}