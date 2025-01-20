<script lang="ts" setup generic="T extends Record<string, unknown>">
import type DataTableColumn from '@/components/dataTable/DataTableColumn.vue'
import { computed } from 'vue'
import DataTableRow from '@/components/dataTable/DataTableRow.vue'

defineProps<{
  values: T[]
  keyPath: keyof T
}>()
const slots = defineSlots<{
  default(): (typeof DataTableColumn)[]
  details?: (props: { value: T; index: number }) => unknown
}>()
const emit = defineEmits<{
  rowClick: [value: T]
}>()

const columns = computed(() => slots?.default())
</script>

<template>
  <table
    class="w-full table-auto border-collapse border border-neutral-3 rounded-lg text-dark overflow-hidden"
  >
    <thead class="bg-neutral-1">
      <tr>
        <th
          v-for="{ props } in columns"
          :key="props.path"
          class="p-4 text-left border-b border-neutral-3"
        >
          {{ props.title }}
        </th>
        <th v-if="slots.details" class="p-4" />
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="(value, index) in values"
        :key="value[keyPath] as string"
        class="bg-neutral-2 even:bg-neutral-1 hover:bg-neutral-3 even:hover:bg-neutral-3 cursor-pointer relative"
        @click="emit('rowClick', value)"
      >
        <DataTableRow :value :index :columns>
          <template #details="props" v-if="slots.details">
            <slot name="details" v-bind="props" />
          </template>
        </DataTableRow>
      </tr>
    </tbody>
  </table>
</template>
