export default function AnalyticsView() {
    return (
        <div style={{ padding: 40 }}>

            {/* Header */}
            <div style={{ marginBottom: 32 }}>
                <h1 style={{ fontSize: 24, fontWeight: 700, marginBottom: 6 }}>Analytics Dashboard</h1>
                <p style={{ fontSize: 13, fontFamily: 'DM Mono', color: '#888899' }}>
                    Charts and AI insights coming in later milestones
                </p>
            </div>

            {/* Placeholder cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
                {['Rage Clicks', 'Hover Frictions', 'Frustration Score'].map(label => (
                    <div key={label} style={{
                        background: '#14141a',
                        border: '1px solid rgba(255,255,255,0.08)',
                        borderRadius: 12, padding: 24,
                    }}>
                        <div style={{ fontSize: 11, fontFamily: 'DM Mono', textTransform: 'uppercase', letterSpacing: '0.08em', color: '#888899', marginBottom: 10 }}>
                            {label}
                        </div>
                        <div style={{ fontSize: 32, fontWeight: 700, color: '#6c63ff' }}>—</div>
                    </div>
                ))}
            </div>

            {/* Placeholder chart area */}
            <div style={{
                marginTop: 24, background: '#14141a',
                border: '1px dashed rgba(255,255,255,0.08)',
                borderRadius: 12, padding: 40,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
                <div style={{ textAlign: 'center', color: '#888899' }}>
                    <div style={{ fontSize: 32, marginBottom: 12 }}>📊</div>
                    <div style={{ fontSize: 13, fontFamily: 'DM Mono' }}>Heatmap and charts render here — Milestone 10</div>
                </div>
            </div>

        </div>
    )
}