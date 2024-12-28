<script setup lang="ts">
import { RouterView, useRouter } from 'vue-router'
import { NButton, NMessageProvider } from 'naive-ui'
import { useAuthStore } from '@/domains/auth/stores/authStore.ts'

const { logout } = useAuthStore()
const { push } = useRouter()

function handleLogout() {
  logout()
  push({ name: 'login' })
}
</script>

<template>
  <header>
    <NButton @click="handleLogout"> Logout </NButton>
  </header>

  <main class="container">
    <NMessageProvider placement="bottom-left">
      <Suspense>
        <RouterView />
      </Suspense>
    </NMessageProvider>
  </main>

  <footer></footer>
</template>
