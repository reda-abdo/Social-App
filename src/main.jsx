import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import "@fortawesome/fontawesome-free/css/all.min.css"
import { HeroUIProvider } from '@heroui/react'
import CounterContextProvider from './contexts/counterContext.jsx'
import AuthContextProvider from './contexts/authContext.jsx'

import { ToastProvider } from "@heroui/toast";

createRoot(document.getElementById('root')).render(


  <StrictMode>
    <HeroUIProvider>
      <CounterContextProvider>
        <AuthContextProvider>
          <ToastProvider placement='top-right' />
          <App />
        </AuthContextProvider>
      </CounterContextProvider>
    </HeroUIProvider>
  </StrictMode>,

)
