import { toTypedSchema } from '@vee-validate/zod'
import { object } from 'zod'
import { useForm } from 'vee-validate'
import type { LoginUserDto } from '@/api'
import { zLoginUserDto } from '@/api/zod.gen.ts'

export function useLoginForm(): ReturnType<typeof useForm> {
  const schema = object({
    username: zLoginUserDto.shape.username.default('test'),
    password: zLoginUserDto.shape.password.default('test'),
  })

  const form = useForm<LoginUserDto>({
    validationSchema: toTypedSchema(schema),
  })

  return {
    ...form,
  }
}
