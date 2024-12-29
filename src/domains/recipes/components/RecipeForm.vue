<template>
  <NForm @submit="onSubmit">
    <div class="flex gap-2">
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
      <NButton v-if="initialValues" type="error" @click="deleteRecipe">{{ t('buttons.delete') }}</NButton>
    </div>
  </NForm>
</template>

<script lang="ts" setup>
import { NButton, NInput, NForm, NFormItem } from 'naive-ui'
import { useRecipeForm } from '@/domains/recipes/composables/useRecipeForm'
import { type CreateRecipeDto } from '@/api'
import { useNaiveUiFieldConfig } from '@/composables/useNaiveUiFieldConfig'
import { shallowRef } from 'vue';
import { useI18n } from 'vue-i18n'

const props = defineProps<{
  initialValues?: CreateRecipeDto
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

const onSubmit = handleSubmit((values) => {
  emit('submit', values)
})

const deleteRecipe = () => {
  emit('delete')
}
</script>
