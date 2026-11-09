import { lazy, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

const SimApp = lazy(() => import('./sim/SimApp'))
const HistoryApp = lazy(() => import('./history/HistoryApp'))

const path = window.location.pathname
const isHistory = path === '/history' || path.startsWith('/history/')
const isSimulator = path.startsWith('/app')

// No StrictMode: its double-invoked effects would run the multi-second GPU
// sunlight bakes twice in development.
createRoot(document.getElementById('root')!).render(
  isHistory ? (
    <Suspense fallback={null}>
      <HistoryApp />
    </Suspense>
  ) : isSimulator ? (
    <Suspense fallback={null}>
      <SimApp />
    </Suspense>
  ) : (
    <App />
  ),
)
