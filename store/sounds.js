import * as Tone from 'tone'

export const state = () => ({
  sounds: {},
  instruments: ['piano', 'guitar-nylon'],
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
  init({ state, dispatch }) {
    dispatch('loadSounds', 'guitar-nylon')
    const synth = new Tone.Synth().toDestination()
    synth.triggerAttackRelease('C4', '8n')
  },
  loadSounds({ commit }, instrument) {
    commit('clearSound')

    for (let octave = 0; octave < 8; octave++) {
      for (const note of notes) {
        const nameFormated = note.toLowerCase().toUpperCase().replace('#', 's')
        const audio = new Audio(
          `/samples/${instrument}/${nameFormated + octave}.mp3`
        )
        commit('pushSound', { note, octave, audio })
      }
    }
  },
  playNote({ state }, { number, velocity }) {
    if (this.state.piano.onlyLightCanBePlayed) {
      if (!this.getters['piano/isLight'](number)) {
        return
      }
    }
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
    const note = getNoteFromNumber(number)
    const audio = state.sounds[note.name + note.octave]
    if (!audio) console.error('Note undefined', note)
    else {
      audio.pause()
      audio.currentTime = 0
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
