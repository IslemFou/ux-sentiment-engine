import { Line } from 'react-chartjs-2'

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

export default function TimelineChart({
    rageClicks, hoverFrictions
}) {
    // Spread live counts across the week for demo purposes
    const rageData = [12, 18, 9, 24, 31, 14, rageClicks]
    const hoverData = [8, 12, 6, 18, 22, 10, hoverFrictions]

    const data = {
        labels: DAYS,
        datasets: [
            {
                label: 'Rage clicks',
                data: rageData,
                borderColor: '#ff6b6b',
                backgroundColor: 'rgba(255,107,107,0.1)',
                tension: 0.4,
                fill: true,
                borderWidth: 2,
            },
            {
                label: 'Hover friction',
                data: hoverData,
                borderColor: '#f0a500',
                backgroundColor: 'rgba(240,165,0,0.08)',
                tension: 0.4,
                fill: true,
                borderWidth: 2,
                borderDash: [4, 2],
            }
        ],
    }

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
            x: { grid: { color: 'rgba(255,255,255,0.06)' }, ticks: { color: '#888899', font: { family: 'DM Mono', size: 11 } } },
            y: { grid: { color: 'rgba(255,255,255,0.06)' }, ticks: { color: '#888899', font: { family: 'DM Mono', size: 11 } } },
        },
    }
    return (
        <div style={{ background: '#14141a', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 12, padding: 20 }}>
            <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 4 }}>Friction events over time</div>
            <div style={{ fontSize: 11, fontFamily: 'DM Mono', color: '#888899', marginBottom: 16 }}>rage clicks + hover friction · last 7 days</div>
            <div style={{ height: 200 }}>
                <Line data={data} options={options} />
            </div>
        </div>
    )

}