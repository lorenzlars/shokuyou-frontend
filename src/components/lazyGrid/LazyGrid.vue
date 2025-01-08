<script lang="ts" setup generic="T">
import { onMounted, onUnmounted, shallowRef } from 'vue'
import type { GetRecipesData } from '@/api'
import type { PaginationParameters, PaginationResponse } from '@/composables/usePagination.ts'
import { watchDebounced } from '@vueuse/core'

const props = withDefaults(
  defineProps<{
    loader: (query: PaginationParameters) => Promise<PaginationResponse<T>>
    pageSize?: number
    filter?: string
    columns?: number
  }>(),
  {
    pageSize: 20,
    columns: 3,
  },
)
defineSlots<{
  default: (props: { data: T; key: number }) => unknown
}>()
const items = shallowRef<T[]>([])
const state = shallowRef<Omit<PaginationResponse<T>, 'content'>>()
const loading = shallowRef(false)

onMounted(async () => {
  window.addEventListener('scroll', handleScroll)

  await loadNextPage({ filter: props.filter })
})

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
  <div class="grid gap-5" :class="[`grid-cols-${columns}`]">
    <transition-group name="fade-slide">
      <slot v-for="(item, key) in items" :key v-bind="{ data: item }" />
    </transition-group>

    <div v-if="loading" :class="[`col-span-${columns}`]">Loading...</div>
    <div v-else-if="!state || state.total > items.length">Load more</div>
    <div v-if="items.length === 0" :class="[`col-span-${columns}`]">empty</div>
  </div>
</template>

<style lang="scss" scoped>
.fade-slide-enter-active {
  transition: all 0.3s ease-in-out;
}
.fade-slide-leave-active {
  transition: all 0.3s ease-in-out;
}
.fade-slide-enter-from {
  opacity: 0;
  transform: translateY(20px);
}
.fade-slide-enter-to {
  opacity: 1;
  transform: translateY(0);
}
.fade-slide-leave-from {
  opacity: 1;
  transform: translateY(0);
}
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(20px);
}
</style>
