<script lang="ts" setup>
import type { Route } from '@kitbag/router';

export type MenuOption = {
  label: string
  name: Route['name']
}

defineProps<{
  options: MenuOption[]
}>()
</script>

<template>
  <ul class="flex gap-2 list-none font-bold text-md">
    <li v-for="(option, key) in options" :key>
      <RouterLink
        class="no-underline inline-block border-b-2 pb-1 font-normal border-transparent hover:decoration-none hover:border-gray-200 transition-border-color duration-300"
        :to="(resolve) => resolve(option.name)" v-slot="{ isMatch }">
        <span :class="{ 'text-green-500': isMatch }">{{ option.label }}</span>
      </RouterLink>
    </li>
  </ul>
</template>
