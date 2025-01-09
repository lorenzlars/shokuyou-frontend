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
  feedback(props: { value?: T; errorMessage?: string }): unknown
}>()

const { t } = useI18n()
const schema = injectSchema()

const label = props.label ?? schema.fields[props.name].spec.label
const { meta, errorMessage, handleBlur, handleChange, value } = useField<T>(props.name)
const fieldProps = reactive({
  modelValue: value,
  placeholder: t('form.inputField', { label: label.toLowerCase() }),
  onblur: handleBlur,
  'onUpdate:modelValue': handleChange,
})
</script>

<template>
  <div class="flex flex-col gap-2 mb-3">
    <label class="flex gap-1" :for="name">
      <strong>{{ label }}</strong>
      <span v-if="meta.required" class="text-danger">*</span>
    </label>
    <slot
      :id="name"
      :aria-labelledby="name"
      v-bind="fieldProps"
      :required="meta.required"
      :aria-invalid="!meta.valid"
    />
    <div class="min-h-5">
      <slot name="feedback" v-bind="{ value, errorMessage }">
        <transition>
          <span class="text-danger" v-if="errorMessage">{{ errorMessage }}</span>
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
