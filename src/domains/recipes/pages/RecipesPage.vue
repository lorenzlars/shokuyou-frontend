<script lang="ts" setup>
import { type GetRecipesData, type RecipeResponseDto, RecipesService } from '@/api'
import { NButton, NCard, NInput } from 'naive-ui'
import { useRouter } from '@kitbag/router'
import LazyGrid from '@/components/LazyGrid.vue'
import { shallowRef } from 'vue'
import type { PaginationResponse } from '@/composables/usePagination.ts'

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
  <div class="flex flex-col gap-5">
    <div class="flex justify-between items-center my-3">
      <h1 class="m-0">Recipes</h1>

      <NButton type="primary" @click="push('recipe-create')">Create</NButton>
    </div>

    <NInput v-model:value="filter" placeholder="Search recipe name" />

    <LazyGrid :loader="loadMore" :filter>
      <template #default="{ data }">
        <RouterLink :to="`/recipes/${data.id}`">
          <NCard :title="data.name" class="h-full">
            <template #cover>
              <img :src="data.imageUrl" />
            </template>

            {{ data.description }}
          </NCard>
        </RouterLink>
      </template>
    </LazyGrid>
  </div>
</template>
