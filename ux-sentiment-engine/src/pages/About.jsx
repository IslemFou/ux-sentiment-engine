import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const STEPS = [
    {
        badge: 'Research project',
        title: 'Smart UX Sentiment Engine',
        body: 'A practical implementation exploring how AI systems can function as relational agents — capable of reading, structuring, and responding to raw human behavioral signals in real time.',
        quote: '"What does it mean for an algorithm to not just observe human frustration, but to understand its structure — and act on it?"',
        quoteAttr: 'Central research question',

    },
    {
        badge: 'Research context',
        title: 'Where this project sits in the research',
        body: 'This project is a practical artifact of a broader research inquiry into AI systems as relational agents — sitting at the intersection of two research threads.',
        threads: [
            { label: 'Thread 1', title: 'AI as relational agent', body: 'Exploring whether AI can go beyond classification tasks to evaluate, structure, and co-construct meaning from behavioral metrics — not just describe what happened, but participate in the response.' },
            { label: 'Thread 2', title: 'Socio-technical friction', body: 'Evaluating how structural transparency within human-algorithmic feedback loops either enables or disrupts the user\'s ability to understand why the system is responding to them.' },
        ],
    },
    {
        badge: 'The feedback loop',
        title: 'Human-algorithmic feedback loop',
        body: 'The engine implements a five-stage feedback loop. Each stage maps directly to a research concept.',
        stages: [
            { num: 1, title: 'Human behavior', desc: 'Raw mouse events — clicks, hovers, dwell times — unstructured and continuous.' },
            { num: 2, title: 'Signal extraction', desc: 'The tracker converts behavioral noise into typed signals: rage click, hover friction, frustration score. First layer of meaning-making.' },
            { num: 3, title: 'AI interpretation', desc: 'Claude receives the signal with its context — field, step, type. It constructs a question, not a diagnosis. This is the relational act.' },
            { num: 4, title: 'Relational response', desc: 'The user receives a personalized, empathetic question and is invited to co-construct the meaning of their own frustration.' },
            { num: 5, title: 'Structural insight', desc: 'The analytics dashboard makes the entire loop transparent — developer sees what happened, where, and what Claude recommended.' },
        ],
    },
    {
        badge: 'Architecture',
        title: 'From research concept to system design',
        body: 'Each research concept maps to a concrete technical component. The architecture was shaped by the theoretical framing.',
        components: [
            { file: 'useFrictionTracker.js', label: 'Behavioral metrics layer', desc: 'Listens for rage clicks and hover dwell. Converts continuous mouse events into discrete typed signals. Operationalizes signal extraction from behavioral noise.' },
            { file: 'SentimentPanel + Claude', label: 'Relational agent layer', desc: 'Claude receives behavioral context and generates an empathetic question — not an automated alert. The AI invites the user to articulate their frustration rather than labelling it.' },
            { file: 'AnalyticsView + AIInsights', label: 'Structural transparency layer', desc: 'The dashboard makes the entire algorithmic process visible — heatmap, event log, and AI recommendations. Structural transparency means the system\'s decisions are not hidden from those it affects.' },
        ],
    },
    {
        badge: 'Socio-technical frictions',
        title: 'What the project surfaced',
        body: 'Building the engine revealed three categories of socio-technical friction between human users and algorithmic systems.',
        frictions: [
            { icon: '🔍', label: 'Opacity friction', desc: 'Users don\'t know they are being observed. The system watches without consent visibility.', fix: 'Panel footer states "your feedback shapes this UI" — making observation visible at the moment of intervention.' },
            { icon: '⇄', label: 'Asymmetry friction', desc: 'The system accumulates knowledge about the user while the user learns nothing about the system.', fix: 'The analytics dashboard externalizes what the system knows — available to both developer and user-proxy.' },
            { icon: '⏱', label: 'Timing friction', desc: 'Intervention at the wrong moment increases frustration rather than resolving it.', fix: '12-second cooldown between panel triggers prevents the intervention from becoming a new source of friction.' },
        ],
    },
    {
        badge: 'Repository',
        title: 'Explore the implementation',
        body: 'The full source code is open and documented. Each component maps to a research concept.',
    },

]

const sectionStyle = {
    background: '#14141a',
    border: '1px solid rgba(255,255,255,0.08)',
    borderRadius: 12,
    padding: '16px 20px',
    marginBottom: 12,
}

