<script setup lang="ts">
import { RouterView, RouterLink, useRouter } from '@kitbag/router'
import { useAuthStore } from '@/domains/auth/stores/authStore.ts'
import BaseMenu, { type MenuOption } from '@/components/BaseMenu.vue'
import BaseButton from '@/components/baseButton/BaseButton.vue'
import { IconArrowRight } from '@iconify-prerendered/vue-fa-solid'
import BaseSkeleton from '@/components/BaseSkeleton.vue'

const { logout } = useAuthStore()
const { push } = useRouter()
const menuOptions: MenuOption[] = [
  {
    label: 'Plans',
    name: 'plans',
  },
  {
    label: 'Recipes',
    name: 'recipes',
  },
  {
    label: 'Ingredients',
    name: 'ingredients',
  },
]

function handleLogout() {
  logout()
  push('login')
}
</script>

<template>
  <header
    class="bg-light flex justify-between items-center fixed top-0 left-0 right-0 shadow-lg h-18 z-100"
  >
    <div class="container flex items-center gap-12">
      <RouterLink class="text-6 font-black no-underline text-text hover:no-underline w-fit" to="/">
        食用
      </RouterLink>

      <BaseMenu class="grow" :options="menuOptions" />

      <BaseButton @click="handleLogout" label="Logout">
        <template #icon>
          <IconArrowRight />
        </template>
      </BaseButton>
    </div>
  </header>

  <main class="container mt-18">
    <RouterView v-slot="{ component: Component }">
      <Transition name="fade" mode="out-in">
        <Suspense>
          <component :is="Component" />

          <template #fallback>
            <BaseSkeleton />
          </template>
        </Suspense>
      </Transition>
    </RouterView>
  </main>

  <footer></footer>
</template>

<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
  transition: all 180ms ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(20px);
}
</style>
