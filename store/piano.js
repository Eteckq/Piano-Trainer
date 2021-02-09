export const state = () => ({
  startingOctave: 2,
  octaveCount: 3,
  lightNotes: [],
  onlyLightCanBePlayed: false,
})

export const getters = {
  isLight: (state) => (number) => {
    return state.lightNotes.some((n) => {
      return number === n
    })
  },
}

export const mutations = {
  setStartingOctave(state, octave) {
    state.startingOctave = octave
  },
  setOctaveCount(state, count) {
    state.octaveCount = count
  },
  setLightNotes(state, notes) {
    state.lightNotes = notes
  },
  setOnlyLightCanBePlayed(state, bool) {
    state.onlyLightCanBePlayed = bool
  },
}
