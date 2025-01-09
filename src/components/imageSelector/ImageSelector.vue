<script lang="ts" setup>
import BaseButton from '@/components/baseButton/BaseButton.vue'
import { IconTrash } from '@iconify-prerendered/vue-fa-solid'
import ImageSelectorEmpty from '@/components/imageSelector/ImageSelectorEmpty.vue'
import ImageSelectorSelect from '@/components/imageSelector/ImageSelectorSelect.vue'

withDefaults(
  defineProps<{
    edit?: boolean
  }>(),
  {
    edit: true,
  },
)

const modelValue = defineModel<File | null>({ required: false })
const modelValueSrc = defineModel<string>('src', { required: false })

function onFileChange(fileList: FileList) {
  const file = fileList[0]

  if (file instanceof File) {
    modelValue.value = file
    modelValueSrc.value = URL.createObjectURL(file)
  }
}

function onDeleteImage() {
  modelValue.value = null
  modelValueSrc.value = undefined
}

function onFileDrop(event: DragEvent) {
  if (event.dataTransfer && event.dataTransfer.files.length > 0) {
    onFileChange(event.dataTransfer.files)
  }
}

function onClick() {
  const input = document.createElement('input')
  input.type = 'file'
  input.accept = 'image/*'
  input.style.display = 'none'

  input.addEventListener('change', (event: Event) => {
    const target = event.target as HTMLInputElement

    if (target.files instanceof FileList) {
      onFileChange(target.files)
    }

    document.body.removeChild(input)
  })

  document.body.appendChild(input)
  input.click()
}
</script>

<template>
  <div class="relative">
    <div class="rounded-xl overflow-hidden">
      <img
        v-if="modelValueSrc"
        :src="modelValueSrc"
        alt="Recipe picture"
        class="object-cover object-center w-full h-full block"
      />

      <ImageSelectorEmpty v-else-if="!edit && !modelValueSrc" class="h-64" />

      <ImageSelectorSelect
        v-else-if="edit && !modelValueSrc"
        @dragover.prevent
        @drop.prevent="onFileDrop"
        @click="onClick"
        class="h-64"
      />
    </div>

    <BaseButton
      class="absolute -top-5 -right-5"
      v-if="edit && modelValueSrc"
      @click="onDeleteImage"
      theme="danger"
      circle
    >
      <template #icon>
        <IconTrash />
      </template>
    </BaseButton>
  </div>
</template>
