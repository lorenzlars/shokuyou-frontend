<script lang="ts" setup>
import BaseButton from '@/components/baseButton/BaseButton.vue'

const props = defineProps<{
  label: string
  accept: HTMLInputElement['accept']
}>()
const modelValue = defineModel<File>()
const emit = defineEmits<{
  change: [file: File]
}>()

function onFileChange(fileList: FileList) {
  const file = fileList[0]

  if (file instanceof File) {
    modelValue.value = file
    emit('change', file)
  }
}

function onClick() {
  const input = document.createElement('input')
  input.type = 'file'
  input.accept = props.accept
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
  <BaseButton :label @click="onClick" />
</template>
