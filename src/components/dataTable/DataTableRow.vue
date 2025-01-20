<script lang="ts" setup generic="T extends Record<string, unknown>">
import type DataTableColumn from '@/components/dataTable/DataTableColumn.vue'
import { shallowRef } from 'vue'
import BaseButton from '@/components/baseButton/BaseButton.vue'
import { IconArrowDown, IconArrowUp } from '@iconify-prerendered/vue-fa-solid'

defineProps<{
  value: T
  index: number
  columns: (typeof DataTableColumn)[]
}>()
const slots = defineSlots<{
  details?: (props: { value: T; index: number }) => unknown
}>()

const collapsed = shallowRef<boolean>(true)
</script>

<template>
  <td class="p-4 border-b border-neutral-3" :class="{ 'h-50': !collapsed }">
    <component
      v-if="columns[0].children && columns[0].children.default"
      :is="columns[0].children.default"
      v-bind="{ value, index }"
    />

    <template v-else>{{ value[columns[0].props.path] }}</template>

    <Transition name="fade">
      <div v-if="!collapsed" class="absolute bottom-0 right-0 left-0">
        <slot name="details" v-bind="{ value, index }" />
      </div>
    </Transition>
  </td>

  <td
    v-for="{ props, children } in columns.slice(1)"
    :key="props.path"
    class="p-4 border-b border-neutral-3"
  >
    <component
      v-if="children && children.default"
      :is="children.default"
      v-bind="{ value, index }"
    />

    <template v-else>{{ value[props.path] }}</template>
  </td>

  <td v-if="slots.details">
    <BaseButton @click.stop="collapsed = !collapsed">
      <IconArrowUp v-if="collapsed" />
      <IconArrowDown v-else />
    </BaseButton>
  </td>
</template>

<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
  transition: all 180ms ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(20px);
}
</style>
