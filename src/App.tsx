import './App.css'
import { Converter } from '@/features/currencyConversion/components/Converter.tsx'
import { Suspense } from 'react'
import { ErrorBoundary } from '@/components/ErrorBoundary.tsx'
import { Toaster } from '@/components/ui/Sonner'

function App() {
  return (
    <ErrorBoundary>
      <Suspense fallback={<div>Loading...</div>}>
        <Converter />
        <Toaster />
      </Suspense>
    </ErrorBoundary>
  )
}

export default App
