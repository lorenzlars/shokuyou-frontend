<script lang="ts" setup>
import { NButton, NForm } from 'naive-ui'
import { type RecipeFormValues, useRecipeForm } from '@/domains/recipes/composables/useRecipeForm'
import { type RecipeRequestDto, type RecipeResponseDto } from '@/api'
import { shallowRef } from 'vue'
import { useI18n } from 'vue-i18n'
import { useField } from 'vee-validate'
import { useRecipeService } from '@/domains/recipes/composables/useRecipeService'
import { useSafeAsyncState } from '@/composables/useSafeAsyncState.ts'
import ImageContainer from '@/domains/recipes/components/ImageContainer.vue'
import { StringFormField, NumberFormField, preprocessValues } from '@/components/form'

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

// TODO: All buttons should have there own loading state
</script>

<template>
  <NForm @submit="onSubmit">
    <div class="grid grid-cols-1 md:grid-cols-3 gap-5">
      <div class="flex flex-col gap-3">
        <ImageContainer v-model="image" v-model:src="imageUrl" :edit="isEditMode" />

        <StringFormField name="name" :disabled="!isEditMode" class="w-full" />

        <NumberFormField name="servings" :disabled="!isEditMode" class="w-full" />

        <StringFormField name="source" :disabled="!isEditMode" class="w-full" />

        <NumberFormField name="duration" :disabled="!isEditMode" class="w-full" />

        <StringFormField name="description" :disabled="!isEditMode" class="w-full" />
      </div>

      <div class="col-span-2">
        <StringFormField
          name="ingredients"
          :disabled="!isEditMode"
          class="w-full"
          type="textarea"
        />

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
        <NButton v-if="isEditMode" type="primary" attr-type="submit" :loading :disabled="loading">
          {{ initialValues ? t('general.update') : t('general.create') }}
        </NButton>

        <NButton
          v-if="isEditMode && initialValues"
          type="error"
          @click="onDelete(initialValues.id)"
          :loading
          :disabled="loading"
        >
          {{ t('general.delete') }}
        </NButton>
      </div>

      <NButton v-if="initialValues" @click="onEditToggle" :loading :disabled="loading">
        {{ isEditMode ? t('general.cancel') : t('general.edit') }}
      </NButton>
    </div>
  </NForm>
</template>
