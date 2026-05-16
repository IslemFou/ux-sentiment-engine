import Field from './Field'

export default function StepContact({ onNext }) {
    return (
        <div>
            <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 24 }}>Contact information</h2>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                <Field label="First name" id="field-first" placeholder="Alex" />
                <Field label="Last name" id="field-last" placeholder="Rivera" />
            </div>
            <Field label="Email address" id="field-email" placeholder="alex@company.com" type="email" />
            <Field label="Shipping address" id="field-address" placeholder="123 Main Street" />
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                <Field label="City" id="field-city" placeholder="Paris" />
                <Field label="Postal code" id="field-zip" placeholder="75001" />
            </div>

            <button onClick={onNext} style={primaryBtn}>
                Continue to Payment →
            </button>
        </div>
    )
}

const primaryBtn = {
    width: '100%', padding: '14px', marginTop: 8,
    background: '#6c63ff', color: '#fff', border: 'none',
    borderRadius: 10, fontSize: 15, fontWeight: 600,
    fontFamily: 'Syne, sans-serif', cursor: 'pointer',
}