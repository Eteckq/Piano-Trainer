export const state = () => ({
  config: {
    KeyA: 36,
    KeyW: 37,
    KeyS: 38,
    KeyE: 39,
    KeyD: 40,
    KeyF: 41,
    KeyT: 42,
    KeyG: 43,
    KeyY: 44,
    KeyH: 45,
    KeyU: 46,
    KeyJ: 47,
    KeyK: 48,
  },
})

export const getters = {
  isLight: (state) => (number) => {
    return state.lightNotes.some((n) => {
      return number === n
    })
  },
}

export const actions = {
  init({ state, dispatch }) {
    document.addEventListener('keyup', (e) => {
      for (const key in state.config) {
        if (e.code === key) {
          this.commit('inputs/removeNote', state.config[key])
        }
      }
    })

    document.addEventListener('keydown', (e) => {
      // console.log(e.code)
      for (const key in state.config) {
        if (e.code === key) {
          const note = {
            number: state.config[key],
            velocity: 0.7,
          }

          this.commit('inputs/pushNote', note)
        }
      }
    })
    dispatch('configure', state.config)
  },
  configure({ commit }, config) {
    commit('setConfig', config)
  },
}

export const mutations = {
  setConfig(state, config) {
    state.config = config
  },
}
