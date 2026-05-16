export default function Field({ label, id, placeholder, type = 'text' }) {
    return (
        <div style={{ marginBottom: 14 }}>
            <label htmlFor={id} style={{
                display: 'block', fontSize: 11, fontFamily: 'DM Mono',
                textTransform: 'uppercase', letterSpacing: '0.06em',
                color: '#888899', marginBottom: 6,
            }}>
                {label}
            </label>
            <input
                id={id}
                type={type}
                placeholder={placeholder}
                style={{
                    width: '100%', background: '#1c1c26',
                    border: '1px solid rgba(255,255,255,0.12)',
                    borderRadius: 8, padding: '11px 14px',
                    color: '#f0f0f5', fontSize: 14,
                    fontFamily: 'Syne, sans-serif', outline: 'none',
                }}
                onFocus={e => e.target.style.borderColor = '#6c63ff'}
                onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.12)'}
            />
        </div>
    )
}