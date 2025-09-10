import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import FerreteriaApp from './App'

import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <FerreteriaApp />
  </StrictMode>
)
