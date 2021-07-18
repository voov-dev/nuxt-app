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

      <v-row v-for="option in product.configurable_options"
             :key="option.attribute_id">

        <v-radio-group v-model="configurableOptions[option.attribute_code]">
          <v-radio
            v-for="item in option.values"
            :key="item.value_index"
            :label="`Radio ${item.label}`"
            :value="item.value_index"
            :style="`color: ${item.value}`"
            @click="setAttribute(configurableOptions)"
          ></v-radio>
        </v-radio-group>

      </v-row>

      <v-row>{{ configurableOptions }}</v-row>

<!--      <v-row v-if="product.type === 'configurable'">-->
<!--        <v-chip-group-->
<!--          active-class="text&#45;&#45;accent-4 active-chip"-->
<!--          v-for="item in product.configurable_options"-->
<!--          :key="item.attribute_id"-->
<!--        >-->
<!--          <v-chip v-for="value in item.values"-->
<!--                  :key="value.value_index"-->
<!--                  label-->
<!--                  :value="value.label"-->
<!--                  :color="value.value.length ? value.value : 'gray'"-->
<!--                  class="ml-1 mr-1 swatch"-->
<!--                  @click="setAttribute([item.attribute_code, value.value_index])"-->
<!--          >-->
<!--            <span v-if="item.attribute_code === 'size'"> {{ value.label }} </span>-->
<!--          </v-chip>-->
<!--        </v-chip-group>-->
<!--      </v-row>-->
    </v-card-text>
    <v-card-actions>
      <v-btn block
             @click.prevent=addToCart(getCurrentVariantProductInfo())
      >
        Add to cart
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import {mapActions} from "vuex";

export default {
  name: 'AppConfigurableProduct',
  data() {
    return {
      id: null,
      image: null,
      sku: null,
      size: null,
      color: null,
      configurableOptions: {}
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
    }),
    setAttribute(setOptions) {
      if (this.product.configurable_options.length === Object.keys(setOptions).length) {
        console.log(setOptions);
      }
      // value[0] === 'color'
      //   ? this.color = {"code": value[0], "value_index": value[1]}
      //   : this.size = {"code": 'size', "value_index": value[1]}

      // this.getConfProductInfo();
    },

    getConfProductInfo() {
      const variants = this.product.variants;
      variants.map(item => {
        if (this._.isEqual(item.attributes, [this.color, this.size])) {
          const {ID, SKU, IMAGE} = item.product;
          this.id = ID;
          this.sku = SKU;
          this.image = IMAGE;
          item.product.title = this.product.title
          item.product.regular_price = this.product.regular_price
          item.product.color = this.findSwatchLabel(this.color, this.product);
          item.product.size = this.findSwatchLabel(this.size, this.product);
          item.product.brand = this.product.brand;
        }

        return item;
      })
    },
    findSwatchLabel(attrName, product) {
      const ATTRIBUTE = product.configurable_options.filter(item => item.attribute_code === attrName.code)
      const VALUES = ATTRIBUTE[0].values.filter(item => item.value_index === attrName.value_index);
      return VALUES[0].label
    },
    getCurrentVariantProductInfo() {
      const currentVariantIndex = this.product.variants.findIndex((item) => this._.isEqual(item.attributes, [this.color, this.size]));
      const variant = {...this.product.variants[currentVariantIndex]}
      return variant.product;
    }
  }
}
</script>

<style lang="scss">
.active-chip {
  outline: 1px solid white;
}

.swatch {
  width: 35px;
}
</style>
