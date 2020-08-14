import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const state = () => ({
  currentUser: {
    id: '',
    name: '',
    email: '',
    screen_name: '',
    level: 1
  }
})

export const mutations = {
  setUser (state, payload) {
    state.currentUser = payload
  },
  setLevel (state, payload) {
    state.currentUser.level = payload
  }
}