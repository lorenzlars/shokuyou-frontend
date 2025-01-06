import { object, string } from 'yup'
import { useForm } from 'vee-validate'
import type { AuthRegisterRequestDto } from '@/api'
import { useI18n } from 'vue-i18n'
import { computed, type ComputedRef } from 'vue'
import { toProvidedTypedSchema } from '@/components/form'

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
      regex: /(?=.*?[a-z])/,
      hint: t('hints.passwordRequireLowercase'),
    },
    {
      regex: /(?=.*?[A-Z])/,
      hint: t('hints.passwordRequireUppercase'),
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
    username: string().required().label('Username'),
    password: passwordRules.value
      .reduce((field, rule) => field.matches(rule.regex, rule.hint), string())
      .required()
      .label('Password'),
    passwordConfirm: string().required().label('Confirm Password'),
  }).test('passwordsMatch', (value, context) => {
    if (value && context.parent?.password && value !== context.parent?.password) {
      return context.createError({ path: 'passwordConfirm', message: t('hints.passwordConfirm') })
    }

    return true
  })

  const form = useForm<FormValues>({
    validationSchema: toProvidedTypedSchema(schema),
  })

  return {
    ...form,
    passwordRules,
  }
}
