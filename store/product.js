export const state = () => ({
  products: []
})

export const getters = {
  productList(state) {
    return state.products;
  }
}

export const mutations = {
  updateProducts(state, products) {
    state.products = products
  }
}

export const actions = {
  async getProducts(ctx) {
    const posts = await require('~/assets/level3/products.json')
    ctx.commit('updateProducts', posts)
  }
}
