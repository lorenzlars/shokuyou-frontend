<template>
  <NCard class="w-128" title="Login">
    <NForm @submit="onSubmit">
      <div class="flex gap-2">
        <NFormItem class="w-full" v-bind="usernameProps">
          <NInput v-model:value="username" type="text" placeholder="Input username" />
        </NFormItem>

        <NFormItem class="w-full" v-bind="passwordProps">
          <NInput v-model:value="password" type="password" placeholder="Input password" />
        </NFormItem>
      </div>

      <NCheckbox class="mb-5" v-model:checked="rememberMe"> Remember </NCheckbox>

      <div class="flex justify-between">
        <NButton type="default" @click="register" :loading> Register </NButton>

        <NButton type="primary" attr-type="submit" :loading="isSubmitting">Submit</NButton>
      </div>
    </NForm>
  </NCard>
</template>

<script setup lang="ts">
import { NButton, NInput, NCard, NForm, NFormItem, NCheckbox } from 'naive-ui'
import { useLoginForm } from '@/domains/auth/composables/useLoginForm.ts'
import { AuthService, type LoginUserDto } from '@/api'
import { useAuthStore } from '@/domains/auth/stores/authStore.ts'
import { useMessage } from 'naive-ui'
import { useAsyncPromise } from '@/composables/useAsyncPromise'
import { shallowRef } from 'vue'
import { useNaiveUiFieldConfig } from '@/composables/useNaiveUiFieldConfig'

const message = useMessage()
const rememberMe = shallowRef(false)
const { handleSubmit, defineField, isSubmitting } = useLoginForm()

const emit = defineEmits<{
  success: []
}>()

const [username, usernameProps] = defineField<'username'>('username', useNaiveUiFieldConfig('Username'))
const [password, passwordProps] = defineField<'password'>('password', useNaiveUiFieldConfig('Password'))
const { login } = useAuthStore()
const { execute, loading } = useAsyncPromise(() =>
  AuthService.postRegister({
    body: { username: 'test', password: 'test' },
  }),
)

const onSubmit = handleSubmit(async (values) => {
  await login(values as LoginUserDto, rememberMe.value)

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
