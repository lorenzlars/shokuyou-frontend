<script setup lang="ts">
import { useLoginForm } from '@/domains/auth/composables/useLoginForm.ts'
import { type AuthRequestDto } from '@/api'

import { shallowRef } from 'vue'
import { useI18n } from 'vue-i18n'
import { useAuthStore } from '@/domains/auth/stores/authStore.ts'
import { AxiosError } from 'axios'
import { StringFormField } from '@/components/form'
import BaseButton from '@/components/baseButton/BaseButton.vue'
import BaseCheckbox from '@/components/BaseCheckbox.vue'

const rememberMe = shallowRef(false)
const { handleSubmit } = useLoginForm()

const emit = defineEmits<{
  submitted: [payload: AuthRequestDto]
}>()

const { t } = useI18n()
const { login } = useAuthStore()
const showError = shallowRef(false)

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
  <form class="flex flex-col gap-3" @submit="onSubmit">
    <StringFormField class="w-full" name="username" />

    <StringFormField class="w-full" name="password" type="password" />

    <BaseCheckbox class="mb-5" v-model="rememberMe" :label="t('general.remember')" />

    <BaseButton type="submit" :theme="showError ? 'danger' : 'accent'">
      {{ t('general.login') }}
    </BaseButton>

    <small class="m-0 text-danger" v-if="showError">{{ t('errors.loginFailed') }}</small>
  </form>
</template>
