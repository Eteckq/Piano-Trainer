import Vue from 'vue'
const notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B']

Vue.filter('toLatine', (value) => {
  return {
    C: 'Do',
    'C#': 'Do#',
    D: 'Ré',
    'D#': 'Ré#',
    E: 'Mi',
    F: 'Fa',
    'F#': 'Fa#',
    G: 'Sol',
    'G#': 'Sol#',
    A: 'La',
    'A#': 'La#',
    B: 'Si',
  }[value]
})

Vue.filter('toNoteName', (number) => {
  return notes[number % 12]
})

Vue.filter('toNoteOctave', (number) => {
  return Math.floor(number / 12) + 1
})
