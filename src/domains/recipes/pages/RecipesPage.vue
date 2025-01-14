<script lang="ts" setup>
import { type GetRecipesData, RecipesService } from '@/api'
import { useRouter } from '@kitbag/router'
import LazyGrid from '@/components/lazyGrid/LazyGrid.vue'
import { shallowRef } from 'vue'
import RecipeCard from '@/domains/recipes/components/RecipeCard.vue'
import BaseInput from '@/components/baseInput/BaseInput.vue'
import BaseButton from '@/components/baseButton/BaseButton.vue'
import { IconPlus } from '@iconify-prerendered/vue-fa-solid'
import PageLayout from '@/components/PageLayout.vue'
import { unwrapResponseData } from '@/components/form'

const { push } = useRouter()
const filter = shallowRef<string>()
async function loadMore(query: GetRecipesData['query']) {
  return unwrapResponseData(
    await RecipesService.getRecipes({
      query,
    }),
  )
}
</script>

<template>
  <PageLayout title="Recipes">
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
  </PageLayout>
</template>
