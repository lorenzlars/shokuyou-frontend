<script lang="ts" setup>
import { shallowRef, useTemplateRef, watch } from 'vue'
import BaseSkeleton from '@/components/BaseSkeleton.vue'

defineProps<{
  src: string
  alt: string
}>()

const imgElement = useTemplateRef('img')
const loading = shallowRef(true)

watch(
  imgElement,
  (element) => {
    if (element) {
      element.addEventListener('loaded', () => {
        loading.value = false
      })
    }
  },
  { once: true },
)
</script>

<template>
  <BaseSkeleton v-show="loading" class="h-full w-full" />
  <img v-show="!loading" ref="img" :src :alt />
</template>
