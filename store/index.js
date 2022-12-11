export const state = () => ({
  storeNews: []
})

export const getters = {
  getStoreNews(state) {
    return state.storeNews
  }
}

export const mutations = {
  increment(state, news) {
    state.storeNews = news
  }
}

export const actions = {
  increment(context, news) {
    context.commit('increment', news)
  }

}
