export const state = () => ({
  inCartProductList: [],
  inCartItemsQty: null,
  subtotal: null
})

export const getters = {
  inCartProductList(state) {
    return state.inCartProductList;
  },
  inCartItemsQty(state) {
    return state.inCartItemsQty;
  },
  subtotal(state) {
    return state.subtotal;
  }
}

export const mutations = {
  updateInCartProductList(state, product) {
    if (!state.inCartProductList.filter(item => item.id === product.id).length) {
      state.inCartProductList.push(product);
      product.qty = 1;
    }

    product.qty += 1;
    state.inCartItemsQty += 1;
  },
  updateItemQty(state, {newQty, id}) {
    state.inCartProductList.forEach(item => {
      if ((item.id === id) && (newQty > 0)) {
        item.qty = newQty
      }
    });
  },
  updateInCartItemsQty(state) {
    let newAllItemsQty = 0;

    state.inCartProductList.forEach(item => {
      newAllItemsQty += item.qty
    });

    state.inCartItemsQty = newAllItemsQty;
  },
  removeItemFromCart(state, removedItemId) {
    const filteredItems = state.inCartProductList.filter(item => item.id !== removedItemId);

    state.inCartProductList = filteredItems;
  },
  calcSubtotal(state) {
    state.inCartProductList.forEach(item => {
      state.subtotal += (item.qty * item.regular_price.value)
    });
  },
}

export const actions = {
  addToCart(ctx, product) {
    ctx.commit('updateInCartProductList', product)
    ctx.commit('calcSubtotal', product)
  },
  updateItemQty(ctx, payload) {
    ctx.commit('updateItemQty', payload)
    ctx.commit('updateInCartItemsQty', payload)
    ctx.commit('calcSubtotal', payload)
  },
  removeItemFromCart(ctx, payload) {
    ctx.commit('removeItemFromCart', payload)
    ctx.commit('updateInCartItemsQty', payload)
    ctx.commit('calcSubtotal', payload)
  }
}
