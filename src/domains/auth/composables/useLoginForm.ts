import { useForm } from 'vee-validate'
import type { AuthRequestDto } from '@/api'
import { object, string } from 'yup'
import { toProvidedTypedSchema } from '@/components/form'

export function useLoginForm() {
  const schema = object({
    username: string().required().label('Username'),
    password: string().required().label('Password'),
  })

  return useForm<AuthRequestDto>({
    validationSchema: toProvidedTypedSchema(schema),
  })
}
