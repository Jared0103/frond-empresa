export const state = () => ({
  token: null,
  ShowAlert: false
})

export const mutations = {
  setToken (state, token) {
    state.token = token
  },
  setShowAlert (state, ShowAlert) {
    state.ShowAlert = ShowAlert
  }
}
