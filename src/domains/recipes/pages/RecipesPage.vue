<template>
  <div>
    <div class="flex justify-between items-center">
      <h1>Recipes</h1>

      <NButton type="primary" @click="push('recipe-create')">Create</NButton>
    </div>

    <NDataTable :pagination :row-props="rowProps" :data :columns="columns" :loading :row-key="rowKey" remote />
  </div>
</template>

<script lang="ts" setup>
import { type GetRecipeResponse, type Recipe, RecipesService } from '@/api'
import { NDataTable, NButton } from 'naive-ui'
import { useRouter } from '@kitbag/router'
import { usePagination, type PaginationParameters } from '@/composables/usePagination'

const { push } = useRouter()
const { pagination, data, loading } = usePagination<Recipe>({
  showSizePicker: true,
  pageSizes: [5, 10, 20, 50],
}, async (parameters: PaginationParameters) => {
  const { data } = await RecipesService.getRecipes({
    query: parameters,
  })

  if (!data) {
    throw new Error('No data')
  }

  return data
})

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

function rowProps(row: GetRecipeResponse) {
  return {
    style: 'cursor: pointer;',
    onClick: () => {
      push(`/recipes/${row.id}`)
    },
  }
}

function rowKey(rowData: Recipe) {
  return rowData.id
}
</script>
