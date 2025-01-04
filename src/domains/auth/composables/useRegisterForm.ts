import { toTypedSchema } from '@vee-validate/yup'
import { object, string } from 'yup'
import { useForm } from 'vee-validate'
import type { AuthRegisterRequestDto } from '@/api'
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

const SPECIAL_CHARS = '#?!$%^&*-'

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
      regex: new RegExp(`(?=.*?[${SPECIAL_CHARS}])`),
      hint: t('hints.passwordRequireSpecialCharacter', { regex: SPECIAL_CHARS }),
    },
    {
      regex: /.{8,}/,
      hint: t('hints.passwordRequireLength'),
    },
  ])

  const schema = object({
    username: string(),
    password: passwordRules.value.reduce(
      (field, rule) => field.matches(rule.regex, rule.hint),
      string(),
    ),
    passwordConfirm: string(),
  }).test('passwordsMatch', 'Passwords do not match', (value, context) => {
    if (value !== context.parent.password) {
      return context.createError({ path: 'passwordConfirm', message: t('hints.passwordConfirm') })
    }

    return true
  })

  const form = useForm<FormValues>({
    validationSchema: toTypedSchema(schema, { stripUnknown: true }),
  })

  return {
    ...form,
    passwordRules,
  }
}
