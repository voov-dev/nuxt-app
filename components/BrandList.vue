<template>
  <v-container>
    <h2>Filter by Brands</h2>
    <v-list>
      <v-list-item-group>
        <v-list-item
          v-for="item in brandList"
          :key="item.id"
          :brand="item"
        >
          <v-checkbox
            v-model="selectedBrands"
            :label="item.title.toString()"
            @change=setBrand(item.id)
          ></v-checkbox>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-container>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: 'AppBrandList',
  computed: {
    ...mapGetters({
      brandList: 'brand/brandList'
    })
  },
  methods: {
    ...mapActions({
      getBrands: 'brand/getBrands',
      setBrand: 'brand/selectedBrand'
    })
  },
  async mounted() {
    await this.getBrands()
  }
}
</script>
