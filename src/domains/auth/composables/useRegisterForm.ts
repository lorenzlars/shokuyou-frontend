import { toTypedSchema } from '@vee-validate/zod'
import { object, string, ZodIssueCode } from 'zod'
import { useForm } from 'vee-validate'
import type { AuthRegisterRequestDto } from '@/api'
import { zAuthRegisterRequestDto } from '@/api/zod.gen.ts'
import { useI18n } from 'vue-i18n'
import { computed, type ComputedRef } from 'vue'

export type PasswordRule = {
  regex: RegExp
  hint: string
}

type FormValues = AuthRegisterRequestDto & { passwordConfirm: string }

type FormReturn = ReturnType<typeof useForm<FormValues>> & {
  passwordRules: ComputedRef<PasswordRule[]>
}

export function useRegisterForm(): FormReturn {
  const { t } = useI18n()
  const passwordRules = computed<PasswordRule[]>(() => [
    {
      regex: /(?=.*?[A-Z])/,
      hint: t('hints.passwordRequireUppercase'),
    },
    {
      regex: /(?=.*?[a-z])/,
      hint: t('hints.passwordRequireLowercase'),
    },
    {
      regex: /(?=.*?[0-9])/,
      hint: t('hints.passwordRequireNumber'),
    },
    {
      regex: /(?=.*?[#?!@$%^&*-])/,
      hint: t('hints.passwordRequireSpecialCharacter'),
    },
    {
      regex: /.{8,}/,
      hint: t('hints.passwordRequireLength'),
    },
  ])

  const passwordField = passwordRules.value.reduce(
    (field, rule) => field.regex(rule.regex, rule.hint),
    zAuthRegisterRequestDto.shape.password,
  )

  const schema = object({
    ...zAuthRegisterRequestDto.shape,
    password: passwordField,
    passwordConfirm: string(),
  })
    // TODO: This brakes somehow vee-validate recognizing required fields https://github.com/logaretm/vee-validate/issues/4338
    .superRefine((val, ctx) => {
      if (val.password !== val.passwordConfirm) {
        ctx.addIssue({
          path: ['passwordConfirm'],
          code: ZodIssueCode.custom,
          message: 'Passwords do not match',
        })
      }
    })

  const form = useForm<FormValues>({
    validationSchema: toTypedSchema(schema),
  })

  return {
    ...form,
    passwordRules,
  }
}
