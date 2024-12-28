<template>
  <div>
    <div class="flex justify-between items-center">
      <h1>Recipes</h1>

      <NButton type="primary" @click="push('recipe-create')">Create</NButton>
    </div>

    <NDataTable :pagination :row-props="rowProps" :data="recipes" :columns="columns" />
  </div>
</template>

<script lang="ts" setup>
import { type GetRecipeResponse, type Recipe, RecipesService } from '@/api'
import { reactive, shallowRef } from 'vue'
import { NDataTable, NButton } from 'naive-ui'
import { useRouter } from '@kitbag/router'

const recipes = shallowRef<Recipe[]>([])
const { push } = useRouter()
const columns = [
  {
    title: 'Name',
    key: 'name'
  },
  {
    title: 'Description',
    key: 'description'
  },
]
const pagination = reactive({
  page: 2,
  pageSize: 5,
  showSizePicker: true,
  pageSizes: [3, 5, 7],
  onChange: (page: number) => {
    pagination.page = page
  },
  onUpdatePageSize: (pageSize: number) => {
    pagination.pageSize = pageSize
    pagination.page = 1
  }
})
const rowProps = (row: GetRecipeResponse) => {
  return {
    style: 'cursor: pointer;',
    onClick: () => {
      push(`/recipes/${row.id}`)
    }
  }
}

await loadRecipes()

async function addRecipe() {
  await RecipesService.createRecipe({
    body: {
      name: 'Name',
      description: 'Description',
    },
  })

  await loadRecipes()
}

async function removeRecipe(id: string) {
  await RecipesService.deleteRecipe({
    path: {
      id,
    },
  })

  await loadRecipes()
}

async function loadRecipes() {
  const { data } = await RecipesService.getRecipes()

  recipes.value = data ?? []
}
</script>
