<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
  <header></header>

  <main class="container">
    <Suspense>
      <RouterView />
    </Suspense>
  </main>

  <footer></footer>
</template>
