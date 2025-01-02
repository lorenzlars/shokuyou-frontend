<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useMessage } from 'naive-ui'
import { useErrorHandlingContextProvider } from '@/domains/errorHandling/provider/useErrorHandlingContextProvider.ts'

const { t } = useI18n()
const message = useMessage()
const { provideContext } = useErrorHandlingContextProvider()

provideContext({ t, message })
</script>

<template>
  <slot />
</template>
