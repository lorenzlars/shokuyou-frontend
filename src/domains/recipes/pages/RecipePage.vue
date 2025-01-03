<template>
  <div class="container">
    <NCard class="my-5">
      <RecipeForm :initial-values="recipe" @submitted="onSubmitted" />
    </NCard>
  </div>
</template>

<script lang="ts" setup>
import { shallowRef } from 'vue'
import { useRoute, useRouter } from '@kitbag/router'
import { type RecipeResponseDto, RecipesService } from '@/api'
import { NCard } from 'naive-ui'
import RecipeForm from '../components/RecipeForm.vue'
import { unwrapResponseData } from '@/utils/formUtils'
import { extractParamProp } from '@/utils/routerUtils.ts'

const { params } = useRoute()
const id = extractParamProp(params, 'id')
const { push } = useRouter()
const recipe = shallowRef<RecipeResponseDto>()

async function onSubmitted() {
  push('recipes')
}

if (id) {
  recipe.value = unwrapResponseData(await RecipesService.getRecipe({ path: { id } }))
}
</script>
