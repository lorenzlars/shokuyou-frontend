<script lang="ts" setup>
import BaseButton from '@/components/baseButton/BaseButton.vue'
import { NumberFormField, StringFormField } from '@/components/form'
import { useFieldArray } from 'vee-validate'
import type { IngredientRequestDto } from '@/api'

const props = defineProps<{
  path: string
  disabled?: boolean
}>()
const { fields, remove, push } = useFieldArray<IngredientRequestDto>(props.path)

function addEntry() {
  push({ name: '', amount: 0, unit: '' })
}
</script>

<template>
  <div>
    <fieldset
      class="flex items-center gap-4 border-none p-0"
      v-for="(field, id) in fields"
      :key="field.key"
      :disabled
    >
      <NumberFormField :path="`${props.path}[${id}].amount`" />
      <StringFormField :path="`${props.path}[${id}].unit`" />
      <StringFormField :path="`${props.path}[${id}].name`" />
      <BaseButton @click="remove(id)" label="Delete" />
    </fieldset>

    <BaseButton @click="addEntry" label="Add" :disabled />
  </div>
</template>
