import { z } from 'zod'

export const converterFormSchema = z.object({
  currencyFrom: z.string().min(1, 'Wybierz walutę'),
  currencyTo: z.string().min(1, 'Wybierz walutę'),
  amountFrom: z.coerce
    .number<number>()
    .min(0.01, 'Kwota musi być większa od 0'),
  amountTo: z.coerce.number<number>(),
})

export type ConverterFormInput = z.infer<typeof converterFormSchema>
