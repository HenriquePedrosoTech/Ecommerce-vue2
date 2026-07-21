<template>
  <Card :style="{ width: '100%', minWidth: '200px', maxWidth: '220px' }">
    <template #header>
      <img :src="mainImage" class="w-full object-cover" alt="Imagem do produto" @error="onImageError" />
    </template>

    <template #title>
      <h1>{{ product?.name }}</h1>
    </template>

    <template #content>
      <p>Descrição: {{ product?.description }}</p>
      <p>R$ {{ product?.price?.toFixed(2).replace('.', ',') }}</p>
    </template>

    <template #footer>
      <div class="flex justify-end gap-3 w-full">
        <Button @click="decItem(product!)" severity="danger" class="w-full">Remover</Button>
        <Button @click="addItem(product!)" severity="success" class="w-full">Adicionar</Button>
      </div>
    </template>
  </Card>
</template>

<script lang="ts">
import { defineComponent, type PropType } from 'vue'
import { Product } from '@/model/product.model'
import Card from 'primevue/card'
import Button from 'primevue/button'

export default defineComponent({
  components: { Card, Button },
  props: {
    product: {
      type: Object as PropType<Product>,
    },
  },
  emits: ['onClick', 'onDecrease'],
  methods: {
    addItem(product: Product) { this.$emit('onClick', product) },
    decItem(product: Product) { this.$emit('onDecrease', product) },

    onImageError(event: Event) {
      const img = event.target as HTMLImageElement
      img.src = '/no-image.svg'
    },
  },
  computed: {
  mainImage(): string {

    const main = this.product?.images?.find((i: any) => i.isMain);
    return main?.url ?? '/no-image.svg';
  },
}
})
</script>
