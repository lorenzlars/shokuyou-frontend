<script lang="ts" setup>
import { type ProductResponseDto, ProductsService } from '@/api'
import { unwrapResponseData } from '@/components/form'
import BaseButton from '@/components/baseButton/BaseButton.vue'
import { computed } from 'vue'
import PageLayout from '@/components/PageLayout.vue'
import DataTable from '@/components/dataTable/DataTable.vue'
import DataTableColumn from '@/components/dataTable/DataTableColumn.vue'
import { useAsyncPromise } from '@/composables/useAsyncPromise.ts'
import ProductForm from '@/domains/cart/components/ProductForm.vue'
import BaseInput from '@/components/baseInput/BaseInput.vue'

const { execute, data: productsContext } = useAsyncPromise(
  async () =>
    unwrapResponseData(
      await ProductsService.getProducts({
        query: {
          page: 1,
          pageSize: 100,
        },
      }),
    ),
  () => ({ content: [] as ProductResponseDto[] }),
)

const products = computed(() => productsContext.value.content)

execute()

async function deleteIngredient(id: string) {
  await ProductsService.deleteProduct({ path: { id } })
  await execute()
}
</script>

<template>
  <PageLayout title="Cart">
    <ProductForm />

    <DataTable :values="products" key-path="id">
      <DataTableColumn title="Amount" path="amount" v-slot="{ value }">
        <BaseInput v-model="value.amount" type="number" />
      </DataTableColumn>
      <DataTableColumn title="Unit" path="unit" v-slot="{ value }">
        <BaseInput v-model="value.unit" />
      </DataTableColumn>
      <DataTableColumn title="Name" path="name" v-slot="{ value }">
        <BaseInput v-model="value.name" />
      </DataTableColumn>
      <DataTableColumn v-slot="{ value }">
        <BaseButton
          label="Delete"
          theme="danger"
          @click="deleteIngredient(value.id)"
          :disabled="value.recipes.length > 0"
        />
      </DataTableColumn>
    </DataTable>
  </PageLayout>
</template>
