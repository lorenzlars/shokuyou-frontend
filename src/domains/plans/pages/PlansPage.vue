<script lang="ts" setup>
import { type GetRecipesData, PlansService, type RecipeResponseDto, RecipesService } from '@/api'
import { unwrapResponseData } from '@/components/form'
import PageLayout from '@/components/PageLayout.vue'
import RecipeCard from '@/domains/plans/components/RecipeCard.vue'
import Planner from '@/components/planner/Planner.vue'
import { ref, shallowRef } from 'vue'
import LazyGrid from '@/components/lazyGrid/LazyGrid.vue'
import type { PaginationResponse } from '@/composables/usePagination.ts'
import BaseInput from '@/components/baseInput/BaseInput.vue'
import { useI18n } from 'vue-i18n'
import BaseButton from '@/components/baseButton/BaseButton.vue'

const response = unwrapResponseData(
  await PlansService.getPlans({
    query: { page: 1, pageSize: 10 },
  }),
)

const { locale } = useI18n()
const filter = shallowRef('')
const plan = ref<RecipeResponseDto[]>([])

async function loadMore(
  query: GetRecipesData['query'],
): Promise<PaginationResponse<RecipeResponseDto>> {
  const { data } = await RecipesService.getRecipes({
    query,
  })

  return data as PaginationResponse<RecipeResponseDto>
}

function startDrag(event: DragEvent, value: RecipeResponseDto) {
  if (event.dataTransfer instanceof DataTransfer) {
    event.dataTransfer.dropEffect = 'copy'
    event.dataTransfer.effectAllowed = 'copy'

    if (event.target instanceof HTMLElement) {
      event.dataTransfer.setData('value', JSON.stringify(value))
    }
  }
}

function getWeekdays() {
  const weekdays = []

  for (let day = 0; day < 7; day++) {
    weekdays.push({
      title: new Intl.DateTimeFormat(locale.value, { weekday: 'long' }).format(
        new Date(1970, 0, 5 + day), // 1970-01-05 is a Monday
      ),
    })
  }

  return weekdays
}

async function save() {
  await PlansService.createPlan({
    body: {
      name: 'test',
      meals: plan.value,
    },
  })
}
</script>

<template>
  <PageLayout title="Plans">
    <BaseButton @click="save" label="Save" />

    <div class="flex gap-4">
      <aside class="w-64 flex flex-col gap-3">
        <h3 class="m-0">Recipes</h3>
        <BaseInput class="w-full" v-model="filter" placeholder="Search recipe name" />

        <LazyGrid :columns="1" :loader="loadMore" :filter v-slot="{ data }">
          <RecipeCard
            :recipe="data"
            draggable="true"
            @dragstart="startDrag($event, data)"
            :data-id="data.id"
          />
        </LazyGrid>
      </aside>

      <Planner :columns="getWeekdays()" v-model="plan" v-slot="{ value, itemProps }">
        <RecipeCard :recipe="value" v-bind="itemProps" />
      </Planner>
    </div>
  </PageLayout>
</template>
