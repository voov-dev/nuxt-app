export const state = () => ({
  configurableProduct: {},
})

export const getters = {
  getConfigurableProduct(state) {
    return state.configurableProduct;
  }
}

export const mutations = {
  updateProducts(state, options) {
    state.configurableProduct.id = options.id;
    state.configurableProduct.sku = options.sku;
    state.configurableProduct.image = options.image;
  },
  setConfigurableProduct(state, product) {
    state.configurableProduct = product;
  }
}

export const actions = {
  updateProducts(ctx, options) {
    ctx.commit('updateProducts', options);
  },
  setConfigurableProduct(ctx, product) {
    ctx.commit('setConfigurableProduct', product);
  }
}
