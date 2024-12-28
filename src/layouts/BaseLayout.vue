<script setup lang="ts">
import { RouterView, useRouter } from '@kitbag/router'
import { NButton } from 'naive-ui'
import { useAuthStore } from '@/domains/auth/stores/authStore.ts'
import BaseMenu, { type MenuOption } from '@/components/BaseMenu.vue'

const { logout } = useAuthStore()
const { push } = useRouter()
const menuOptions: MenuOption[] = [
  {
    label: 'Recipes',
    name: 'recipes'
  },
]

function handleLogout() {
  logout()
  push('login')
}
</script>

<template>
  <header class="flex justify-between items-center p-2 border-b-1 border-solid border-gray-200">
    <div class="flex items-center w-full">
      <span class="text-lg font-bold w-28">しょくよう</span>
      <BaseMenu :options="menuOptions" />
    </div>
    <NButton @click="handleLogout"> Logout </NButton>
  </header>

  <main class="container">
    <RouterView />
  </main>

  <footer></footer>
</template>
