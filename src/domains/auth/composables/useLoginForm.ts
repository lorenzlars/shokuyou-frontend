import { toTypedSchema } from '@vee-validate/zod'
import { object } from 'zod'
import { useForm } from 'vee-validate'
import type { AuthRequestDto } from '@/api'
import { zAuthRequestDto } from '@/api/zod.gen.ts'

export function useLoginForm() {
  const schema = object({
    username: zAuthRequestDto.shape.username.default('test'),
    password: zAuthRequestDto.shape.password.default('test'),
  })

  return useForm<AuthRequestDto>({
    validationSchema: toTypedSchema(schema),
  })
}
