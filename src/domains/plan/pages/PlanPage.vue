<script lang="ts" setup>
import BaseButton from '@/components/baseButton/BaseButton.vue'
import PageLayout from '@/components/PageLayout.vue'
import { useDialog } from '@/components/baseDialog/useDialog.ts'
import AddIngredientsDialog from '@/domains/plan/components/AddIngredientsDialog.vue'
import { ProductsService, type ScheduledMealResponseDto, ScheduledMealsService } from '@/api'
import { useAsyncPromise } from '@/composables/useAsyncPromise.ts'
import { unwrapResponseData } from '@/components/form'

const { showDialog } = useDialog('import-dialog')
const { execute: loadPlan, data: plan } = useAsyncPromise(
  async () => {
    const response = unwrapResponseData(
      await ScheduledMealsService.getScheduledMeals({
        query: {
          from: new Date(1).toISOString(),
          to: new Date('2025-01-21').toISOString(),
        },
      }),
    )

    return response.content
  },
  () => [] as ScheduledMealResponseDto[],
)

async function addMeal() {
  await ScheduledMealsService.createScheduledMeal({
    body: {
      meals: [
        {
          recipeId: 'b1903f67-55b6-4e88-9d45-aa3912f012ea',
          datetime: new Date().toISOString(),
        },
      ],
    },
  })
  await loadPlan()
}

async function addIngredients() {
  await ProductsService.createProduct({
    body: {
      type: 'recipes',
      recipeIds: ['b1903f67-55b6-4e88-9d45-aa3912f012ea'],
    },
  })
}

async function deleteMeal(id: string) {
  await ScheduledMealsService.deleteScheduledMeal({ path: { id } })
  await loadPlan()
}

async function insertTemplate() {
  const returnValues = await showDialog()

  console.log(returnValues)
}

await loadPlan()
</script>

<template>
  <PageLayout title="Plan">
    <BaseButton label="Insert Template into plan" @click="insertTemplate" />
    <BaseButton label="Add ingredients to cart" @click="addIngredients" />
    <BaseButton label="Add meal" @click="addMeal" />
    <AddIngredientsDialog name="import-dialog" />

    <div>
      <p v-for="(meal, key) in plan" :key>
        <span>{{ meal.recipe.name }}</span>
        <BaseButton label="Delete" @click="deleteMeal(meal.id)" />
      </p>
    </div>
  </PageLayout>
</template>
