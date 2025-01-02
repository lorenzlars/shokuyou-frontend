<script setup lang="ts">
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
</script>

<template>
  <div class="text-text">
    <div v-for="(rule, key) in rules" :key>
      {{ validate(rule.regex) ? '✅' : '🚫' }} <strong>{{ rule.hint }}</strong>
    </div>
  </div>
</template>
