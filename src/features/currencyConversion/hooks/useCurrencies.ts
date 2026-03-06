import { use } from 'react'
import type { CurrenciesApiResponse } from '@/features/currencyConversion/types/currenciesApiResponse.ts'
import { apiFetch } from '@/utils/api.ts'

const promise = apiFetch<CurrenciesApiResponse>('/currencies').then(
  ({ response }) => response
)

export const useCurrencies = () => {
  return use(promise)
}
