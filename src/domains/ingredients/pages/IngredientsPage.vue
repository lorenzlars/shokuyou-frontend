<script lang="ts" setup>
import { IngredientsService } from '@/api'
import { unwrapResponseData } from '@/components/form'
import BaseButton from '@/components/baseButton/BaseButton.vue'
import { computed, ref, shallowRef } from 'vue'
import BaseInput from '@/components/baseInput/BaseInput.vue'
import PageLayout from '@/components/PageLayout.vue'

const newIngredients = shallowRef()
const ingredientsContext = ref(
  unwrapResponseData(
    await IngredientsService.getIngredients({
      query: {
        page: 1,
        pageSize: 100,
      },
    }),
  ),
)
const ingredients = computed(() => ingredientsContext.value.content)

async function handleCreate() {
  if (newIngredients.value) {
    await IngredientsService.createIngredient({
      body: { name: newIngredients.value, amount: 0, unit: '' },
    })
  }
}
</script>

<template>
  <PageLayout title="Ingredients">
    <BaseInput
      v-model="newIngredients"
      required
      placeholder="Ingredient name"
      aria-invalid="true"
    />
    <BaseButton @click="handleCreate" label="Add" :disabled="!newIngredients" />
    <div class="flex flex-col gap-3">
      <span v-for="(ingredient, key) in ingredients" :key> {{ ingredient.name }}</span>
    </div>
  </PageLayout>
</template>
