<script setup lang="ts">
import RecipeCard from './RecipeCard.vue'
import { shallowRef } from 'vue'
import { type GetRecipesData, type RecipeResponseDto, RecipesService } from '@/api'
import BaseInput from '@/components/baseInput/BaseInput.vue'
import LazyGrid from '@/components/lazyGrid/LazyGrid.vue'
import type { PaginationResponse } from '@/composables/usePagination.ts'

const filter = shallowRef('')

async function loadMore(
  query: GetRecipesData['query'],
): Promise<PaginationResponse<RecipeResponseDto>> {
  const { data } = await RecipesService.getRecipes({
    query,
  })

  return data as PaginationResponse<RecipeResponseDto>
}

function startDrag(event: DragEvent, value: RecipeResponseDto) {
  if (event.dataTransfer instanceof DataTransfer) {
    event.dataTransfer.dropEffect = 'copy'
    event.dataTransfer.effectAllowed = 'copy'

    if (event.target instanceof HTMLElement) {
      event.dataTransfer.setData('value', JSON.stringify({ recipe: value }))
    }
  }
}
</script>

<template>
  <aside class="w-64 flex flex-col gap-3">
    <h3 class="m-0">Recipes</h3>
    <BaseInput class="w-full" v-model="filter" placeholder="Search recipe name" />

    <LazyGrid :columns="1" :loader="loadMore" :filter v-slot="{ data }">
      <RecipeCard
        :recipe="data"
        draggable="true"
        @dragstart="startDrag($event, data)"
        :data-id="data.id"
      />
    </LazyGrid>
  </aside>
</template>
