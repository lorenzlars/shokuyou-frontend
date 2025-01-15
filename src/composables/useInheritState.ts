import { shallowRef } from 'vue'

export function useInheritState() {
  const hasFocus = shallowRef(false)
  const fieldProps = {
    onfocus: () => (hasFocus.value = true),
    onblur: () => (hasFocus.value = false),
  }

  return { hasFocus, fieldProps }
}
