import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'
import type { RecipeRequestDto } from '@/api'
import { zRecipeRequestDto } from '@/api/zod.gen.ts'
import { object, string } from 'zod'

export type RecipeFormValues = RecipeRequestDto & { image: File; imageUrl: string }

export function useRecipeForm(initialValues?: RecipeRequestDto) {
  const schema = zRecipeRequestDto.extend({
    image: object({}).optional().nullable(),
    imageUrl: string().optional(),
  })

  return useForm<RecipeFormValues>({
    validationSchema: toTypedSchema(schema),
    initialValues,
  })
}
