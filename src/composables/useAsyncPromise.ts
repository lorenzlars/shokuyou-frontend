import { shallowRef } from 'vue'

export function useAsyncPromise<TArgs extends unknown[], TReturn>(
  callback: (...args: TArgs) => Promise<TReturn>,
) {
  const loading = shallowRef(false)

  async function execute(...args: TArgs): Promise<TReturn> {
    loading.value = true

    const data = await callback(...args)

    loading.value = false

    return data
  }

  return {
    loading,
    execute,
  }
}
