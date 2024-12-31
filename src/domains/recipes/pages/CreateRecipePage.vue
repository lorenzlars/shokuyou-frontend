<template>
  <div class="container">
    <NCard class="my-5">
      <RecipeForm />
    </NCard>
  </div>
</template>

<script lang="ts" setup>
// import { useRouter } from '@kitbag/router'
// import { RecipesService, type CreateRecipeDto } from '@/api'
import { NCard } from 'naive-ui'
import RecipeForm from '../components/RecipeForm.vue'

// const { push } = useRouter()

// const onSubmit = async (values: CreateRecipeDto) => {
//   await RecipesService.createRecipe({ body: values })
//   push('recipes')
// }
</script>
