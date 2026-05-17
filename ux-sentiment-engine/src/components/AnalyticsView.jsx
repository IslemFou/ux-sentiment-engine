import { useFrictionStore } from '../store/frictionStore'
import MetricCard from './analytics/MetricCard'
import TimelineChart from './analytics/TimelineChart'
import StepsChart from './analytics/StepsChart'
import FrictionHeatmap from './analytics/FrictionHeatmap'
import AIInsights from './analytics/AIInsights'



export default function AnalyticsView() {
    const { interactions, frustrationScore, aiTriggers } = useFrictionStore()

    const rageClicks = interactions.filter(i => i.type === 'rage').length
    const hoverFrictions = interactions.filter(i => i.type === 'hover').length

    return (
        <div style={{ padding: 32 }}>

            {/* Header */}
            <div style={{ marginBottom: 28 }}>
                <h1 style={{ fontSize: 24, fontWeight: 700, marginBottom: 6 }}>Analytics Dashboard</h1>
                <p style={{ fontSize: 13, fontFamily: 'DM Mono', color: '#888899' }}>
                    Real-time friction intelligence · live session data
                </p>
            </div>

            {/* Metric cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 24 }}>
                <MetricCard label="Rage Clicks" value={rageClicks} color="#ff6b6b" delta="live session" />
                <MetricCard label="Hover Frictions" value={hoverFrictions} color="#f0a500" delta="live session" />
                <MetricCard label="Frustration Score" value={`${frustrationScore}%`} color="#6c63ff" delta="current level" />
                <MetricCard label="AI Triggers" value={aiTriggers} color="#00d4aa" delta="panels opened" />
            </div>
            {/* Charts */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 24 }}>
                <TimelineChart rageClicks={rageClicks} hoverFrictions={hoverFrictions} />
                <StepsChart interactions={interactions} />
            </div>

            {/* Heatmap */}
            <FrictionHeatmap interactions={interactions} />
            <AIInsights />
        </div>
    )
}