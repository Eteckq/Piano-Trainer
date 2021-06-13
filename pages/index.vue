<template>
  <div class="text-center">
    <helper
      text="Banque d'accords: Ici, vous pouvez construire et visualiser vos accords"
    />
    <div class="mt-4">
      <input
        id="allNote"
        v-model="displayAllNote"
        type="checkbox"
        name="allNote"
      />
      <label for="allNote">Afficher les notes sur tous le piano</label>
    </div>
    <select
      v-model="selectedBanque"
      class="my-5 border rounded p-2"
      name="banque"
    >
      <option v-for="(type, index) in banque" :key="index" :value="index">
        {{ index }}
      </option>
    </select>

    <div class="flex justify-center">
      <div
        v-for="(accords, index) of banque[selectedBanque]"
        :key="index"
        class="p-2 m-2 cursor-pointer rounded-sm border rounded"
        :class="selectedMode == index ? 'bg-red-200' : 'bg-white'"
        @click="selectMode(index)"
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
        class="p-2 m-2 cursor-pointer rounded-sm border rounded"
        :class="selectedFondamentale == note ? 'bg-red-200' : 'bg-white'"
        @click="selectFondamentale(note)"
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
    selectedBanque() {
      this.select()
    },
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
  created() {
    this.$store.commit('piano/setOctaveCount', 4)
  },
  methods: {
    getNumberFromNote(note, octave) {
      return octave * 12 + this.notes.indexOf(note)
    },
    selectMode(mode) {
      if (this.selectedMode === mode) this.selectedMode = null
      else this.selectedMode = mode
    },
    selectFondamentale(note) {
      if (this.selectedFondamentale === note) this.selectedFondamentale = null
      else this.selectedFondamentale = note
    },
    select() {
      if (
        this.selectedBanque &&
        this.selectedMode &&
        this.selectedFondamentale
      ) {
        if (!this.banque[this.selectedBanque][this.selectedMode]) {
          this.selectedMode = 'Majeur'
        }
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
      } else {
        this.$store.commit('piano/setLightNotes', [])
      }
    },
  },
}
</script>
