<script setup lang="ts">
import type { RecipeResponseDto } from '@/api'
import BaseCard from '@/components/baseCard/BaseCard.vue'

defineProps<{
  recipe: RecipeResponseDto
}>()
</script>

<template>
  <BaseCard
    :title="recipe.name"
    :description="recipe.description"
    class="cursor-grab transition-all duration-300 hover:shadow-lg"
  />
</template>
