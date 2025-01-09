<script lang="ts" setup>
import { type GetRecipesData, type RecipeResponseDto, RecipesService } from '@/api'
import { useRouter } from '@kitbag/router'
import LazyGrid from '@/components/lazyGrid/LazyGrid.vue'
import { shallowRef } from 'vue'
import type { PaginationResponse } from '@/composables/usePagination.ts'
import RecipeCard from '@/domains/recipes/components/RecipeCard.vue'
import BaseInput from '@/components/baseInput/BaseInput.vue'
import BaseButton from '@/components/baseButton/BaseButton.vue'
import { IconPlus } from '@iconify-prerendered/vue-fa-solid'

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
    <h1 class="text-12 font-black">Recipes</h1>

    <div class="flex justify-between items-center gap-8">
      <BaseInput class="w-full" v-model="filter" placeholder="Search recipe name" />

      <BaseButton label="Create" @click="push('recipe-create')">
        <template #icon>
          <IconPlus />
        </template>
      </BaseButton>
    </div>

    <LazyGrid :loader="loadMore" :filter v-slot="{ data }">
      <RecipeCard
        :recipe="data"
        :to="`/recipes/${data.id}`"
        class="@hover:scale-101 @hover:shadow-xl duration-300 transition h-full w-full"
      />
    </LazyGrid>
  </div>
</template>
