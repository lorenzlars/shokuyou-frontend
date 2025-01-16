<script lang="ts" setup>
import { type IngredientResponseDto, IngredientsService } from '@/api'
import { unwrapResponseData } from '@/components/form'
import BaseButton from '@/components/baseButton/BaseButton.vue'
import { computed, shallowRef } from 'vue'
import BaseInput from '@/components/baseInput/BaseInput.vue'
import PageLayout from '@/components/PageLayout.vue'
import DataTable from '@/components/dataTable/DataTable.vue'
import DataTableColumn from '@/components/dataTable/DataTableColumn.vue'
import { useAsyncPromise } from '@/composables/useAsyncPromise.ts'

const newIngredients = shallowRef()
const { execute, data: ingredientsContext } = useAsyncPromise(
  async () =>
    unwrapResponseData(
      await IngredientsService.getIngredients({
        query: {
          page: 1,
          pageSize: 100,
        },
      }),
    ),
  () => ({ content: [] as IngredientResponseDto[] }),
)

const ingredients = computed(() => ingredientsContext.value.content)

await execute()

async function handleCreate() {
  if (newIngredients.value) {
    await IngredientsService.createIngredient({
      body: { name: newIngredients.value },
    })

    await execute()
  }
}

async function deleteIngredient(id: string) {
  await IngredientsService.deleteIngredients({ path: { id } })
  await execute()
}
</script>

<template>
  <PageLayout title="Ingredients">
    <div class="flex gap-4">
      <BaseInput
        v-model="newIngredients"
        required
        placeholder="Ingredient name"
        aria-invalid="true"
      />

      <BaseButton @click="handleCreate" label="Add" :disabled="!newIngredients" />
    </div>

    <DataTable :values="ingredients" key-path="id">
      <DataTableColumn path="name" title="Name" />
      <DataTableColumn path="amount" v-slot="{ value }">
        <BaseButton
          label="Delete"
          theme="danger"
          @click="deleteIngredient(value.id)"
          :disabled="value.recipes.length > 0"
        />
      </DataTableColumn>
      <DataTableColumn title="Used by recipes" path="recipes" v-slot="{ value }">
        {{ value.recipes.length }}
      </DataTableColumn>
    </DataTable>
  </PageLayout>
</template>
