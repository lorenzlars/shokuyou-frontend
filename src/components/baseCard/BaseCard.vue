<script lang="ts" setup>
import { type RegisteredRouterRoute, RouterLink } from '@kitbag/router'

defineProps<{
  to?: RegisteredRouterRoute
  title?: string
  description?: string
}>()
</script>

<template>
  <component
    :is="to ? RouterLink : 'div'"
    :to
    class="flex flex-col p-4 border-2 border-solid border-neutral-2 rounded-xl overflow-hidden text-dark bg-light focus:outline-none focus:border-primary box-border"
  >
    <div v-if="$slots.cover" class="h-56 overflow-hidden rounded-lg">
      <div class="flex justify-center items-center w-full h-full">
        <slot name="cover" />
      </div>
    </div>

    <div class="bg-light grow">
      <slot>
        <h3 v-if="title">{{ title }}</h3>

        <p class="m-0" v-if="description">{{ description }}</p>
      </slot>
    </div>
  </component>
</template>
