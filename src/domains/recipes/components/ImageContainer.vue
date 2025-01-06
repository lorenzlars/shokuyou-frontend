<script lang="ts" setup>
import BaseButton from '@/components/baseButton/BaseButton.vue'
import { IconImage, IconTrash, IconBox } from '@iconify-prerendered/vue-fa-solid'

defineProps<{
  edit?: boolean
}>()

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
    <div class="bg-gray-100">
      <img
        v-if="modelValueSrc"
        :src="modelValueSrc"
        class="object-cover object-center w-full h-full"
      />
      <div
        v-else-if="!edit && !modelValueSrc"
        class="flex flex-col items-center justify-center gap-3 h-64"
      >
        <IconImage class="text-5xl text-gray-400" />
      </div>
      <div
        v-else-if="edit && !modelValueSrc"
        @dragover.prevent
        @drop.prevent="onFileDrop"
        @click="onClick"
        class="flex flex-col items-center justify-center gap-3 h-64"
      >
        <IconBox class="text-5xl text-gray-400" />
        <p class="text-center">Click or drag a file to this area to upload</p>
      </div>
    </div>

    <BaseButton
      class="absolute -top-3 -right-3"
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
