import type { Control, FieldValues, Path } from "react-hook-form";
import type { ComponentProps } from "react";
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

interface FormInputProps<T extends FieldValues> extends Omit<ComponentProps<typeof Input>, "name"> {
    control: Control<T>;
    name: Path<T>;
    label: string;
}

export const FormInput = <T extends FieldValues>({
                                                     control,
                                                     name,
                                                     label,
                                                     ...props
                                                 }: FormInputProps<T>) => {
    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <FormItem>
                    <FormLabel>{label}</FormLabel>
                    <FormControl>
                        <Input {...field} {...props} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
};