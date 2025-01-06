<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useErrorHandlingContextProvider } from '@/domains/errorHandling/provider/useErrorHandlingContextProvider.ts'

const { t } = useI18n()
const { provideContext } = useErrorHandlingContextProvider()

provideContext({ t })
</script>

<template>
  <slot />
</template>
