import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'
import type { RecipeRequestDto } from '@/api'
import { zRecipeRequestDto } from '@/api/zod.gen.ts'
import { object, string } from 'zod'

export function useRecipeForm(initialValues?: RecipeRequestDto) {
  const schema = zRecipeRequestDto.merge(
    object({
      image: object({}).optional().nullable(),
      imageUrl: string().optional(),
    }),
  )

  return useForm<RecipeRequestDto>({
    validationSchema: toTypedSchema(schema),
    initialValues,
  })
}
