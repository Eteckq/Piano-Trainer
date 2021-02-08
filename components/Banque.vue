<template>
  <div class="text-center">
    <div>
      <input
        id="allNote"
        v-model="displayAllNote"
        type="checkbox"
        name="allNote"
      />
      <label for="allNote">Afficher toutes les notes</label>
    </div>
    <select v-model="selectedBanque" class="mb-5" name="banque">
      <option v-for="(type, index) in banque" :key="index" :value="index">
        {{ index }}
      </option>
    </select>

    <div class="flex justify-center">
      <div
        v-for="(accords, index) of banque[selectedBanque]"
        :key="index"
        class="p-2 m-2 cursor-pointer"
        :class="selectedMode == index ? 'bg-red-200' : 'bg-white'"
        @click="selectedMode = index"
      >
        <p class="text-center text-xl">
          {{ index }}
        </p>
      </div>
    </div>
    <div class="flex justify-center">
      <div
        v-for="(note, i) of notes"
        :key="i"
        class="bg-white p-2 m-2 cursor-pointer"
        :class="selectedFondamentale == note ? 'bg-red-200' : 'bg-white'"
        @click="selectedFondamentale = note"
      >
        {{ note }} ({{ note | toLatine }})
      </div>
    </div>
    <h2 class="text-2xl font-light">
      <span v-if="selectedBanque === 'gammes'">Gamme</span
      ><span v-if="selectedBanque === 'accords'">Accord</span>
    </h2>
    <span class="text-6xl">{{ selectedFondamentale }}</span
    ><span class="text-xl">{{ selectedMode }}</span>
  </div>
</template>

<script>
export default {
  data() {
    return {
      notes: ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'],
      selectedBanque: 'accords',
      selectedMode: null,
      selectedFondamentale: null,
      displayAllNote: false,
    }
  },
  computed: {
    banque() {
      return this.$store.state.bank.banque
    },
  },
  watch: {
    selectedMode() {
      this.select()
    },
    selectedFondamentale() {
      this.select()
    },
    displayAllNote() {
      this.select()
    },
  },
  methods: {
    getNumberFromNote(note, octave) {
      return octave * 12 + this.notes.indexOf(note)
    },

    select() {
      if (
        this.selectedBanque &&
        this.selectedMode &&
        this.selectedFondamentale
      ) {
        const accord = this.banque[this.selectedBanque][this.selectedMode][
          this.notes.indexOf(this.selectedFondamentale)
        ]
        accord.type = this.selectedBanque
        accord.mode = this.selectedMode

        accord.numbers = []

        let number = 0
        for (const note of accord.notes) {
          const oldNumber = number

          number = this.getNumberFromNote(
            note,
            this.$store.state.piano.startingOctave
          )
          if (oldNumber > number) {
            number += 12
          }
          accord.numbers.push(number)
        }
        if (this.displayAllNote) {
          const tempNumbers = [...accord.numbers]
          for (let number of tempNumbers) {
            while (number - 12 >= 0) {
              accord.numbers.push((number -= 12))
            }
            while (number + 12 < 97) {
              accord.numbers.push((number += 12))
            }
          }
        }

        this.$store.commit('piano/setLightNotes', accord.numbers)
      }
    },
  },
}
</script>
