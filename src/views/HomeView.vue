<script setup lang="ts">
import TheWelcome from '../components/TheWelcome.vue'

import axios from 'axios'

const {data} = await axios.get('/')
</script>

<template>
  <main>
    <TheWelcome />

    {{data}}
  </main>
</template>
