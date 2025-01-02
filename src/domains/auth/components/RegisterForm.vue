<script setup lang="ts">
import { NButton, NInput, NForm, NFormItem } from 'naive-ui'
import { type AuthRequestDto } from '@/api'
import { useNaiveUiFieldConfig } from '@/composables/useNaiveUiFieldConfig'
import { useI18n } from 'vue-i18n'
import { useRegisterForm } from '@/domains/auth/composables/useRegisterForm.ts'
import ValidationRules from '@/domains/auth/components/ValidationRules.vue'

const { handleSubmit, defineField, passwordRules } = useRegisterForm()
const { t } = useI18n()
const emit = defineEmits<{
  submit: [values: AuthRequestDto]
}>()

defineProps<{
  loading?: boolean
}>()

const [username, usernameProps] = defineField<'username'>(
  'username',
  useNaiveUiFieldConfig(t('general.username')),
)
const [password, passwordProps] = defineField<'password'>(
  'password',
  useNaiveUiFieldConfig(t('general.password')),
)
const [passwordConfirm, passwordConfirmProps] = defineField<'passwordConfirm'>(
  'passwordConfirm',
  useNaiveUiFieldConfig(t('general.password')),
)

const onSubmit = handleSubmit(async (values) => {
  emit('submit', values)
})
</script>

<template>
  <NForm class="flex flex-col gap-3" @submit="onSubmit">
    <NFormItem class="w-full" v-bind="usernameProps">
      <NInput v-model:value="username" type="text" :placeholder="t('general.username')" />
    </NFormItem>

    <NFormItem class="w-full" v-bind="passwordProps">
      <NInput v-model:value="password" type="password" :placeholder="t('general.password')" />

      <template #feedback>
        <ValidationRules :value="password" :rules="passwordRules" />
      </template>
    </NFormItem>

    <NFormItem class="w-full" v-bind="passwordConfirmProps">
      <NInput
        v-model:value="passwordConfirm"
        type="password"
        :placeholder="t('general.password')"
      />
    </NFormItem>

    <div class="flex justify-between mt-8">
      <slot name="buttons" />

      <NButton type="primary" attr-type="submit" :loading>
        {{ t('general.register') }}
      </NButton>
    </div>
  </NForm>
</template>
