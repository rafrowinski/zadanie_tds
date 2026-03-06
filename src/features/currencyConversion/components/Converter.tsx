import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form } from '@/components/ui/form'
import { FormInput } from '@/components/formUi/FormInput'
import { FormSelect } from '@/components/formUi/FormSelect'
import { Button } from '@/components/ui/button'
import { useCurrencies } from '@/features/currencyConversion/hooks/useCurrencies.ts'
import {
  converterFormSchema,
  type ConverterFormInput,
} from '@/features/currencyConversion/types/converterSchema.ts'
import type { ConvertApiResponse } from '@/features/currencyConversion/types/convertApiResponse.ts'
import { useState } from 'react'
import { toast } from 'sonner'
import { apiFetch } from '@/utils/api.ts'

export const Converter = () => {
  const currencies = useCurrencies()
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<ConverterFormInput>({
    resolver: zodResolver(converterFormSchema),
    defaultValues: {
      currencyFrom: '',
      currencyTo: '',
      amountFrom: 0,
      amountTo: 0,
    },
  })

  const onSubmit = async ({
    currencyFrom,
    currencyTo,
    amountFrom,
  }: ConverterFormInput) => {
    setIsLoading(true)

    const params = new URLSearchParams({
      from: currencyFrom,
      to: currencyTo,
      amount: amountFrom.toString(),
    })

    try {
      const resp = await apiFetch<ConvertApiResponse>(
        `/convert?${params.toString()}`
      )
      form.setValue('amountTo', resp.response.value)
    } catch (e) {
      toast('Nastąpił błąd. Spróbuj ponownie później.')
    } finally {
      setIsLoading(false)
    }
  }

  const currencyOptions = currencies.map(({ short_code, name }) => ({
    id: short_code,
    label: `${short_code} - ${name}`,
  }))

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mx-auto w-full max-w-md space-y-6"
      >
        <div className="grid grid-cols-2 gap-4 text-left">
          <FormSelect
            control={form.control}
            name="currencyFrom"
            label="Z waluty"
            options={currencyOptions}
            placeholder="Wybierz..."
          />
          <FormInput
            control={form.control}
            name="amountFrom"
            label="Kwota"
            type="number"
            step="0.01"
          />
        </div>

        <div className="grid grid-cols-2 gap-4 text-left">
          <FormSelect
            control={form.control}
            name="currencyTo"
            label="Na walutę"
            options={currencyOptions}
            placeholder="Wybierz..."
          />
          <FormInput
            control={form.control}
            name="amountTo"
            label="Wynik"
            type="number"
            readOnly
          />
        </div>

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? 'Przeliczanie...' : 'Przelicz'}
        </Button>
      </form>
    </Form>
  )
}
