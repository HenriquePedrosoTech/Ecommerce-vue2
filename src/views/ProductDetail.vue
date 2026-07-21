<template>
  <div class="p-6" v-if="product?.id">

    <ProductCard v-if="product" :product="product" />
    <p v-else class="text-white">Produto não encontrado ou carregando...</p>
  </div>
  <div v-else>
    Não existe o produto
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import ProductCard from '@/components/card/ProductCard.vue'
import { Product } from '@/model/product.model'

export default defineComponent({
  name: 'ProductDetail',
  components: {
    ProductCard
  },
  data() {
    return {
      productId: this.$route.params.id as string,
      product: undefined as Product | undefined
    }
  },
  created() {
    this.getProduct()
  },
  methods: {
    getProduct() {
     
      this.product = [
        new Product('1', 'Guitarra', 'Uma guitarra incrível', 200, 10)
      ].find((p) => p.id === this.productId)
    }
  },
  mounted() {
    this.getProduct()
  }
})
</script>
