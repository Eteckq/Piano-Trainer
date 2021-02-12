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
        >Entrainement Libre</span
      >
      <span
        class="py-2 px-4 text-xl bg-white cursor-pointer"
        @click="startTryhard"
        >Entrainement Chronométré</span
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

      <div class="flex items-center justify-center">
        <div v-if="accordToFind" class="text-6xl">
          {{ accordToFind.fondamentale }} <span class="text-gray-400">|</span>
          {{ accordToFind.fondamentale | toLatine }}
        </div>

        <div v-if="nextAccordToFind" class="ml-8 text-4xl text-gray-400">
          {{ nextAccordToFind.fondamentale }}
          <span class="text-gray-400">|</span>
          {{ nextAccordToFind.fondamentale | toLatine }}
        </div>
      </div>
      <p class="text-3xl">{{ leftNoteToFind.length }}</p>
    </div>
    <span v-if="waitingForKey">Appuyez sur une touche pour commencer</span>
    <span v-if="score !== 0">Score: {{ score }}</span>
    <span v-if="timer > 0">Temps restants: {{ timer }}</span>
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
      accordToFind: [],
      nextAccordToFind: [],
      leftNoteToFind: [],
      score: 0,
      timer: 0,
      waitingForKey: false,
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
      if (this.waitingForKey) {
        this.startTraining()
        this.startChrono(20)
        this.waitingForKey = false
        return
      }

      if (this.inConfig || (last && val.number === last.number)) {
        return
      }

      if (this.accordToFind.numbers.some((note) => note === val.number)) {
        this.leftNoteToFind = this.leftNoteToFind.filter(
          (number) => number !== val.number
        )
        if (this.leftNoteToFind.length === 0) {
          this.right()
        }
      } else {
        this.wrong()
        this.leftNoteToFind = this.accordToFind.numbers
      }
      this.$store.commit(
        'piano/setLightNotes',
        this.accordToFind.numbers.filter(
          (x) => !this.leftNoteToFind.includes(x)
        )
      )
    },
  },
  created() {
    this.$store.commit('piano/setOctaveCount', 2)
  },
  methods: {
    startTraining() {
      this.score = 0
      this.inConfig = false
      this.nextAccordToFind = this.getRandomAccord()
      this.next()
    },
    startTryhard() {
      this.waitingForKey = true
    },
    startChrono(second) {
      this.timer = second
      if (this.timer === 0) {
        this.inConfig = true
        return
      }
      setTimeout(() => {
        this.startChrono(second - 1)
      }, 1000)
    },
    pickRandomChord(mode) {
      const accords = this.banque[this.config.type][mode]
      if (mode && accords) {
        return accords[Math.round(Math.random() * (accords.length - 1))]
      }
    },
    wrong() {
      this.$store.dispatch('sounds/playAndReleaseNote', {
        note: 'C2',
        duration: 0.5,
        velocity: 0.1,
      })
    },
    right() {
      this.$store.dispatch('sounds/playAndReleaseNote', {
        note: 'C5',
        duration: 0.5,
        velocity: 0.7,
      })
      this.score++
      this.next()
    },
    next() {
      this.accordToFind = this.nextAccordToFind
      this.leftNoteToFind = this.accordToFind.numbers
      while (this.nextAccordToFind === this.accordToFind) {
        this.nextAccordToFind = this.getRandomAccord()
      }
    },
    getRandomAccord() {
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
      const accord = this.pickRandomChord(this.config.mode)

      accord.numbers = []
      let oldNumber = 0
      for (const note of accord.notes) {
        let number =
          notes.indexOf(note) + 12 * this.$store.state.piano.startingOctave
        if (number < oldNumber) {
          number += 12
        }
        oldNumber = number
        accord.numbers.push(number)
      }
      return accord
    },
  },
}
</script>