export default function About() {
    const [step, setStep] = useState(0)
    const navigate = useNavigate()
    const total = STEPS.length
    const s = STEPS[step]

    return (
        <div style={{ minHeight: '100vh', background: '#0c0c0f', color: '#f0f0f5', fontFamily: 'Syne, sans-serif', display: 'flex', flexDirection: 'column' }}>

            {/* Header */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 32px', borderBottom: '1px solid rgba(255,255,255,0.08)', background: '#14141a' }}>
                <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', color: '#6c63ff' }}>SentimentUX</div>
                <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                    <a href="https://github.com/IslemFou/ux-sentiment-engine" target="_blank" rel="noopener" style={{ fontSize: 12, fontFamily: 'DM Mono, monospace', color: '#888899', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 6 }}>
                        GitHub ↗
                    </a>
                    <button onClick={() => navigate('/')} style={{ padding: '8px 16px', background: 'rgba(108,99,255,.15)', border: '1px solid rgba(108,99,255,.4)', borderRadius: 8, fontSize: 12, color: '#a09cff', fontFamily: 'DM Mono, monospace', cursor: 'pointer' }}>
                        Launch app →
                    </button>
                </div>
            </div>

            {/* Progress */}
            <div style={{ display: 'flex', gap: 4, padding: '20px 32px 0' }}>
                {Array.from({ length: total }, (_, i) => (
                    <div key={i} onClick={() => setStep(i)} style={{ flex: 1, height: 3, borderRadius: 2, background: i <= step ? '#6c63ff' : 'rgba(255,255,255,0.1)', cursor: 'pointer', transition: 'background .3s' }} />
                ))}
            </div>

            {/* Content */}
            <div style={{ flex: 1, maxWidth: 720, margin: '0 auto', width: '100%', padding: '32px 32px 24px' }}>

                {/* Badge */}
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 11, fontWeight: 600, padding: '4px 12px', borderRadius: 20, background: 'rgba(108,99,255,.15)', color: '#a09cff', letterSpacing: '.04em', marginBottom: 16 }}>
                    {s.badge}
                </div>

                <h1 style={{ fontSize: 26, fontWeight: 700, marginBottom: 12, lineHeight: 1.3 }}>{s.title}</h1>
                <p style={{ fontSize: 14, color: '#888899', lineHeight: 1.8, marginBottom: 20 }}>{s.body}</p>

                {/* STEP 0 — quote + layer cards */}
                {step === 0 && (
                    <>
                        <div style={{ borderLeft: '3px solid #6c63ff', padding: '12px 16px', background: 'rgba(108,99,255,.08)', borderRadius: '0 8px 8px 0', marginBottom: 20 }}>
                            <div style={{ fontSize: 13, fontStyle: 'italic', color: '#c8c4ff', lineHeight: 1.6, marginBottom: 6 }}>{s.quote}</div>
                            <div style={{ fontSize: 11, fontFamily: 'DM Mono, monospace', color: '#888899' }}>{s.quoteAttr}</div>
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 12 }}>
                            {[
                                { title: 'Behavioral detection', desc: 'Translating raw mouse events into structured frustration signals', color: '#6c63ff' },
                                { title: 'AI intervention', desc: 'Claude as a relational agent co-constructing meaning with the user', color: '#00d4aa' },
                                { title: 'Feedback loop', desc: 'Closing the loop between user behavior and design team insight', color: '#f0a500' },
                            ].map(c => (
                                <div key={c.title} style={{ ...sectionStyle, borderLeft: `3px solid ${c.color}`, borderRadius: '0 8px 8px 0', marginBottom: 0 }}>
                                    <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 6 }}>{c.title}</div>
                                    <div style={{ fontSize: 12, color: '#888899', lineHeight: 1.5 }}>{c.desc}</div>
                                </div>
                            ))}
                        </div>
                    </>
                )}

                {/* STEP 1 — threads */}
                {step === 1 && s.threads && (
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 16 }}>
                        {s.threads.map(t => (
                            <div key={t.label} style={sectionStyle}>
                                <div style={{ fontSize: 10, fontFamily: 'DM Mono, monospace', textTransform: 'uppercase', letterSpacing: '.08em', color: '#6c63ff', marginBottom: 6 }}>{t.label}</div>
                                <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 6 }}>{t.title}</div>
                                <div style={{ fontSize: 12, color: '#888899', lineHeight: 1.6 }}>{t.body}</div>
                            </div>
                        ))}
                    </div>
                )}

                {/* STEP 2 — stages */}
                {step === 2 && s.stages && s.stages.map((st, i) => (
                    <div key={i} style={{ display: 'flex', gap: 14, marginBottom: 14, alignItems: 'flex-start' }}>
                        <div style={{ width: 26, height: 26, borderRadius: '50%', background: i < 2 ? 'rgba(108,99,255,.2)' : i < 4 ? 'rgba(0,212,170,.2)' : 'rgba(240,165,0,.2)', color: i < 2 ? '#a09cff' : i < 4 ? '#00d4aa' : '#f0a500', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, flexShrink: 0, marginTop: 2 }}>
                            {st.num}
                        </div>
                        <div>
                            <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 3 }}>{st.title}</div>
                            <div style={{ fontSize: 12, color: '#888899', lineHeight: 1.6 }}>{st.desc}</div>
                        </div>
                    </div>
                ))}

                {/* STEP 3 — components */}
                {step === 3 && s.components && s.components.map((c, i) => (
                    <div key={i} style={sectionStyle}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
                            <div style={{ fontSize: 13, fontWeight: 600 }}>{c.label}</div>
                            <div style={{ fontSize: 10, fontFamily: 'DM Mono, monospace', padding: '3px 10px', borderRadius: 20, background: 'rgba(108,99,255,.12)', color: '#a09cff' }}>{c.file}</div>
                        </div>
                        <div style={{ fontSize: 12, color: '#888899', lineHeight: 1.6 }}>{c.desc}</div>
                    </div>
                ))}

                {/* STEP 4 — frictions */}
                {step === 4 && s.frictions && s.frictions.map((f, i) => (
                    <div key={i} style={{ ...sectionStyle, marginBottom: 12 }}>
                        <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 4 }}>{f.label}</div>
                        <div style={{ fontSize: 12, color: '#888899', lineHeight: 1.6, marginBottom: 8 }}>{f.desc}</div>
                        <div style={{ fontSize: 12, color: '#00d4aa', padding: '8px 12px', background: 'rgba(0,212,170,.08)', borderRadius: 6 }}>
                            Design response: {f.fix}
                        </div>
                    </div>
                ))}

                {/* STEP 5 — repo */}
                {step === 5 && (
                    <div style={{ ...sectionStyle, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16 }}>
                        <div>
                            <div style={{ fontSize: 10, fontFamily: 'DM Mono, monospace', textTransform: 'uppercase', letterSpacing: '.08em', color: '#888899', marginBottom: 4 }}>GitHub repository</div>
                            <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 4 }}>ux-sentiment-engine</div>
                            <div style={{ fontSize: 12, color: '#888899', fontFamily: 'DM Mono, monospace' }}>React · Vite · Zustand · Chart.js · Claude API</div>
                        </div>
                        <a href="https://github.com/IslemFou/ux-sentiment-engine" target="_blank" rel="noopener" style={{ padding: '10px 20px', background: '#6c63ff', color: '#fff', borderRadius: 9, fontSize: 13, fontWeight: 600, textDecoration: 'none', whiteSpace: 'nowrap', flexShrink: 0 }}>
                            View on GitHub ↗
                        </a>
                    </div>
                )}
            </div>

            {/* Footer nav */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 32px', borderTop: '1px solid rgba(255,255,255,0.08)', maxWidth: 720, margin: '0 auto', width: '100%' }}>
                <div style={{ fontSize: 11, fontFamily: 'DM Mono, monospace', color: '#888899' }}>{step + 1} / {total}</div>
                <div style={{ display: 'flex', gap: 10 }}>
                    {step > 0 && (
                        <button onClick={() => setStep(s => s - 1)} style={{ padding: '9px 18px', background: 'transparent', border: '1px solid rgba(255,255,255,0.14)', borderRadius: 8, fontSize: 13, color: '#888899', fontFamily: 'Syne, sans-serif', cursor: 'pointer' }}>
                            ← Back
                        </button>
                    )}
                    {step < total - 1 ? (
                        <button onClick={() => setStep(s => s + 1)} style={{ padding: '9px 18px', background: '#6c63ff', border: 'none', borderRadius: 8, fontSize: 13, fontWeight: 600, color: '#fff', fontFamily: 'Syne, sans-serif', cursor: 'pointer' }}>
                            Next →
                        </button>
                    ) : (
                        <button onClick={() => navigate('/')} style={{ padding: '9px 18px', background: '#00d4aa', border: 'none', borderRadius: 8, fontSize: 13, fontWeight: 600, color: '#000', fontFamily: 'Syne, sans-serif', cursor: 'pointer' }}>
                            Launch app →
                        </button>
                    )}
                </div>
            </div>
        </div>
    )
}