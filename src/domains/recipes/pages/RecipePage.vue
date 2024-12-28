<template>
  <div class="container">
    <NCard v-if="recipe" :title="recipe.name" class="my-5">
      <p>{{ recipe.description }}</p>

      <div class="flex gap-2 mt-4">
        <NButton type="error" @click="deleteRecipe">Löschen</NButton>
      </div>
    </NCard>
  </div>
</template>

<script lang="ts" setup>
import { shallowRef } from 'vue'
import { useRoute, useRouter } from '@kitbag/router'
import { RecipesService, type Recipe } from '@/api'
import { NCard, NButton, useMessage } from 'naive-ui'

const route = useRoute()
const router = useRouter()
const recipe = shallowRef<Recipe>()
const message = useMessage()

const loadRecipe = async () => {
  const { id } = route.params as Record<string, string>

  if (typeof id !== 'string') {
    message.error('Ungültige Rezept-ID')

    return
  }

  const response = await RecipesService.getRecipe({ path: { id } })

  recipe.value = response.data
}

const deleteRecipe = async () => {
  if (!recipe.value) return

  try {
    await RecipesService.deleteRecipe({ path: { id: recipe.value.id } })
    message.success('Rezept erfolgreich gelöscht.')
    router.push('/recipes')
  } catch {
    message.error('Rezept konnte nicht gelöscht werden.')
  }
}

await loadRecipe()
</script>
