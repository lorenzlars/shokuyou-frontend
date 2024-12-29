import { toTypedSchema } from '@vee-validate/zod'
import { object } from 'zod'
import { useForm } from 'vee-validate'
import type { CreateUserDto } from '@/api'
import { zCreateUserDto } from '@/api/zod.gen.ts'

export function useLoginForm() {
  const schema = object({
    username: zCreateUserDto.shape.username.default('test'),
    password: zCreateUserDto.shape.password.default('test'),
  })

  return useForm<CreateUserDto>({
    validationSchema: toTypedSchema(schema),
  })
}
