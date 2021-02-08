export const state = () => ({
  activeNotes: [],
  sustainNotes: [],
  lastPressedNote: null,
  sustain: true,
})

export const actions = {}

export const mutations = {
  pushNote(state, { number, velocity }) {
    if (state.activeNotes.some((n) => number === n)) {
      state.activeNotes = state.activeNotes.filter((n) => {
        return n !== number
      })
    }
    state.activeNotes.push(number)
    this.dispatch('sounds/playNote', { number, velocity })
    state.lastPressedNote = number
  },
  removeNote(state, number) {
    state.activeNotes = state.activeNotes.filter((n) => {
      return n !== number
    })

    if (state.sustain) {
      state.sustainNotes = state.sustainNotes.filter((n) => !(n === number))
      state.sustainNotes.push(number)
    } else {
      this.dispatch('sounds/stopNote', number)
    }
  },
  setSustain(state, sustain) {
    state.sustain = sustain
    if (!sustain) {
      state.sustainNotes.map((number) =>
        this.dispatch('sounds/stopNote', number)
      )
      state.sustainNotes = []
    }
  },
}
