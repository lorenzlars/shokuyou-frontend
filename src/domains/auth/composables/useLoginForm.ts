import { toTypedSchema } from '@vee-validate/yup'
import { useForm } from 'vee-validate'
import type { AuthRequestDto } from '@/api'
import { object, string } from 'yup'

export function useLoginForm() {
  const schema = object({
    username: string().required(),
    password: string().required(),
  })

  return useForm<AuthRequestDto>({
    validationSchema: toTypedSchema(schema, { stripUnknown: true }),
  })
}
