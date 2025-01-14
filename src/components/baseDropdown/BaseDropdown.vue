<script lang="ts" setup generic="T = Record<string, unknown> | string | number">
import { shallowRef, watch } from 'vue'
import { IconCaretDown, IconCaretUp } from '@iconify-prerendered/vue-fa-solid'

const props = defineProps<{
  id?: string
  options: T[]
  labelName?: keyof T
  valueName?: keyof T
}>()
const modelValue = defineModel<unknown>()
const selectedOption = shallowRef<T>()
const isOpen = shallowRef(false)

watch(selectedOption, (value) => {
  if (value) {
    modelValue.value = props.valueName ? value[props.valueName] : value
  }
})

function onOptionClick(option: T) {
  selectedOption.value = option
  isOpen.value = false
}
</script>

<template>
  <div class="relative">
    <div
      @click="isOpen = !isOpen"
      class="relative text-dark p-3 h-12 rounded-xl box-border disabled:cursor-not-allowed min-w-64 cursor-pointer"
      bg="light disabled:neutral-1"
      border="2 solid neutral-3 hover:neutral-3/90"
    >
      <span v-if="selectedOption">
        {{ labelName ? selectedOption[labelName] : selectedOption }}
      </span>
      <span class="absolute right-3">
        <IconCaretDown v-if="isOpen" />
        <IconCaretUp v-else />
      </span>
    </div>
    <div
      v-if="isOpen"
      class="absolute w-full z-10 bg-light overflow-hidden rounded-xl"
      border="2 solid neutral-3 hover:neutral-3/90"
    >
      <div
        v-for="(option, key) in options"
        class="p-2 cursor-pointer"
        :key
        @click="onOptionClick(option)"
      >
        {{ labelName ? option[labelName] : option }}
      </div>
    </div>
  </div>
  <!--    <select :id v-model="modelValue" class="display-none">-->
  <!--      <option v-for="option in options" :key="option.value" :value="option.value" />-->
  <!--    </select>-->
</template>
