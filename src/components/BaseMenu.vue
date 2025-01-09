<script lang="ts" setup>
import type { Route } from '@kitbag/router'

export type MenuOption = {
  label: string
  name: Route['name']
}

defineProps<{
  options: MenuOption[]
}>()

function checkMatch(href?: string) {
  return href ? document.location.pathname.includes(href) : false
}
</script>

<template>
  <nav>
    <ul class="flex gap-8 list-none font-bold text-md p-0">
      <li v-for="(option, key) in options" :key>
        <RouterLink
          class="no-underline inline-block border-b-2 pb-1 font-normal border-transparent hover:decoration-none hover:border-gray-200 transition-border-color duration-300"
          :to="(resolve) => resolve(option.name)"
          v-slot="{ isMatch, isExactMatch, route }"
        >
          <span
            :class="{
              'text-primary font-bold': isExactMatch || isMatch || checkMatch(route?.href),
            }"
          >
            {{ option.label }}
          </span>
        </RouterLink>
      </li>
    </ul>
  </nav>
</template>
