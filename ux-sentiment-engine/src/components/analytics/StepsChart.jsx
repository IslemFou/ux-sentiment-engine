import { Bar } from 'react-chartjs-2'

export default function StepsChart({ interactions }) {
    //count friction events per step
    const counts = [1, 2, 3].map(step => interactions.filter(i => i.step === step && (i.type === 'rage' || i.type === 'hover')).length)

    const data = {
        labels: ['Step 1\nContact', 'Step 2\nPayment', 'Step 3\nReview'],
        datasets: [{
            label: 'Friction events',
            data: counts,
            backgroundColor: ['rgba(108,99,255,0.5)', 'rgba(255,107,107,0.7)', 'rgba(0,212,170,0.5)'],
            borderColor: ['#6c63ff', '#ff6b6b', '#00d4aa'],
            borderWidth: 1.5,
            borderRadius: 4,
        }],
    }

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
            x: { grid: { color: 'rgba(255,255,255,0.06)' }, ticks: { color: '#888899', font: { family: 'DM Mono', size: 11 } } },
            y: { grid: { color: 'rgba(255,255,255,0.06)' }, ticks: { color: '#888899', font: { family: 'DM Mono', size: 11 } }, beginAtZero: true },
        },
    }

    return (
        <div style={{ background: '#14141a', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 12, padding: 20 }}>
            <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 4 }}>Friction by checkout step</div>
            <div style={{ fontSize: 11, fontFamily: 'DM Mono', color: '#888899', marginBottom: 16 }}>where users struggle most</div>
            <div style={{ height: 200 }}>
                <Bar data={data} options={options} />
            </div>
        </div>
    )
}