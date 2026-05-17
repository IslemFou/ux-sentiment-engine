import { useState } from 'react'
import { useFrictionStore } from '../../store/frictionStore'

const SEV_COLOR = {
    critical: '#ff6b6b',
    high: '#f0a500',
    medium: '#6c63ff',
}

export default function AIInsights() {
    const { interactions, frustrationScore, aiTriggers } = useFrictionStore()
    const [insights, setInsights] = useState([])
    const [loading, setLoading] = useState(null)
    const [error, setError] = useState(null)
    const [generated, setGenerated] = useState(false)

    const rageClicks = interactions.filter(i => i.type === 'rage').length
    const hoverFrictions = interactions.filter(i => i.type === 'hover').length

    //Build the hot zones list from real interactions
    const zones = interactions.reduce((acc, i) => {
        if (i.type === 'rage' || i.type === 'hover') {
            acc[i.target] = (acc[i.target] || 0) + 1
        }
        return acc
    }, {})

    const topZones = Object.entries(zones)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5)
        .map(([zone, count]) => `${zone} (${count} events)`)

    const generateInsights = async () => {
        setLoading(true)
        setError(null)
        // ----- start prompt 
        const prompt = `You are a senior UX designer analyzing friction data from a checkout flow.

        Session data:
        - Rage clicks: ${rageClicks}
        - Hover frictions: ${hoverFrictions}
        - Frustration score: ${frustrationScore}%
        - AI panel triggers: ${aiTriggers}
        - Hottest friction zones: ${topZones.length > 0 ? topZones.join(', ') : 'CVV field, card number, expiry date'}

        Generate exactly 4 actionable design recommendations to reduce friction.
        Return ONLY a JSON array, no markdown, no explanation, just the raw array.
        Each object must have exactly these fields:
        - title (max 6 words)
        - severity ("critical" | "high" | "medium")
        - recommendation (2 sentences, specific and actionable)
        - impact (e.g. "Est. 18% drop-off reduction")
        - zone (which UI area this fixes)`
        // -------- end prompt 

        try {
            const response = await fetch('https://api.anthropic.com/v1/messages', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-api-key': import.meta.env.VITE_ANTHROPIC_API_KEY,
                    'anthropic-version': '2023-06-01',
                    'anthropic-dangerous-direct-browser-access': 'true',
                },
                body: JSON.stringify({
                    model: 'claude-haiku-4-5-20251001',
                    max_tokens: 1000,
                    messages: [{ role: 'user', content: prompt }]
                })
            })

            const data = await response.json()
            const text = data.content[0].text
            const clean = text.replace(/```json|```/g, '').trim()
            const parsed = JSON.parse(clean)
            setInsights(parsed)
            setGenerated(true)
        } catch (error) {
            // Fallback mock insights if API unavailable
            setInsights([
                {
                    title: 'Add CVV tooltip explanation',
                    severity: 'critical',
                    recommendation: 'Add a small ? icon next to the CVV field that shows a card image on hover. Users repeatedly clicking this field are confused about where to find the code.',
                    impact: 'Est. 18% drop-off reduction',
                    zone: 'CVV field — Step 2',
                },
                {
                    title: 'Clarify card expiry format',
                    severity: 'high',
                    recommendation: 'Show MM/YY placeholder text and auto-insert the slash after 2 digits. Ambiguous date formats cause significant hesitation on payment forms.',
                    impact: 'Est. 12% faster completion',
                    zone: 'Expiry field — Step 2',
                },
                {
                    title: 'Add inline field validation',
                    severity: 'high',
                    recommendation: 'Show a green checkmark when each field is correctly filled. Instant feedback reduces re-clicking and builds trust during payment.',
                    impact: 'Est. 9% frustration reduction',
                    zone: 'All payment fields — Step 2',
                },
                {
                    title: 'Simplify address to autofill',
                    severity: 'medium',
                    recommendation: 'Integrate a postcode lookup so city auto-fills after entering the postal code. Manual address entry is a known friction point on mobile.',
                    impact: 'Est. 15% mobile improvement',
                    zone: 'Address fields — Step 1',
                },
            ])
            setGenerated(true)
            setError('API unavailable — showing example insights')
        } finally {
            setLoading(false)
        }
    }
    return (
        <div style={{ background: '#14141a', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 12, padding: 20 }}>

            {/* Header */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
                <div>
                    <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 4 }}>AI Design Recommendations</div>
                    <div style={{ fontSize: 11, fontFamily: 'DM Mono', color: '#888899' }}>
                        powered by Claude · based on {interactions.length} events
                    </div>
                </div>
                <button
                    onClick={generateInsights}
                    disabled={loading}
                    style={{
                        padding: '10px 18px',
                        background: loading ? '#1c1c26' : 'rgba(108,99,255,0.15)',
                        border: '1px solid rgba(108,99,255,0.4)',
                        borderRadius: 8, fontSize: 12,
                        fontFamily: 'DM Mono', color: loading ? '#888899' : '#a09cff',
                        cursor: loading ? 'not-allowed' : 'pointer',
                        transition: 'all 0.2s',
                    }}
                >
                    {loading ? 'Analyzing...' : generated ? '↺ Regenerate' : '✦ Generate Insights'}
                </button>
            </div>

            {/* Error notice */}
            {error && (
                <div style={{ fontSize: 11, fontFamily: 'DM Mono', color: '#f0a500', marginBottom: 16, padding: '8px 12px', background: 'rgba(240,165,0,0.08)', borderRadius: 6 }}>
                    ⚠ {error}
                </div>
            )}

            {/* Empty state */}
            {!generated && !loading && (
                <div style={{ textAlign: 'center', padding: '40px 20px', color: '#888899' }}>
                    <div style={{ fontSize: 32, marginBottom: 12 }}>✦</div>
                    <div style={{ fontSize: 13, fontFamily: 'DM Mono' }}>
                        Click "Generate Insights" to analyze friction data
                    </div>
                    <div style={{ fontSize: 11, fontFamily: 'DM Mono', marginTop: 6, color: '#555566' }}>
                        Works best after triggering some friction events
                    </div>
                </div>
            )}

            {/* Loading state */}
            {loading && (
                <div style={{ textAlign: 'center', padding: '40px 20px', color: '#888899' }}>
                    <div style={{ fontSize: 13, fontFamily: 'DM Mono' }}>Analyzing {interactions.length} friction events...</div>
                    <div style={{ marginTop: 16, height: 4, background: 'rgba(255,255,255,0.06)', borderRadius: 2, overflow: 'hidden' }}>
                        <div style={{ height: '100%', width: '60%', background: '#6c63ff', borderRadius: 2, animation: 'slide 1.5s infinite' }} />
                    </div>
                </div>
            )}

            {/* Insight cards */}
            {generated && !loading && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                    {insights.map((ins, i) => (
                        <div
                            key={i}
                            style={{
                                background: '#1c1c26',
                                border: `1px solid ${SEV_COLOR[ins.severity]}33`,
                                borderLeft: `3px solid ${SEV_COLOR[ins.severity]}`,
                                borderRadius: 10, padding: 16,
                            }}
                        >
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8, gap: 12 }}>
                                <div style={{ fontSize: 14, fontWeight: 600 }}>{ins.title}</div>
                                <span style={{
                                    fontSize: 10, fontFamily: 'DM Mono',
                                    padding: '3px 8px', borderRadius: 20,
                                    background: `${SEV_COLOR[ins.severity]}18`,
                                    color: SEV_COLOR[ins.severity],
                                    textTransform: 'uppercase', letterSpacing: '0.06em',
                                    flexShrink: 0,
                                }}>
                                    {ins.severity}
                                </span>
                            </div>
                            <div style={{ fontSize: 11, fontFamily: 'DM Mono', color: '#888899', marginBottom: 8 }}>
                                {ins.zone}
                            </div>
                            <div style={{ fontSize: 13, lineHeight: 1.6, color: 'rgba(240,240,245,0.85)', marginBottom: 10 }}>
                                {ins.recommendation}
                            </div>
                            <div style={{ fontSize: 11, fontFamily: 'DM Mono', color: '#00d4aa', display: 'flex', alignItems: 'center', gap: 6 }}>
                                ↑ {ins.impact}
                            </div>
                        </div>
                    ))}
                </div>
            )}

            <style>{`
                @keyframes slide {
                    0% { transform: translateX(-100%); }
                    100% { transform: translateX(200%); }
                }
            `}</style>
        </div>
    )

}