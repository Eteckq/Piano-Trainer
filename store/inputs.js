import WebMidi from 'webmidi'

export const state = () => ({
  inputs: {},
  outputs: {},
  activeInput: null,
  activeOutput: null,
  activeNotes: [],
  sustain: true,
})

export const actions = {
  playNote({ state, dispatch }, { name, octave, velocity }) {},
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
  initMidi(state) {
    if (!process.client) return
    WebMidi.enable(function (err) {
      if (err) {
        console.error(err)
      }

      // Reacting when a new device becomes available
      WebMidi.addListener('connected', function (e) {
        state.inputs.push(e)
        e.addListener('noteon', 'all', function (e) {
          state.activeNotes.push({
            name: e.note.name,
            octave: e.note.octave - 1,
            velocity: e.velocity,
            number: e.note.number,
          })
        })
        // Listen for a 'note off' message on all channels
        e.addListener('noteoff', 'all', function (e) {
          state.activeNotes = state.activeNotes.filter((note) => {
            return note.number !== e.note.number
          })
        })

        e.addListener('controlchange', 'all', function (e) {
          if (e.data[2]) state.sustain = true
          else state.sustain = false
        })
      })

      WebMidi.addListener('disconnected', function (e) {
        // console.log(e)
      })
    })
  },
}
