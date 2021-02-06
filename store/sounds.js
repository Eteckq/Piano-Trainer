export const state = () => ({
  sounds: {},
})

export const actions = {
  playNote({ state, dispatch }, { name, octave, velocity }) {
    if (!process.client) return
    const audio = state.sounds[name + octave]
    dispatch('stopNote', { name, octave })
    if (!audio) console.error('Note undefined', name, octave, velocity)
    else {
      audio.volume = velocity
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
}

export const mutations = {
  loadSounds(state) {
    if (!process.client) return
    const notes = [
      'C',
      'C#',
      'D',
      'D#',
      'E',
      'F',
      'F#',
      'G',
      'G#',
      'A',
      'A#',
      'B',
    ]

    for (let octave = 0; octave < 8; octave++) {
      for (const note of notes) {
        const nameFormated = note.toLowerCase().replace('#', 's')
        state.sounds[note + octave] = new Audio(
          `https://www.multiplayerpiano.com/sounds/Emotional_2.0/${
            nameFormated + octave
          }.mp3`
        )
      }
    }
  },
}
