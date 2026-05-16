import Field from './Field'

export default function StepPayment({ onNext, onBack }) {
    return (
        <div>
            <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 24 }}>Payment details</h2>

            <Field label="Card number" id="field-card" placeholder="4242 4242 4242 4242" />
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                <Field label="Expiry date" id="field-expiry" placeholder="MM / YY" />
                <Field label="Security code" id="field-cvv" placeholder="•••" />
            </div>
            <Field label="Name on card" id="field-cardname" placeholder="Alex Rivera" />

            <div style={{ display: 'flex', gap: 12, marginTop: 8 }}>
                <button onClick={onBack} style={secondaryBtn}>← Back</button>
                <button onClick={onNext} style={{ ...primaryBtn, flex: 1 }}>Review Order →</button>
            </div>
        </div>
    )
}

const primaryBtn = {
    padding: '14px', background: '#6c63ff', color: '#fff',
    border: 'none', borderRadius: 10, fontSize: 15, fontWeight: 600,
    fontFamily: 'Syne, sans-serif', cursor: 'pointer',
}

const secondaryBtn = {
    padding: '10px 20px', background: 'transparent', color: '#888899',
    border: '1px solid rgba(255,255,255,0.14)', borderRadius: 8,
    fontSize: 13, fontFamily: 'Syne, sans-serif', cursor: 'pointer',
}