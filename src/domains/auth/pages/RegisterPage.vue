<script setup lang="ts">
import { useRouter } from '@kitbag/router'
import RegisterForm from '@/domains/auth/components/RegisterForm.vue'
import { useI18n } from 'vue-i18n'
import BaseLink from '@/components/baseLink/BaseLink.vue'

const { push } = useRouter()
const { t } = useI18n()

async function onSubmitted() {
  push('login')
}
</script>

<template>
  <div class="flex flex-col gap-5 py-5 items-center">
    <h1>{{ t('titles.register') }}</h1>

    <RegisterForm class="w-full" @submitted="onSubmitted" />

    <BaseLink to="/login">Sign-in</BaseLink>
  </div>
</template>
