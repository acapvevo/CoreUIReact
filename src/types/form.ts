import { FieldValues, UseFormReturn } from "react-hook-form"

export interface Form<T extends FieldValues> {
    id?: number
    enabled: boolean
    viewing: boolean
    form: UseFormReturn<T>
}