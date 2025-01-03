import { shallowRef } from 'vue'

/**
 * A custom hook that provides a safe way to execute asynchronous operations with proper loading state management.
 *
 * @param callback A function that returns a Promise. It represents the asynchronous operation to be executed.
 */
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
