<template>
  <div class="flex flex-row min-h-screen">
    <!-- Barra Lateral -->
    <aside class="w-40 bg-amber-800 p-2">
      <ul class="flex flex-col gap-2">
        <li
          v-for="(item, index) in items"
          :key="index"
          @click="item.command"
          class="text-white hover:bg-amber-900 p-2 rounded cursor-pointer"
        >
          {{ item.label }}
        </li>
      </ul>
    </aside>

    <!-- Conteúdo das Páginas -->
    <div class="flex-1 min-h-screen">
      <RouterView />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'AdminLayout',
  data() {
    return {
      items: [
        // Adicionado o Dashboard aqui na lista!
        {
          label: 'Dashboard',
          command: () => {
            this.$router.push('/admin/dashboard')
          }
        },
        {
          label: 'Produtos',
          command: () => {
            this.$router.push('/admin/products')
          }
        }
      ]
    }
  }
})
</script>
