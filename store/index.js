export const state = () => ({
  storeNews: []
})

export const getters = {
  getStoreNews(state) {
    return state.storeNews
  }
}

export const mutations = {
  setStoreNews(state, news) {
    state.storeNews = news
  }
}

export const actions = {
  changeStoreNews({ commit }, news) {
    commit('setStoreNews', news)
  }

}
