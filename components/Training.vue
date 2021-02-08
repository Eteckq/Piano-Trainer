<template>
  <div class="m-auto text-center pt-6">
    <!-- Config -->
    <div v-if="inConfig">
      <h1>
        Entrainement:
        <span
          class="rounded-sm px-5 py-2 mx-3 cursor-pointer"
          :class="config.type == 'accords' ? 'bg-red-200' : 'bg-white'"
          @click="config.type = 'accords'"
          >Accords</span
        >
        <span
          class="rounded-sm px-5 py-2 mx-3 cursor-pointer"
          :class="config.type == 'gammes' ? 'bg-red-200' : 'bg-white'"
          @click="config.type = 'gammes'"
          >Gammes</span
        >
      </h1>

      <div class="flex justify-center">
        <div
          v-for="(accords, index) of banque[config.type]"
          :key="index"
          class="p-2 m-2 cursor-pointer"
          :class="config.mode == index ? 'bg-red-200' : 'bg-white'"
          @click="config.mode = index"
        >
          <p class="text-center text-xl">
            {{ index }}
          </p>
        </div>
      </div>

      <span
        class="py-2 px-4 text-xl bg-white cursor-pointer"
        @click="startTraining"
        >Commencer</span
      >
    </div>
    <!-- Training -->
    <div v-else>
      <span
        class="py-2 px-4 text-xl bg-white cursor-pointer"
        @click="inConfig = true"
        >Retour</span
      >
      <h1>Entrainement: {{ config.type }}</h1>
      <h2>Mode: {{ config.mode }}</h2>
      <div v-if="accordToFind" class="text-6xl">
        {{ accordToFind.fondamentale }} <span class="text-gray-400">|</span>
        {{ accordToFind.fondamentale | toLatine }}
      </div>
      <p class="text-3xl">{{ leftNoteToFind.length }}</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      inConfig: true,
      config: {
        type: 'accords',
        mode: 'Majeur',
      },
      accordToFind: null,
      leftNoteToFind: 0,
    }
  },
  computed: {
    banque() {
      return this.$store.state.bank.banque
    },
    pressedNotes() {
      return this.$store.state.inputs.activeNotes
    },
    lastPressedNote() {
      return this.$store.state.inputs.lastPressedNote
    },
  },
  watch: {
    lastPressedNote(val, last) {
      console.log(this.accordToFind)
      if (this.inConfig) {
        return
      }

      if (last && val === last) {
        return
      }

      if (this.accordToFind.numbers.some((note) => note === val)) {
        this.leftNoteToFind = this.leftNoteToFind.filter(
          (number) => number !== val
        )
        if (this.leftNoteToFind.length === 0) {
          this.setRandomAccord()
        }
      } else {
        this.leftNoteToFind = this.accordToFind.numbers
      }
    },
  },
  created() {},
  methods: {
    startTraining() {
      this.inConfig = false
      this.setRandomAccord()
    },
    pickRandomChord(mode) {
      const accords = this.banque[this.config.type][mode]
      if (mode && accords) {
        return accords[Math.round(Math.random() * (accords.length - 1))]
      }
    },
    setRandomAccord() {
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
      this.accordToFind = this.pickRandomChord(this.config.mode)

      this.accordToFind.numbers = []
      let oldNumber = 0
      for (const note of this.accordToFind.notes) {
        let number =
          notes.indexOf(note) + 12 * this.$store.state.piano.startingOctave
        if (number < oldNumber) {
          number += 12
        }
        oldNumber = number
        this.accordToFind.numbers.push(number)
      }
      this.leftNoteToFind = this.accordToFind.numbers
    },
  },
}
</script>
