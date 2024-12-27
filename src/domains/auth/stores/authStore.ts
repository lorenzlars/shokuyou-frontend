import { defineStore } from 'pinia'
import { computed, shallowRef } from 'vue'
import { type LoginUserDto, AuthService } from '@/api'
import * as localforage from 'localforage'

export const useAuthStore = defineStore('auth', () => {
  const token = shallowRef<string | null | undefined>()
  const user = shallowRef()
  const isAuthenticated = computed(() => !!token.value)

  // TODO: This needs to run synchronously
  localforage.getItem<string>('token').then((value) => {
    token.value = value
  })

  async function login(loginUserDto: LoginUserDto) {
    try {
      const { data } = await AuthService.postLogin({
        body: loginUserDto,
      })

      if (data) {
        token.value = data?.accessToken
        localStorage.setItem('token', token.value)
      }
    } catch {
      throw new Error('Unable to authenticate user')
    }
  }

  return {
    login,
    user,
    token,
    isAuthenticated,
  }
})
