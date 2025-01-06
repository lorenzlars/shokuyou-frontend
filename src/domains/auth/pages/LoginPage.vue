<script setup lang="ts">
import { useRouter } from '@kitbag/router'
import LoginForm from '@/domains/auth/components/LoginForm.vue'
import { useI18n } from 'vue-i18n'
import BaseLink from '@/components/BaseLink.vue'

const { push } = useRouter()
const { t } = useI18n()

async function onSubmitted() {
  push('recipes')
}
</script>

<template>
  <div class="flex flex-col gap-5 py-5 items-center">
    <h1>{{ t('titles.login') }}</h1>

    <LoginForm class="w-full" @submitted="onSubmitted" />

    <BaseLink to="/register">Sign-up</BaseLink>
  </div>
</template>
