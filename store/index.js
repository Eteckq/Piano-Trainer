export const actions = {
  nuxtClientInit({ state, dispatch }, context) {
    this.dispatch('keyboard/init')
    this.dispatch('midi/init')
    this.dispatch('sounds/init')
    this.commit('bank/init')
  },
}
