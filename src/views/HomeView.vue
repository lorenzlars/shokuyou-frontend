<script setup lang="ts">
import TheWelcome from '../components/TheWelcome.vue'

import axios from 'axios'

const {data} = await axios.get('/v1')
</script>

<template>
  <main>
    <h1>食養</h1>

    <TheWelcome />

    {{data}}
  </main>
</template>
