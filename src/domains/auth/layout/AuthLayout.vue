<script setup lang="ts">
import { RouterView } from '@kitbag/router'
import { NMessageProvider } from 'naive-ui'
</script>

<template>
  <main class="container">
    <NMessageProvider placement="bottom-left">
      <Suspense>
        <RouterView />
      </Suspense>
    </NMessageProvider>
  </main>
</template>
