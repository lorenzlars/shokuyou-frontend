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
    key: 'name',
  },
  {
    title: 'Description',
    key: 'description',
  },
]
const pagination = reactive({
  page: 1,
  pageSize: 10,
  showSizePicker: true,
  pageSizes: [5, 10, 20, 50],
  onChange: (page: number) => {
    pagination.page = page

    loadRecipes()
  },
  onUpdatePageSize: (pageSize: number) => {
    pagination.pageSize = pageSize
    pagination.page = 1

    loadRecipes()
  },
})
const rowProps = (row: GetRecipeResponse) => {
  return {
    style: 'cursor: pointer;',
    onClick: () => {
      push(`/recipes/${row.id}`)
    },
  }
}

await loadRecipes()

async function loadRecipes() {
  const { data } = await RecipesService.getRecipes({
    query: {
      page: pagination.page,
      pageSize: pagination.pageSize,
    },
  })

  recipes.value = data?.content ?? []
}
</script>
