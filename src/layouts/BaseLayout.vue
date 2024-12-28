<script setup lang="ts">
import { RouterView, useRouter } from '@kitbag/router'
import { NButton } from 'naive-ui'
import { useAuthStore } from '@/domains/auth/stores/authStore.ts'

const { logout } = useAuthStore()
const { push } = useRouter()

function handleLogout() {
  logout()
  push('login')
}
</script>

<template>
  <header>
    <NButton @click="handleLogout"> Logout </NButton>
  </header>

  <main class="container">
    <RouterView />
  </main>

  <footer></footer>
</template>
