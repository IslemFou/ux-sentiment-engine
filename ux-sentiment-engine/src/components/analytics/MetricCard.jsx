export default function MetricCard({ label, value, color, delta }) {
    return (
        <div style={{
            background: '#14141a',
            border: '1px solid rgba(255,255,255,0.08)',
            borderTop: `2px solid ${color}`,
            borderRadius: 12, padding: 20,
        }}>
            <div style={{ fontSize: 11, fontFamily: 'DM Mono', textTransform: 'uppercase', letterSpacing: '0.08em', color: '#888899', marginBottom: 10 }}>
                {label}
            </div>
            <div style={{ fontSize: 32, fontWeight: 700, lineHeight: 1, marginBottom: 6, color: '#f0f0f5' }}>
                {value}
            </div>
            {delta && (
                <div style={{ fontSize: 11, fontFamily: 'DM Mono', color }}>
                    {delta}
                </div>
            )}
        </div>
    )
}