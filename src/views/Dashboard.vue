<template>
  <main class="p-6 bg-slate-900 min-h-screen text-white">
    <header class="mb-8">
      <h1 class="text-3xl font-bold">Painel de Controle</h1>
      <p class="text-slate-400">Bem-vindo à área administrativa do seu e-commerce.</p>
    </header>

   
    <section class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <Card class="bg-slate-800 border border-slate-700 text-white">
        <template #title><span class="text-slate-400 text-sm font-semibold uppercase">Vendas Mensais</span></template>
        <template #content><p class="text-2xl font-bold text-green-400">R$ 12.450,00</p></template>
      </Card>

      <Card class="bg-slate-800 border border-slate-700 text-white">
        <template #title><span class="text-slate-400 text-sm font-semibold uppercase">Novos Clientes</span></template>
        <template #content><p class="text-2xl font-bold text-blue-400">+ 48</p></template>
      </Card>

      <Card class="bg-slate-800 border border-slate-700 text-white">
        <template #title><span class="text-slate-400 text-sm font-semibold uppercase">Produtos Ativos</span></template>
        <template #content><p class="text-2xl font-bold text-amber-400">15</p></template>
      </Card>
    </section>

    <Card class="bg-slate-800 border border-slate-700 text-white">
      <template #title><h2 class="text-xl font-bold">Atividades Recentes</h2></template>
      <template #content>
        <p class="text-slate-300 text-sm">Nenhuma atividade suspeita registrada hoje. Tudo funcionando perfeitamente!</p>
      </template>
    </Card>
  </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Card from 'primevue/card'

export default defineComponent({
  name: 'Dashboard',
  components: {
    Card
  }
})
</script>
