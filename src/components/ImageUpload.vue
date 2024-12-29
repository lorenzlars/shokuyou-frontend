<template>
  <NUpload action="https://www.mocky.io/v2/5e4bafc63100007100d8b70f" :default-file-list="fileList"
    list-type="image-card">
    Click to Upload
  </NUpload>
  <NDivider />
  <NUpload action="https://www.mocky.io/v2/5e4bafc63100007100d8b70f" :default-file-list="previewFileList"
    list-type="image-card" @preview="handlePreview" />
  <NModal v-model:show="showModal" preset="card" style="width: 600px" title="A Cool Picture">
    <img :src="previewImageUrl" style="width: 100%">
  </NModal>
</template>

<script lang="ts" setup>
import type { NUpload, NDivider, NModal, UploadFileInfo } from 'naive-ui'
import { shallowRef } from 'vue'

const showModal = shallowRef(false)
const previewImageUrl = shallowRef<string>()
const fileList = shallowRef<UploadFileInfo[]>([
  {
    id: 'a',
    name: '我是上传出错的普通文件.png',
    status: 'error'
  },
  {
    id: 'b',
    name: '我是普通文本.doc',
    status: 'finished',
    type: 'text/plain'
  },
  {
    id: 'c',
    name: '我是自带url的图片.png',
    status: 'finished',
    url: 'https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg'
  },
  {
    id: 'd',
    name: '我是上传进度99%的文本.doc',
    status: 'uploading',
    percentage: 99
  }
])
const previewFileList = shallowRef<UploadFileInfo[]>([
  {
    id: 'react',
    name: '我是react.png',
    status: 'finished',
    url: 'https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg'
  },
  {
    id: 'vue',
    name: '我是vue.png',
    status: 'finished',
    url: 'https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg'
  }
])

function handlePreview(file: UploadFileInfo) {
  const { url } = file
  previewImageUrl.value = url as string
  showModal.value = true
}

</script>
