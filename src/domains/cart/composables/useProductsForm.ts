import { array, number, object, string } from 'yup'
import { useForm } from 'vee-validate'
import { toProvidedTypedSchema } from '@/components/form'
import type { Reactive } from 'vue'

type ProductFormValues = {
  name: string
  amount: number
  unit: string
}

type ProductsFormValues = {
  products: ProductFormValues[]
}

export function useProductsForm(initialValues: Reactive<Partial<ProductsFormValues>>) {
  const schema = object({
    products: array(
      object({
        name: string().required().label('Name'),
        amount: number().positive().required().label('Amount'),
        unit: string().required().label('Unit'),
      }),
    ),
  })

  return useForm<ProductsFormValues>({
    validationSchema: toProvidedTypedSchema(schema),
    initialValues,
  })
}
