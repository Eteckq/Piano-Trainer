import WebMidi from 'webmidi'

export const state = () => ({
  devices: [],
  activeOutputs: [],
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
    const state = this
    device.addListener('noteon', 'all', function (e) {
      state.commit('inputs/pushNote', {
        velocity: e.velocity,
        number: e.note.number - 12 * 3,
      })
    })
    // Listen for a 'note off' message on all channels
    device.addListener('noteoff', 'all', function (e) {
      state.commit('inputs/removeNote', e.note.number - 12 * 3)
    })

    device.addListener('controlchange', 'all', function (e) {
      if (e.data[2]) state.commit('inputs/setSustain', true)
      else state.commit('inputs/setSustain', false)
    })
  },
  sendPlayNoteToOutputs({ state }, { note, velocity }) {
    state.activeOutputs.forEach((output) => {
      // output.playNote(note, 'all', { velocity, duration: duration * 1000 })
      output.playNote(note, 1, { velocity })
    })
  },
  sendStopNoteToOutputs({ state }, { note }) {
    state.activeOutputs.forEach((output) => {
      output.stopNote(note, 1)
    })
  },
  setupOutput({ commit }, device) {
    commit('addOutputs', device)
  },
  init({ commit, dispatch }) {
    WebMidi.enable(function (err) {
      if (err) {
        console.error(err)
      }

      // Reacting when a new device becomes available
      WebMidi.addListener('connected', function (device) {
        commit('addDevice', device.port)
        if (device.port.type === 'input') dispatch('setupInput', device.port)
        // if (device.port.type === 'output') dispatch('setupOutput', device.port)
      })

      WebMidi.addListener('disconnected', function (device) {
        commit('removeDevice', device)
      })
    })
  },
}

export const mutations = {
  addDevice(state, device) {
    state.devices.push(device)
  },
  removeDevice(state, device) {
    // state.startingOctave = octave
  },
  addOutputs(state, device) {
    state.activeOutputs.push(device)
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
