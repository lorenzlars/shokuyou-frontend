<script setup lang="ts">
import { RouterView } from '@kitbag/router'
import { NConfigProvider, NMessageProvider } from 'naive-ui'
</script>

<template>
  <NConfigProvider>
    <NMessageProvider placement="bottom-left">
      <Suspense>
        <RouterView />
      </Suspense>
    </NMessageProvider>
  </NConfigProvider>
</template>
