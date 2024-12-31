import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'
import type { CreateRecipeDto } from '@/api'
import { zCreateRecipeDto } from '@/api/zod.gen.ts'
import { object, string } from 'zod'

export function useRecipeForm(initialValues?: CreateRecipeDto) {
  const schema = zCreateRecipeDto.merge(
    object({
      image: object({}).optional().nullable(),
      imageUrl: string().optional(),
    }),
  )

  return useForm<CreateRecipeDto>({
    validationSchema: toTypedSchema(schema),
    initialValues,
  })
}
