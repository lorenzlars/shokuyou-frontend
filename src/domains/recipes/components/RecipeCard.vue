<script lang="ts" setup>
import type { RecipeResponseDto } from '@/api'
import BaseCard from '@/components/baseCard/BaseCard.vue'
import ImageSelectorEmpty from '@/components/imageSelector/ImageSelectorEmpty.vue'

defineProps<{
  recipe: RecipeResponseDto
}>()
</script>

<template>
  <BaseCard :title="recipe.name" :description="recipe.description">
    <template #cover>
      <img
        v-if="recipe.imageUrl"
        class="object-cover object-center w-full h-full"
        :src="recipe.imageUrl"
        :alt="recipe.name"
      />

      <ImageSelectorEmpty v-else class="h-full w-full" />
    </template>
  </BaseCard>
</template>

<style lang="scss" scoped></style>
