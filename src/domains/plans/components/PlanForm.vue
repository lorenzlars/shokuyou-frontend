<script lang="ts" setup>
import { type PlanResponseDto, type PlanResponseMealDto, PlansService } from '@/api'
import { StringFormField } from '@/components/form'
import RecipeCard from '@/domains/plans/components/RecipeCard.vue'
import { useI18n } from 'vue-i18n'
import BaseButton from '@/components/baseButton/BaseButton.vue'
import RecipeSearch from '@/domains/plans/components/RecipeSearch.vue'
import { getWeekdays } from '@/utils/intlUtils.ts'
import { useMessage } from '@/components/message/useMessage.ts'
import DropPlanner from '@/components/dropPlanner/DropPlanner.vue'
import { usePlanForm } from '@/domains/plans/composables/usePlanForm.ts'
import { useField } from 'vee-validate'

const props = defineProps<{
  initialValues?: PlanResponseDto
}>()

const { resetForm, handleSubmit } = usePlanForm(props.initialValues)
const { value: meals } = useField<PlanResponseMealDto[]>('meals')
const { locale } = useI18n()
const { showMessage } = useMessage()
const columns = getWeekdays(locale.value).map((day) => ({ title: day }))

const onSubmit = handleSubmit(async (values) => {
  if (props.initialValues) {
    await PlansService.updatePlan({
      path: { id: props.initialValues.id },
      body: {
        name: values.name,
        meals: values.meals?.map((meal) => ({ dayIndex: meal.dayIndex, recipeId: meal.recipe.id })),
      },
    })

    showMessage('Updated')
  } else {
    await PlansService.createPlan({
      body: {
        ...values,
        meals: values.meals?.map((meal) => ({ ...meal, recipeId: meal.recipe.id })),
      },
    })

    showMessage('Saved')
  }
})

async function deletePlan() {
  if (props.initialValues) {
    await PlansService.removePlan({
      path: { id: props.initialValues.id },
    })

    resetForm()
    showMessage('Deleted')
  }
}
</script>

<template>
  <form @submit="onSubmit">
    <div class="flex gap-4">
      <StringFormField path="name" />
      <BaseButton @click="deletePlan" label="Delete" />
      <BaseButton type="submit" label="Save" />
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
</template>
