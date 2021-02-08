<template>
  <div>
    <Nuxt />
  </div>
</template>

<script>
import WebMidi from 'webmidi'
const notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B']
export default {
  data() {
    return {
      keyboardConfig: {
        KeyA: 36,
        KeyW: 37,
        KeyS: 38,
        KeyE: 39,
        KeyD: 40,
        KeyF: 41,
        KeyR: 42,
        KeyG: 43,
        KeyT: 44,
        KeyH: 45,
        KeyY: 46,
        KeyJ: 47,
        KeyK: 48,
      },
    }
  },
  created() {
    this.$store.commit('bank/createNote')
    this.$store.dispatch('sounds/loadSounds')

    this.initMidi()
    this.initKeyboard()
  },
  methods: {
    initKeyboard() {
      if (!process.client) return

      function getOctaveFromNumber(number) {
        return Math.ceil(number / 12)
      }

      function getNoteFromNumber(number) {
        return notes[number % 12]
      }

      document.addEventListener('keyup', (e) => {
        for (const key in this.keyboardConfig) {
          if (e.code === key) {
            const note = {
              number: this.keyboardConfig[key],
              name: getNoteFromNumber(this.keyboardConfig[key]),
              octave: getOctaveFromNumber(this.keyboardConfig[key]),
              velocity: 0.7,
            }
            this.$store.commit('inputs/removeNote', note)
          }
        }
      })

      document.addEventListener('keydown', (e) => {
        // console.log(e.code)
        for (const key in this.keyboardConfig) {
          if (e.code === key) {
            const note = {
              number: this.keyboardConfig[key],
              name: getNoteFromNumber(this.keyboardConfig[key]),
              octave: getOctaveFromNumber(this.keyboardConfig[key]),
              velocity: 0.7,
            }

            this.$store.commit('inputs/pushNote', note)
          }
        }
      })
    },
    initMidi() {
      if (!process.client) return
      WebMidi.enable(function (err) {
        if (err) {
          console.error(err)
        }

        // Reacting when a new device becomes available
        WebMidi.addListener('connected', function (e) {
          // state.inputs.push(e)
          // state.outputs.push(e)
          e.addListener('noteon', 'all', function (e) {
            this.$store.commit('inputs/pushNote', {
              name: e.note.name,
              octave: e.note.octave - 1,
              velocity: e.velocity,
              number: e.note.number,
            })
          })
          // Listen for a 'note off' message on all channels
          e.addListener('noteoff', 'all', function (e) {
            this.$store.commit('inputs/RemoveNote', {
              number: e.note.number,
            })
          })

          e.addListener('controlchange', 'all', function (e) {
            if (e.data[2]) this.$store.commit('inputs/setSustain', true)
            else this.$store.commit('inputs/setSustain', false)
          })
        })

        WebMidi.addListener('disconnected', function (e) {
          // console.log(e)
        })
      })
    },
  },
}
</script>
