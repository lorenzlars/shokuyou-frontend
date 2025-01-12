<script lang="ts" setup>
import BaseInput from '@/components/baseInput/BaseInput.vue'
import FormField, { type FormFieldProps } from './FormField.vue'
const NumberFormField = FormField<number>

defineProps<FormFieldProps>()
</script>

<template>
  <NumberFormField :path :label v-slot="{ fieldProps, errorMessage }">
    <BaseInput
      v-bind="{ ...fieldProps, ...$attrs }"
      type="number"
      :class="{ '!border-danger': errorMessage }"
    />
  </NumberFormField>
</template>
