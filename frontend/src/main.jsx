import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import CardDisplay from './components/card/CardComponent.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CardDisplay />
  </StrictMode>,
)
