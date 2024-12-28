<script setup lang="ts">
import { RouterView } from 'vue-router'
import { NMessageProvider } from 'naive-ui'
</script>

<template>
  <NMessageProvider placement="bottom-left">
    <Suspense>
      <RouterView />
    </Suspense>
  </NMessageProvider>
</template>
