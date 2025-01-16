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
import { useDialog } from '@/components/baseDialog/useDialog.ts'
import ImportDialog from '@/domains/recipes/components/ImportDialog.vue'

const { push } = useRouter()
const filter = shallowRef<string>()
const { showDialog } = useDialog('import')
async function loadMore(query: GetRecipesData['query']) {
  return unwrapResponseData(
    await RecipesService.getRecipes({
      query,
    }),
  )
}

async function openImportDialog() {
  if (await showDialog()) {
    // TODO: Improve reloading
    window.location.reload()
  }
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

      <BaseButton label="Import" @click="openImportDialog">
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

    <ImportDialog name="import" />
  </PageLayout>
</template>
