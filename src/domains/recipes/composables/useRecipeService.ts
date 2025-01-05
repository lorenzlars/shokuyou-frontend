import { type RecipeRequestDto, RecipesService } from '@/api'
import { useI18n } from 'vue-i18n'
import { useMessage } from 'naive-ui'
import { unwrapResponseData } from '@/components/form'

export function useRecipeService() {
  const { t } = useI18n()
  const message = useMessage()

  async function deleteRecipe(id: string) {
    await RecipesService.deleteRecipe({ path: { id } })

    message.success(t('messages.recipeDeletedSuccessfully'))
  }

  async function updateRecipe(id: string, values: RecipeRequestDto) {
    const recipe = unwrapResponseData(
      await RecipesService.updateRecipe({
        body: values,
        path: {
          id,
        },
      }),
    )

    message.success(t('messages.recipeUpdatedSuccessfully'))

    return recipe
  }

  async function createRecipe(values: RecipeRequestDto) {
    const recipe = unwrapResponseData(
      await RecipesService.createRecipe({
        body: values,
      }),
    )

    message.success(t('messages.recipeCreatedSuccessfully'))

    return recipe
  }

  async function uploadImage(id: string, image: File) {
    const { data: recipe } = await RecipesService.uploadImage({
      path: {
        id,
      },
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      body: {
        file: image,
      },
    })

    return recipe
  }

  async function updateImage(id: string, image: File) {
    return unwrapResponseData(
      await RecipesService.updateImage({
        path: {
          id,
        },
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        body: {
          file: image,
        },
      }),
    )
  }

  async function deleteImage(id: string) {
    await RecipesService.deleteImage({
      path: {
        id,
      },
    })
  }

  return {
    deleteRecipe,
    updateRecipe,
    createRecipe,
    uploadImage,
    updateImage,
    deleteImage,
  }
}
