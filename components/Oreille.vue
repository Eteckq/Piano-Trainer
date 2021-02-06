<template>
  <div class="m-auto text-center pt-16">
    <p @click="playNote" class="cursor-pointer">Replay</p>
  </div>
</template>

<script>
export default {
  props: ['lastPressed'],
  data() {
    return {
      inConfig: true,
      config: {},
      notes: ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'],
      noteToFind: null,
    }
  },
  computed: {
    banque() {
      return this.$store.state.bank.banque
    },
  },
  watch: {
    lastPressed() {
      if (this.lastPressed.name === this.noteToFind) {
        this.noteFound()
      }
    },
  },
  created() {
    this.setRandomNote()
  },
  methods: {
    noteFound() {
      setTimeout(() => {
        this.setRandomNote()
      }, 1500)
    },
    setRandomNote() {
      this.noteToFind = this.notes[
        Math.round(Math.random() * (this.notes.length - 1))
      ]
      this.playNote()
    },
    playNote() {
      this.$store.dispatch('sounds/playNote', {
        name: this.noteToFind,
        octave: 3,
        velocity: 0.5,
      })
    },
  },
}
</script>
