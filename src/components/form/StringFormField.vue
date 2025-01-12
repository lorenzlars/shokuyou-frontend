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
  <StringFormField :path :label>
    <template #default="{ fieldProps, errorMessage }">
      <BaseInput
        v-if="type !== 'textarea'"
        v-bind="{ ...fieldProps, ...$attrs }"
        :type
        :class="{ '!border-danger': errorMessage }"
      />
      <BaseTextarea
        v-else
        v-bind="{ ...fieldProps, ...$attrs }"
        :class="{ '!border-danger': errorMessage }"
      />
    </template>

    <template #feedback="props">
      <slot name="feedback" v-bind="props" />
    </template>
  </StringFormField>
</template>
