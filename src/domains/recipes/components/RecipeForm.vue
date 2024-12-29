<template>
  <NForm @submit="onSubmit">
    <div class="flex gap-2">
      <NUpload v-if="isEditMode" :show-file-list="false" accept="image/*" @update:file-list="onFileChange"
        :default-upload="false">
        <NButton type="primary">Upload Image</NButton>
      </NUpload>
      <div v-if="!isEditMode && initialValues?.url" class="w-64">
        <img class="object-cover object-center w-full h-full" :src="initialValues.url" alt="Recipe Image" />
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

    <div v-if="isEditMode && imagePreview" class="mb-4">
      <img class="object-cover object-center w-full h-48" :src="imagePreview" alt="Selected Image" />
    </div>

    <div class="flex justify-end">
      <NButton v-if="isEditMode" type="primary" attr-type="submit" :loading>
        {{ initialValues ? t('buttons.update') : t('buttons.create') }}
      </NButton>
      <NButton v-if="initialValues" @click="isEditMode = !isEditMode">
        {{ isEditMode ? t('buttons.cancel') : t('buttons.edit') }}
      </NButton>
      <NButton v-if="initialValues" type="error" @click="$emit('delete')">{{ t('buttons.delete') }}</NButton>
    </div>
  </NForm>
</template>

<script lang="ts" setup>
import { NButton, NInput, NForm, NFormItem, NUpload, type UploadFileInfo } from 'naive-ui'
import { useRecipeForm } from '@/domains/recipes/composables/useRecipeForm'
import { type CreateRecipeDto, type Recipe } from '@/api'
import { useNaiveUiFieldConfig } from '@/composables/useNaiveUiFieldConfig'
import { shallowRef, ref } from 'vue'
import { useI18n } from 'vue-i18n'

const props = defineProps<{
  initialValues?: Recipe
  loading?: boolean
}>()

const emit = defineEmits<{
  submit: [value: CreateRecipeDto]
  delete: []
}>()

const isEditMode = shallowRef(!props.initialValues)
const { handleSubmit, defineField } = useRecipeForm(props.initialValues)
const [name, nameProps] = defineField<'name'>('name', useNaiveUiFieldConfig('Name'))
const [description, descriptionProps] = defineField<'description'>('description', useNaiveUiFieldConfig('Description'))

const { t } = useI18n()

const selectedFiles = ref<UploadFileInfo[]>([])
const imagePreview = ref<string | null>(props.initialValues?.url || null)


const onSubmit = handleSubmit(async (values) => {
  const imageFile = selectedFiles.value[0]?.file

  if (imageFile) {
    emit('submit', { ...values, image: await toDataURL(imageFile) })
  } else {
    emit('submit', { ...values })
  }
})

function onFileChange(fileList: UploadFileInfo[]) {
  selectedFiles.value = fileList
}

async function toDataURL(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = function (event: ProgressEvent<FileReader>) {
      if (event.currentTarget instanceof FileReader && typeof event.currentTarget.result === 'string') {
        resolve(event.currentTarget.result)
      } else {
        reject(new Error('Failed to read file'))
      }
    }

    reader.onerror = function (error) {
      reject(error)
    }

    reader.readAsDataURL(file);
  })
}
</script>
