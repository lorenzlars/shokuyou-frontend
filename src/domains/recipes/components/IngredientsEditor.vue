<script lang="ts" setup>
import BaseInput from '@/components/baseInput/BaseInput.vue'
import type { IngredientRequestDto } from '@/api'
import BaseButton from '@/components/baseButton/BaseButton.vue'
import { shallowRef } from 'vue'

const modelValue = defineModel<IngredientRequestDto[]>({ default: () => [] })
const name = shallowRef<string>()

function addEntry() {
  if (name.value) {
    modelValue.value.push({ name: name.value })
  }

  name.value = ''
}
</script>

<template>
  <div>
    <div class="flex gap-8">
      <BaseButton @click="addEntry" :disabled="!name" label="Add" />
      <BaseInput v-model="name" />
    </div>
    <div class="flex flex-col gap-3">
      <span v-for="(ingredient, key) in modelValue" :key> {{ ingredient.name }}</span>
    </div>
  </div>
</template>
