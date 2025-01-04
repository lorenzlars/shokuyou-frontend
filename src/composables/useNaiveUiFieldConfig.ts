import type { LazyInputBindsConfig, PublicPathState } from 'vee-validate'

type FieldValidation = {
  validationStatus: 'error' | undefined
  feedback: string
}

type InputBindings = {
  props: Record<string, unknown> & FieldValidation
}

type NaiveConfig = (state: PublicPathState) => ReturnType<LazyInputBindsConfig> & InputBindings

export function useNaiveUiFieldConfig(label?: string): NaiveConfig {
  return (state: PublicPathState) => ({
    props: {
      validationStatus: state.errors[0] ? 'error' : undefined,
      feedback: state.errors[0],
      showRequireMark: state.required,
      label,
      path: state.path,
    },
  })
}
