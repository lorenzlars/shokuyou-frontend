<template>
  <div class="container">
    <NCard class="my-5">
      <RecipeForm :initial-values="recipe" @submit="onSubmit" :loading />
    </NCard>
  </div>
</template>

<script lang="ts" setup>
import { shallowRef } from 'vue'
import { useRoute, useRouter } from '@kitbag/router'
import {
  RecipesService,
  type CreateRecipeDto,
  type ResponseRecipeDto,
  type UpdateRecipeDto,
} from '@/api'
import { NCard, useMessage } from 'naive-ui'
import RecipeForm from '../components/RecipeForm.vue'
import { useI18n } from 'vue-i18n'

type RecipeFormEmitValues = Parameters<InstanceType<typeof RecipeForm>['$emit']>['1']

const { params } = useRoute()
const { push } = useRouter()
const recipe = shallowRef<ResponseRecipeDto>() // TODO: Lazy load to avoid undefined type
const message = useMessage()
const { t } = useI18n()

const { id } = params as Record<string, string>
const loading = shallowRef(false)

if (id) {
  const { data } = await RecipesService.getRecipe({ path: { id } })

  if (data) {
    recipe.value = data
  }
}

async function deleteRecipe() {
  // TODO: Error handing
  // TODO: Abstract this in a generic composable
  await RecipesService.deleteRecipe({ path: { id } })

  message.success(t('messages.recipeDeletedSuccessfully'))
}

async function updateRecipe(values: UpdateRecipeDto) {
  // TODO: Error handing
  // TODO: Abstract this in a generic composable
  const { data: recipe } = await RecipesService.updateRecipe({
    body: values,
    path: {
      id,
    },
  })

  message.success(t('messages.recipeCreatedSuccessfully'))

  return recipe
}

async function createRecipe(values: CreateRecipeDto) {
  // TODO: Error handing
  // TODO: Abstract this in a generic composable
  const { data: recipe } = await RecipesService.createRecipe({
    body: values,
  })

  message.success(t('messages.recipeUpdatedSuccessfully'))

  return recipe
}

async function uploadImage(id: string, image: File) {
  // TODO: Error handing
  // TODO: Abstract this in a generic composable
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

async function deleteImage(id: string) {
  // TODO: Error handing
  // TODO: Abstract this in a generic composable
  return await RecipesService.deleteImage({
    path: {
      id,
    },
  })
}

async function onSubmit(values: RecipeFormEmitValues) {
  // TODO: Abstract this in a generic composable
  loading.value = true

  const [valuesRecipe, valuesImage] = values

  if (valuesRecipe) {
    if (recipe.value) {
      recipe.value = await updateRecipe(valuesRecipe)
    } else {
      recipe.value = await createRecipe(valuesRecipe)
    }

    if (recipe.value) {
      if (valuesImage instanceof File) {
        recipe.value = await uploadImage(recipe.value.id, valuesImage)
      } else if (valuesImage === null) {
        await deleteImage(recipe.value.id)
      }
    }
  } else {
    await deleteRecipe()
  }

  push('recipes')
}
</script>
