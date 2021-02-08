export const state = () => ({
  startingOctave: 3,
  octaveCount: 3,
})

export const mutations = {
  setStartingOctave(state, octave) {
    state.startingOctave = octave
  },
  setOctaveCount(state, count) {
    state.octaveCount = count
  },
}
