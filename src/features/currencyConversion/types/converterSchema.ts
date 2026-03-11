import { z } from 'zod'
import { type Currency } from './currency'

export const converterFormSchema = z.object({
  currencyFrom: z.custom<Currency>((val) => !!val, 'Select currency'),
  currencyTo: z.custom<Currency>((val) => !!val, 'Select currency'),
  amountFrom: z.coerce
    .number<number>()
    .min(0.01, 'Amount must be greater than 0')
    .multipleOf(0.01, 'Maximum 2 decimal places allowed')
    .transform((val) => Math.round(val * 100) / 100),
  amountTo: z.number(),
})

export type ConverterFormInput = z.infer<typeof converterFormSchema>
