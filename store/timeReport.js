export const state = () => ({
  timeReport: {}
})

export const mutations = {
  setTimeReport (state, payload) {
    state.timeReport = payload
    state.timeReport = {}
  }
}