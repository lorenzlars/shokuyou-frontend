import { toTypedSchema } from '@vee-validate/zod'
import { object, string } from 'zod'
import { useForm } from 'vee-validate'
import type { LoginUserDto } from '@/api'

export function useLoginForm(): ReturnType<typeof useForm> {
  const schema = object({
    email: string().default('test'),
    password: string().default('test'),
  })

  const form = useForm<LoginUserDto>({
    validationSchema: toTypedSchema(schema),
  })

  return {
    ...form,
  }
}
