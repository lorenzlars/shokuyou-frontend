<script lang="ts" setup>
import type { RecipeResponseDto } from '@/api'
import { IconImage } from '@iconify-prerendered/vue-fa-solid'

defineProps<{
  recipe: RecipeResponseDto
}>()
</script>

<template>
  <div
    class="border-1 border-solid border-gray-500 rounded-lg h-full overflow-hidden @hover:scale-101 @hover:shadow-xl duration-300 transition"
  >
    <div class="h-56">
      <img
        v-if="recipe.imageUrl"
        class="object-cover object-center w-full h-full"
        :src="recipe.imageUrl"
        :alt="recipe.name"
      />

      <div v-else class="flex flex-col items-center justify-center bg-gray-100 h-full">
        <IconImage class="text-5xl text-gray-400" />
      </div>
    </div>
    <div class="px-3">
      <h3>{{ recipe.name }}</h3>

      <p>{{ recipe.description }}</p>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
