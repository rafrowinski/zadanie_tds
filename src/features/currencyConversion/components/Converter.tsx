import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form } from '@/components/ui/Form'
import { FormInput } from '@/components/formUi/FormInput'
import { FormSelect } from '@/components/formUi/FormSelect'
import { Button } from '@/components/ui/Button'
import { useCurrencies } from '@/features/currencyConversion/hooks/useCurrencies.ts'
import {
  converterFormSchema,
  type ConverterFormInput,
} from '@/features/currencyConversion/types/converterSchema.ts'
import type { ConvertApiResponse } from '@/features/currencyConversion/types/convertApiResponse.ts'
import { useState } from 'react'
import { toast } from 'sonner'
import { apiFetch } from '@/utils/api.ts'
import type { Currency } from '@/features/currencyConversion/types/currency.ts'

export const Converter = () => {
  const currencies = useCurrencies()
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<ConverterFormInput>({
    resolver: zodResolver(converterFormSchema),
    defaultValues: {
      currencyFrom: undefined,
      currencyTo: undefined,
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
      from: currencyFrom.short_code,
      to: currencyTo.short_code,
      amount: amountFrom.toString(),
    })

    try {
      const resp = await apiFetch<ConvertApiResponse>(
        `/convert?${params.toString()}`
      )
      form.setValue('amountTo', Math.round(resp.response.value * 100) / 100)
    } catch (e) {
      toast('An error occurred. Please try again later.')
    } finally {
      setIsLoading(false)
    }
  }

  const currencyFrom = form.watch('currencyFrom')
  const currencyTo = form.watch('currencyTo')

  const getLabel = ({ short_code, name }: Currency) => `${short_code} - ${name}`

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mx-auto w-full max-w-md min-w-md space-y-6"
      >
        <div className="grid grid-cols-2 gap-4 text-left">
          <FormSelect
            control={form.control}
            name="currencyFrom"
            label="From currency"
            options={currencies}
            valueKey="short_code"
            getLabel={getLabel}
            placeholder="Select..."
          />
          <FormInput
            control={form.control}
            name="amountFrom"
            label="Amount"
            type="number"
            step="0.01"
            suffix={currencyFrom?.symbol}
          />
        </div>

        <div className="grid grid-cols-2 gap-4 text-left">
          <FormSelect
            control={form.control}
            name="currencyTo"
            label="To currency"
            options={currencies}
            valueKey="short_code"
            getLabel={getLabel}
            placeholder="Select..."
          />
          <FormInput
            control={form.control}
            name="amountTo"
            label="Result"
            type="number"
            readOnly
            suffix={currencyTo?.symbol}
          />
        </div>

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? 'Converting...' : 'Convert'}
        </Button>
      </form>
    </Form>
  )
}
