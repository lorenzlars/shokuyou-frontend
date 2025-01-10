<script lang="ts" setup>
import BaseInput from '@/components/baseInput/BaseInput.vue'
import FormField, { type FormFieldProps } from './FormField.vue'
import BaseTextarea from '@/components/baseTextarea/BaseTextarea.vue'
const StringFormField = FormField<string>

defineProps<
  FormFieldProps & {
    type?: HTMLInputElement['type'] | 'textarea'
  }
>()
</script>

<template>
  <StringFormField :name :label>
    <template #default="field">
      <BaseInput v-if="type !== 'textarea'" v-bind="{ ...field, ...$attrs }" :type />
      <BaseTextarea v-else v-bind="{ ...field, ...$attrs }" />
    </template>

    <template #feedback="props">
      <slot name="feedback" v-bind="props" />
    </template>
  </StringFormField>
</template>
