<template>
  <tr>
    <td>
      <v-row class="flex-nowrap align-center">
        <v-col
          cols="4"
          sm="3"
          md="4"
          style="max-width: 200px"
        >
          <v-img
            :src="product.image"
            class="align-center"
          />
        </v-col>
        <v-col
          cols="6"
          sm="4"
          md="6"
        >
          <span> {{ product.brand }} / {{ product.title }}</span>
          <div v-if="product.size"> Size: {{ product.size }} </div>
          <div v-if="product.color"> Color: {{ product.color }} </div>
        </v-col>
      </v-row>
    </td>
    <td>
      <v-col
        cols="4"
        sm="2"
        md="3"
      >
        <span>{{ product.regular_price.currency }} {{ product.regular_price.value }} </span>
      </v-col>
    </td>
    <td>
      <AppItemQty :qty="+product.qty" :itemId="product.id"/>
    </td>
    <td>
      <v-col
        cols="4"
        sm="2"
        md="3"
      >
             <span>
              {{ product.regular_price.currency }} {{ (product.qty * product.regular_price.value).toFixed(2) }}
            </span>
      </v-col>
    </td>
    <td>
      <AppRemoveCartItemButton :itemId="product.id"/>
    </td>
  </tr>
</template>

<script>
import AppItemQty from "~/components/cart/ItemQty"
import AppRemoveCartItemButton from "~/components/cart/RemoveCartItemButton"

export default {
  name: "AppinCartItem",
  components: {
    AppRemoveCartItemButton,
    AppItemQty
  },
  props: {
    product: {
      type: Object,
      required: true
    }
  }
}
</script>
