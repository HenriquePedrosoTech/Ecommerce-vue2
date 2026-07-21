<!-- <script lang="ts">
import { defineComponent } from 'vue'
import { Product } from './model/product.model'
import { Cart, type ICartItem } from './model/cart.model'
import ProductCard from './components/card/ProductCard.vue'
import CartItem from './components/card/CartItem.vue'

// Importações do PrimeVue
import DataView from 'primevue/dataview'
import Button from 'primevue/button'

export default defineComponent({
  components: {
    ProductCard,
    CartItem,
    DataView,
    Button,
  },

  data() {
    return {
      cart: new Cart(),

      products: [
        new Product('Guitarra', 'Musica', 1600, 0.2),
        new Product('Amplificador', 'Musica', 299.9, 0.2),
      ],
    }
  },

  computed: {
    cartTotal() {
      let total = 0
      this.cart.list.forEach((item: ICartItem) => {
        total += item.quantity
      })
      return total
    },

    precoFinal() {
      let total = 0
      this.cart.list.forEach((item: ICartItem) => {
        total += item.product.price * item.quantity
      })
      return total
    },
  },

  methods: {
    addItem(product: Product) {
      const existItem = this.cart.list.some(
        (item: ICartItem) => item.product.title === product.title,
      )

      if (existItem) {
        this.cart.list.map((item: ICartItem) => {
          if (item.product.title === product.title) {
            item.quantity += 1
            return item
          } else {
            return item
          }
        })
      } else {
        this.cart.list.push({
          product,
          quantity: 1,
        })
      }
    },

    decItem(product: Product) {
      const itemNoCarrinho = this.cart.list.find(
        (item: ICartItem) => item.product.title === product.title,
      )

      if (itemNoCarrinho && itemNoCarrinho.quantity > 0) {
        itemNoCarrinho.quantity -= 1

        if (itemNoCarrinho.quantity === 0) {
          this.cart.list = this.cart.list.filter(
            (item: ICartItem) => item.product.title !== product.title,
          )
        }
      }
    },

    removeItem(product: Product) {
      this.cart.list = this.cart.list.filter(
        (item: ICartItem) => item.product.title !== product.title,
      )
    },
  },
})
</script> -->
<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({})
</script>
<template>
  <Toast />
  <RouterView />
</template>
