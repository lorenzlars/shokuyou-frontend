import { toTypedSchema } from '@vee-validate/yup'
import { useForm } from 'vee-validate'
import type { RecipeRequestDto } from '@/api'
import { object, string, number, mixed } from 'yup'

export type RecipeFormValues = RecipeRequestDto & {
  // null means delete, undefined means keep
  image?: File | null
  imageUrl?: string
}

export function useRecipeForm(initialValues?: RecipeRequestDto) {
  const schema = object({
    name: string(),
    description: string().optional(),
    source: string().optional(),
    servings: number().optional(),
    duration: number().optional(),
    ingredients: string().optional(),
    instructions: string().optional(),
    nutrition: string().optional(),
    notes: string().optional(),
    image: mixed().optional().nullable(),
    imageUrl: string().optional(),
  })

  return useForm<RecipeFormValues>({
    validationSchema: toTypedSchema(schema, { stripUnknown: true }),
    initialValues,
  })
}
