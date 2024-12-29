<template>
  <div class="container">
    <NCard v-if="recipe" class="my-5">
      <RecipeForm :initial-values="recipe" @submit="onSubmit" @delete="deleteRecipe" />
    </NCard>
  </div>
</template>

<script lang="ts" setup>
import { shallowRef } from 'vue'
import { useRoute, useRouter } from '@kitbag/router'
import { RecipesService, type CreateRecipeDto, type Recipe } from '@/api'
import { NCard, useMessage } from 'naive-ui'
import RecipeForm from '../components/RecipeForm.vue'

const { params } = useRoute()
const { push } = useRouter()
const recipe = shallowRef<Recipe>()
const message = useMessage()

const { id } = params as Record<string, string>
const { data } = await RecipesService.getRecipe({ path: { id } })

recipe.value = data

const deleteRecipe = async () => {
  if (!recipe.value) return

  try {
    await RecipesService.deleteRecipe({ path: { id } })
    message.success('Rezept erfolgreich gelöscht.')
    push('recipes')
  } catch {
    message.error('Rezept konnte nicht gelöscht werden.')
  }
}

const onSubmit = async (values: CreateRecipeDto) => {
  await RecipesService.updateRecipe({ path: { id }, body: values })
  message.success('Rezept erfolgreich aktualisiert.')
  push('recipes')
}
</script>
