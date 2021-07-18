export const state = () => ({
  inCartProductList: [],
  inCartItemsQty: null
})

export const getters = {
  inCartProductList(state) {
    return state.inCartProductList;
  },
  inCartItemsQty(state) {
    return state.inCartItemsQty;
  },
}

export const mutations = {
  updateInCartProductList(state, product) {
    if (!state.inCartProductList.filter((item) => item.id === product.id).length) {
      state.inCartProductList.push(product);
      product['qty'] = 1;
      return state.inCartItemsQty += 1;
    }
    product['qty'] += 1;
    state.inCartItemsQty += 1;
  },
}

export const actions = {
  addToCart(ctx, product) {
    ctx.commit('updateInCartProductList', product)
  }
}
