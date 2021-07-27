<template>
  <NuxtLink to="/cart">
    <v-icon v-if="inCartItemsQty <= 0"
      large
      color="warning"
    >
      mdi-basket
    </v-icon>
    <v-badge v-else
             top
             bordered
             color="red darken-4"
             :content="inCartItemsQty"
             offset-x="20"
             offset-y="30"
    >
      <v-icon
        large
        color="warning"
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
