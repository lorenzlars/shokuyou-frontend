<template>
  <div class="about">
    <h1>This is an about page</h1>

    <div>
      <div v-for="recipe in recipes">
        {{recipe.name}} {{recipe.description}}
      </div>

      <button @click="addRecipe">Create</button>

    </div>



  </div>
</template>

<script lang="ts" setup>
import { createRecipe, type CreateRecipeDto, getRecipes } from '@/api'
import { shallowRef } from 'vue'

const recipes = shallowRef<CreateRecipeDto[]>([])

await loadRecipes()

async function addRecipe() {
  await createRecipe({
    body: {
      name: 'Name',
      description: 'Description',
    }
  })

  await loadRecipes()
}

async function loadRecipes() {
  const {data} = await getRecipes()

  recipes.value = data
}
</script>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
