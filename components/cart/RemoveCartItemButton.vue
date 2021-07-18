<template>
  <v-btn
    icon
    @click="removeItem"
  >
    <v-icon> mdi-delete</v-icon>
  </v-btn>
</template>

<script>
import {mapActions} from "vuex";

export default {
  name: "AppRemoveCartItemButton",
  props: {
    itemId: {
      type: Number,
      required: true
    }
  },
  methods: {
    ...mapActions({
      removeItemFromCart: 'localStorage/removeItemFromCart'
    }),
    removeItem() {
      this.removeItemFromCart(this.itemId)
    }
  }
}
</script>
