<script lang="ts" setup>
withDefaults(
  defineProps<{
    label?: string
    type?: HTMLButtonElement['type']
    style?: 'default' | 'primary' | 'danger'
  }>(),
  {
    type: 'button',
    style: 'default',
  },
)
</script>

<template>
  <button :type class="p-2 rounded-2 border-none cursor-pointer" :class="[`bg-${style}`]">
    <slot>
      {{ label }}
    </slot>
  </button>
</template>

<style lang="scss" scoped></style>
