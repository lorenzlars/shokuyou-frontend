import { toTypedSchema } from '@vee-validate/zod'
import { object } from 'zod'
import { useForm } from 'vee-validate'
import type { LoginUserDto } from '@/api'
import { zLoginUserDto } from '@/api/zod.gen.ts'

export function useLoginForm() {
  const schema = object({
    username: zLoginUserDto.shape.username.default('test'),
    password: zLoginUserDto.shape.password.default('test'),
  })

  return useForm<LoginUserDto>({
    validationSchema: toTypedSchema(schema),
  })
}
