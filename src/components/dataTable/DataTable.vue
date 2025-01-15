<script lang="ts" setup generic="T extends Record<string, unknown>">
import type DataTableColumn from '@/components/dataTable/DataTableColumn.vue'
import { computed } from 'vue'

defineProps<{
  values: T[]
  keyPath: keyof T
}>()
const emit = defineEmits<{
  rowClick: [value: T]
}>()
const slots = defineSlots<{
  default(): typeof DataTableColumn
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
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="value in values"
        :key="value[keyPath] as string"
        class="bg-neutral-2 even:bg-neutral-1 hover:bg-neutral-3 even:hover:bg-neutral-3 cursor-pointer"
        @click="emit('rowClick', value)"
      >
        <td
          v-for="{ props, children } in columns"
          :key="props.path"
          class="p-4 border-b border-neutral-3"
        >
          <component v-if="children" :is="children.default" v-bind="{ value }" />
          <template v-else>{{ value[props.path] }}</template>
        </td>
      </tr>
    </tbody>
  </table>
</template>
