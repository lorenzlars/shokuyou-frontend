<template>
  <NCard class="w-128" title="Login">
    <NForm @submit="onSubmit">
      <div class="flex gap-2 mb-5">
        <NFormItem class="w-full" v-bind="usernameProps">
          <NInput v-model:value="username" type="text" placeholder="Input username" />
        </NFormItem>

        <NFormItem class="w-full" v-bind="passwordProps">
          <NInput v-model:value="password" type="password" placeholder="Input password" />
        </NFormItem>
      </div>

      <div class="flex justify-between">
        <NButton type="default" @click="register" :loading> Register </NButton>

        <NButton type="primary" attr-type="submit" :loading="isSubmitting">Submit</NButton>
      </div>
    </NForm>
  </NCard>
</template>

<script setup lang="ts">
import { NButton, NInput, NCard, NForm, NFormItem } from 'naive-ui'
import { useLoginForm } from '@/domains/auth/composables/useLoginForm.ts'
import { AuthService, type LoginUserDto } from '@/api'
import { useAuthStore } from '@/domains/auth/stores/authStore.ts'
import type { LazyInputBindsConfig, PublicPathState } from 'vee-validate'
import { useMessage } from 'naive-ui'
import { useAsyncPromise } from '@/composables/useAsyncPromise'

type FieldValidation = {
  validationStatus: 'error' | undefined
  feedback: string
}

type InputBindings = {
  props: Record<string, unknown> & FieldValidation
}

type NaiveConfig = (state: PublicPathState) => ReturnType<LazyInputBindsConfig> & InputBindings

const message = useMessage()
const { handleSubmit, defineField, isSubmitting } = useLoginForm()

const emit = defineEmits<{
  success: []
}>()

function naiveConfig(label: string): NaiveConfig {
  return (state: PublicPathState) => ({
    props: {
      validationStatus: state.errors[0] ? 'error' : undefined,
      feedback: state.errors[0],
      showRequireMark: state.required,
      label,
      path: state.path,
    },
  })
}

const [username, usernameProps] = defineField<string>('username', naiveConfig('Username'))
const [password, passwordProps] = defineField<string>('password', naiveConfig('Password'))
const { login } = useAuthStore()
const { execute, loading } = useAsyncPromise(() =>
  AuthService.postRegister({
    body: { username: 'test', password: 'test' },
  }),
)

const onSubmit = handleSubmit(async (values) => {
  await login(values as LoginUserDto)

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
