import type { Currency } from '@/features/currencyConversion/types/currency.ts'
import type { BaseApiResponse } from '@/types/baseApiResponse.ts'

export interface CurrenciesApiResponse extends BaseApiResponse {
  response: Array<Currency>
}
