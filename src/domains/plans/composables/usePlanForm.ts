import { array, number, object, string } from 'yup'
import { useForm } from 'vee-validate'
import { toProvidedTypedSchema } from '@/components/form'
import type { PlanResponseDto } from '@/api'

export function usePlanForm(initialValues?: Partial<PlanResponseDto>) {
  const schema = object({
    name: string().required().label('Name'),
    meals: array(
      object({
        dayIndex: number().required(),
        recipe: object({
          id: string().required(),
        }),
      }),
    ).default([]),
  })

  return useForm<PlanResponseDto>({
    validationSchema: toProvidedTypedSchema(schema),
    initialValues,
  })
}
