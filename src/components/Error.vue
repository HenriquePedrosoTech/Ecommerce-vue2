<template>
<span v-if="value?.[`${field}`]?.$errors.length > 0">
          <p v-for="error in value?.[`${field}`].$errors" :key="error.$uid" class="text-red-500 text-sm">
            {{ error.$message }}
          </p>
</span>

</template>
<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
      props:{
        value:{
          type:Object
        },
        field:{
          type:String
        }
      }
})
</script>
