import { useState, useEffect } from 'react';
import { useFrictionStore } from '../store/frictionStore'

const OPTIONS = {
    rage: [
        "I'm not sure what to enter here",
        "The field doesn't seem to be working",
        "I made a mistake and want to fix it",
    ],
    hover: [
        "I need more explanation for this field",
        "I'm not sure if this is required",
        "I'm looking for something specific",
    ],
}

export default function SentimentPanel() {
    const { panelOpen, panelContext, closePanel, resetFrustration } = useFrictionStore()
    const [question, setQuestion] = useState('')
    const [isTyping, setIsTyping] = useState(false)
    const [selected, setSelected] = useState(null)
    const [submitted, setSubmitted] = useState(false)

    //Fetch question from Claude when Panel opens
    useEffect(() => {
        if (!panelOpen || !panelContext) return
        setQuestion('')
        setSelected(null)
        setSubmitted(false)
        fetchQuestion(panelContext)
    }, [panelOpen, panelContext])

    const fetchQuestion = async (context) => {
        setIsTyping(true)

        const prompt = `You are a helpful UX assistant embedded in a checkout form. 
A user just showed frustration signals: they ${context.triggerType === 'rage' ? 'rapidly clicked' : 'hovered a long time over'} the "${context.target}" field.
Write ONE short, empathetic question to understand what's confusing them.
Maximum 20 words. No quotes. Just the question.`
        // --------- API KEY and FETCH -----------------
        try {
            const response = await fetch('https://api.anthropic.com/v1/messages', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-api-key': import.meta.env.VITE_ANTHROPIC_API_KEY, // API key
                    'anthropic-version': '2023-06-01',  // 
                    'anthropic-dangerous-direct-browser-access': 'true',
                    //The anthropic-dangerous-direct-browser-access header is required because you're calling the API directly from the browser instead of through a backend server. Without it the request gets blocked.
                },
                body: JSON.stringify({
                    model: 'claude-sonnet-4-20250514',
                    max_tokens: 100,
                    messages: [{ role: 'user', content: prompt }]
                })
            })

            const data = await response.json()
            const text = data.content[0].text

            //Simulate typing effect
            let i = 0
            setQuestion('')
            const interval = setInterval(() => {
                setQuestion(text.slice(0, i + 1))
                i++
                if (i >= text.length) {
                    clearInterval(interval)
                    setIsTyping(false)
                }
            }, 30)
        } catch (err) {
            //Fallback question if API fails
            setQuestion("Having trouble with this field? Let us know what's confusing.")
            setIsTyping(false)
        }

    }


    const handleSubmit = () => {
        setSubmitted(true)
        setTimeout(() => {
            resetFrustration()
            closePanel()
        }, 1500)
    }


    const options = OPTIONS[panelContext?.triggerType] || OPTIONS.rage

    return (
        <>
            {/* Backdrop */}
            {panelOpen && (
                <div
                    onClick={closePanel}
                    style={{
                        position: 'fixed', inset: 0,
                        background: 'rgba(0,0,0,0.3)',
                        zIndex: 99,
                    }}
                />
            )}

            {/* Panel */}
            <div style={{
                position: 'fixed', top: 0, right: 0,
                width: 380, height: '100vh',
                background: '#14141a',
                borderLeft: '1px solid rgba(255,255,255,0.08)',
                zIndex: 100,
                display: 'flex', flexDirection: 'column',
                transform: panelOpen ? 'translateX(0)' : 'translateX(100%)',
                transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
            }}>

                {/* Header */}
                <div style={{ padding: '24px', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <div>
                            <div style={{ fontSize: 11, fontFamily: 'DM Mono', textTransform: 'uppercase', letterSpacing: '0.08em', color: '#6c63ff', marginBottom: 6, display: 'flex', alignItems: 'center', gap: 6 }}>
                                <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#6c63ff', display: 'inline-block', animation: 'pulse 1.2s infinite' }} />
                                AI UX Assistant
                            </div>
                            <div style={{ fontSize: 16, fontWeight: 700 }}>Having trouble?</div>
                        </div>
                        <button
                            onClick={closePanel}
                            style={{ background: 'none', border: 'none', color: '#888899', fontSize: 20, cursor: 'pointer', padding: '4px 8px' }}
                        >
                            ✕
                        </button>
                    </div>
                </div>

                {/* Body */}
                <div style={{ padding: 24, flex: 1, overflowY: 'auto' }}>

                    {/* Trigger context */}
                    <div style={{ background: 'rgba(255,107,107,0.08)', border: '1px solid rgba(255,107,107,0.2)', borderRadius: 8, padding: '10px 14px', marginBottom: 20, fontSize: 12, fontFamily: 'DM Mono', color: '#ff6b6b' }}>
                        {panelContext?.triggerType === 'rage' ? '⚡ Rapid clicks detected' : '⏱ Long hover detected'} on <strong>{panelContext?.target}</strong>
                    </div>

                    {/* AI Question */}
                    <div style={{ fontSize: 17, fontWeight: 600, lineHeight: 1.5, marginBottom: 24, minHeight: 60 }}>
                        {question}
                        {isTyping && (
                            <span style={{ display: 'inline-block', width: 2, height: 18, background: '#6c63ff', marginLeft: 2, animation: 'blink 0.8s infinite', verticalAlign: 'middle' }} />
                        )}
                    </div>

                    {/* Options */}
                    {!isTyping && !submitted && (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 20 }}>
                            {options.map((opt, i) => (
                                <button
                                    key={i}
                                    onClick={() => setSelected(i)}
                                    style={{
                                        padding: '12px 16px', textAlign: 'left',
                                        background: selected === i ? 'rgba(108,99,255,0.15)' : '#1c1c26',
                                        border: `1px solid ${selected === i ? '#6c63ff' : 'rgba(255,255,255,0.1)'}`,
                                        borderRadius: 10, color: '#f0f0f5',
                                        fontSize: 13, fontFamily: 'Syne, sans-serif',
                                        cursor: 'pointer', transition: 'all 0.15s',
                                    }}
                                >
                                    {opt}
                                </button>
                            ))}
                        </div>
                    )}

                    {/* Submitted state */}
                    {submitted && (
                        <div style={{ textAlign: 'center', padding: '20px 0', color: '#00d4aa' }}>
                            <div style={{ fontSize: 32, marginBottom: 8 }}>✓</div>
                            <div style={{ fontSize: 14, fontWeight: 600 }}>Thanks for the feedback!</div>
                            <div style={{ fontSize: 12, color: '#888899', marginTop: 4, fontFamily: 'DM Mono' }}>Closing panel...</div>
                        </div>
                    )}
                </div>

                {/* Footer */}
                {!submitted && (
                    <div style={{ padding: '16px 24px', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
                        <button
                            onClick={handleSubmit}
                            style={{
                                width: '100%', padding: 12,
                                background: selected !== null ? '#6c63ff' : '#1c1c26',
                                color: selected !== null ? '#fff' : '#888899',
                                border: '1px solid rgba(255,255,255,0.1)',
                                borderRadius: 10, fontSize: 14, fontWeight: 600,
                                fontFamily: 'Syne, sans-serif', cursor: 'pointer',
                                transition: 'all 0.2s',
                            }}
                        >
                            Send feedback & continue →
                        </button>
                        <div style={{ textAlign: 'center', fontSize: 11, fontFamily: 'DM Mono', color: '#888899', marginTop: 10 }}>
                            Powered by Claude · Your feedback shapes this UI
                        </div>
                    </div>
                )}

            </div>

            <style>{`
                @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.3} }
                @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
            `}</style>
        </>
    )

}