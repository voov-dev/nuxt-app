<template>
  <v-expansion-panels multiple>
    <v-expansion-panel>
      <v-expansion-panel-header>
        <h2>Filter by Brands</h2>
      </v-expansion-panel-header>
      <v-expansion-panel-content>
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
                color="warning"
                @change=setBrand(item.id)
              ></v-checkbox>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
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
  async mounted() {
    await this.getBrands()
  },
  methods: {
    ...mapActions({
      getBrands: 'brand/getBrands',
      setBrand: 'brand/selectedBrand'
    })
  }
}
</script>
