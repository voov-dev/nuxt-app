<template>
  <v-card hover rounded>
    <v-img :src="configurableProduct.image"
           :alt="configurableProduct.title"
           max-height="270"
           max-width="270"
    />
    <v-card-title>{{ configurableProduct.title }}</v-card-title>
    <v-card-text>
      <p class="text-subtitle-1 text-left mb-3" v-text="'Brand: ' + configurableProduct.brand"/>
      <v-row align="start"
             class="mx-0"
      >
          <span class="text-subtitle-1 mr-2">
            {{ configurableProduct.regular_price.currency }}
          </span>
        <span class="text-subtitle-1">
            {{ configurableProduct.regular_price.value }}
          </span>
      </v-row>

      <v-row v-for="(option, index) in configurableProduct.configurable_options"
             :key="option.attribute_id">

        <v-radio-group v-model="options[option.attribute_code]">
          <v-radio
            v-for="item in option.values"
            :key="item.value_index"
            :label="`Radio ${item.label}`"
            :value="item.value_index"
            :style="`color: ${item.value}`"
            :disabled="isDisabled(index, option.attribute_code, item.value_index)"
            @click="updateOptions()"
          ></v-radio>
        </v-radio-group>

      </v-row>

    </v-card-text>
    <v-card-actions>
      <v-btn block
             @click.prevent=addToCart(configurableProduct)
             :disabled="isBtnDisabled"
             v-text="'Add to cart'">
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: 'AppConfigurableProduct',
  data() {
    return {
      id: null,
      image: null,
      sku: null,
      size: null,
      color: null,
      options: {},
      defaultProduct: {},
      isBtnDisabled: false,
    }
  },
  props: {
    product: {
      type: Object,
      require: true,
    }
  },
  created() {
    if (!Object.keys(this.options).length) {
      this.defaultProduct = this.product;
      const OPTIONS = {};
      this.product.variants[0].attributes.forEach(item => {
        OPTIONS[item.code] = item.value_index
      });

      this.options = OPTIONS;
    }
    this.setConfigurableProduct(this.product);
    this.updateProducts(this.product);
  },
  computed: {
    ...mapGetters({
      configurableProduct: 'configurableProduct/getConfigurableProduct'
    })
  },
  methods: {
    ...mapActions({
      updateProducts: 'configurableProduct/updateProducts',
      setConfigurableProduct: 'configurableProduct/setConfigurableProduct',
      addToCart: 'localStorage/addToCart'
    }),
    isDisabled(deep, key, value) {
      const CONFIG = [{
        "code": Object.keys(this.options)[0],
        "value_index": this.options[Object.keys(this.options)[0]]
      }];
      const arrayKeys = Object.keys(this.options);

      arrayKeys.splice(arrayKeys.indexOf(CONFIG[0].code), 1);

      arrayKeys.forEach(key => CONFIG.push({
        "code": key,
        "value_index": value
      }));

      if (this.product.variants.findIndex((item) => this._.isEqual(item.attributes, CONFIG)) === -1 && deep !== 0) {
        return true;
      }

      return false;
    },
    updateOptions() {
      const CONFIG = [];

      Object.keys(this.options).forEach(key => CONFIG.push({
        "code": key,
        "value_index": this.options[key]
      }));

      const PRODUCT_INDEX = this.product.variants.findIndex((item) => this._.isEqual(item.attributes, CONFIG));

      if (PRODUCT_INDEX !== -1) {
        this.isBtnDisabled = false;
        this.updateProducts({...this.product.variants[PRODUCT_INDEX]}.product);
      } else {
        this.isBtnDisabled = true;
        this.updateProducts(this.defaultProduct);
      }
    }
  }
}
</script>
