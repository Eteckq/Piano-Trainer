export const state = () => ({
  sounds: {},
  volume: 0.5,
})

const notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B']

function getNoteFromNumber(number) {
  return {
    name: notes[number % 12],
    octave: Math.floor(number / 12) + 1,
    number,
  }
}

export const actions = {
  playNote({ state }, { number, velocity }) {
    if (!process.client) return
    const note = getNoteFromNumber(number)

    const audio = state.sounds[note.name + note.octave]
    if (!audio) console.error('Note undefined', note)
    else {
      audio.pause()
      audio.currentTime = 0
      audio.volume = velocity * state.volume
      audio.play()
    }
  },
  stopNote({ state }, number) {
    console.log(number)
    if (!process.client) return
    const note = getNoteFromNumber(number)
    const audio = state.sounds[note.name + note.octave]
    if (!audio) console.error('Note undefined', note)
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
