<script lang="ts" setup generic="T">
import { useField } from 'vee-validate'
import { injectSchema, type Schema } from './formHelper.ts'
import { useI18n } from 'vue-i18n'
import { reactive } from 'vue'
import { reach } from 'yup'

export type FormFieldProps = {
  path: string
  label?: string
}

type DefaultSlotProps<T> = {
  id: string
  name: string
  placeholder: string
  modelValue: T
  onblur: ReturnType<typeof useField>['handleBlur']
  'onUpdate:modelValue': ReturnType<typeof useField>['handleChange']
  'aria-errormessage': string
  'aria-label': string
  'aria-invalid': boolean
  'aria-required': boolean
}

const props = defineProps<FormFieldProps>()
defineSlots<{
  default(props: DefaultSlotProps<T>): unknown
  feedback(props: { value?: T; errorMessage?: string }): unknown
}>()
const { t } = useI18n()
const schema = injectSchema()
const field = reach(schema, props.path) as Schema

if (!field) {
  throw new Error(`Field ${props.path} not found`)
}

const label = props.label ?? field.spec?.label ?? ''
const { meta, errorMessage, handleBlur, handleChange, value } = useField<T>(props.path)
const fieldProps = reactive({
  id: props.path,
  name: props.path,
  placeholder: t('form.inputField', { label: label.toLowerCase() }),
  modelValue: value,
  onblur: handleBlur,
  'onUpdate:modelValue': handleChange,
  // Force, keeping attribute casing
  'aria-errormessage': `${props.path}-error`,
  'aria-label': label,
  'aria-invalid': !meta.valid,
  'aria-required': meta.required,
})
</script>

<template>
  <div class="flex flex-col gap-2 mb-3">
    <label class="flex gap-1" :for="path">
      <strong>{{ label }}</strong>
      <span v-if="meta.required" class="text-danger" aria-hidden="true">*</span>
    </label>
    <slot v-bind="fieldProps" />
    <div class="min-h-5">
      <slot name="feedback" v-bind="{ value, errorMessage }">
        <transition>
          <span :id="`${path}-error`" class="text-danger" v-if="errorMessage">
            {{ errorMessage }}
          </span>
        </transition>
      </slot>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
