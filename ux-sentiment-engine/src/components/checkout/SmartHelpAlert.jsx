//This component will check the context of what step the user is on and provide context-specific guidance (e.g., helper tips for contact info or alternative payment options if they are struggling with their credit card).
import { useFrictionStore } from '../../store/frictionStore'

export default function SmartHelpAlert() {
    const { currentStep } = useFrictionStore()

    //context-aware help messagin based on where they are stuck
    const getHelpContent = () => {
        switch (currentStep) {
            case 1:
                return {
                    title: "Need help with your details ?",
                    message: "Ensure your email format is correct. We only use this to send your order confirmation and tracking number."
                }
            case 2:
                return {
                    title: "Payment taking a moment?",
                    message: "Double-check your card number and CVC.We also accept PayPal or Apple Pay if your bank card is giving you trouble. "
                }
            case 3:
                return {
                    title: "Almost there!",
                    message: "Review your details above. Clicking 'Complete Order' will safely process your secure transaction."
                }
            default:
                return null
        }
    }
    const content = getHelpContent()
    if (!content) return null
    return (
        <div style={{
            background: 'rgba(108, 99, 255, 0.08)',
            border: '1px dashed rgba(108, 99, 255, 0.3)',
            borderRadius: '8px',
            padding: '16px',
            marginTop: '20px',
            marginBottom: '20px',
            animation: 'fadeIn 0.3s ease-in-out'
        }}>
            <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                <span style={{ fontSize: '18px' }}>💡</span>
                <div>
                    <h4 style={{ margin: '0 0 4px 0', fontSize: '14px', fontWeight: 600, color: '#f0f0f5' }}>
                        {content.title}
                    </h4>
                    <p style={{ margin: 0, fontSize: '13px', color: '#888899', lineHeight: '1.5' }}>
                        {content.message}
                    </p>
                </div>
            </div>
        </div>
    )
}