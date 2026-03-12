import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/vitest'
import { Converter } from './Converter'

vi.mock('@/features/currencyConversion/hooks/useCurrencies.ts', () => ({
  useCurrencies: () => [
    { short_code: 'USD', name: 'US Dollar', symbol: '$' },
    { short_code: 'EUR', name: 'Euro', symbol: '€' },
  ],
}))

describe('Converter', () => {
  it('renders the converter form with labels', () => {
    render(<Converter />)

    expect(screen.getByLabelText(/from currency/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/amount/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/to currency/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/result/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /convert/i })).toBeInTheDocument()
  })
})
