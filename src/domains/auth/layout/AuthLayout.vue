<script setup lang="ts">
import { RouterView, RouterLink } from '@kitbag/router'
import FuriganaTitle from '@/components/FuriganaTitle.vue'
</script>

<template>
  <main class="container">
    <div class="flex flex-col gap-6 items-center md:mt-32">
      <RouterLink to="/login" class="text-lg font-bold no-underline text-text hover:no-underline">
        <FuriganaTitle
          :letters="[
            {
              kanji: '食',
              reading: 'しょく',
            },
            {
              kanji: '用',
              reading: 'よう',
            },
          ]"
        />
      </RouterLink>

      <div class="max-w-128 w-full">
        <RouterView />
      </div>
    </div>
  </main>
</template>
