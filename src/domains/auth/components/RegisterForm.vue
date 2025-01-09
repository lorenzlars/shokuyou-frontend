<script setup lang="ts">
import { type AuthRegisterRequestDto, type AuthRequestDto, AuthService } from '@/api'
import { useI18n } from 'vue-i18n'
import { useRegisterForm } from '@/domains/auth/composables/useRegisterForm.ts'
import ValidationRules from '@/domains/auth/components/ValidationRules.vue'
import { preprocessValues, StringFormField } from '@/components/form'
import { useAsyncPromise } from '@/composables/useAsyncPromise.ts'
import BaseButton from '@/components/baseButton/BaseButton.vue'

const { handleSubmit, passwordRules } = useRegisterForm()
const { t } = useI18n()
const emit = defineEmits<{
  submitted: [values: AuthRequestDto]
}>()

const { execute, loading } = useAsyncPromise(
  (values: AuthRegisterRequestDto) =>
    AuthService.userRegister({
      body: values,
    }),
  () => ({}),
)

const onSubmit = handleSubmit(async (values) => {
  const processedValues = preprocessValues(values, ['passwordConfirm'])

  await execute(processedValues)

  emit('submitted', preprocessValues(values, ['passwordConfirm']))
})

// TODO: a11y errors on password field
</script>

<template>
  <form class="flex flex-col gap-3" @submit="onSubmit">
    <StringFormField class="w-full" name="username" />

    <StringFormField class="w-full" type="password" name="password">
      <template #feedback="{ value }">
        <ValidationRules :value :rules="passwordRules" />
      </template>
    </StringFormField>

    <StringFormField class="w-full" type="password" name="passwordConfirm" />

    <BaseButton theme="accent" type="submit" :loading>
      {{ t('general.register') }}
    </BaseButton>
  </form>
</template>
