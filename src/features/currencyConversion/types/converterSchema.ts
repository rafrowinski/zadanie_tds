import { z } from 'zod'

export const converterFormSchema = z.object({
  currencyFrom: z.string().min(1, 'Select currency'),
  currencyTo: z.string().min(1, 'Select currency'),
  amountFrom: z.coerce
    .number<number>()
    .min(0.01, 'Amount must be greater than 0'),
  amountTo: z.coerce.number<number>(),
})

export type ConverterFormInput = z.infer<typeof converterFormSchema>
