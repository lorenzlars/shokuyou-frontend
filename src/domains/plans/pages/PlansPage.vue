<script lang="ts" setup>
import { PlansService } from '@/api'
import { unwrapResponseData } from '@/components/form'
import PageLayout from '@/components/PageLayout.vue'
import RecipeCard from '@/domains/plans/components/RecipeCard.vue'
import { ref, shallowRef, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import BaseButton from '@/components/baseButton/BaseButton.vue'
import RecipeSearch from '@/domains/plans/components/RecipeSearch.vue'
import { getWeekdays } from '@/utils/intlUtils.ts'
import BaseSelect from '@/components/baseSelect/BaseSelect.vue'
import { useMessage } from '@/components/message/useMessage.ts'
import DropPlanner from '@/components/dropPlanner/DropPlanner.vue'

const plansList = unwrapResponseData(await PlansService.getPlans())
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
const plans = plansList.content.map((plan) => ({ value: plan.id, label: plan.name }))
const selectedPlan = shallowRef()
const { locale } = useI18n()
const { showMessage } = useMessage()
const plan = ref([])
const columns = getWeekdays(locale.value).map((day) => ({ title: day }))

watch(selectedPlan, async () => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  plan.value = unwrapResponseData(
    await PlansService.getPlan({ path: { id: selectedPlan.value } }),
  ).meals
})

async function save() {
  await PlansService.createPlan({
    body: {
      name: 'test',
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      meals: plan.value.map((recipe) => ({ recipeId: recipe.id, dayIndex: recipe.dayIndex })),
    },
  })
}
</script>

<template>
  <PageLayout title="Plans">
    <div class="flex gap-4">
      <BaseButton @click="save" label="Save" />
      <BaseSelect v-model="selectedPlan" :options="plans" />
    </div>

    <div class="flex gap-4">
      <RecipeSearch />

      <DropPlanner
        :columns
        v-model="plan"
        v-slot="{ value, itemProps }"
        @add="showMessage('Not implemented')"
      >
        <RecipeCard :recipe="value" v-bind="itemProps" />
      </DropPlanner>
    </div>
  </PageLayout>
</template>
