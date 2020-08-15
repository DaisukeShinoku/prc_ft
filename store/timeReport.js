export const state = () => ({
  timeReport: {},
  tags: []
})

export const mutations = {
  setTimeReport (state, payload) {
    state.timeReport = payload
    state.timeReport = {}
  },
  setTags (state, payload) {
    state.tags = payload
    state.tags = []
  }
}