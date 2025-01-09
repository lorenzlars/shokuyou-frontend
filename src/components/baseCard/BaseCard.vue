<script lang="ts" setup>
defineProps<{
  title?: string
  description?: string
}>()
</script>

<template>
  <div
    class="flex flex-col border-4 border-solid border-neutral-3 rounded-xl overflow-hidden text-dark bg-neutral-3"
  >
    <div v-if="$slots.cover" class="h-56 overflow-hidden">
      <div class="flex justify-center items-center w-full h-full">
        <slot name="cover" />
      </div>
    </div>

    <div class="px-3 bg-neutral-1 grow">
      <slot>
        <h3 v-if="title">{{ title }}</h3>

        <p v-if="description">{{ description }}</p>
      </slot>
    </div>
  </div>
</template>
