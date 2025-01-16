<script lang="ts" setup>
import BaseDialog from '@/components/baseDialog/BaseDialog.vue'
import BaseButton from '@/components/baseButton/BaseButton.vue'
import { injectDialogState } from '@/components/baseDialog/useDialog.ts'
import FileSelect from '@/components/fileSelect/FileSelect.vue'
import { DataService } from '@/api'
import { shallowRef } from 'vue'

const props = defineProps<{
  name: string
}>()

const state = injectDialogState(props.name)
const selectedFile = shallowRef<File>()

async function onImport() {
  state.blocked = true

  await DataService.importBackup({
    query: {
      type: 'mela',
    },
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    body: {
      file: selectedFile.value!,
    },
  })

  state.returnValue = true
  state.show = false
}
</script>

<template>
  <BaseDialog title="Import" :name>
    <div class="flex flex-col gap-4">
      <FileSelect label="Select File" accept=".melarecipes" v-model="selectedFile" />
      <BaseButton
        label="Import"
        :disabled="!selectedFile || state.blocked"
        @click="onImport"
        :loading="state.blocked"
      >
        Import
      </BaseButton>
    </div>
  </BaseDialog>
</template>
