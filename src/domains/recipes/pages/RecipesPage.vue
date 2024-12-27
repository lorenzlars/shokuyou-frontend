<template>
  <div>
    <h1>Recipes</h1>

    <div v-for="(recipe, key) in recipes" :key>
      {{ recipe.name }} {{ recipe.description }}
      <button @click="removeRecipe(recipe?.id as string)">Delete</button>
    </div>

    <button @click="addRecipe">Create</button>
  </div>
</template>

<script lang="ts" setup>
import { type Recipe, RecipesService } from '@/api'
import { shallowRef } from 'vue'

const recipes = shallowRef<Recipe[]>([])

await loadRecipes()

async function addRecipe() {
  await RecipesService.createRecipe({
    body: {
      name: 'Name',
      description: 'Description',
    },
  })

  await loadRecipes()
}

async function removeRecipe(id: string) {
  await RecipesService.deleteRecipe({
    path: {
      id,
    },
  })

  await loadRecipes()
}

async function loadRecipes() {
  const { data } = await RecipesService.getRecipes()

  recipes.value = data ?? []
}
</script>
