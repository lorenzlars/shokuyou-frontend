<script lang="ts" setup generic="T">
import { onUnmounted, shallowRef } from 'vue'
import type { GetRecipesData } from '@/api'
import type { PaginationResponse } from '@/composables/usePagination.ts'
import { watchDebounced } from '@vueuse/core'

const props = withDefaults(
  defineProps<{
    loader: (query: GetRecipesData['query']) => Promise<PaginationResponse<T>>
    pageSize?: number
    filter?: string
    columns?: number
  }>(),
  {
    pageSize: 20,
    columns: 3,
  },
)

const items = shallowRef<T[]>([])
const state = shallowRef<Omit<PaginationResponse<T>, 'content'>>()
const loading = shallowRef(false)

window.addEventListener('scroll', handleScroll)
await loadNextPage({ filter: props.filter })

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})

watchDebounced(
  () => props.filter,
  async (filter) => {
    items.value = []
    state.value = undefined

    await loadNextPage({ filter })
  },
  { debounce: 500 },
)

function isScrolledToBottom() {
  const scrollTop = window.scrollY || document.documentElement.scrollTop
  const clientHeight = document.documentElement.clientHeight
  const scrollHeight = document.documentElement.scrollHeight

  return scrollTop + clientHeight >= scrollHeight
}

async function handleScroll() {
  if (isScrolledToBottom()) {
    await loadNextPage({ filter: props.filter })
  }
}

async function loadNextPage(query?: Omit<GetRecipesData['query'], 'page' | 'pageSize'>) {
  if (!state.value?.total || state.value?.total > items.value.length) {
    loading.value = true

    const { content, ...meta } = await props.loader({
      pageSize: props.pageSize,
      page: state.value?.page ? state.value?.page + 1 : 1,
      orderBy: 'name',
      sortOrder: 'ASC',
      ...query,
    })

    items.value = items.value.concat(content)
    state.value = meta
  }

  loading.value = false
}
</script>

<template>
  <div class="grid gap-2" :class="[`grid-cols-${columns}`]">
    <slot v-for="(item, key) in items" :key v-bind="{ data: item }" />

    <div v-if="loading" :class="[`col-span-${columns}`]">Loading...</div>
    <div v-else-if="!state || state.total > items.length">Load more</div>
    <div v-if="items.length === 0" :class="[`col-span-${columns}`]">empty</div>
  </div>
</template>

<style lang="scss" scoped></style>
