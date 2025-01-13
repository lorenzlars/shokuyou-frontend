<script setup lang="ts">
import RecipeCard from './RecipeCard.vue'
import BaseButton from '@/components/baseButton/BaseButton.vue'
import { ref } from 'vue'
import type { RecipeResponseDto } from '@/api'

const props = defineProps<{
  recipes: RecipeResponseDto[]
}>()

const recipes = ref(props.recipes)

function onDrop(evt: DragEvent) {
  if (evt.dataTransfer instanceof DataTransfer) {
    const recipeId = evt.dataTransfer.getData('recipeId')

    recipes.value.push({ id: recipeId, name: 'Drop' } as RecipeResponseDto)
  }
}

const placeholder = document.createElement('div')
placeholder.style.backgroundColor = '#000000'
placeholder.style.width = '100%'
placeholder.style.height = '3px'

function onDragEnter(e: DragEvent) {
  // TODO: Remove old element
  // TODO: Only insert after card nothing else
  if (e.target instanceof HTMLElement) {
    e.target.insertAdjacentElement('afterend', placeholder)
    e.preventDefault()
  }
}

function onDragLeave(e: DragEvent) {
  console.log(e)
}

function addRecipe() {
  recipes.value.push({ name: 'Add' } as RecipeResponseDto)
}
</script>

<template>
  <div
    class="flex flex-column w-full p-3"
    @drop="onDrop($event)"
    @dragover.prevent
    @dragenter="onDragEnter"
    @dragleave="onDragLeave"
  >
    <RecipeCard v-for="recipe in recipes" :key="recipe.id" :recipe />
    <BaseButton label="Add" @click="addRecipe" />
  </div>
</template>
