<template>
  <div class="container">
    <NCard v-if="recipe" class="my-5">
      <RecipeForm :initial-values="recipe" @submit="onSubmit" @delete="deleteRecipe" />
    </NCard>
  </div>
</template>

<script lang="ts" setup>
import { shallowRef } from 'vue'
import { useRoute, useRouter } from '@kitbag/router'
import { RecipesService, type CreateRecipeDto, type Recipe } from '@/api'
import { NCard, useMessage } from 'naive-ui'
import RecipeForm from '../components/RecipeForm.vue'
import { useI18n } from 'vue-i18n'

const { params } = useRoute()
const { push } = useRouter()
const recipe = shallowRef<Recipe>()
const message = useMessage()
const { t } = useI18n()

const { id } = params as Record<string, string>
const { data } = await RecipesService.getRecipe({ path: { id } })

recipe.value = data

const deleteRecipe = async () => {
  if (!recipe.value) return

  try {
    await RecipesService.deleteRecipe({ path: { id } })
    message.success(t('messages.recipeDeletedSuccessfully'))
    push('recipes')
  } catch {
    message.error(t('messages.recipeDeleteFailed'))
  }
}

const onSubmit = async (values: CreateRecipeDto) => {
  await RecipesService.updateRecipe({ path: { id }, body: values })
  message.success(t('messages.recipeUpdatedSuccessfully'))
  push('recipes')
}
</script>
