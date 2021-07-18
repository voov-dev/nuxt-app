<template>
  <v-container>
    <h2 class="mb-4">Catalog</h2>
    <v-row v-if="Array.isArray(productList) && productList.length">
      <slide-x-transition group class="row">
        <v-col v-for="item in productList"
               :key="item.id"
               class="product-item"
               cols="12" sm="6" md="4" lg="4" xl="3"
        >
          <AppSimpleProduct v-if="item.type === 'simple'" :product="item"/>
          <AppConfigurableProduct v-if="item.type === 'configurable'" :product="item"/>
        </v-col>
      </slide-x-transition>
    </v-row>
    <v-row v-else>
      <v-col cols="12">
        No products
      </v-col>
    </v-row>
  </v-container>
</template>

<script>

import AppSimpleProduct from "~/components/SimpleProduct";
import AppConfigurableProduct from "~/components/ConfigurableProduct";

export default {
  components: {
    AppSimpleProduct,
    AppConfigurableProduct
  },
  name: 'AppProductList',
  props: {
    productList: {
      type: Array,
      required: true
    },
  },
}
</script>
