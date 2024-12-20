<script setup lang="ts">
import TheWelcome from '../components/TheWelcome.vue'

import axios from 'axios'
import { shallowRef } from 'vue'

const testData = shallowRef()

try {
  const { data } = await axios.get('/v1')

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
