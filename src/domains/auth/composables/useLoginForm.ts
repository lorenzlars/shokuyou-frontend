import { toTypedSchema } from '@vee-validate/zod'
import { object, string } from 'zod'
import { useForm } from 'vee-validate'

export function useLoginForm(): ReturnType<typeof useForm> {
  const schema = object({
    email: string(),
    password: string(),
  })

  const form = useForm({
    validationSchema: toTypedSchema(schema),
  })

  return {
    ...form,
  }
}
