import { User } from '@/model/user.model'
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => {
    return {
      user: new User(),
      accessToken: localStorage.getItem('accessToken') as null | string,
      refreshToken: localStorage.getItem('refresToken') as null | string,
    }
  },
  getters: {
    getUser(state) {
      return state.user
    },
    getEmail(state) {
      return state.user?.email ?? 'No email'
    },
    getRole(state): 'ADMIN' | 'CUSTOMER' | null {
      return state.user?.role ?? null
    },
    isAuth(state): boolean {
      return !!state.accessToken
    },

    isAuthenticated(state): boolean {
      return !!state.accessToken
    },
  },
  actions: {
    setUser(user: User) {
      this.user = user
    },
    setAccessToken(accessToken: string | null) {
      this.accessToken = accessToken
      if (accessToken) {
        localStorage.setItem('accessToken', accessToken)
      } else {
        localStorage.removeItem('accessToken')
      }
    },
    setRefreshToken(refreshToken: string | null) {
      this.refreshToken = refreshToken
      if (refreshToken) {
        localStorage.setItem('refresToken', refreshToken)
      } else {
        localStorage.removeItem('refresToken')
      }
    },

    async login(email: string, password: string): Promise<void> {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          if (email && password && password.length >= 6) {
            const fakeUser = new User(String(Date.now()), email.split('@')[0], email, 'CUSTOMER')
            this.setUser(fakeUser)
            this.setAccessToken('fake-access-token-' + Date.now())
            this.setRefreshToken('fake-refresh-token-' + Date.now())
            resolve()
          } else {
            reject(new Error('Credenciais inválidas'))
          }
        }, 1200)
      })
    },

    logout(): void {
      this.setUser(new User())
      this.setAccessToken(null)
      this.setRefreshToken(null)
    },
  },
})
