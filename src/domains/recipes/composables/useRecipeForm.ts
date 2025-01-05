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
    name: string().required().label('Name'),
    description: string(),
    source: string(),
    servings: number(),
    duration: number(),
    ingredients: string(),
    instructions: string(),
    nutrition: string(),
    notes: string(),
    image: mixed().nullable(),
    imageUrl: string(),
  })

  return useForm<RecipeFormValues>({
    validationSchema: schema,
    initialValues,
  })
}
