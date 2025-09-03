import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

const rootComponent =  document.getElementById('root')

createRoot(rootComponent).render(<App />)
