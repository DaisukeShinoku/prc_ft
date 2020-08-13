import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const state = () => ({
  currentUser: {
    name: '',
    email: '',
    screen_name: ''
  }
})

export const getters = {
  currentUser (state) {
    return state.currentUser
  }
}

export const mutations = {
  setUser (state, payload) {
    state.currentUser = payload
  }
}