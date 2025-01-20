<script lang="ts" setup>
import { type PlanResponseDto, type PlanResponseMealDto, PlansService } from '@/api'
import { NumberFormField, StringFormField } from '@/components/form'
import RecipeCard from '@/domains/templates/components/RecipeCard.vue'
import { useI18n } from 'vue-i18n'
import BaseButton from '@/components/baseButton/BaseButton.vue'
import RecipeSearch from '@/domains/templates/components/RecipeSearch.vue'
import { getWeekdays } from '@/utils/intlUtils.ts'
import { useMessage } from '@/components/message/useMessage.ts'
import DropPlanner from '@/components/dropPlanner/DropPlanner.vue'
import { usePlanForm } from '@/domains/templates/composables/usePlanForm.ts'
import { useField } from 'vee-validate'
import { useRouter } from '@kitbag/router'
import { computed } from 'vue'
import { IconTrash } from '@iconify-prerendered/vue-fa-solid'

const props = defineProps<{
  initialValues?: PlanResponseDto
}>()

const { resetForm, handleSubmit } = usePlanForm(props.initialValues)
const { value: meals } = useField<PlanResponseMealDto[]>('meals')
const { value: days } = useField<number>('days')
const { locale } = useI18n()
const { showMessage } = useMessage()
const { push, back } = useRouter()
const columns = computed(() => getWeekdays(locale.value, days.value).map((day) => ({ title: day })))

const onSubmit = handleSubmit(async (values) => {
  // TODO: Before submit schema transformation
  if (props.initialValues) {
    await PlansService.updatePlan({
      path: { id: props.initialValues.id },
      body: {
        name: values.name,
        days: values.days,
        meals: values.meals?.map((meal) => ({ dayIndex: meal.dayIndex, recipeId: meal.recipe.id })),
      },
    })

    showMessage('Updated')
  } else {
    await PlansService.createPlan({
      body: {
        name: values.name,
        days: values.days,
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

    if (history.length) {
      back()
    } else {
      push('/plans')
    }
  }
}
</script>

<template>
  <form @submit="onSubmit">
    <div class="flex gap-4">
      <StringFormField path="name" />
      <NumberFormField path="days" :disabled="initialValues" />
      <BaseButton @click="deletePlan" label="Delete" />
      <BaseButton type="submit" label="Save" />
    </div>

    <div class="flex gap-4">
      <RecipeSearch />

      <DropPlanner
        :columns
        v-model="meals"
        v-slot="{ value, itemProps, handleDelete }"
        @add="showMessage('Not implemented')"
      >
        <div class="relative">
          <BaseButton
            class="absolute -top-5 -right-5"
            @click="handleDelete(value)"
            theme="danger"
            rounded
          >
            <template #icon>
              <IconTrash />
            </template>
          </BaseButton>
          <RecipeCard :recipe="value.recipe" v-bind="itemProps" />
        </div>
      </DropPlanner>
    </div>
  </form>
</template>
