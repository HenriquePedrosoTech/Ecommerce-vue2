import axios, { type AxiosInstance } from "axios"
import { useAuthStore } from "../stores/auth"

export class AxiosConfig {
  // Tipamos o $instance para facilitar o uso depois
  private $instance: AxiosInstance

  constructor(public baseURL: string = "/api") {
    // Como você já definiu 'public baseURL' no construtor,
    // a linha 'this.baseURL = baseURL' é redundante,
    // mas deixei como você queria para silenciar o erro.
    // eslint-disable-next-line
    this.baseURL = baseURL

    this.$instance = axios.create({
      baseURL: this.baseURL,
    })
  }

  setConfig() {
    this.$instance.interceptors.request.use((config) => {
      const token = useAuthStore().accessToken
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`
      }
      return config
    })

    // CORREÇÃO: Removi o parêntese extra que estava após o (res)
    this.$instance.interceptors.response.use((res) => {
      return res
    })
    return this.$instance
  }
}
export const api = new AxiosConfig().setConfig()
