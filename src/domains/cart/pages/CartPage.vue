<script lang="ts" setup>
import { type ProductResponseDto, ProductsService } from '@/api'
import { unwrapResponseData } from '@/components/form'
import BaseButton from '@/components/baseButton/BaseButton.vue'
import { reactive } from 'vue'
import PageLayout from '@/components/PageLayout.vue'
import DataTable from '@/components/dataTable/DataTable.vue'
import DataTableColumn from '@/components/dataTable/DataTableColumn.vue'
import { useAsyncPromise } from '@/composables/useAsyncPromise.ts'
import ProductForm from '@/domains/cart/components/ProductForm.vue'
import BaseInput from '@/components/baseInput/BaseInput.vue'
import { useProductsForm } from '@/domains/cart/composables/useProductsForm.ts'
import { useI18n } from 'vue-i18n'

const { execute, data: productsContext } = useAsyncPromise(
  async () => {
    const products = unwrapResponseData(
      await ProductsService.getProducts({
        query: {
          page: 1,
          pageSize: 100,
        },
      }),
    )

    return products.content
  },
  () => [] as ProductResponseDto[],
)
const x = reactive({ products: productsContext })
const { t } = useI18n()
useProductsForm(x)

execute()

async function deleteProduct(id: string) {
  await ProductsService.deleteProduct({ path: { id } })
  await execute()
}

async function updateProduct(product: ProductResponseDto) {
  const { id, log, ...rest } = product

  await ProductsService.updateProduct({
    path: {
      id,
    },
    body: rest,
  })
  await execute()
}
</script>

<template>
  <PageLayout title="Cart">
    <ProductForm />

    <DataTable :values="productsContext" key-path="id">
      <DataTableColumn title="Amount" path="amount" v-slot="{ value }">
        <BaseInput v-model="value.amount" type="number" class="w-full" />
      </DataTableColumn>
      <DataTableColumn title="Unit" path="unit" v-slot="{ value }">
        <BaseInput v-model="value.unit" class="w-full" />
      </DataTableColumn>
      <DataTableColumn title="Name" path="name" v-slot="{ value }">
        <BaseInput v-model="value.name" class="w-full" />
      </DataTableColumn>
      <DataTableColumn v-slot="{ value }">
        <BaseButton label="Delete" theme="danger" @click="deleteProduct(value.id)" />
        <BaseButton label="Update" theme="info" @click="updateProduct(value)" />
      </DataTableColumn>

      <template #details="{ value }">
        <div class="p-4">
          <ul>
            <li v-for="(entry, key) in value.log" :key>
              {{ t(`logMessageType.${entry.messageType}`, entry.messageProperties ?? {}) }}
            </li>
          </ul>
        </div>
      </template>
    </DataTable>
  </PageLayout>
</template>
