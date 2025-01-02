<script setup lang="ts">
import { useRouter } from '@kitbag/router'
import LoginForm from '@/domains/auth/components/LoginForm.vue'
import { NButton, NCard } from 'naive-ui'
import { useI18n } from 'vue-i18n'

const { push } = useRouter()
const { t } = useI18n()

async function onSubmitted() {
  push('recipes')
}
</script>

<template>
  <NCard :title="t('titles.login')">
    <LoginForm @submitted="onSubmitted">
      <template #buttons>
        <NButton type="default" @click="push('register')">
          {{ t('general.register') }}
        </NButton>
      </template>
    </LoginForm>
  </NCard>
</template>
