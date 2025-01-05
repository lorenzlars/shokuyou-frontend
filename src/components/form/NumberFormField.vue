<script lang="ts" setup>
import InputField from '@/components/inputs/InputField.vue'
import FormField, { type FormFieldProps } from './FormField.vue'
const NumberFormField = FormField<number>

defineProps<FormFieldProps>()
</script>

<template>
  <NumberFormField :name :label v-slot="field">
    <InputField v-bind="{ ...field, ...$attrs }" type="number" />
  </NumberFormField>
</template>
