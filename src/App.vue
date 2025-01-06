<script setup lang="ts">
import { RouterView } from '@kitbag/router'
import ErrorHandlingProvider from '@/domains/errorHandling/components/ErrorHandlingProvider.vue'
import MessageProvider from '@/components/message/MessageProvider.vue'
</script>

<template>
  <MessageProvider :timeout="5_000">
    <ErrorHandlingProvider>
      <Suspense>
        <RouterView />
      </Suspense>
    </ErrorHandlingProvider>
  </MessageProvider>
</template>
