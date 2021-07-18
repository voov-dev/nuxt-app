export const state = () => ({
  brandList: [],
  selectedBrands: []
})

export const getters = {
  brandList(state) {
    return state.brandList;
  },
  selectedBrands(state) {
    return state.selectedBrands;
  }
}

export const mutations = {
  updateBrands(state, brands) {
    state.brandList = brands;
  },
  updateSelectedBrands(state, brandID) {
    state.selectedBrands.includes(brandID) ?
      state.selectedBrands.splice(state.selectedBrands.indexOf(brandID), 1) :
      state.selectedBrands.push(brandID)
  }
}

export const actions = {
  async getBrands(ctx) {
    ctx.commit('updateBrands', await require('~/assets/brands.json'));
  },
  selectedBrand(ctx, id) {
    ctx.commit('updateSelectedBrands', id);
  }
}
