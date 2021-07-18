<template>
  <v-container
    class="page-top"
    cols="12"
    sm="12"
    md="12"
    lg="6"
    xl="6"
  >
    <h2> Shopping Cart</h2>
    <v-container
      v-if="inCartProducts.length"
    >
      <v-simple-table
        dense

      >
        <template v-slot:default>
          <thead>
          <tr>
            <th class="text-center"
                cols="4"
                sm="3"
                md="4"
            >
              Item
            </th>
            <th class="text-left"
                cols="3"
                sm="2"
                md="3"
            >
              Price
            </th>
            <th class="text-left"
                cols="3"
                sm="2"
                md="3"
            >
              Qty
            </th>
            <th class="text-left"
                cols="3"
                sm="2"
                md="3"
            >
              Total
            </th>
          </tr>
          </thead>
          <tbody
          >
          <AppInCartItem
            v-for="item in inCartProducts"
            :key="item.sku"
            :product="item"
          />
          </tbody>
        </template>
      </v-simple-table>
      <v-col
        cols="12"
        class="d-flex justify-end flex-wrap"
      >
        <h3
          class="text-right"
          style="width: 100%"
        > Subtotal: $ {{subtotal.toFixed(2)}} </h3>
        <v-btn
          color="primary"
          class="mt-2"
        >
          Checkout
        </v-btn>
      </v-col>
    </v-container>
    <div
      v-else
    >
      <v-divider/>
      <span> No items in cart yet.</span>
    </div>
  </v-container>
</template>

<script>
import {mapGetters} from "vuex";
import AppInCartItem from "~/components/cart/InCartItem"

export default {
  components: {
    AppInCartItem
  },
  computed: {
    ...mapGetters({
      inCartProducts: 'localStorage/inCartProductList',
      subtotal: 'localStorage/subtotal'
    })
  }
}
</script>
