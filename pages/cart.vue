<template>
  <v-row>
    <v-col cols="12" sm="12" md="12" lg="12" xl="12">
      <h2>Shopping Cart</h2>
    </v-col>
    <v-col v-if="inCartProducts.length"
         cols="12" sm="12" md="12" lg="12" xl="12">
      <v-simple-table dense>
        <template v-slot:default>
          <thead>
            <tr>
              <th class="text-center"
                  cols="4"
                  sm="3"
                  md="4"
                  v-text="'Item'"
              />
              <th class="text-left"
                  cols="3"
                  sm="2"
                  md="3"
                  v-text="'Price'"
              />
              <th class="text-left"
                  cols="3"
                  sm="2"
                  md="3"
                  v-text="'Qty'"
              />
              <th class="text-left"
                  cols="3"
                  sm="2"
                  md="3"
                  v-text="'Total'"
              />
            </tr>
          </thead>
          <tbody>
            <AppInCartItem v-for="item in inCartProducts"
                           :key="item.sku"
                           :product="item"
            />
          </tbody>
        </template>
      </v-simple-table>
      <v-col cols="12"
             class="d-flex justify-end flex-wrap"
      >
        <h3 class="text-right"
            style="display: block"
        >
          Subtotal: $ {{subtotal.toFixed(2)}}
        </h3>
      </v-col>
    </v-col>
    <div v-else>
      <v-divider/>
      <span> No items in cart yet.</span>
    </div>
  </v-row>
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
