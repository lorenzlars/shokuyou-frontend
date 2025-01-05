<script lang="ts" setup generic="T">
import { useNaiveUiFieldConfig } from '@/composables/useNaiveUiFieldConfig.ts'
import { useFormContext, FormContextKey } from 'vee-validate'
import { inject } from 'vue'
import type { AnyObject, ObjectSchema } from 'yup'

const props = defineProps<{
  name: string
  label?: string
}>()
// defineSlots<{
//   default(props: {
//     fieldValue: T
//     updateFieldValue: (value: string) => void
//     fieldProps: BaseFieldProps & GenericObject
//   }): unknown
// }>()
const { defineField } = useFormContext()
const form = inject(FormContextKey) // This is not working if toTypedSchema has been used
const schema = form?.schema as ObjectSchema<AnyObject>
const field = schema.fields[props.name] as unknown as { spec: { label: string } }
const label = props.label ?? field.spec.label
const [fieldValue, fieldProps] = defineField(props.name, useNaiveUiFieldConfig(props.label))

function updateFieldValue(value: string) {
  fieldValue.value = value
}
</script>

<template>
  <div>
    {{ label }}
    <slot v-bind="{ fieldValue, updateFieldValue, fieldProps }" />
    <small>{{}}</small>
  </div>
</template>
