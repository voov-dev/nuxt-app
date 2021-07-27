<template>
  <tr>
    <td>
      <div class="d-flex align-center mr-2">
        <v-img
          :src="product.image"
          max-height="140"
          max-width="140"
          class="align-center"
        />
        <div>
          <div>{{ product.brand }} / {{ product.title }}</div>
          <div v-if="product.size">Size: {{ product.size }}</div>
          <div v-if="product.color">Color: {{ product.color }}</div>
        </div>
      </div>
    </td>
    <td>
      <span>{{ product.regular_price.currency }} {{ product.regular_price.value }} </span>
    </td>
    <td>
      <AppItemQty :qty="+product.qty" :itemId="product.id"/>
    </td>
    <td>
      <div class="d-flex align-center">
        <span class="mr-auto">{{ product.regular_price.currency }} {{ (product.qty * product.regular_price.value).toFixed(2) }}</span>
        <AppRemoveCartItemButton :itemId="product.id"/>
      </div>
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
