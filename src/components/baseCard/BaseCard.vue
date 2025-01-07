<script lang="ts" setup>
defineProps<{
  title?: string
  description?: string
}>()
</script>

<template>
  <div
    class="flex flex-col border-1 border-solid border-neutral-1 rounded-xl overflow-hidden text-dark bg-neutral-1"
  >
    <div v-if="$slots.cover" class="h-56 overflow-hidden">
      <div class="flex justify-center items-center w-full h-full">
        <slot name="cover" />
      </div>
    </div>

    <div class="px-3">
      <slot>
        <h3 v-if="title">{{ title }}</h3>

        <p v-if="description">{{ description }}</p>
      </slot>
    </div>
  </div>
</template>
