<script lang="ts" setup>
import FormField, { type FormFieldProps } from '@/components/form/FormField.vue'
import IngredientsEditor from './IngredientsEditor.vue'
const ArrayFormField = FormField<{ name: string }[]>

defineProps<FormFieldProps>()
</script>

<template>
  <ArrayFormField :name :label>
    <template #default="field">
      <IngredientsEditor v-bind="field" />
    </template>
  </ArrayFormField>
</template>
