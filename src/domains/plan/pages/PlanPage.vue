<script lang="ts" setup>
import BaseButton from '@/components/baseButton/BaseButton.vue'
import PageLayout from '@/components/PageLayout.vue'
import AddIngredientsDialog from '@/domains/plan/components/AddIngredientsDialog.vue'
import { MealsService, type ScheduledMealResponseDto } from '@/api'
import { useAsyncPromise } from '@/composables/useAsyncPromise.ts'
import { unwrapResponseData } from '@/components/form'

const { execute: loadPlan, data: plan } = useAsyncPromise(
  async () => {
    const response = unwrapResponseData(
      await MealsService.getMeals({
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
  await MealsService.createMeal({
    body: {
      recipeId: 'b1903f67-55b6-4e88-9d45-aa3912f012ea',
      datetime: new Date().toISOString(),
    },
  })
  await loadPlan()
}

async function addIngredients() {
  // await ProductsService.createProduct({
  //   body: {
  //     type: 'recipes',
  //     recipeIds: ['b1903f67-55b6-4e88-9d45-aa3912f012ea'],
  //   },
  // })
}

async function deleteMeal(id: string) {
  await MealsService.deleteMeal({ path: { id } })
  await loadPlan()
}

async function insertTemplate() {
  // const returnValues = await showDialog()
  //
  // if (returnValues) {
  //   const plan = await TemplatesService.getTemplate({
  //     path: { id: returnValues.id },
  //   })
  //
  //   const dayIndexMap = new Map<number, PlanResponseMealDto>()
  // }
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
        <span>{{ meal.datetime }}</span>
        <span>{{ meal.recipe.name }}</span>
        <BaseButton label="Delete" @click="deleteMeal(meal.id)" />
      </p>
    </div>
  </PageLayout>
</template>
