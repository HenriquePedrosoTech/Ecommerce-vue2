<template>
  <main class="flex flex-col items-center justify-center w-screen h-screen">
    <Card class="w-full max-w-[400px]">
      <template #title>{{ 'Faça seu registro' }}</template>
      <template #content>
        <!-- Corrigido para @submit.prevent -->
        <form class="flex flex-col gap-4" @submit.prevent="register">
          <label class="flex flex-col gap-2">
            name
            <InputText v-model="form.name" />
            <Error :value="v$.form" field="name" />
          </label>

          <label class="flex flex-col gap-2">
            email
            <InputText v-model="form.email" />
            <Error :value="v$.form" field="email" />
          </label>

          <label class="flex flex-col gap-2">
            password
            <!-- Corrigido para toggle-mask -->
            <Password v-model="form.password" :feedback="false" toggle-mask />
            <Error :value="v$.form" field="password" />
          </label>

          <label class="flex flex-col gap-2">
            confirmPassword
            <!-- Corrigido para toggle-mask -->
            <Password v-model="form.confirmPassword" :feedback="false" toggle-mask />
            <Error :value="v$.form" field="confirmPassword" />
          </label>

          <Button type="submit" label="Registrar" :loading="loading" />
        </form>
      </template>
    </Card>
  </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import RegisterForm from '@/model/register.model'
import { required, email as emailValidator, minLength, sameAs, helpers } from '@vuelidate/validators'
import useVuelidate from '@vuelidate/core'
import { RegisterRest } from '@/services/rest/register.res'
import Error from '@/components/Error.vue'
import { useAuthStore } from '@/services/stores/auth'
import { useToast } from 'primevue/usetoast'

export default defineComponent({
  components: { Error },
  data() {
    return {
      form: new RegisterForm(),
      rest: new RegisterRest(),
      loading: false,
    }
  },
  setup() {
    // Inicializa o Vuelidate
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
        name: { required },
        email: { required, email: emailValidator },
        password: { required, minLength: minLength(6) },
        // Adicionado: valida que a confirmação é igual à senha
        confirmPassword: {
          required,
          sameAsPassword: helpers.withMessage('As senhas não coincidem', sameAs(this.form.password)),
        },
      },
    }
  },
  methods: {
    async register() {
      // Valida o formulário
      const isFormCorrect = await this.v$.$validate()

      // Se houver erros, para a execução e exibe no console para debug
      if (!isFormCorrect) {
        console.log('Erros de validação:', this.v$.$errors)
        return
      }

      const body = {
        name: this.form.name,
        email: this.form.email,
        password: this.form.password,
      }
      this.loading = true
      // Chamada da API
      await this.rest
        .register(body)
        .then((res) => {
          this.authStore.setUser(res.user)
          this.authStore.setAccessToken(res.tokens.accessToken)
          this.authStore.setRefreshToken(res.tokens.refreshToken)

          this.toast.add({
            severity: 'success',
            summary: 'Sucesso',
            detail: 'Cadastro realizado!',
            life: 3000,
          })

          // Após o registro, redireciona para a tela de login
          this.$router.push({ name: 'login' })
          console.log('Registro realizado com sucesso!')
        })
        .catch((err) => {
          this.toast.add({
            severity: 'error',
            summary: 'Erro',
            detail: 'Não foi possível concluir o cadastro',
            life: 3000,
          })
          console.error('Erro na API:', err)
        })
        .finally(() => {
          this.loading = false
        })
    },
  },
})
</script>
