<script lang="ts" setup>
import {
  NButton,
  NInput,
  NForm,
  NFormItem,
  NUpload,
  NButtonGroup,
  NUploadTrigger,
  type UploadFileInfo,
} from 'naive-ui'
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
const { handleSubmit, defineField } = useRecipeForm(props.initialValues)
const [name, nameProps] = defineField<'name'>('name', useNaiveUiFieldConfig('Name'))
const [description, descriptionProps] = defineField<'description'>(
  'description',
  useNaiveUiFieldConfig('Description'),
)
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
</script>

<template>
  <NForm @submit="onSubmit">
    <div class="flex gap-2">
      <NUpload
        abstract
        v-if="isEditMode"
        show-file-list
        accept="image/*"
        @update:file-list="onFileChange"
        :default-upload="false"
      >
        <NButtonGroup>
          <NButton @click="onDeleteImage" type="primary">Delete</NButton>
          <NUploadTrigger #="{ handleClick }" abstract>
            <NButton @click="handleClick" type="primary">Upload Image</NButton>
          </NUploadTrigger>
        </NButtonGroup>
      </NUpload>
      <div class="w-64">
        <img
          v-if="imageUrl"
          class="object-cover object-center w-full h-full"
          :src="imageUrl"
          alt="Recipe Image"
        />
      </div>

      <NFormItem v-if="isEditMode" class="w-full" v-bind="nameProps">
        <NInput v-model:value="name" type="text" placeholder="Rezeptname" />
      </NFormItem>
      <div v-else>
        {{ name }}
      </div>

      <NFormItem v-if="isEditMode" class="w-full" v-bind="descriptionProps">
        <NInput v-model:value="description" type="text" placeholder="Rezeptbeschreibung" />
      </NFormItem>
      <div v-else>
        {{ description }}
      </div>
    </div>

    <div class="flex justify-end">
      <NButton v-if="isEditMode" type="primary" attr-type="submit" :loading>
        {{ initialValues ? t('general.update') : t('general.create') }}
      </NButton>
      <NButton v-if="initialValues" @click="isEditMode = !isEditMode" :loading>
        {{ isEditMode ? t('general.cancel') : t('general.edit') }}
      </NButton>
      <NButton v-if="initialValues" type="error" @click="onDelete" :loading>
        {{ t('general.delete') }}
      </NButton>
    </div>
  </NForm>
</template>
