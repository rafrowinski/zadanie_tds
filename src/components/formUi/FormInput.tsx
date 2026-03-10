import type { Control, FieldValues, Path } from 'react-hook-form'
import type { ComponentProps } from 'react'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/Form'
import { Input } from '@/components/ui/Input'
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '@/components/ui/InputGroup.tsx'

interface FormInputProps<T extends FieldValues> extends Omit<
  ComponentProps<typeof Input>,
  'name'
> {
  control: Control<T>
  name: Path<T>
  label: string
  suffix?: string
}

export const FormInput = <T extends FieldValues>({
  control,
  name,
  label,
  suffix,
  ...props
}: FormInputProps<T>) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <InputGroup className="max-w-xs">
            <FormControl>
              <InputGroupInput {...field} {...props} />
            </FormControl>
            {suffix && (
              <InputGroupAddon align="inline-end">{suffix}</InputGroupAddon>
            )}
          </InputGroup>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
