<script setup lang="ts">
import RecipeCard from './RecipeCard.vue'
import { computed, shallowRef } from 'vue'
import type { RecipeResponseDto } from '@/api'
import BaseInput from '@/components/baseInput/BaseInput.vue'

const recipes = [
  {
    name: 'eins',
  },
  {
    name: 'zwei',
  },
  {
    name: 'drei',
  },
] as RecipeResponseDto[]
const filterString = shallowRef()
const filteredRecipes = computed(() => {
  if (!filterString.value) {
    return recipes
  }

  return recipes.filter((recipe) => recipe.name.search(filterString.value) !== -1)
})
</script>

<template>
  <div>
    <h2>Recipes</h2>
    <BaseInput v-model="filterString" />
    <div class="flex flex-column gap-3">
      <RecipeCard v-for="recipe in filteredRecipes" :key="recipe.id" :recipe />
    </div>
  </div>
</template>
