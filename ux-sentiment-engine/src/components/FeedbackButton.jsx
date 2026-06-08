import { useState, useRef } from 'react'
import emailjs from '@emailjs/browser'

const overlay = {
    position: 'fixed', inset: 0,
    background: 'rgba(0,0,0,0.5)',
    zIndex: 998, display: 'flex',
    alignItems: 'flex-end', justifyContent: 'flex-end',
    padding: '0 24px 90px',
}
const modal = {
    background: '#14141a',
    border: '1px solid rgba(255,255,255,0.12)',
    borderRadius: 16,
    padding: '24px',
    width: 360,
    boxShadow: '0 24px 60px rgba(0,0,0,0.5)',
    animation: 'slideUp .3s cubic-bezier(.16,1,.3,1)',
}

const inputStyle = {
    width: '100%',
    background: '#1c1c26',
    border: '1px solid rgba(255,255,255,0.12)',
    borderRadius: 8,
    padding: '10px 12px',
    color: '#f0f0f5',
    fontSize: 13,
    fontFamily: 'Syne, sans-serif',
    outline: 'none',
    marginBottom: 10,
}

export default function FeedbackButton() {
    const [open, setOpen] = useState(false)
    const [status, setStatus] = useState('idle') // idle | sending | sent | error
    const [form, setForm] = useState({ name: '', email: '', message: '' })

    const handleChange = (e) => {
        setForm(f => ({ ...f, [e.target.name]: e.target.value }))
    }

    const handleSubmit = async () => {
        if (!form.message.trim()) return
        setStatus('sending')

        try {
            await emailjs.send(
                import.meta.env.VITE_EMAILJS_SERVICE_ID,
                import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
                {
                    from_name: form.name || 'Anonymous',
                    from_email: form.email || 'No email provided',
                    message: form.message,
                },
                import.meta.env.VITE_EMAILJS_PUBLIC_KEY
            )
            setStatus('sent')
            setForm({ name: '', email: '', message: '' })
            setTimeout(() => { setOpen(false); setStatus('idle') }, 2500)
        } catch {
            setStatus('error')
        }
    }

    return (
        <>
            <style>{`
        @keyframes slideUp {
          from { transform: translateY(20px); opacity: 0 }
          to   { transform: translateY(0);    opacity: 1 }
        }
      `}</style>

            {/* Floating button */}
            <button
                onClick={() => setOpen(o => !o)}
                aria-label="Send feedback"
                style={{
                    position: 'fixed', bottom: 24, right: 24, zIndex: 999,
                    width: 52, height: 52, borderRadius: '50%',
                    background: '#6c63ff', border: 'none',
                    color: '#fff', fontSize: 20, cursor: 'pointer',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    transition: 'transform .2s, background .2s',
                    transform: open ? 'rotate(45deg)' : 'rotate(0)',
                }}
            >
                {open ? '✕' : '✦'}
            </button>

            {/* Modal */}
            {open && (
                <div style={overlay} onClick={e => { if (e.target === e.currentTarget) setOpen(false) }}>
                    <div style={modal}>

                        {/* Header */}
                        <div style={{ marginBottom: 16 }}>
                            <div style={{ fontSize: 11, fontFamily: 'DM Mono, monospace', textTransform: 'uppercase', letterSpacing: '.08em', color: '#6c63ff', marginBottom: 4 }}>
                                Feedback
                            </div>
                            <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 4 }}>
                                Share your thoughts
                            </div>
                            <div style={{ fontSize: 12, color: '#888899', lineHeight: 1.6 }}>
                                Bug, suggestion, or research question — all welcome.
                            </div>
                        </div>

                        {status === 'sent' ? (
                            <div style={{ textAlign: 'center', padding: '24px 0' }}>
                                <div style={{ fontSize: 32, marginBottom: 10 }}>✓</div>
                                <div style={{ fontSize: 14, fontWeight: 600, color: '#00d4aa' }}>Feedback received</div>
                                <div style={{ fontSize: 12, color: '#888899', marginTop: 4, fontFamily: 'DM Mono, monospace' }}>Thank you — closing shortly</div>
                            </div>
                        ) : (
                            <>
                                <input
                                    name="name"
                                    value={form.name}
                                    onChange={handleChange}
                                    placeholder="Your name (optional)"
                                    style={inputStyle}
                                    onFocus={e => e.target.style.borderColor = '#6c63ff'}
                                    onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.12)'}
                                />
                                <input
                                    name="email"
                                    value={form.email}
                                    onChange={handleChange}
                                    placeholder="Your email (optional)"
                                    type="email"
                                    style={inputStyle}
                                    onFocus={e => e.target.style.borderColor = '#6c63ff'}
                                    onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.12)'}
                                />
                                <textarea
                                    name="message"
                                    value={form.message}
                                    onChange={handleChange}
                                    placeholder="What's on your mind?"
                                    style={{ ...inputStyle, minHeight: 90, resize: 'none', marginBottom: 14 }}
                                    onFocus={e => e.target.style.borderColor = '#6c63ff'}
                                    onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.12)'}
                                />

                                {status === 'error' && (
                                    <div style={{ fontSize: 12, color: '#ff6b6b', marginBottom: 10, fontFamily: 'DM Mono, monospace' }}>
                                        Failed to send — check your EmailJS credentials.
                                    </div>
                                )}

                                <button
                                    onClick={handleSubmit}
                                    disabled={status === 'sending' || !form.message.trim()}
                                    style={{
                                        width: '100%', padding: '11px',
                                        background: form.message.trim() ? '#6c63ff' : '#1c1c26',
                                        color: form.message.trim() ? '#fff' : '#888899',
                                        border: 'none', borderRadius: 9,
                                        fontSize: 13, fontWeight: 600,
                                        fontFamily: 'Syne, sans-serif', cursor: 'pointer',
                                        transition: 'all .2s', marginBottom: 14,
                                    }}
                                >
                                    {status === 'sending' ? 'Sending...' : 'Send feedback →'}
                                </button>

                                {/* Footer with website link */}
                                <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: 12, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <div style={{ fontSize: 11, color: '#888899', fontFamily: 'DM Mono, monospace' }}>
                                        Built by
                                    </div>

                                    <a href="http://www.fouratstudio.fr/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        style={{ fontSize: 12, fontWeight: 600, color: '#6c63ff', textDecoration: 'none', letterSpacing: '.02em', display: 'flex', alignItems: 'center', gap: 4 }}
                                    // fourat studio
                                    ></a>
                                </div>
                            </>
                        )}
                    </div>
                </div >
            )
            }
        </>
    )
}

console.log(
    import.meta.env.VITE_EMAILJS_SERVICE_ID,
    import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
    import.meta.env.VITE_EMAILJS_PUBLIC_KEY
)