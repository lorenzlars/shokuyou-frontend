<script lang="ts" setup>
import { NButton, NIcon } from 'naive-ui'
import {
  ImageOutline as ImageOutlineIcon,
  ArchiveOutline as ArchiveIcon,
  TrashBin as TrashBinIcon,
} from '@vicons/ionicons5'

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
        <NIcon :size="48" :depth="3">
          <ImageOutlineIcon />
        </NIcon>
      </div>
      <div
        v-else-if="edit && !modelValueSrc"
        @dragover.prevent
        @drop.prevent="onFileDrop"
        @click="onClick"
        class="flex flex-col items-center justify-center gap-3 h-64"
      >
        <NIcon :size="48" :depth="3">
          <ArchiveIcon />
        </NIcon>
        <p class="text-center">Click or drag a file to this area to upload</p>
      </div>
    </div>

    <NButton
      class="absolute -top-3 -right-3"
      v-if="edit && modelValueSrc"
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
  </div>
</template>
