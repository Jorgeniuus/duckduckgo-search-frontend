import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styleMain.css'
import Home from './pages/home'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Home /> 
  </StrictMode>,
)
