<script lang="ts" setup generic="T = Record<string, unknown> | string | number">
import { onUnmounted, shallowRef, useTemplateRef, watch } from 'vue'
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
const dropdownElement = useTemplateRef('dropdown')

function handleClickOutside(event: MouseEvent) {
  if (dropdownElement.value && !dropdownElement.value.contains(event.target as Node)) {
    isOpen.value = false
  }
}

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})

watch(selectedOption, (value) => {
  if (value) {
    modelValue.value = props.valueName ? value[props.valueName] : value
  }
})

function onOpenToggle() {
  isOpen.value = !isOpen.value

  if (isOpen.value) {
    document.addEventListener('click', handleClickOutside)
  } else {
    document.removeEventListener('click', handleClickOutside)
  }
}

function onOptionClick(option: T) {
  selectedOption.value = option

  onOpenToggle()
}
</script>

<template>
  <div class="relative">
    <div
      @click.stop="onOpenToggle"
      @keydown.space.prevent="onOpenToggle"
      tabindex="0"
      class="relative text-dark p-3 h-12 rounded-xl box-border disabled:cursor-not-allowed min-w-64 cursor-pointer focus:border-primary"
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
    <transition name="fade" mode="out-in">
      <div
        v-if="isOpen"
        ref="dropdown"
        class="absolute w-full z-10 bg-light overflow-hidden rounded-xl box-border"
        border="2 solid neutral-3 hover:neutral-3/90"
      >
        <div
          v-for="(option, key) in options"
          class="p-2 cursor-pointer hover:bg-neutral-1"
          :key
          @click="onOptionClick(option)"
        >
          <slot name="item" v-bind="{ option }">
            {{ labelName ? option[labelName] : option }}
          </slot>
        </div>
      </div>
    </transition>
  </div>
  <!--    <select :id v-model="modelValue" class="display-none">-->
  <!--      <option v-for="option in options" :key="option.value" :value="option.value" />-->
  <!--    </select>-->
</template>

<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
  transition: all 100ms ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
