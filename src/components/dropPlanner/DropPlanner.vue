<script lang="ts" setup generic="T extends Record<string, unknown> & { dayIndex: number }">
import { computed } from 'vue'
import BaseButton from '@/components/baseButton/BaseButton.vue'

type Column = {
  title: string
}

const modelValue = defineModel<T[]>({ required: true })
defineProps<{
  columns: Column[]
}>()
const emit = defineEmits<{
  add: [dayIndex: number]
}>()

const columnsMap = computed(() => {
  const columnIndexMap = new Map<number, T[]>()

  modelValue.value.forEach((value) => {
    if (!columnIndexMap.has(value.dayIndex)) {
      columnIndexMap.set(value.dayIndex, [])
    }

    columnIndexMap.set(value.dayIndex, columnIndexMap.get(value.dayIndex)!.concat(value))
  })

  return columnIndexMap
})

function startDrag(event: DragEvent, dragValue: T) {
  if (event.dataTransfer instanceof DataTransfer) {
    event.dataTransfer.dropEffect = 'move'
    event.dataTransfer.effectAllowed = 'move'

    if (event.target instanceof HTMLElement) {
      const index = modelValue.value.findIndex((value) => value === dragValue)

      event.dataTransfer.setData('index', index.toString())
      event.dataTransfer.setData('value', JSON.stringify(dragValue))
    }
  }
}

async function onDrop(event: DragEvent, dayIndex: number) {
  event.preventDefault()

  if (event.dataTransfer instanceof DataTransfer) {
    const index = event.dataTransfer.getData('index')
    const value = JSON.parse(event.dataTransfer.getData('value'))

    if (!value) {
      throw new Error('Value needs to be set in drag data transfer object!')
    }

    if (index) {
      modelValue.value.splice(parseInt(index), 1)
    }

    modelValue.value.push({ ...value, dayIndex })
  }
}

function handleDelete(toDelete: T) {
  const index = modelValue.value.findIndex((value) => value === toDelete)

  if (index !== -1) {
    modelValue.value.splice(index, 1)
  }
}
</script>

<template>
  <div class="flex border-1 border-solid border-neutral-3 bg-neutral-1 rounded-xl w-full min-h-64">
    <div
      v-for="(column, dayIndex) in columns"
      :key="dayIndex"
      class="flex-1 flex flex-col border-0 border-l-1 first:border-none border-solid border-neutral-3 first:rounded-l-xl last:rounded-r-xl h-full"
    >
      <div class="flex items-center justify-center p-2">
        <strong>{{ column.title }}</strong>
      </div>
      <div
        @drop="onDrop($event, dayIndex)"
        @dragover.prevent
        class="flex-1 flex flex-col gap-2 p-2"
      >
        <slot
          v-for="(value, slotIndex) in columnsMap.get(dayIndex)?.values()"
          :key="slotIndex"
          v-bind="{
            value,
            handleDelete,
            itemProps: {
              draggable: true,
              ondragstart: (event: DragEvent) => startDrag(event, value),
            },
          }"
        />
        <BaseButton label="Add" theme="passive" @click="emit('add', dayIndex)" />
      </div>
    </div>
  </div>
</template>
