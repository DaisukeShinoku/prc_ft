import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const state = () => ({
  currentUser: {
    id: '',
    name: '',
    email: '',
    screen_name: ''
  },
  timeReport: {},
  experienceRecord: {},
  loading: false,
  flash: {
    status: false,
    type: '',
    message: ''
  }
})

export const mutations = {
  setUser (state, payload) {
    state.currentUser = payload
  },
  setLoading (state, payload) {
    state.loading = payload
  },
  setFlash (state, payload) {
    state.flash = payload
  },
  setTimeReport (state, payload) {
    state.timeReport = payload
    state.timeReport = {}
  },
  setExperienceRecord (state, payload) {
    state.setExperienceRecord = payload
    state.setExperienceRecord = {}
  }
}