export const state = () => ({
  experienceRecord: {},
  experience: {},
  requiredExp: {}
})

export const mutations = {
  setExperienceRecord (state, payload) {
    state.experienceRecord = payload
    state.experienceRecord = {}
  },
  setExperience (state, payload) {
    state.experience = payload
    state.experience = {}
  },
  setRequiredExp (state, payload) {
    state.requiredExp = payload
    state.requiredExp = {}
  }
}