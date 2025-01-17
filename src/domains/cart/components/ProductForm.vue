<script lang="ts" setup>
import { NumberFormField, StringFormField } from '@/components/form'
import BaseButton from '@/components/baseButton/BaseButton.vue'
import { useProductForm } from '@/domains/cart/composables/useProductForm.ts'
import { ProductsService } from '@/api'
const { handleSubmit } = useProductForm()

const onSubmit = handleSubmit(async (values) => {
  await ProductsService.createProduct({
    body: values,
  })
})
</script>

<template>
  <form @submit="onSubmit" class="flex gap-4">
    <NumberFormField path="amount" label="Amount" />
    <StringFormField path="unit" label="Unit" />
    <StringFormField path="name" label="Name" />

    <BaseButton label="Add to cart" type="submit" />
  </form>
</template>
