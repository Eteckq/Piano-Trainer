export const state = () => ({
  activeNotes: [],
  sustainNotes: [],
  lastPressedNote: null,
  sustain: true,
})

export const actions = {
  pushNoteFromMidi({ commit }, { number, duration }) {
    setTimeout(() => {
      commit('forceRemoveNote', { number })
    }, duration * 1000)
    commit('pushNoteFromMidi', { number, duration })
  },
}

export const mutations = {
  forceRemoveNote(state, { number }) {
    state.activeNotes = state.activeNotes.filter((n) => {
      return n !== number
    })
  },
  pushNoteFromMidi(state, { number }) {
    state.activeNotes.push(number)
  },
  pushNote(state, { number, velocity }) {
    if (state.activeNotes.some((n) => number === n)) {
      state.activeNotes = state.activeNotes.filter((n) => {
        return n !== number
      })
    }
    state.activeNotes.push(number)
    this.dispatch('sounds/playNote', { number, velocity })
    state.lastPressedNote = {
      number,
      time: new Date(),
    }
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
