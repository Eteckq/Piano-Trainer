import WebMidi from 'webmidi'

export const state = () => ({
  inputs: {},
  outputs: {},
  activeInput: null,
  activeOutput: null,
  activeNotes: [],
  sustain: true,
  keyboardConfig: {
    KeyA: 26,
  },
})

export const actions = {
  initKeyboard({ state, commit }) {
    if (!process.client) return

    document.addEventListener('keyup', (e) => {
      console.log(e.code)
      for (const key in state.keyboardConfig) {
        if (e.code === key) {
          commit('addNote', state.keyboardConfig[key])
        }
      }
    })

    document.addEventListener('keydown', (e) => {
      for (const key in state.keyboardConfig) {
        if (e.code === key) {
          commit('removeNote', state.keyboardConfig[key])
        }
      }
    })
  },
  initMidi({ state, commit }) {
    if (!process.client) return
    WebMidi.enable(function (err) {
      if (err) {
        console.error(err)
      }

      // Reacting when a new device becomes available
      WebMidi.addListener('connected', function (e) {
        state.inputs.push(e)
        state.outputs.push(e)
        e.addListener('noteon', 'all', function (e) {
          commit('pushNote', {
            name: e.note.name,
            octave: e.note.octave - 1,
            velocity: e.velocity,
            number: e.note.number,
          })
        })
        // Listen for a 'note off' message on all channels
        e.addListener('noteoff', 'all', function (e) {
          commit('removeNote', {
            number: e.note.number,
          })
        })

        e.addListener('controlchange', 'all', function (e) {
          if (e.data[2]) commit('setSustain', true)
          else state.sustain = commit('setSustain', false)
        })
      })

      WebMidi.addListener('disconnected', function (e) {
        // console.log(e)
      })
    })
  },
}

export const mutations = {
  pushNote(state, { name, octave, velocity, number }) {
    state.activeNotes.push({ name, octave, velocity, number })
  },
  removeNote(state, { number }) {
    state.activeNotes = state.activeNotes.filter((note) => {
      return note.number !== number
    })
  },
  setSustain(state, sustain) {
    state.sustain = sustain
  },
}
