<script setup lang="ts">
import { IconCheck, IconTimes } from '@iconify-prerendered/vue-fa-solid'
export type ValidationRule = {
  regex: RegExp
  hint: string
}

const props = defineProps<{
  value?: string
  rules: ValidationRule[]
}>()

function validate(rule: RegExp) {
  if (!props.value) {
    return false
  }

  return rule.test(props.value)
}

// TODO: a11y
</script>

<template>
  <div class="text-text">
    <p class="m-0">
      <small class="flex gap-2 items-center" v-for="(rule, key) in rules" :key>
        <span class="leading-0 w-3">
          <IconCheck class="text-success" v-if="validate(rule.regex)" />
          <IconTimes class="text-danger" v-else />
        </span>
        <span>{{ rule.hint }}</span>
      </small>
    </p>
  </div>
</template>
