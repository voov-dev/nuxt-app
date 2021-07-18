<template>
  <NuxtLink to="/cart">
    <v-badge top
             bordered
             color="red darken-4"
             :content="inCartItemsQty"
             offset-x="20"
             offset-y="30"
    >
      <v-icon
        large
        color="green darken-2"
      >
        mdi-basket
      </v-icon>
    </v-badge>
  </NuxtLink>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  name: 'Cart',
  computed: {
    ...mapGetters({
      inCartItemsQty: 'localStorage/inCartItemsQty',
      inCartProductList: 'localStorage/inCartProductList'
    })
  }
}
</script>
