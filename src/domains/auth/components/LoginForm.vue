<script setup lang="ts">
import { NButton, NInput, NForm, NFormItem, NCheckbox } from 'naive-ui'
import { useLoginForm } from '@/domains/auth/composables/useLoginForm.ts'
import { type AuthRequestDto } from '@/api'

import { shallowRef } from 'vue'
import { useNaiveUiFieldConfig } from '@/composables/useNaiveUiFieldConfig'
import { useI18n } from 'vue-i18n'
import { useAuthStore } from '@/domains/auth/stores/authStore.ts'
import { AxiosError } from 'axios'

const rememberMe = shallowRef(false)
const { handleSubmit, defineField } = useLoginForm()

const emit = defineEmits<{
  submitted: [payload: AuthRequestDto]
}>()

const { t } = useI18n()
const { login } = useAuthStore()
const showError = shallowRef(false)

const [username, usernameProps] = defineField<'username'>(
  'username',
  useNaiveUiFieldConfig(t('general.username')),
)
const [password, passwordProps] = defineField<'password'>(
  'password',
  useNaiveUiFieldConfig(t('general.password')),
)

const onSubmit = handleSubmit(async (values) => {
  try {
    await login(values, rememberMe.value)
  } catch (error) {
    if (error instanceof AxiosError && error.response?.status === 401) {
      showError.value = true
    } else {
      throw error
    }
  }

  emit('submitted', values)
})
</script>

<template>
  <NForm class="flex flex-col gap-3" @submit="onSubmit">
    <NFormItem class="w-full" v-bind="usernameProps">
      <NInput v-model:value="username" type="text" :placeholder="t('general.username')" />
    </NFormItem>

    <NFormItem class="w-full" v-bind="passwordProps">
      <NInput v-model:value="password" type="password" :placeholder="t('general.password')" />
    </NFormItem>

    <NCheckbox class="mb-5" v-model:checked="rememberMe">
      {{ t('general.remember') }}
    </NCheckbox>

    <div class="flex justify-between mt-8">
      <NButton type="primary" attr-type="submit">
        {{ t('general.login') }}
      </NButton>

      <slot name="buttons" />
    </div>

    <p class="m-0 text-danger" v-if="showError">{{ t('errors.loginFailed') }}</p>
  </NForm>
</template>
