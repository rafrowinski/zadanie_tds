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
import { useMemo, useState } from 'react'
import { toast } from 'sonner'
import { apiFetch } from '@/utils/api.ts'

export interface IProps {
  conversionListLength?: number
}

export const Converter = ({ conversionListLength = 5 }: IProps) => {
  const currencies = useCurrencies()
  const [isLoading, setIsLoading] = useState(false)
  const [currencyConvertionsList, setCurrencyConversionsList] = useState<
    string[]
  >([])

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
      const amountTo = resp.response.value
      form.setValue('amountTo', amountTo)

      setCurrencyConversionsList((oldList) =>
        [
          `from: ${currencyFrom} to: ${currencyTo} amount: ${amountFrom} result: ${amountTo}`,
          ...oldList,
        ].slice(0, conversionListLength)
      )
    } catch (e) {
      toast('An error occurred. Please try again later.')
    } finally {
      setIsLoading(false)
    }
  }

  const currencyOptions = useMemo(
    () =>
      currencies.map(({ short_code, name }) => ({
        id: short_code,
        label: `${short_code} - ${name}`,
      })),
    [currencies]
  )

  const currencyFrom = form.watch('currencyFrom')
  const currencyTo = form.watch('currencyTo')

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="mx-auto w-full max-w-md min-w-xs space-y-6"
        >
          <div className="grid grid-cols-1 gap-4 text-left sm:grid-cols-2">
            <FormSelect
              control={form.control}
              name="currencyFrom"
              label="From currency"
              options={currencyOptions}
              placeholder="Select..."
            />
            <FormInput
              control={form.control}
              name="amountFrom"
              label="Amount"
              type="number"
              step="0.01"
              suffix={currencyFrom}
            />
          </div>

          <div className="grid grid-cols-1 gap-4 text-left sm:grid-cols-2">
            <FormSelect
              control={form.control}
              name="currencyTo"
              label="To currency"
              options={currencyOptions}
              placeholder="Select..."
            />
            <FormInput
              control={form.control}
              name="amountTo"
              label="Result"
              type="number"
              readOnly
              suffix={currencyTo}
            />
          </div>

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? 'Converting...' : 'Convert'}
          </Button>
        </form>
      </Form>
      {currencyConvertionsList.map((currencyConversionItem) => (
        <div>{currencyConversionItem}</div>
      ))}
    </>
  )
}
