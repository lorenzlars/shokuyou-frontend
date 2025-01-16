<script lang="ts" setup>
import { IconTimes } from '@iconify-prerendered/vue-fa-solid'

defineProps<{
  title?: string
}>()

import BaseButton from '@/components/baseButton/BaseButton.vue'
import { useTemplateRef, watch } from 'vue'

const showDialog = defineModel<boolean>('show')
const dialogElement = useTemplateRef('dialog')

watch(dialogElement, (element) => {
  if (element) {
    element.addEventListener('close', (event) => {
      event.preventDefault()
      showDialog.value = false
    })

    element.addEventListener('cancel', (event) => {
      event.preventDefault()
      showDialog.value = false
    })
  }
})
</script>

<template>
  <teleport to="body">
    <transition name="slide" @enter="dialogElement?.showModal()">
      <dialog
        v-if="showDialog"
        class="fixed top-20 my-0 min-w-128 rounded-xl p-0 bg-light border-2 border-solid border-neutral-1 text-dark shadow-lg backdrop:bg-dark/10"
        ref="dialog"
      >
        <div
          class="w-full bg-neutral-1 p-2 flex justify-between items-center box-border rounded-t-xl"
        >
          <span class="text-2xl font-bold ml-2">{{ title }}</span>
          <BaseButton @click="showDialog = false" theme="transparent" rounded>
            <template #icon>
              <IconTimes />
            </template>
          </BaseButton>
        </div>
        <div class="p-4">
          <slot />
        </div>
      </dialog>
    </transition>
  </teleport>
</template>

<style lang="scss" scoped>
.slide {
  &-enter-active,
  &-leave-active {
    transition: all 180ms ease-in-out;

    &::backdrop {
      transition: all 180ms ease-in-out;
      opacity: 1;
    }
  }

  &-enter-from,
  &-leave-to {
    opacity: 0;
    transform: translateY(-1rem);

    &::backdrop {
      opacity: 0;
    }
  }
}
</style>
