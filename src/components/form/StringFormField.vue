<script lang="ts" setup>
import BaseInput from '@/components/baseInput/BaseInput.vue'
import FormField, { type FormFieldProps } from './FormField.vue'
import BaseTextarea from '@/components/baseTextarea/BaseTextarea.vue'
const NumberFormField = FormField<string>

defineProps<
  FormFieldProps & {
    type?: HTMLInputElement['type'] | 'textarea'
  }
>()
</script>

<template>
  <NumberFormField :name :label>
    <template #default="field">
      <BaseInput v-if="type !== 'textarea'" v-bind="{ ...field, ...$attrs }" :type />
      <BaseTextarea v-else v-bind="{ ...field, ...$attrs }" />
    </template>

    <template #feedback="props">
      <slot name="feedback" v-bind="props" />
    </template>
  </NumberFormField>
</template>
