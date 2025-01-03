import { shallowRef } from 'vue'

export function useSafeAsyncState<TArgs extends unknown[], TReturn>(
  callback: (...props: TArgs) => Promise<TReturn>,
) {
  const loading = shallowRef(false)

  async function execute(...props: TArgs): Promise<TReturn> {
    loading.value = true

    try {
      return await callback(...props)
    } catch (error) {
      throw error
    } finally {
      loading.value = false
    }
  }

  return {
    execute,
    loading,
  }
}
