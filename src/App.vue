<script setup lang="ts">
import { RouterView } from '@kitbag/router'
import { NConfigProvider, NMessageProvider } from 'naive-ui'
import ErrorHandlingProvider from '@/domains/errorHandling/components/ErrorHandlingProvider.vue'
</script>

<template>
  <NConfigProvider>
    <NMessageProvider placement="bottom-left" :duration="5_000">
      <ErrorHandlingProvider>
        <Suspense>
          <RouterView />
        </Suspense>
      </ErrorHandlingProvider>
    </NMessageProvider>
  </NConfigProvider>
</template>
