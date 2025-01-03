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
import { type RecipeResponseDto, RecipesService } from '@/api'
import { NCard } from 'naive-ui'
import RecipeForm from '../components/RecipeForm.vue'
import { useRecipeService } from '@/domains/recipes/composables/useRecipeService.ts'

type RecipeFormEmitValues = Parameters<InstanceType<typeof RecipeForm>['$emit']>['1']

const { params } = useRoute()
const { push } = useRouter()
const recipe = shallowRef<RecipeResponseDto>() // TODO: Lazy load to avoid undefined type
const { deleteRecipe, deleteImage, updateRecipe, uploadImage, updateImage, createRecipe } =
  useRecipeService((params as Record<string, string>).id)

const { id } = params as Record<string, string>
const loading = shallowRef(false)

if (id) {
  const { data } = await RecipesService.getRecipe({ path: { id } })

  if (data) {
    recipe.value = data
  }
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
        if (recipe.value.imageUrl) {
          recipe.value = await updateImage(recipe.value.id, valuesImage)
        } else {
          recipe.value = await uploadImage(recipe.value.id, valuesImage)
        }
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
