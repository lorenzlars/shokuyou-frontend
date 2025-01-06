<script lang="ts" setup>
import InputField from '@/components/inputs/InputField.vue'
import FormField, { type FormFieldProps } from './FormField.vue'
import TextareaField from '@/components/inputs/TextareaField.vue'
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
      <InputField v-if="type !== 'textarea'" v-bind="{ ...field, ...$attrs }" :type />
      <TextareaField v-else v-bind="{ ...field, ...$attrs }" />
    </template>

    <template #feedback="props">
      <slot name="feedback" v-bind="props" />
    </template>
  </NumberFormField>
</template>
