<template>
  <NForm @submit="onSubmit">
    <div class="flex gap-2">
      <NUpload v-if="isEditMode" show-file-list accept="image/*" @update:file-list="onFileChange"
        :default-upload="false">
        <NButton type="primary">Upload Image</NButton>
      </NUpload>
      <div v-if="!isEditMode && initialValues?.imageUrl" class="w-64">
        <img class="object-cover object-center w-full h-full" :src="initialValues.imageUrl" alt="Recipe Image" />
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
        {{ initialValues ? t('buttons.update') : t('buttons.create') }}
      </NButton>
      <NButton v-if="initialValues" @click="isEditMode = !isEditMode">
        {{ isEditMode ? t('buttons.cancel') : t('buttons.edit') }}
      </NButton>
      <NButton v-if="initialValues" type="error" @click="onDelete">{{ t('buttons.delete') }}</NButton>
    </div>
  </NForm>
</template>

<script lang="ts" setup>
import { NButton, NInput, NForm, NFormItem, NUpload, type UploadFileInfo } from 'naive-ui'
import { useRecipeForm } from '@/domains/recipes/composables/useRecipeForm'
import { type CreateRecipeDto, type ResponseRecipeDto, type UpdateRecipeDto } from '@/api'
import { useNaiveUiFieldConfig } from '@/composables/useNaiveUiFieldConfig'
import { shallowRef, ref } from 'vue'
import { useI18n } from 'vue-i18n'

const emit = defineEmits<{
  submit: [values: [CreateRecipeDto | UpdateRecipeDto | null, File | null | undefined]]
}>()

const props = defineProps<{
  initialValues?: ResponseRecipeDto
}>()

const isEditMode = shallowRef(!props.initialValues)
const { handleSubmit, defineField } = useRecipeForm(props.initialValues)
const [name, nameProps] = defineField<'name'>('name', useNaiveUiFieldConfig('Name'))
const [description, descriptionProps] = defineField<'description'>('description', useNaiveUiFieldConfig('Description'))

const { t } = useI18n()
const loading = shallowRef(false)
const selectedFiles = ref<UploadFileInfo[]>([])

const onSubmit = handleSubmit(async (values) => {
  const imageFile = selectedFiles.value[0]?.file

  emit('submit', [values, imageFile])
})

function onDelete() {
  emit('submit', [null, null])
}

function onFileChange(fileList: UploadFileInfo[]) {
  // TODO: Handle null for delete and undefined for keeping image file

  selectedFiles.value = fileList
}
</script>
