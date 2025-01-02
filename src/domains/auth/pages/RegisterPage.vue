<script setup lang="ts">
import { useRouter } from '@kitbag/router'
import RegisterForm from '@/domains/auth/components/RegisterForm.vue'
import { NButton, NCard } from 'naive-ui'
import { useI18n } from 'vue-i18n'

const { push } = useRouter()
const { t } = useI18n()

async function onSubmitted() {
  push('login')
}
</script>

<template>
  <NCard :title="t('titles.register')">
    <RegisterForm @submitted="onSubmitted">
      <template #buttons>
        <NButton type="default" @click="push('login')">
          {{ t('general.login') }}
        </NButton>
      </template>
    </RegisterForm>
  </NCard>
</template>
