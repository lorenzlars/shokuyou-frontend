import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'
import type { CreateRecipeDto } from '@/api'
import { zCreateRecipeDto } from '@/api/zod.gen.ts'

export function useRecipeForm(initialValues?: CreateRecipeDto) {
  return useForm<CreateRecipeDto>({
    validationSchema: toTypedSchema(zCreateRecipeDto),
    initialValues
  })
}
