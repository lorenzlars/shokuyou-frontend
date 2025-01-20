import { number, object, string } from 'yup'
import { useForm } from 'vee-validate'
import { toProvidedTypedSchema } from '@/components/form'
import type { AddProductRequestType } from '@/api'

type ProductFormValues = {
  type: AddProductRequestType
  name: string
  amount: number
  unit: string
}

export function useProductForm() {
  const schema = object({
    name: string().required().label('Name'),
    amount: number().positive().required().label('Amount'),
    unit: string().required().label('Unit'),
    type: string().default('product'),
  })

  return useForm<ProductFormValues>({
    validationSchema: toProvidedTypedSchema(schema),
  })
}
