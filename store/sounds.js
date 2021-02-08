export const state = () => ({
  sounds: {},
  volume: 0.5,
})

const notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B']

export const actions = {
  playNote({ state, dispatch }, { name, octave, velocity }) {
    if (!process.client) return
    const audio = state.sounds[name + octave]
    dispatch('stopNote', { name, octave })
    if (!audio) console.error('Note undefined', name, octave, velocity)
    else {
      audio.volume = velocity * state.volume
      audio.play()
    }
  },
  stopNote({ state }, { name, octave }) {
    if (!process.client) return
    const audio = state.sounds[name + octave]
    if (!audio) console.error('Note undefined', name, octave)
    else {
      audio.pause()
      audio.currentTime = 0
    }
  },
  loadSounds({ commit }) {
    if (!process.client) return
    commit('clearSound')

    for (let octave = 0; octave < 8; octave++) {
      for (const note of notes) {
        const nameFormated = note.toLowerCase().replace('#', 's')
        const audio = new Audio(
          `https://www.multiplayerpiano.com/sounds/Emotional_2.0/${
            nameFormated + octave
          }.mp3`
        )
        commit('pushSound', { note, octave, audio })
      }
    }
  },
}

export const mutations = {
  setVolume(state, volume) {
    state.volume = volume
  },
  clearSound(state) {
    state.sounds = {}
  },
  pushSound(state, { note, octave, audio }) {
    state.sounds[note + octave] = audio
  },
}
