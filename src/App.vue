<script setup lang="ts">
import { RouterView } from 'vue-router'
import { NMessageProvider } from 'naive-ui'
</script>

<template>
  <header></header>

  <main class="container">
    <NMessageProvider placement="bottom-left">
      <Suspense>
        <RouterView />
      </Suspense>
    </NMessageProvider>
  </main>

  <footer></footer>
</template>
