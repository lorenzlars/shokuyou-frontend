<script lang="ts" setup>
import {
  NButton,
  NIcon,
  NImage,
  NUpload,
  NUploadDragger,
  NUploadTrigger,
  type UploadFileInfo,
} from 'naive-ui'
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

function onFileChange(fileList: UploadFileInfo[]) {
  const file = fileList[0]?.file

  if (file instanceof File) {
    modelValue.value = file
    modelValueSrc.value = URL.createObjectURL(file)
  }
}

function onDeleteImage() {
  modelValue.value = null
  modelValueSrc.value = undefined
}
</script>

<template>
  <div class="relative">
    <NImage
      v-if="(edit && modelValueSrc) || !edit"
      :src="modelValueSrc"
      class="w-full"
      :class="{ 'h-64': !modelValueSrc }"
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

    <NUpload
      abstract
      v-if="edit"
      show-file-list
      accept="image/*"
      @update:file-list="onFileChange"
      :default-upload="false"
    >
      <NUploadTrigger v-if="!modelValueSrc" #="{ handleClick }" abstract>
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
</template>

<style lang="scss" scoped></style>
