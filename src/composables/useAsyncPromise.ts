import { shallowRef, type ShallowRef } from 'vue'

type AsyncPromise<TArgs extends unknown[], TReturn> = {
  loading: ShallowRef<boolean>
  execute: (...args: TArgs) => Promise<TReturn>
  data: ShallowRef<TReturn>
}

export function useAsyncPromise<TArgs extends unknown[], TReturn>(
  callback: (...args: TArgs) => Promise<TReturn>,
  defaultData: () => TReturn,
): AsyncPromise<TArgs, TReturn> {
  const loading = shallowRef(false)
  const data = shallowRef<TReturn>(defaultData())

  async function execute(...args: TArgs): Promise<TReturn> {
    loading.value = true

    try {
      data.value = await callback(...args)
    } finally {
      loading.value = false
    }

    return data.value
  }

  return {
    loading,
    execute,
    data,
  }
}
