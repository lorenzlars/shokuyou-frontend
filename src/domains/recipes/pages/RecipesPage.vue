<script lang="ts" setup>
import { type GetRecipesData, type RecipeResponseDto, RecipesService } from '@/api'
import { useRouter } from '@kitbag/router'
import LazyGrid from '@/components/lazyGrid/LazyGrid.vue'
import { shallowRef } from 'vue'
import type { PaginationResponse } from '@/composables/usePagination.ts'
import RecipeCard from '@/domains/recipes/components/RecipeCard.vue'
import BaseInput from '@/components/baseInput/BaseInput.vue'
import BaseButton from '@/components/baseButton/BaseButton.vue'

const { push } = useRouter()
const filter = shallowRef<string>()
async function loadMore(
  query: GetRecipesData['query'],
): Promise<PaginationResponse<RecipeResponseDto>> {
  const { data } = await RecipesService.getRecipes({
    query,
  })

  return data as PaginationResponse<RecipeResponseDto>
}
</script>

<template>
  <div class="flex flex-col gap-5 py-5">
    <div class="flex justify-between items-center">
      <h1 class="m-0">Recipes</h1>

      <BaseButton label="Create" @click="push('recipe-create')"></BaseButton>
    </div>

    <BaseInput v-model="filter" placeholder="Search recipe name" />

    <LazyGrid :loader="loadMore" :filter v-slot="{ data }">
      <RouterLink :to="`/recipes/${data.id}`">
        <RecipeCard
          :recipe="data"
          class="@hover:scale-101 @hover:shadow-xl duration-300 transition h-full"
        />
      </RouterLink>
    </LazyGrid>
  </div>
</template>
