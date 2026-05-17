import { useFrictionStore } from './store/frictionStore'
import Sidebar from './components/Sidebar'
import CheckoutView from './components/CheckoutView'
import AnalyticsView from './components/AnalyticsView'
import SentimentPanel from './components/SentimentPanel'

export default function App() {
  const { currentView } = useFrictionStore()

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#0c0c0f', color: 'white', fontFamily: 'Syne, sans-serif' }}>
      <Sidebar />
      <main style={{ flex: 1, overflowY: 'auto' }}>
        {currentView === 'checkout' && <CheckoutView />}
        {currentView === 'analytics' && <AnalyticsView />}
      </main>
      <SentimentPanel />
    </div>
  )
}