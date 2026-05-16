import { useFrictionStore } from '../store/frictionStore'

const navItems = [
    {
        id: 'checkout', label: 'Live Checkout', icon: '🛒'
    },
    {
        id: 'analytics', label: 'Analytics', icon: '📊'
    }
]

export default function Sidebar() {
    const { currentView, setView, frustrationScore, interactions } = useFrictionStore()

    const rageClicks = interactions.filter(i => i.type === 'rage').length
    const hoverFrictions = interactions.filter(i => i.type === 'hover').length

    return (
        <aside style={{
            width: 220, background: '#14141a',
            borderRight: '1px solid rgba(255,255,255,0.08)',
            height: '100vh', position: 'sticky', top: 0,
            display: 'flex', flexDirection: 'column', padding: '24px 0',
        }}>

            {/* Logo */}
            <div style={{ padding: '0 20px 24px', borderBottom: '1px solid rgba(255,255,255,0.08)', marginBottom: 16 }}>
                <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#6c63ff' }}>
                    SentimentUX
                </div>
                <div style={{ fontSize: 11, color: '#888899', fontFamily: 'DM Mono', marginTop: 2 }}>
                    friction intelligence
                </div>
            </div>

            {/* Nav items */}
            {navItems.map(item => {
                const isActive = currentView === item.id
                return (
                    <div
                        key={item.id}
                        onClick={() => setView(item.id)}
                        style={{
                            display: 'flex', alignItems: 'center', gap: 10,
                            padding: '10px 20px', fontSize: 13, cursor: 'pointer',
                            color: isActive ? '#6c63ff' : '#888899',
                            borderLeft: `2px solid ${isActive ? '#6c63ff' : 'transparent'}`,
                            background: isActive ? 'rgba(108,99,255,0.08)' : 'transparent',
                            transition: 'all 0.15s',
                        }}
                    >
                        <span>{item.icon}</span>
                        <span>{item.label}</span>
                    </div>
                )
            })}

            {/* Live stats */}
            <div style={{ padding: '24px 20px 0', marginTop: 'auto' }}>
                <div style={{
                    fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase',
                    color: '#888899', fontFamily: 'DM Mono', marginBottom: 10,
                }}>
                    Live session
                </div>
                <div style={{ fontSize: 11, fontFamily: 'DM Mono', color: '#888899', lineHeight: 2 }}>
                    Rage clicks: <span style={{ color: '#ff6b6b' }}>{rageClicks}</span><br />
                    Hover frictions: <span style={{ color: '#f0a500' }}>{hoverFrictions}</span><br />
                    Frustration: <span style={{ color: frustrationScore >= 40 ? '#ff6b6b' : '#00d4aa' }}>{frustrationScore}%</span>
                </div>

                {/* Frustration bar */}
                <div style={{ marginTop: 12, height: 4, borderRadius: 2, background: 'rgba(255,255,255,0.08)' }}>
                    <div style={{
                        height: '100%', borderRadius: 2,
                        width: `${frustrationScore}%`,
                        background: frustrationScore >= 40 ? '#ff6b6b' : frustrationScore >= 20 ? '#f0a500' : '#00d4aa',
                        transition: 'all 0.4s ease',
                    }} />
                </div>
            </div>

        </aside>
    )
}