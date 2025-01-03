<script lang="ts" setup>
import {
  NButton,
  NInput,
  NInputNumber,
  NForm,
  NFormItem,
  NUpload,
  NUploadDragger,
  NUploadTrigger,
  NImage,
  NIcon,
  type UploadFileInfo,
} from 'naive-ui'
import {
  ImageOutline as ImageOutlineIcon,
  ArchiveOutline as ArchiveIcon,
  TrashBin as TrashBinIcon,
} from '@vicons/ionicons5'
import { useRecipeForm } from '@/domains/recipes/composables/useRecipeForm'
import { type RecipeRequestDto, type RecipeResponseDto } from '@/api'
import { useNaiveUiFieldConfig } from '@/composables/useNaiveUiFieldConfig'
import { shallowRef } from 'vue'
import { useI18n } from 'vue-i18n'
import { useField } from 'vee-validate'
import { preprocessValues } from '@/utils/formUtils.ts'

const emit = defineEmits<{
  submit: [values: [RecipeRequestDto | null, File | null | undefined]]
}>()

const props = defineProps<{
  initialValues?: RecipeResponseDto
  loading?: boolean
}>()

const isEditMode = shallowRef(!props.initialValues)
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

const onSubmit = handleSubmit(async (values) => {
  emit('submit', [preprocessValues(values, ['image', 'imageUrl']), image.value])
})

function onDelete() {
  emit('submit', [null, null])
}

function onDeleteImage() {
  image.value = null
  imageUrl.value = undefined
}

function onFileChange(fileList: UploadFileInfo[]) {
  image.value = fileList[0]?.file

  if (image.value instanceof File) {
    imageUrl.value = URL.createObjectURL(image.value)
  }
}

function onEditToggle() {
  isEditMode.value = !isEditMode.value

  if (!isEditMode.value) {
    resetForm()
  }
}
</script>

<template>
  <NForm @submit="onSubmit">
    <div class="grid grid-cols-1 md:grid-cols-3 gap-5">
      <div class="flex flex-col gap-3">
        <div class="relative">
          <NImage
            v-if="(isEditMode && imageUrl) || !isEditMode"
            :src="imageUrl"
            class="w-full"
            :class="{ 'h-64': !imageUrl }"
            :img-props="{ class: 'object-cover object-center w-full h-full' }"
            preview-disabled
          >
            <template #placeholder>
              <div class="bg-gray-100 px-5 flex items-center justify-center w-full h-full">
                <NIcon :size="48" :depth="3">
                  <ImageOutlineIcon />
                </NIcon>
              </div>
            </template>
          </NImage>

          <NButton
            class="absolute -top-3 -right-3"
            v-if="isEditMode && imageUrl"
            @click="onDeleteImage"
            type="error"
            strong
            circle
          >
            <template #icon>
              <NIcon>
                <TrashBinIcon />
              </NIcon>
            </template>
          </NButton>

          <NUpload
            abstract
            v-if="isEditMode"
            show-file-list
            accept="image/*"
            @update:file-list="onFileChange"
            :default-upload="false"
          >
            <NUploadTrigger v-if="!imageUrl" #="{ handleClick }" abstract>
              <NUploadDragger
                @click="handleClick"
                class="flex items-center justify-center bg-gray-100 px-5 h-64"
              >
                <div class="flex flex-col items-center">
                  <NIcon :size="48" :depth="3">
                    <ArchiveIcon />
                  </NIcon>
                  <p class="text-center">Click or drag a file to this area to upload</p>
                </div>
              </NUploadDragger>
            </NUploadTrigger>
          </NUpload>
        </div>

        <NFormItem v-bind="nameProps">
          <NInput class="w-full" v-model:value="name" :disabled="!isEditMode" type="text" />
        </NFormItem>

        <NFormItem v-bind="servingsProps">
          <NInputNumber
            :show-button="false"
            class="w-full"
            v-model:value="servings"
            :disabled="!isEditMode"
            type="text"
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
        <NButton v-if="isEditMode" type="primary" attr-type="submit" :loading>
          {{ initialValues ? t('general.update') : t('general.create') }}
        </NButton>

        <NButton v-if="isEditMode && initialValues" type="error" @click="onDelete" :loading>
          {{ t('general.delete') }}
        </NButton>
      </div>

      <NButton v-if="initialValues" @click="onEditToggle" :loading>
        {{ isEditMode ? t('general.cancel') : t('general.edit') }}
      </NButton>
    </div>
  </NForm>
</template>
