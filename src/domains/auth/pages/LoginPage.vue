<script setup lang="ts">
import { useRouter } from '@kitbag/router'
import LoginForm from '@/domains/auth/components/LoginForm.vue'

const { push } = useRouter()

function onLogin() {
  push({ name: 'recipes' })
}
</script>

<template>
  <div class="flex flex-col items-center">
    <h1>しょくよう</h1>
    <LoginForm class="my-32" @success="onLogin" />
  </div>
</template>
