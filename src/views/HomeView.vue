<script setup lang="ts">
import TheWelcome from '../components/TheWelcome.vue'

import { shallowRef } from 'vue'
import { getHello } from '@/api'

const testData = shallowRef()

try {
  const { data } = await getHello()

  testData.value = data
} catch {
  testData.value = "error"
}
</script>

<template>
  <main>
    <h1>食養</h1>

    <TheWelcome />

    {{testData}}
  </main>
</template>
