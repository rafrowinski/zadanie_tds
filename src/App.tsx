import './App.css'
import { Converter } from '@/features/currencyConversion/components/Converter.tsx'
import { Suspense } from 'react'
import { ErrorBoundary } from '@/components/ErrorBoundary.tsx'

function App() {
  return (
    <ErrorBoundary>
      <Suspense fallback={<div>Ładowanie...</div>}>
        <Converter />
      </Suspense>
    </ErrorBoundary>
  )
}

export default App
