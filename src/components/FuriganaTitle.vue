<script lang="ts" setup>
export type FuriganaLetter = {
  kanji: string
  reading: string
}

defineProps<{ letters: FuriganaLetter[] }>()
</script>

<template>
  <h1 class="flex gap-2">
    <span class="flex flex-col items-center" v-for="(letter, key) in letters" :key>
      <span class="text-sm">{{ letter.reading }}</span>
      <span class="text-3xl leading-6">{{ letter.kanji }}</span>
    </span>
  </h1>
</template>
