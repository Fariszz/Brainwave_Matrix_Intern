import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import DApp from './DApp'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
   <DApp/>
  </StrictMode>,
)
