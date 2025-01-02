<script setup lang="ts">
import { useRouter } from '@kitbag/router'
import RegisterForm from '@/domains/auth/components/RegisterForm.vue'
import { useAsyncPromise } from '@/composables/useAsyncPromise.ts'
import { type AuthRegisterRequestDto, AuthService } from '@/api'
import { NButton, useMessage, NCard } from 'naive-ui'
import { useI18n } from 'vue-i18n'

const message = useMessage()
const { push } = useRouter()
const { t } = useI18n()
const { execute, loading } = useAsyncPromise((values: AuthRegisterRequestDto) =>
  AuthService.userRegister({
    body: values,
  }),
)

async function onSubmit(values: AuthRegisterRequestDto) {
  try {
    const { status } = await execute(values)

    if (status && status > 300) {
      message.error('Registration failed')
    }
  } catch (error) {
    // TODO: Is not working because postRegister is not throwing an error

    if (error instanceof Error) {
      message.warning(error.message)
    }
  }

  push('login')
}
</script>

<template>
  <NCard :title="t('titles.register')">
    <RegisterForm @submit="onSubmit" :loading>
      <template #buttons>
        <NButton type="default" @click="push('login')">
          {{ t('general.login') }}
        </NButton>
      </template>
    </RegisterForm>
  </NCard>
</template>
