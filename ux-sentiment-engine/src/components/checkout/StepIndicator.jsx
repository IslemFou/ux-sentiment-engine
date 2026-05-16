export default function StepIndicator({ currentStep }) {
    const steps = ['Contact', 'Payment', 'Review']

    return (
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: 40 }}>
            {steps.map((label, i) => {
                const n = i + 1
                const isDone = n < currentStep
                const isActive = n === currentStep

                return (
                    <div key={n} style={{ display: 'flex', alignItems: 'center' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                            <div style={{
                                width: 28, height: 28, borderRadius: '50%',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                fontSize: 12, fontWeight: 600, fontFamily: 'DM Mono',
                                background: isDone ? '#00d4aa' : isActive ? '#6c63ff' : 'transparent',
                                border: `1.5px solid ${isDone ? '#00d4aa' : isActive ? '#6c63ff' : 'rgba(255,255,255,0.2)'}`,
                                color: isDone ? '#000' : isActive ? '#fff' : '#888899',
                                transition: 'all 0.3s',
                            }}>
                                {isDone ? '✓' : n}
                            </div>
                            <span style={{
                                fontSize: 13,
                                color: isActive ? '#fff' : '#888899',
                                fontWeight: isActive ? 600 : 400,
                            }}>
                                {label}
                            </span>
                        </div>
                        {i < steps.length - 1 && (
                            <div style={{ width: 48, height: 1, background: 'rgba(255,255,255,0.1)', margin: '0 12px' }} />
                        )}
                    </div>
                )
            })}
        </div>
    )
}