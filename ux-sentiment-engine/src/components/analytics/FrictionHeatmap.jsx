const COLS = 10
const ROWS = 8

//Pre-seeded hot zones around payment fields
const HOT_ZONES = [12, 13, 22, 23, 32, 33, 34, 43, 44, 53, 54, 63, 64, 73, 74, 75]

function getIntensity(index, interactions) {
    const isHot = HOT_ZONES.includes(index)
    const isNear = HOT_ZONES.some(z => Math.abs(z - index) <= 2)
    const liveCount = interactions.filter(i => i.type === 'rage' || i.type === 'hover').length

    let base = isHot ? 0.5 : isNear ? 0.2 : 0.05
    //Boost hot zones with live data
    if (isHot && liveCount > 0) base = Math.min(1, base + liveCount * 0.05)
    return base
}

export default function FrictionHeatmap({ interactions }) {
    const cells = Array.from({ length: COLS * ROWS }, (_, i) => i)

    return (
        <div style={{ background: '#14141a', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 12, padding: 20, marginBottom: 24 }}>
            <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 4 }}>Frustration heatmap</div>
            <div style={{ fontSize: 11, fontFamily: 'DM Mono', color: '#888899', marginBottom: 16 }}>
                10×8 grid · darker red = higher friction
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: `repeat(${COLS}, 1fr)`, gap: 3 }}>
                {cells.map(i => {
                    const intensity = getIntensity(i, interactions)
                    return (
                        <div
                            key={i}
                            title={`Zone ${i} · intensity ${Math.round(intensity * 100)}%`}
                            style={{
                                aspectRatio: '1',
                                borderRadius: 3,
                                background: `rgba(255, ${Math.round(107 * (1 - intensity))}, ${Math.round(107 * (1 - intensity))}, ${Math.min(1, intensity + 0.08)})`,
                                transition: 'background 0.4s ease',
                                cursor: 'pointer',
                            }}
                        />
                    )
                })}
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 12, fontSize: 11, fontFamily: 'DM Mono', color: '#888899' }}>
                <span>Low friction</span>
                <div style={{ width: 80, height: 8, borderRadius: 4, background: 'linear-gradient(to right, rgba(108,99,255,0.1), rgba(255,107,107,0.9))' }} />
                <span>High friction</span>
            </div>
        </div>
    )
}