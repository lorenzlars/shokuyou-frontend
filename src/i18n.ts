import { nextTick, watch } from 'vue'
import { createI18n, type I18n, type I18nOptions } from 'vue-i18n'

export function setupI18n(options: I18nOptions) {
  const i18n = createI18n(options)

  setI18nLanguage(i18n, options?.locale ?? 'en')

  watch(
    () => i18n.global.locale,
    (value) => {
      if (typeof value === 'string') {
        setI18nLanguage(i18n, value)
      }
    },
  )

  return i18n
}

export function setI18nLanguage(i18n: I18n, locale: string) {
  i18n.global.locale = locale

  document.querySelector('html')?.setAttribute('lang', locale)

  loadLocaleMessages(i18n, locale)
}

export async function loadLocaleMessages(i18n: I18n, locale: string) {
  const messages = await import(`./locales/${locale}.json`)

  i18n.global.setLocaleMessage(locale, messages.default)

  return nextTick()
}
