export const state = () => ({
  inputs: {},
  outputs: {},
  activeInput: null,
  activeOutput: null,
  activeNotes: [],
  sustainNotes: [],
  lastPressedNote: null,
  sustain: true,
})

export const actions = {}

export const mutations = {
  pushNote(state, note) {
    state.activeNotes.push(note)
    this.dispatch('sounds/playNote', note)
    state.lastPressedNote = note
  },
  removeNote(state, note) {
    state.activeNotes = state.activeNotes.filter((n) => {
      return n.number !== note.number
    })

    if (state.sustain) {
      state.sustainNotes = state.sustainNotes.filter(
        (n) => !(n.number === note.number)
      )
      state.sustainNotes.push(note)
    } else {
      this.dispatch('sounds/stopNote', note)
    }
  },
  setSustain(state, sustain) {
    state.sustain = sustain
    if (!sustain) {
      state.sustainNotes.map((note) => this.dispatch('sounds/stopNote', note))
      state.sustainNotes = []
    }
  },
}
