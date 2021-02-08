<template>
  <div class="m-auto text-center pt-16">
    <div
      class="text-3xl text-white rounded-full cursor-pointer m-auto transition-colors duration-100"
      :class="
        step === 0
          ? 'bg-orange-300'
          : step === 1
          ? 'bg-green-300'
          : 'bg-red-300'
      "
      style="width: 100px; height: 100px"
      @click="playNote"
    >
      <!-- <fa-icon class="text-white " :icon="['fas', 'check']" /> -->
      <span v-if="step === 0"> ? </span>
      <span v-if="step === 1">
        {{ noteToFind | toNoteName }}
      </span>
      <span v-if="step === 2"> X </span>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      inConfig: true,
      config: {},
      noteToFind: null,
      step: 0,
    }
  },
  computed: {
    banque() {
      return this.$store.state.bank.banque
    },
    lastPressedNote() {
      return this.$store.state.inputs.lastPressedNote
    },
  },
  watch: {
    lastPressedNote() {
      if (this.step === 0) {
        if (this.lastPressedNote === this.noteToFind) {
          this.noteFound()
        } else {
          this.wrongNote()
        }
      }
    },
  },
  created() {
    this.setRandomNote()
  },
  methods: {
    noteFound() {
      this.step = 1
      setTimeout(() => {
        this.setRandomNote()
      }, 1500)
    },
    wrongNote() {
      this.step = 2
      setTimeout(() => {
        this.step = 0
      }, 300)
    },
    setRandomNote() {
      this.step = 0
      this.noteToFind =
        this.$store.state.piano.startingOctave * 12 +
        Math.floor(Math.random() * 12) +
        1
      this.playNote()
    },
    playNote() {
      this.$store.dispatch('sounds/playNote', {
        number: this.noteToFind,
        velocity: 0.5,
      })
    },
  },
}
</script>
