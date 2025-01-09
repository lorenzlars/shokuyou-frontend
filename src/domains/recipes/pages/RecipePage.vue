<template>
  <div class="py-5">
    <RecipeForm :initial-values="recipe" @submitted="onSubmitted" />
  </div>
</template>

<script lang="ts" setup>
import { shallowRef } from 'vue'
import { useRoute, useRouter } from '@kitbag/router'
import { type RecipeResponseDto, RecipesService } from '@/api'
import RecipeForm from '../components/RecipeForm.vue'
import { unwrapResponseData } from '@/components/form'
import { extractParamProp } from '@/utils/routerUtils.ts'
import { useMessage } from '@/components/message/useMessage.ts'
import { useI18n } from 'vue-i18n'

const { params } = useRoute()
const id = extractParamProp(params, 'id')
const { push } = useRouter()
const recipe = shallowRef<RecipeResponseDto>()
const { showMessage } = useMessage()
const { t } = useI18n()

async function onSubmitted() {
  if (recipe.value) {
    showMessage(t('messages.recipeUpdatedSuccessfully'))
  }

  if (!id) {
    // TODO: What about delete?

    push('recipes')
  }
}

if (id) {
  recipe.value = unwrapResponseData(await RecipesService.getRecipe({ path: { id } }))
}
</script>
