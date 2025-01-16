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

const modelValue = defineModel<File | null>()
const modelValueSrc = defineModel<string>('src')

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
    <div class="">
      <img
        v-if="modelValueSrc"
        :src="modelValueSrc"
        alt="Recipe picture"
        class="object-cover object-center w-full h-full block rounded-xl"
      />

      <ImageSelectorEmpty v-else-if="!edit && !modelValueSrc" class="h-64 rounded-xl" />

      <ImageSelectorSelect
        v-else-if="edit && !modelValueSrc"
        @dragover.prevent
        @drop.prevent="onFileDrop"
        @click="onClick"
        @keydown.enter="onClick"
        class="h-64 rounded-xl focus:ring-2 focus:ring-primary"
        tabindex="0"
        role="textbox"
        label="Click or drag a file to this area to upload"
      />
    </div>

    <BaseButton
      class="absolute -top-5 -right-5"
      v-if="edit && modelValueSrc"
      @click="onDeleteImage"
      theme="danger"
      rounded
    >
      <template #icon>
        <IconTrash />
      </template>
    </BaseButton>
  </div>
</template>
