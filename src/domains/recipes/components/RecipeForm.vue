<script lang="ts" setup>
import { type RecipeFormValues, useRecipeForm } from '@/domains/recipes/composables/useRecipeForm'
import { type RecipeRequestDto, type RecipeResponseDto } from '@/api'
import { shallowRef } from 'vue'
import { useI18n } from 'vue-i18n'
import { useField } from 'vee-validate'
import { useRecipeService } from '@/domains/recipes/composables/useRecipeService'
import { useSafeAsyncState } from '@/composables/useSafeAsyncState.ts'
import { StringFormField, NumberFormField, preprocessValues } from '@/components/form'
import BaseButton from '@/components/baseButton/BaseButton.vue'
import ImageSelector from '@/components/imageSelector/ImageSelector.vue'
import IngredientsFormField from '@/domains/recipes/components/IngredientsFormField.vue'

const emit = defineEmits<{
  submitted: [values?: RecipeRequestDto]
}>()

const props = defineProps<{
  initialValues?: RecipeResponseDto
}>()

const isEditMode = shallowRef(!props.initialValues)
const { handleSubmit, resetForm } = useRecipeForm(props.initialValues)
const { deleteRecipe, deleteImage, updateRecipe, uploadImage, updateImage, createRecipe } =
  useRecipeService()

const { value: image } = useField<File | null | undefined>('image')
const { value: imageUrl } = useField<string | undefined>('imageUrl')

const { t } = useI18n()
const { loading, execute } = useSafeAsyncState(async (values: RecipeFormValues) => {
  const preprocessedValues = preprocessValues(values, ['image', 'imageUrl'])

  if (props.initialValues) {
    await updateRecipe(props.initialValues.id, preprocessedValues)

    if (values.image) {
      await (props.initialValues.imageUrl ? updateImage : uploadImage)(
        props.initialValues.id,
        values.image,
      )
    } else if (values.image === null) {
      await deleteImage(props.initialValues.id)
    }
  } else {
    const recipe = await createRecipe(preprocessedValues)

    if (values.image) {
      await uploadImage(recipe.id, values.image)
    }
  }

  return preprocessedValues
})

const onSubmit = handleSubmit(async (values) => {
  emit('submitted', await execute(values))
})

async function onDelete(id: string) {
  await deleteRecipe(id)

  emit('submitted')
}

function onEditToggle() {
  isEditMode.value = !isEditMode.value

  if (!isEditMode.value) {
    resetForm()
  }
}
</script>

<template>
  <form @submit="onSubmit">
    <div class="grid grid-cols-1 md:grid-cols-3 gap-5">
      <div class="flex flex-col gap-3">
        <ImageSelector v-model="image" v-model:src="imageUrl" :edit="isEditMode" />

        <StringFormField name="name" :disabled="!isEditMode" class="w-full" />

        <NumberFormField name="servings" :disabled="!isEditMode" class="w-full" />

        <StringFormField name="source" :disabled="!isEditMode" class="w-full" />

        <NumberFormField name="duration" :disabled="!isEditMode" class="w-full" />

        <StringFormField
          name="description"
          type="textarea"
          :disabled="!isEditMode"
          class="w-full"
        />
      </div>

      <div class="flex flex-col gap-3 col-span-2">
        <IngredientsFormField name="ingredients" :disabled="!isEditMode" class="w-full" />

        <StringFormField
          name="instructions"
          :disabled="!isEditMode"
          class="w-full"
          type="textarea"
        />

        <StringFormField name="notes" :disabled="!isEditMode" class="w-full" type="textarea" />

        <StringFormField name="nutrition" :disabled="!isEditMode" class="w-full" type="textarea" />
      </div>
    </div>

    <div class="flex justify-between">
      <div class="flex gap-3">
        <BaseButton v-if="isEditMode" type="submit" theme="success" :loading :disabled="loading">
          {{ initialValues ? t('general.update') : t('general.create') }}
        </BaseButton>

        <BaseButton
          v-if="isEditMode && initialValues"
          @click="onDelete(initialValues.id)"
          :loading
          :disabled="loading"
          theme="danger"
        >
          {{ t('general.delete') }}
        </BaseButton>
      </div>

      <BaseButton v-if="initialValues" @click="onEditToggle" :loading :disabled="loading">
        {{ isEditMode ? t('general.cancel') : t('general.edit') }}
      </BaseButton>
    </div>
  </form>
</template>
