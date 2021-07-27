<template>
  <v-row class="flex-wrap">
    <v-col class="brands" xs="12" sm="3" >
      <AppBrandList/>
    </v-col>
    <v-col class="products flex-sm-grow-1">
      <AppProductList :productList="filteredProductList" />
    </v-col>
  </v-row>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import AppProductList from "~/components/ProductList";
import AppBrandList from "~/components/BrandList";

export default {
  components: {
    AppBrandList,
    AppProductList
  },
  computed: {
    ...mapGetters({
      productList: 'product/productList',
      selectedBrands: 'brand/selectedBrands'
    }),
    filteredProductList() {
      if (!this.selectedBrands.length) {
        return this.productList
      }

      return this.productList.filter(item => this.selectedBrands.includes(item.brand));
    }
  },
  async mounted() {
    await this.getProducts()
  },
  methods: {
    ...mapActions({
      getProducts: 'product/getProducts'
    })
  }
}
</script>
