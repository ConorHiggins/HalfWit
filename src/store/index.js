import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    searchTerm: '',
  },
  mutations: {
    updateTerm(state, string) {
      state.searchTerm = string
    },
  },
  actions: {
    updateTerm(context, payload) {
      console.log('update it:', context, payload);
      context.commit('updateTerm', payload);
    },
  },
  getters: {
    searchTerm: state => state.searchTerm,
  }
})