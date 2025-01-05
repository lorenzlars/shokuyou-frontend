<script lang="ts" setup generic="T">
import { type FieldSlotProps, useField } from 'vee-validate'
import { injectSchema } from './formHelper.ts'
import { useI18n } from 'vue-i18n'
import { reactive } from 'vue'

export type FormFieldProps = {
  name: string
  label?: string
}

const props = defineProps<FormFieldProps>()
defineSlots<{
  default(props: FieldSlotProps<T>): unknown
  feedback(props: { errorMessage?: string }): unknown
}>()

const { t } = useI18n()
const schema = injectSchema()

const label = props.label ?? schema.fields[props.name].spec.label
const { meta, errorMessage, handleBlur, handleChange, value } = useField(props.name)
const fieldProps = reactive({
  modelValue: value,
  placeholder: t('form.inputField', { label }),
  onblur: handleBlur,
  'onUpdate:modelValue': handleChange,
})
</script>

<template>
  <div>
    <label class="block" :for="name">
      {{ label }} <span v-if="meta.required" class="text-danger">*</span>
    </label>
    <slot :id="name" v-bind="fieldProps" />
    <div class="h-5">
      <slot name="feedback" v-bind="{ errorMessage }">
        <span class="text-danger" v-if="errorMessage">{{ errorMessage }}</span>
      </slot>
    </div>
  </div>
</template>
