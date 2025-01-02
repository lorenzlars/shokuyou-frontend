import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'
import type { AuthRequestDto } from '@/api'
import { zAuthRequestDto } from '@/api/zod.gen.ts'

export function useLoginForm() {
  return useForm<AuthRequestDto>({
    validationSchema: toTypedSchema(zAuthRequestDto),
  })
}
