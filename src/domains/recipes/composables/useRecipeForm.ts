import { useForm } from 'vee-validate'
import type { RecipeRequestDto } from '@/api'
import { object, string, number, mixed, array } from 'yup'
import { toProvidedTypedSchema } from '@/components/form'

export type RecipeFormValues = RecipeRequestDto & {
  // null means delete, undefined means keep
  image?: File | null
  imageUrl?: string
}

export function useRecipeForm(initialValues?: Partial<RecipeRequestDto>) {
  const schema = object({
    name: string().required().label('Name'),
    description: string().label('Description'),
    source: string().label('Source'),
    servings: number().label('Servings'),
    duration: number().label('Duration'),
    ingredients: array(
      object({
        amount: number().required().label('Amount'),
        unit: string().required().label('Unit'),
        name: string().required().label('Name'),
      }),
    ).label('Ingredients'),
    instructions: string().label('Instructions'),
    nutrition: string().label('Nutrition'),
    notes: string().label('Notes'),
    image: mixed().nullable(),
    imageUrl: string(),
  })

  return useForm<RecipeFormValues>({
    validationSchema: toProvidedTypedSchema(schema),
    initialValues,
  })
}
