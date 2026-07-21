<template>
  <main class="p-6 bg-slate-900 min-h-screen text-white">
    <header class="mb-6">
      <h1 class="text-3xl font-bold">Gerenciar Produtos</h1>
      <p class="text-slate-400">Adicione, edite ou remova produtos do estoque.</p>
    </header>

    <div class="bg-slate-800 p-6 rounded-lg border border-slate-700">
      <DataTable :value="products" responsiveLayout="scroll" class="p-datatable-sm text-slate-300">
        <Column field="id" header="ID" class="p-3 border-b border-slate-700"></Column>
        <Column field="name" header="Nome" class="p-3 border-b border-slate-700 font-semibold"></Column>
        <Column field="price" header="Preço" class="p-3 border-b border-slate-700 text-amber-400"></Column>
        <Column field="stock" header="Estoque" class="p-3 border-b border-slate-700"></Column>
      </DataTable>
    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'

export default defineComponent({
  name: 'AdminProducts',
  components: {
    DataTable,
    Column
  },
  data() {
    return {
      products: [
        { id: '1', name: 'Teclado Mecânico Gamer', price: 'R$ 349,90', stock: 12 },
        { id: '2', name: 'Mouse Sem Fio Pro', price: 'R$ 199,00', stock: 25 },
        { id: '3', name: 'Headset Spatial Audio', price: 'R$ 450,00', stock: 8 }
      ]
    }
  }
})
</script>
