import { shallowRef } from 'vue'

export function useAsyncPromise<T>(callback: () => Promise<T>) {
  const loading = shallowRef(false)

  async function execute(): Promise<T> {
    loading.value = true

    const data = await callback()

    loading.value = false

    return data
  }

  return {
    loading,
    execute,
  }
}
