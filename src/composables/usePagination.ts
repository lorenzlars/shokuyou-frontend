import type { PaginationResponseDto } from "@/api"
import { computed, reactive, shallowRef } from "vue"

export type PaginationResponse<T> = Omit<PaginationResponseDto, 'content'> & {
  content: T[]
}

export type PaginationParameters = {
  page: number
  pageSize: number
}

export type PaginationOptions = {
  showSizePicker: boolean
  pageSizes: number[]
}

export function usePagination<T>(options: PaginationOptions, callback: (parameters: PaginationParameters) => Promise<PaginationResponse<T>>) {
  const data = shallowRef<T[]>()
  const loading = shallowRef(false)
  const page = shallowRef(1)
  const pageSize = shallowRef(10)
  const total = shallowRef(1)
  const pageCount = computed(() => Math.ceil(total.value / pageSize.value))
  const pagination = reactive({
    ...options,
    page,
    pageSize,
    pageCount,
    onChange: async (pageNumber: number) => {
      page.value = pageNumber

      updateData({
        page: pageNumber,
        pageSize: pageSize.value,
      })
    },
    onUpdatePageSize: (pageSizeNumber: number) => {
      pageSize.value = pageSizeNumber
      page.value = 1

      updateData({
        page: page.value,
        pageSize: pageSizeNumber,
      })
    },
  })

  async function updateData(parameters: PaginationParameters) {
    loading.value = true

    const { content, page, pageSize, total: totalNumber } = await callback(parameters)

    data.value = content
    pagination.page = page
    pagination.pageSize = pageSize
    total.value = totalNumber

    loading.value = false
  }

  updateData({
    page: 1,
    pageSize: 10,
  })

  return { pagination, data, loading }
}
