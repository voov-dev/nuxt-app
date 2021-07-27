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
            :disabled="isDisabledOption(index, option.attribute_code, item.value_index)"
            @click="updateConfigurableProduct()"
          ></v-radio>
        </v-radio-group>

      </v-row>

    </v-card-text>
    <v-card-actions>
      <v-btn block
             :disabled="isBtnDisabled"
             @click.prevent="updateConfigurableProduct(), addToCart(configurableProduct)"
             v-text="'Add to cart'">
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import {mapActions} from "vuex";

export default {
  name: 'AppConfigurableProduct',
  props: {
    product: {
      type: Object,
      require: true
    }
  },
  data() {
    return {
      configurableProduct: {},
      options: {},
      isBtnDisabled: false
    }
  },
  created() {
    if (!Object.keys(this.options).length) {
      const OPTIONS = {};
      this.product.variants[0].attributes.forEach(item => {
        OPTIONS[item.code] = item.value_index
      });

      this.options = OPTIONS;
    }

    this.configurableProduct = Object.assign({}, this.product);
  },
  methods: {
    ...mapActions({
      addToCart: 'localStorage/addToCart'
    }),
    isDisabledOption(DEEP, KEY, VALUE) {
      const SELECTED_OPTIONS = [];
      const SELECTED_OPTIONS_KEYS = Object.keys(this.options);
      const CHECK_OPTIONS = {
        "code": KEY,
        "value_index": VALUE
      };

      SELECTED_OPTIONS_KEYS.forEach(key => SELECTED_OPTIONS.push({
        "code": key,
        "value_index": this.options[key]
      }));

      SELECTED_OPTIONS.splice(SELECTED_OPTIONS.indexOf(KEY), 1);
      SELECTED_OPTIONS.push(CHECK_OPTIONS);

      if (this.product.variants.findIndex((item) => this._.isEqual(item.attributes, SELECTED_OPTIONS)) === -1 && DEEP !== 0) {
        return true;
      }

      return false;
    },
    updateConfigurableProduct() {
      const ATTRIBUTES = [];

      Object.keys(this.options).forEach(key => ATTRIBUTES.push({
        "code": key,
        "value_index": this.options[key]
      }));

      const PRODUCT_INDEX = this.product.variants.findIndex((item) => this._.isEqual(item.attributes, ATTRIBUTES));
      const PRODUCT_NEW_OPTION = {...this.product.variants[PRODUCT_INDEX]}.product;
      const PRODUCT_NEW_ATTRIBUTES = {...this.product.variants[PRODUCT_INDEX]}.attributes;

      if (PRODUCT_INDEX !== -1) {
        this.isBtnDisabled = false;

        this.configurableProduct.id = PRODUCT_NEW_OPTION.id;
        this.configurableProduct.sku = PRODUCT_NEW_OPTION.sku;
        this.configurableProduct.image = PRODUCT_NEW_OPTION.image;
        this.configurableProduct.color = this.getLabel(PRODUCT_NEW_ATTRIBUTES[0]);
        this.configurableProduct.size = this.getLabel(PRODUCT_NEW_ATTRIBUTES[1]);
      } else {
        this.isBtnDisabled = true;

        this.configurableProduct = Object.assign({}, this.product);
      }
    },
    getLabel(SEARCH_ATTRIBUTE) {
      const ATTRIBUTE = this.product.configurable_options.filter(item => item.attribute_code === SEARCH_ATTRIBUTE.code);
      const LABEL = ATTRIBUTE[0].values.filter(item => item.value_index === SEARCH_ATTRIBUTE.value_index);
      return LABEL[0].label;
    },
  }
}
</script>
