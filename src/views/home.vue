<template>
  <div class="grid grid-cols-1 lg:grid-cols-4 gap-6 p-6 items-start">
    <main class="lg:col-span-3">
      <h1 class="text-2xl font-bold mb-4">Nossos Produtos</h1>

      <section
        class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 w-full bg-amber-400 gap-4 p-4 rounded-lg"
      >
        <div v-for="product in products" :key="product.name">
          <div>
            <ProductCard :product="product" @on-click="addItem" @on-decrease="decItem" />
          </div>
        </div>
      </section>
    </main>

    <aside class="lg:col-span-1 bg-white p-4 rounded-lg shadow-lg border border-gray-200">
      <h2 class="text-xl font-bold mb-4">🛒 Carrinho</h2>

      <div v-if="cart.list.length > 0">
        <DataView :value="cart.list" unstyled>
          <template #list>
            <div class="flex flex-col gap-4 mt-2">
              <div v-for="(item, index) in cart.list" :key="index">
                <CartItem :item="item" @remove-item="removeItem" />
              </div>
            </div>
          </template>
        </DataView>

        <div class="mt-4 pt-4 border-t border-gray-300">
          <p class="font-semibold text-gray-700">Total de itens: {{ cartTotal }}</p>
          <p class="text-lg font-bold text-green-600 mb-4">
            Total: R$ {{ precoFinal.toFixed(2).replace('.', ',') }}
          </p>
          <Button label="Finalizar Compra" class="w-full" severity="success" />
        </div>
      </div>

      <div
        v-else
        class="h-32 flex items-center justify-center bg-slate-100 rounded-md border border-dashed border-slate-400"
      >
        <p class="text-slate-500 text-center text-sm">
          Não há itens no carrinho.<br />Vamos comprar?
        </p>
      </div>
    </aside>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Product } from '@/model/product.model'
import { Cart, type ICartItem } from '@/model/cart.model'
import ProductCard from '@/components/card/ProductCard.vue'
import CartItem from '@/components/card/CartItem.vue'

// Importações do PrimeVue
import DataView from 'primevue/dataview'
import Button from 'primevue/button'
import { productRest } from '@/services/rest/product.rest'

export default defineComponent({
  name: 'ProductList',
  components: {
    ProductCard,
    CartItem,
    DataView,
    Button,
  },
  mounted (){
    this.getProducts()
  },

  data() {
    return {
      cart: new Cart(),

  
      products: [] as Product[],

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
    rest():productRest{
      return new productRest()
    }
  },

  methods: {
    addItem(product: Product) {
      const existItem = this.cart.list.some(
        (item: ICartItem) => item.product.name === product.name,
      )

      if (existItem) {
        this.cart.list.map((item: ICartItem) => {
          if (item.product.name === product.name) {
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
        (item: ICartItem) => item.product.name === product.name,
      )

      if (itemNoCarrinho && itemNoCarrinho.quantity > 0) {
        itemNoCarrinho.quantity -= 1

        if (itemNoCarrinho.quantity === 0) {
          this.cart.list = this.cart.list.filter(
            (item: ICartItem) => item.product.name !== product.name,
          )
        }
      }
    },

    removeItem(product: Product) {
      this.cart.list = this.cart.list.filter(
        (item: ICartItem) => item.product.name !== product.name,
      )
    },

  
    goToDetail(product: Product) {
      const id = product.id
      this.$router.push({ path: `/products/${id}` })
    },
    getProducts(){
      const params = {page:1, limit:10}
      this.rest.getAll(params).then((res) =>{
     
        this.products = res.data.map((product:Product)=> {
          return new Product(product.id, product.name, product.description, product.price, 0, product.images)
        })
        console.log(this.products, 'products')
      }).catch((err) => {
        console.error('Erro ao buscar produtos (verifique se o backend está rodando em http://localhost:3000):', err)
      })
    }
  },
})
</script>
