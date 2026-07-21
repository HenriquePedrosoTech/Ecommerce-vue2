<template>
  <div class="flex flex-col min-h-screen">
    <!-- Componente Menubar do PrimeVue substituindo a tag menu comum -->
    <Menubar :model="menuItems" class="bg-slate-900 border-none p-4">
      <template #item="{ item }">
        <RouterLink :to="item.to" class="hover:text-amber-500 font-medium text-white px-3 py-2 block">
          {{ item.label }}
        </RouterLink>
      </template>
      <template #end>

        <button
          v-if="authStore.isAuthenticated"
          @click="handleLogout"
          class="hover:text-amber-500 font-medium text-white px-3 py-2"
        >
          Sair ({{ authStore.getEmail }})
        </button>
        <RouterLink v-else to="/login" class="hover:text-amber-500 font-medium text-white px-3 py-2 block">
          Login
        </RouterLink>
      </template>
    </Menubar>
    <div class="flex-1">
      <RouterView />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Menubar from 'primevue/menubar'
import { useAuthStore } from '@/services/stores/auth'

export default defineComponent({
  name: 'CustomerLayout',
  components: {
    Menubar
  },
  setup() {
    const authStore = useAuthStore()
    return { authStore }
  },
  data() {
    return {
      menuItems: [
        { label: 'Home', to: '/' },
        { label: 'Produtos', to: '/products' }
      ]
    }
  },
  methods: {

    handleLogout() {
      this.authStore.logout()
      this.$router.push({ name: 'login' })
    },
  },
})
</script>
