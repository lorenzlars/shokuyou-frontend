<template>
  <div>
    <h1>Recipes</h1>

    <div v-for="recipe in recipes">
      {{ recipe.name }} {{ recipe.description }}
      <button @click="removeRecipe(recipe?.id as string)">Delete</button>
    </div>

    <button @click="addRecipe">Create</button>
  </div>
</template>

<script lang="ts" setup>
import { createRecipe, type CreateRecipeDto, getRecipes, removeRecipeById } from '@/api'
import { shallowRef } from 'vue'

const recipes = shallowRef<CreateRecipeDto[]>([])

await loadRecipes()

async function addRecipe() {
  await createRecipe({
    body: {
      name: 'Name',
      description: 'Description',
    },
  })

  await loadRecipes()
}

async function removeRecipe(id: string) {
  await removeRecipeById({
    path: {
      id,
    },
  })

  await loadRecipes()
}

async function loadRecipes() {
  const { data } = await getRecipes()

  recipes.value = data as CreateRecipeDto[]
}
</script>
