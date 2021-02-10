import WebMidi from 'webmidi'

export const state = () => ({
  inputs: [],
  outputs: [],
})

export const getters = {
  isLight: (state) => (number) => {
    return state.lightNotes.some((n) => {
      return number === n
    })
  },
}

export const actions = {
  setupInput({ commit }, device) {
    device.addListener('noteon', 'all', function (e) {
      this.commit('inputs/pushNote', {
        velocity: e.velocity,
        number: e.note.number,
      })
    })
    // Listen for a 'note off' message on all channels
    device.addListener('noteoff', 'all', function (e) {
      this.commit('inputs/removeNote', e.note.number)
    })

    device.addListener('controlchange', 'all', function (e) {
      if (e.data[2]) this.commit('inputs/setSustain', true)
      else this.commit('inputs/setSustain', false)
    })
  },
  removeInput({ commit }, device) {},
  setupOutput({ commit }, device) {},
  removeOutput({ commit }, device) {},
  init({ commit }) {
    WebMidi.enable(function (err) {
      if (err) {
        console.error(err)
      }

      // Reacting when a new device becomes available
      WebMidi.addListener('connected', function (device) {
        commit('addInput', device)
        commit('addOutput', device)
      })

      WebMidi.addListener('disconnected', function (device) {
        commit('removeInput', device)
        commit('removeOutput', device)
      })
    })
  },
}

export const mutations = {
  addInput(state, device) {
    state.inputs.push(device)
  },
  addOutput(state, device) {
    state.outputs.push(device)
  },
  removeInput(state, device) {
    // state.startingOctave = octave
  },
  removeOutput(state, device) {
    // state.startingOctave = octave
  },
}

/*
this.$store.dispatch('sounds/playNote', {
        number: 3 * 12 + 3,
        velocity: 0.1,
      })
      this.$store.dispatch('sounds/playNote', {
        number: 3 * 12 + 6,
        velocity: 0.1,
      })
      this.$store.dispatch('sounds/playNote', {
        number: 3 * 12 + 10,
        velocity: 0.1,
      })
      */
