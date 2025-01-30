<script lang="ts" setup>
import BaseDialog from '@/components/baseDialog/BaseDialog.vue'
import BaseButton from '@/components/baseButton/BaseButton.vue'
import { PlansService } from '@/api'
import BaseDropdown from '@/components/baseDropdown/BaseDropdown.vue'
import BaseInput from '@/components/baseInput/BaseInput.vue'
import { shallowRef } from 'vue'
import { unwrapResponseData } from '@/components/form'
import { injectDialogState } from '@/components/baseDialog/useDialog.ts'

export type ImportDialogState = {
  id: string
  start: string
  end: string
}

const props = defineProps<{
  name: string
}>()

const id = shallowRef()
const start = shallowRef()
const end = shallowRef()
const state = injectDialogState<ImportDialogState>(props.name)
const { content } = unwrapResponseData(await PlansService.getPlans())

function onImport() {
  state.returnValue = {
    id: id.value,
    start: start.value,
    end: end.value,
  }
  state.show = false
}
</script>

<template>
  <BaseDialog title="Insert template plan" :name>
    <div class="flex flex-col gap-4">
      <BaseDropdown
        label="Select File"
        :options="content"
        v-model="id"
        value-name="id"
        label-name="name"
      />
      <BaseInput type="date" v-model="start" />
      <BaseInput type="date" v-model="end" />
      <BaseButton label="Import" @click="onImport"> Add </BaseButton>
    </div>
  </BaseDialog>
</template>
