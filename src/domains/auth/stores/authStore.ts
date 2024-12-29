import { defineStore } from 'pinia'
import { computed, shallowRef } from 'vue'
import { type LoginUserDto, AuthService } from '@/api'

export const useAuthStore = defineStore('auth', () => {
  const token = shallowRef(localStorage.getItem('token') ?? sessionStorage.getItem('token'))
  const user = shallowRef()
  const isAuthenticated = computed(() => !!token.value)

  async function login(loginUserDto: LoginUserDto, rememberMe: boolean = false) {
    try {
      const { data } = await AuthService.userLogin({
        body: loginUserDto,
      })

      if (data) {
        token.value = data.accessToken

        if (rememberMe) {
          localStorage.setItem('token', data.accessToken)
        } else {
          sessionStorage.setItem('token', data.accessToken)
        }
      }
    } catch {
      throw new Error('Unable to authenticate user')
    }
  }

  function logout() {
    token.value = null
    localStorage.removeItem('token')
    sessionStorage.removeItem('token')
  }

  return {
    login,
    logout,
    user,
    token,
    isAuthenticated,
  }
})
