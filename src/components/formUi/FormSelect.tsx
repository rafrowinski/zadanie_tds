import type { Control, FieldValues, Path } from 'react-hook-form'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/Form'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/Select'

interface BaseFormSelectProps<TFieldValues extends FieldValues, TItem> {
  control: Control<TFieldValues>
  name: Path<TFieldValues>
  label: string
  options: TItem[]
  valueKey: keyof TItem
  placeholder?: string
  disabled?: boolean
}

type FormSelectPropsWithLabelKey<
  TFieldValues extends FieldValues,
  TItem,
> = BaseFormSelectProps<TFieldValues, TItem> & {
  labelKey: keyof TItem
  getLabel?: never
}

type FormSelectPropsWithGetLabel<
  TFieldValues extends FieldValues,
  TItem,
> = BaseFormSelectProps<TFieldValues, TItem> & {
  labelKey?: never
  getLabel: (item: TItem) => string
}

type FormSelectProps<TFieldValues extends FieldValues, TItem> =
  | FormSelectPropsWithLabelKey<TFieldValues, TItem>
  | FormSelectPropsWithGetLabel<TFieldValues, TItem>

export const FormSelect = <TFieldValues extends FieldValues, TItem>({
  control,
  name,
  label,
  options,
  valueKey,
  labelKey,
  getLabel,
  placeholder = 'Select...',
  disabled = false,
}: FormSelectProps<TFieldValues, TItem>) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field: { onChange, value } }) => {
        const selectedValue = value ? String(value[valueKey]) : undefined

        const handleValueChange = (id: string) => {
          const selectedOption = options.find(
            (opt) => String(opt[valueKey]) === id
          )
          onChange(selectedOption)
        }

        return (
          <FormItem>
            <FormLabel>{label}</FormLabel>
            <Select
              onValueChange={handleValueChange}
              value={selectedValue}
              disabled={disabled}
            >
              <FormControl>
                <SelectTrigger
                  data-testid={`${name}-trigger`}
                  className="w-full max-w-full"
                >
                  <SelectValue placeholder={placeholder} />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {options.map((option) => {
                  const id = String(option[valueKey])
                  const labelStr = labelKey
                    ? String(option[labelKey])
                    : getLabel!(option)

                  return (
                    <SelectItem key={id} value={id}>
                      {labelStr}
                    </SelectItem>
                  )
                })}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )
      }}
    />
  )
}
