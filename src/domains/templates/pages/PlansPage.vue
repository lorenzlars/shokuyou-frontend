<script lang="ts" setup>
import { PlansService } from '@/api'
import { unwrapResponseData } from '@/components/form'
import DataTable from '@/components/dataTable/DataTable.vue'
import DataTableColumn from '@/components/dataTable/DataTableColumn.vue'
import PageLayout from '@/components/PageLayout.vue'
import BaseButton from '@/components/baseButton/BaseButton.vue'
import { IconPlus } from '@iconify-prerendered/vue-fa-solid'
import { useRouter } from '@kitbag/router'
import { useAsyncPromise } from '@/composables/useAsyncPromise.ts'

const { push } = useRouter()
const { execute, data: plans } = useAsyncPromise(
  async () => {
    const plans = unwrapResponseData(await PlansService.getPlans())

    return plans.content
  },
  () => [],
)

await execute()
</script>

<template>
  <PageLayout title="Templates">
    <BaseButton label="Create" @click="push('template-create')">
      <template #icon>
        <IconPlus />
      </template>
    </BaseButton>

    <DataTable :values="plans" key-path="id" @row-click="(value) => push(`/templates/${value.id}`)">
      <DataTableColumn path="name" title="Name" />
    </DataTable>
  </PageLayout>
</template>
