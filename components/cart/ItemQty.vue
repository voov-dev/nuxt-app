<template>
  <v-col
    cols="4"
    sm="2"
    md="3"
  >
    <input
      :value="qty"
      type="number"
      @change="updateProductQty"
      class="white--text"
    >
  </v-col>
</template>

<script>
import {mapActions} from "vuex";

export default {
  name: "AppItemQty",
  props: {
    qty: {
      type: Number,
      required: true
    },
    itemId: {
      type: Number,
      required: true
    }
  },
  methods: {
    ...mapActions({
      updateItemQty: 'localStorage/updateItemQty'
    }),
    updateProductQty(e) {
       this.updateItemQty({newQty: +e.target.value, id: this.itemId})
    }
  }
}
</script>
