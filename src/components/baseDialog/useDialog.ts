import { inject, provide, reactive, watch } from 'vue'

type DialogState<T> = {
  show: boolean
  blocked: boolean
  returnValue?: T
}

export function useDialog<T = boolean>(dialogName: string) {
  const state = reactive<DialogState<T>>({
    show: false,
    blocked: false,
  })

  async function showDialog() {
    state.show = true

    return new Promise<T | undefined>((resolve) => {
      watch(
        () => state.show,
        () => {
          resolve(state.returnValue as T | undefined)

          state.blocked = false
          state.returnValue = undefined
        },
        { once: true },
      )
    })
  }

  provide(dialogName, state)

  return { showDialog }
}

export function injectDialogState<T = boolean>(dialogName: string) {
  const state = inject<DialogState<T>>(dialogName)

  if (!state) {
    throw new Error(`Call 'useDialog(${dialogName})' to provided the dialog state`)
  }

  return state
}
