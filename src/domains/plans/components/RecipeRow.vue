<script setup lang="ts">
import RecipeColumn from './RecipeColumn.vue'
import type { RecipeResponseDto } from '@/api'

defineProps<{
  meals: RecipeResponseDto[][]
}>()
</script>

<template>
  <div class="flex">
    <RecipeColumn v-for="(recipes, key) in meals" :key :recipes />
  </div>
</template>
