<script lang="ts" setup>
import { type PlanResponseMealDto, PlansService } from '@/api'
import { StringFormField, unwrapResponseData } from '@/components/form'
import PageLayout from '@/components/PageLayout.vue'
import RecipeCard from '@/domains/plans/components/RecipeCard.vue'
import { shallowRef } from 'vue'
import { useI18n } from 'vue-i18n'
import BaseButton from '@/components/baseButton/BaseButton.vue'
import RecipeSearch from '@/domains/plans/components/RecipeSearch.vue'
import { getWeekdays } from '@/utils/intlUtils.ts'
import BaseDropdown from '@/components/baseDropdown/BaseDropdown.vue'
import { useMessage } from '@/components/message/useMessage.ts'
import DropPlanner from '@/components/dropPlanner/DropPlanner.vue'
import { usePlanForm } from '@/domains/plans/composables/usePlanForm.ts'
import { useField } from 'vee-validate'
import { useAsyncPromise } from '@/composables/useAsyncPromise.ts'

const {
  execute,
  loading,
  data: plans,
} = useAsyncPromise(
  async () => {
    const plans = unwrapResponseData(await PlansService.getPlans())

    return plans.content
  },
  () => [],
)
const selectedPlanId = shallowRef<string>()
const { setValues, resetForm, handleSubmit, values } = usePlanForm()
const { value: meals } = useField<PlanResponseMealDto[]>('meals')
const { locale } = useI18n()
const { showMessage } = useMessage()
const columns = getWeekdays(locale.value).map((day) => ({ title: day }))

const onSubmit = handleSubmit(async (values) => {
  await PlansService.createPlan({
    body: {
      ...values,
      meals: values.meals?.map((meal) => ({ ...meal, recipeId: meal.recipe.id })),
    },
  })
  await execute()

  showMessage('Saved')
})

async function loadPlan() {
  if (selectedPlanId.value) {
    const plan = unwrapResponseData(
      await PlansService.getPlan({
        path: { id: selectedPlanId.value },
      }),
    )

    setValues(plan)
    showMessage('Loaded')
  }
}

async function deletePlan() {
  if (selectedPlanId.value) {
    await PlansService.removePlan({
      path: { id: selectedPlanId.value },
    })
    await execute()

    resetForm()
    showMessage('Deleted')
  }
}

async function planUpdated() {
  if (selectedPlanId.value) {
    await PlansService.updatePlan({
      path: { id: selectedPlanId.value },
      body: {
        name: values.name,
        meals: values.meals?.map((meal) => ({ dayIndex: meal.dayIndex, recipeId: meal.recipe.id })),
      },
    })
    await execute()

    showMessage('Updated')
  }
}

await execute()
</script>

<template>
  <PageLayout title="Plans">
    <form @submit="onSubmit">
      <div class="flex gap-4">
        <StringFormField path="name" />
        <BaseDropdown v-model="selectedPlanId" :options="plans" label-name="name" value-name="id" />
        <BaseButton @click="loadPlan" label="Load" :disabled="!selectedPlanId" :loading />
        <BaseButton @click="planUpdated" label="Update" :disabled="!selectedPlanId" :loading />
        <BaseButton @click="deletePlan" label="Delete" :disabled="!selectedPlanId" :loading />
        <BaseButton type="submit" label="Save" :loading />
      </div>

      <div class="flex gap-4">
        <RecipeSearch />

        <DropPlanner
          :columns
          v-model="meals"
          v-slot="{ value, itemProps }"
          @add="showMessage('Not implemented')"
        >
          <RecipeCard :recipe="value.recipe" v-bind="itemProps" />
        </DropPlanner>
      </div>
    </form>
  </PageLayout>
</template>
