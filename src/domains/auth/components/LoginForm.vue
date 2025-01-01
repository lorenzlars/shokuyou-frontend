<template>
  <NCard class="w-128" :title="t('titles.login')">
    <NForm @submit="onSubmit">
      <div class="flex gap-2">
        <NFormItem class="w-full" v-bind="usernameProps">
          <NInput v-model:value="username" type="text" :placeholder="t('placeholders.username')" />
        </NFormItem>

        <NFormItem class="w-full" v-bind="passwordProps">
          <NInput v-model:value="password" type="password" :placeholder="t('placeholders.password')" />
        </NFormItem>
      </div>

      <NCheckbox class="mb-5" v-model:checked="rememberMe">
        {{ t('checkbox.remember') }}
      </NCheckbox>

      <div class="flex justify-between">
        <NButton type="default" @click="register" :loading> {{ t('buttons.register') }} </NButton>

        <NButton type="primary" attr-type="submit" :loading="isSubmitting">
          {{ t('buttons.submit') }}
        </NButton>
      </div>
    </NForm>
  </NCard>
</template>

<script setup lang="ts">
import { NButton, NInput, NCard, NForm, NFormItem, NCheckbox } from 'naive-ui'
import { useLoginForm } from '@/domains/auth/composables/useLoginForm.ts'
import { AuthService } from '@/api'
import { useAuthStore } from '@/domains/auth/stores/authStore.ts'
import { useMessage } from 'naive-ui'
import { useAsyncPromise } from '@/composables/useAsyncPromise'
import { shallowRef } from 'vue'
import { useNaiveUiFieldConfig } from '@/composables/useNaiveUiFieldConfig'
import { useI18n } from 'vue-i18n'

const message = useMessage()
const rememberMe = shallowRef(false)
const { handleSubmit, defineField, isSubmitting } = useLoginForm()

const emit = defineEmits<{
  success: []
}>()

const [username, usernameProps] = defineField<'username'>(
  'username',
  useNaiveUiFieldConfig('Username'),
)
const [password, passwordProps] = defineField<'password'>(
  'password',
  useNaiveUiFieldConfig('Password'),
)
const { login } = useAuthStore()
const { execute, loading } = useAsyncPromise(() =>
  AuthService.userRegister({
    body: { username: 'test', password: 'test' },
  }),
)

const { t } = useI18n()

const onSubmit = handleSubmit(async (values) => {
  await login(values, rememberMe.value)

  emit('success')
})

async function register() {
  try {
    const { status } = await execute()

    if (status && status > 300) {
      message.error('Registration failed')
    }
  } catch (error) {
    // TODO: Is not working because postRegister is not throwing an error

    if (error instanceof Error) {
      message.warning(error.message)
    }
  }
}
</script>
