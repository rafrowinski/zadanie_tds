import { use } from 'react'
import type { CurrenciesApiResponse } from '@/features/currencyConversion/types/currenciesApiResponse.ts'

const promise = fetch('/api/currencybeacon/v1/currencies')
  .then((response) => response.json())
  .then(({ meta, response }: CurrenciesApiResponse) => {
    if (meta.code === 200) {
      return response
    } else {
      throw new Error(`api responded with code ${meta.code}`)
    }
  })

export const useCurrencies = () => {
  return use(promise)
}
