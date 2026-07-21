<template>
  <main class="flex flex-col items-center justify-center w-screen h-screen">
    <Card class="w-full max-w-[400px]">
      <template #title>{{ 'Faça seu login' }}</template>
      <template #content>
        <form class="flex flex-col gap-4" @submit.prevent="login">
          <label class="flex flex-col gap-2">
            email
            <InputText v-model="form.email" />
            <Error :value="v$.form" field="email" />
          </label>

          <label class="flex flex-col gap-2">
            password
            <Password v-model="form.password" :feedback="false" toggle-mask />
            <Error :value="v$.form" field="password" />
          </label>

          <Button type="submit" label="Entrar" :loading="loading" />

          <RouterLink to="/register" class="text-sm text-center text-blue-600 hover:underline">
            Não tem conta? Registre-se
          </RouterLink>
        </form>
      </template>
    </Card>
  </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { required, email as emailValidator } from '@vuelidate/validators'
import useVuelidate from '@vuelidate/core'
import { useAuthStore } from '@/services/stores/auth'
import { useToast } from 'primevue/usetoast'
import Error from '@/components/Error.vue'

export default defineComponent({
  components: { Error },
  data() {
    return {
      form: {
        email: '',
        password: '',
      },
      loading: false,
    }
  },
  setup() {
    const authStore = useAuthStore()
    const toast = useToast()
    return {
      authStore,
      toast,
      v$: useVuelidate(),
    }
  },
  validations() {
    return {
      form: {
        email: { required, email: emailValidator },
        password: { required },
      },
    }
  },
  methods: {
    async login() {
      // Valida o formulário antes de disparar a action do Pinia
      const isFormCorrect = await this.v$.$validate()

      if (!isFormCorrect) {
        console.log('Erros de validação:', this.v$.$errors)
        return
      }

      this.loading = true
      try {
        // Action simulada (com delay) definida na authStore
        await this.authStore.login(this.form.email, this.form.password)

        this.toast.add({
          severity: 'success',
          summary: 'Sucesso',
          detail: 'Login realizado!',
          life: 3000,
        })

        // Redireciona para a rota de origem (ex: checkout) ou para a Home
        const redirectTo = (this.$route.query.redirect as string) || '/'
        this.$router.push(redirectTo)
      } catch (err) {
        this.toast.add({
          severity: 'error',
          summary: 'Erro',
          detail: 'Credenciais inválidas',
          life: 3000,
        })
        console.error('Erro no login:', err)
      } finally {
        this.loading = false
      }
    },
  },
})
</script>
