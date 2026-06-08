import './lib/chartSetup.js'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom' // adding route
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/*------- adding route */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
    {/* adding route ----- */}
  </StrictMode>,
)
