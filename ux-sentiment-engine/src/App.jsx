import { Routes, Route } from 'react-router-dom' // importing route
import { useFrictionStore } from './store/frictionStore'
import Sidebar from './components/Sidebar'
import CheckoutView from './components/CheckoutView'
import AnalyticsView from './components/AnalyticsView'
import SentimentPanel from './components/SentimentPanel'
import About from './pages/About' // importing about
import FeedbackButton from './components/FeedbackButton'

export default function App() {
  const { currentView } = useFrictionStore()

  return (
    <>
      <Routes>
        <Route path="/about" element={<About />} />
        <Route path="/*" element={
          <div style={{ display: 'flex', minHeight: '100vh', background: '#0c0c0f', color: 'white', fontFamily: 'Syne, sans-serif' }}>
            <Sidebar />
            <main style={{ flex: 1, overflowY: 'auto' }}>
              {currentView === 'checkout' && <CheckoutView />}
              {currentView === 'analytics' && <AnalyticsView />}
            </main>
            <SentimentPanel />
          </div>
        } />
      </Routes>
      <FeedbackButton />
      {/* en dehors des routes afin qu'il apparaisse dans toutes les pages */}
    </>
  )
}