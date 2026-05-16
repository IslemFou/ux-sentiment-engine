export default function StepReview({ onBack }) {
    return (
        <div>
            <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 24 }}>Review your order</h2>

            <div style={{ background: '#14141a', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 12, padding: 24, marginBottom: 20 }}>
                <div style={{ fontSize: 11, fontFamily: 'DM Mono', textTransform: 'uppercase', letterSpacing: '0.08em', color: '#888899', marginBottom: 16 }}>Order summary</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                    <div style={{ width: 48, height: 48, borderRadius: 8, background: 'rgba(108,99,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 }}>🎧</div>
                    <div style={{ flex: 1 }}>
                        <div style={{ fontSize: 13, fontWeight: 600 }}>AuralPro Max Headphones</div>
                        <div style={{ fontSize: 12, color: '#888899', fontFamily: 'DM Mono' }}>Midnight Black · Qty 1</div>
                    </div>
                    <div style={{ fontSize: 14, fontWeight: 600, fontFamily: 'DM Mono' }}>€299.00</div>
                </div>

                <div style={{ height: 1, background: 'rgba(255,255,255,0.08)', margin: '16px 0' }} />

                {[['Subtotal', '€299.00'], ['Shipping', 'Free'], ['VAT 20%', '€59.80']].map(([label, val]) => (
                    <div key={label} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, color: '#888899', fontFamily: 'DM Mono', marginBottom: 8 }}>
                        <span>{label}</span><span>{val}</span>
                    </div>
                ))}
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 16, fontWeight: 700, marginTop: 8 }}>
                    <span>Total</span><span style={{ color: '#6c63ff' }}>€358.80</span>
                </div>
            </div>

            <div style={{ display: 'flex', gap: 12 }}>
                <button onClick={onBack} style={secondaryBtn}>← Back</button>
                <button style={{ ...primaryBtn, flex: 1, background: '#00d4aa', color: '#000' }}>
                    Place Order — €358.80
                </button>
            </div>
        </div>
    )
}

const primaryBtn = {
    padding: '14px', border: 'none', borderRadius: 10,
    fontSize: 15, fontWeight: 600, fontFamily: 'Syne, sans-serif', cursor: 'pointer',
}

const secondaryBtn = {
    padding: '10px 20px', background: 'transparent', color: '#888899',
    border: '1px solid rgba(255,255,255,0.14)', borderRadius: 8,
    fontSize: 13, fontFamily: 'Syne, sans-serif', cursor: 'pointer',
}