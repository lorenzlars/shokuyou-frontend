<script setup lang="ts">
import { useRouter } from '@kitbag/router'
import LoginForm, { type LoginFormSubmitValues } from '@/domains/auth/components/LoginForm.vue'
import { useAuthStore } from '@/domains/auth/stores/authStore.ts'
import { NButton, NCard } from 'naive-ui'
import { useI18n } from 'vue-i18n'

const { push } = useRouter()
const { login } = useAuthStore()
const { t } = useI18n()

async function onSubmit({ values, rememberMe }: LoginFormSubmitValues) {
  await login(values, rememberMe)

  push('recipes')
}
</script>

<template>
  <NCard :title="t('titles.login')">
    <LoginForm @submit="onSubmit">
      <template #buttons>
        <NButton type="default" @click="push('register')">
          {{ t('general.register') }}
        </NButton>
      </template>
    </LoginForm>
  </NCard>
</template>
