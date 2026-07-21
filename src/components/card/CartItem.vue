<template>
  <div
    class="flex items-center gap-3 p-3 border border-gray-200 rounded-md bg-gray-50 shadow-sm w-full"
  >
    <img
      :src="'https://picsum.photos/200'"
      alt="Imagem do Produto"
      class="w-16 h-16 object-cover rounded-md flex-shrink-0"
    />

    <div class="flex-grow flex flex-col gap-1 w-full overflow-hidden">
      <div class="flex justify-between items-start">
        <span class="font-bold text-gray-800 text-sm truncate">{{ item.product.name }}</span>
        <span class="font-bold text-green-600 text-sm whitespace-nowrap ml-2">
          R$ {{ (item.product.price * item.quantity).toFixed(2).replace('.', ',') }}
        </span>
      </div>

      <div class="flex justify-between items-center mt-1">
        <span class="text-xs text-gray-500">Qtd:</span>

        <InputNumber
          v-model="item.quantity"
          showButtons
          buttonLayout="horizontal"
          :min="0"
          class="h-8"
          inputClass="w-10 text-center text-sm h-8"
          @update:modelValue="onQuantityChange"
        >
          <template #incrementbuttonicon>
            <span class="font-bold text-sm">+</span>
          </template>
          <template #decrementbuttonicon>
            <span class="font-bold text-sm">-</span>
          </template>
        </InputNumber>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, type PropType } from 'vue'
import type { ICartItem } from '@/model/cart.model'
import InputNumber from 'primevue/inputnumber'

export default defineComponent({
  components: {
    InputNumber,
  },
  props: {
    item: {
      type: Object as PropType<ICartItem>,
      required: true,
    },
  },
  emits: ['remove-item'],
  methods: {
    onQuantityChange(newValue: number) {
      if (newValue === 0) {
        this.$emit('remove-item', this.item.product)
      }
    },
  },
})
</script>
