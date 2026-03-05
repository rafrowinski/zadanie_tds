import type { Currency } from '@/features/currencyConversion/types/currency.ts'

export interface CurrenciesApiResponse {
  meta: {
    code: number
    disclaimer: string
  }
  response: Array<Currency>
}
