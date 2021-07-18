<template>
  <v-card hover rounded>
    <v-img :src="product.image"
           :alt="product.title"
           max-height="270"
           max-width="270"
    />
    <v-card-title>{{ product.title }}</v-card-title>
    <v-card-text>
      <p class="text-subtitle-1 text-left mb-3" v-text="'Brand: ' + product.brand"/>
      <v-row align="start"
             class="mx-0"
      >
          <span class="text-subtitle-1 mr-2">
            {{ product.regular_price.currency }}
          </span>
        <span class="text-subtitle-1">
            {{ product.regular_price.value }}
          </span>
      </v-row>
    </v-card-text>
    <v-card-actions>
      <v-btn block
             @click.prevent=addToCart(product)
             v-text="'Add to cart'"/>
    </v-card-actions>
  </v-card>
  </template>

<script>
import {mapActions} from "vuex";

export default {
  name: 'AppSimpleProduct',
  data() {
    return {
      id: null,
      image: null,
      sku: null,
      size: null,
      color: null,
    }
  },
  props: {
    product: {
      type: Object,
      require: true,
    }
  },
  methods: {
    ...mapActions({
      addToCart: 'localStorage/addToCart'
    })
  }
}
</script>
