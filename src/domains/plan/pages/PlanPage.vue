<script lang="ts" setup>
import BaseButton from '@/components/baseButton/BaseButton.vue'
import PageLayout from '@/components/PageLayout.vue'
import { useDialog } from '@/components/baseDialog/useDialog.ts'
import AddIngredientsDialog from '@/domains/plan/components/AddIngredientsDialog.vue'
import { ProductsService } from '@/api'

const { showDialog } = useDialog('import-dialog')

async function addIngredients() {
  await ProductsService.createProduct({
    body: {
      type: 'recipes',
      recipeIds: ['b1903f67-55b6-4e88-9d45-aa3912f012ea'],
    },
  })
}

async function insertTemplate() {
  const returnValues = await showDialog()

  console.log(returnValues)
}
</script>

<template>
  <PageLayout title="Plan">
    <BaseButton label="Insert Template into plan" @click="insertTemplate" />
    <BaseButton label="Add ingredients to cart" @click="addIngredients" />
    <AddIngredientsDialog name="import-dialog" />
  </PageLayout>
</template>
