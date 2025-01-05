<script lang="ts" setup>
import { NButton, NForm, NFormItem, NInput, NInputNumber } from 'naive-ui'
import { type RecipeFormValues, useRecipeForm } from '@/domains/recipes/composables/useRecipeForm'
import { type RecipeRequestDto, type RecipeResponseDto } from '@/api'
import { useNaiveUiFieldConfig } from '@/composables/useNaiveUiFieldConfig'
import { shallowRef } from 'vue'
import { useI18n } from 'vue-i18n'
import { useField } from 'vee-validate'
import { preprocessValues } from '@/utils/formUtils'
import { useRecipeService } from '@/domains/recipes/composables/useRecipeService'
import { useSafeAsyncState } from '@/composables/useSafeAsyncState.ts'
import ImageContainer from '@/domains/recipes/components/ImageContainer.vue'

const emit = defineEmits<{
  submitted: [values?: RecipeRequestDto]
}>()

const props = defineProps<{
  initialValues?: RecipeResponseDto
}>()

const isEditMode = shallowRef(!props.initialValues)
const { deleteRecipe, deleteImage, updateRecipe, uploadImage, updateImage, createRecipe } =
  useRecipeService()

const { handleSubmit, defineField, resetForm } = useRecipeForm(props.initialValues)
const [name, nameProps] = defineField<'name'>('name', useNaiveUiFieldConfig('Name'))
const [servings, servingsProps] = defineField<'servings'>(
  'servings',
  useNaiveUiFieldConfig('Servings'),
)
const [description, descriptionProps] = defineField<'description'>(
  'description',
  useNaiveUiFieldConfig('Description'),
)
const [source, sourceProps] = defineField<'source'>('source', useNaiveUiFieldConfig('Source'))
const [duration, durationProps] = defineField<'duration'>(
  'duration',
  useNaiveUiFieldConfig('Duration'),
)
const [ingredients, ingredientsProps] = defineField<'ingredients'>(
  'ingredients',
  useNaiveUiFieldConfig('Ingredients'),
)
const [instructions, instructionsProps] = defineField<'instructions'>(
  'instructions',
  useNaiveUiFieldConfig('Instructions'),
)
const [nutrition, nutritionProps] = defineField<'nutrition'>(
  'nutrition',
  useNaiveUiFieldConfig('Nutrition'),
)
const [notes, notesProps] = defineField<'notes'>('notes', useNaiveUiFieldConfig('Notes'))
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

// TODO: FormField mapping should be abstracted
// TODO: All buttons should have there own loading state
// TODO: Form cancel reset is not working for fields initialliy not set
</script>

<template>
  <NForm @submit="onSubmit">
    <div class="grid grid-cols-1 md:grid-cols-3 gap-5">
      <div class="flex flex-col gap-3">
        <ImageContainer v-model="image" v-model:src="imageUrl" :edit="isEditMode" />

        <NFormItem v-bind="nameProps">
          <NInput
            :show-button="false"
            class="w-full"
            v-model:value="name"
            :disabled="!isEditMode"
            type="text"
          />
        </NFormItem>

        <NFormItem v-bind="servingsProps">
          <NInputNumber
            :show-button="false"
            class="w-full"
            v-model:value="servings"
            :disabled="!isEditMode"
          />
        </NFormItem>

        <NFormItem v-bind="sourceProps">
          <NInput class="w-full" v-model:value="source" :disabled="!isEditMode" type="text" />
        </NFormItem>

        <NFormItem v-bind="durationProps">
          <NInputNumber
            :show-button="false"
            class="w-full"
            v-model:value="duration"
            :disabled="!isEditMode"
          />
        </NFormItem>

        <NFormItem v-bind="descriptionProps">
          <NInput
            class="w-full"
            v-model:value="description"
            :disabled="!isEditMode"
            type="textarea"
          />
        </NFormItem>
      </div>

      <div class="col-span-2">
        <NFormItem v-bind="ingredientsProps">
          <NInput
            class="w-full"
            v-model:value="ingredients"
            type="textarea"
            :disabled="!isEditMode"
          />
        </NFormItem>

        <NFormItem v-bind="instructionsProps">
          <NInput
            class="w-full"
            v-model:value="instructions"
            type="textarea"
            :disabled="!isEditMode"
          />
        </NFormItem>

        <NFormItem v-bind="notesProps">
          <NInput class="w-full" v-model:value="notes" type="textarea" :disabled="!isEditMode" />
        </NFormItem>

        <NFormItem v-bind="nutritionProps">
          <NInput
            class="w-full"
            v-model:value="nutrition"
            type="textarea"
            :disabled="!isEditMode"
          />
        </NFormItem>
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
