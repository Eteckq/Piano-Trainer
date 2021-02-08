export const state = () => ({
  sounds: {},
  volume: 0.5,
})

const notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B']

function getOctaveFromNumber(number) {
  return Math.ceil(number / 12)
}

function getNoteFromNumber(number) {
  return notes[number % 12]
}

export const actions = {
  playNote({ state, dispatch }, { name, octave, number, velocity }) {
    if (!process.client) return
    /* const toctave = getOctaveFromNumber(number)
    const tname = getNoteFromNumber(number)
    if (name === tname && toctave === octave) {
      console.log('YES')
    } else {
      console.error(name, tname, octave, toctave)
    } */
    const audio = state.sounds[name + octave]
    dispatch('stopNote', { name, octave })
    if (!audio) console.error('Note undefined', name, octave, velocity)
    else {
      audio.currentTime = 0
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
