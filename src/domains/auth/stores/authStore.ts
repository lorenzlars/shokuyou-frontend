import { defineStore } from 'pinia'
import { shallowRef } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  const isAuthenticated = shallowRef(false)

  return {
    isAuthenticated,
  }
})
