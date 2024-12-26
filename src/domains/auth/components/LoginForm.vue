<template>
  <NCard class="w-64" title="Login">
    <NForm class="flex flex-col gap-2" @submit="onSubmit">
      <NInput v-model:value="email" type="text" placeholder="E-Mail" />
      <NInput v-model:value="password" type="password" placeholder="Password" />
      <NButton type="primary" attr-type="submit">Submit</NButton>
    </NForm>
    <NButton type="default" @click="register({ body: { username: 'test', password: 'test' } })"
      >Register</NButton
    >
  </NCard>
</template>

<script setup lang="ts">
import { NButton, NInput, NCard, NForm } from 'naive-ui'
import { useLoginForm } from '@/domains/auth/composables/useLoginForm.ts'
import { useField } from 'vee-validate'
import { type LoginUserDto, register } from '@/api'
import { useAuthStore } from '@/domains/auth/stores/authStore.ts'
const { handleSubmit } = useLoginForm()

const emit = defineEmits<{
  success: []
}>()

const { login } = useAuthStore()
const { value: email } = useField<string>('email')
const { value: password } = useField<string>('password')

const onSubmit = handleSubmit(async (values) => {
  await login(values as LoginUserDto)

  emit('success')
})
</script>

<style scoped></style>
