<template>
  <div class="text-center">
    <select v-model="selectedBanque" name="banque">
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
    <div v-if="selectedMode" class="flex justify-center">
      <div
        v-for="(note, i) of notes"
        :key="i"
        class="bg-white p-2 m-2 cursor-pointer"
        :class="selectedFondamentale == note ? 'bg-red-200' : 'bg-white'"
        @click="selectedFondamentale = note"
      >
        {{ note }}
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
      banque: {
        accords: {},
        gammes: {},
      },
      notes: ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'],
      selectedBanque: 'accords',
      selectedMode: null,
      selectedFondamentale: null,
    }
  },
  watch: {
    selectedBanque() {
      if (this.selectedBanque === 'accords') {
        this.selectedMode = 'M'
      } else if (this.selectedBanque === 'gammes') {
        this.selectedMode = 'Majeur'
      }
    },
    selectedMode() {
      this.select()
    },
    selectedFondamentale() {
      this.select()
    },
  },
  created() {
    this.buildAccords()
    this.buildGammes()
  },
  methods: {
    buildAccords() {
      this.banque.accords['M'] = this.noteBuilder([4, 7])
      this.banque.accords['min'] = this.noteBuilder([3, 7])
      this.banque.accords['Dim'] = this.noteBuilder([3, 6])
      this.banque.accords['Aug'] = this.noteBuilder([4, 8])
      this.banque.accords['5'] = this.noteBuilder([7])
      this.banque.accords['7'] = this.noteBuilder([3, 7, 9])
    },
    buildGammes() {
      this.banque.gammes['Majeur'] = this.noteBuilder([2, 4, 5, 7, 9, 11, 12])
      this.banque.gammes['Mineur'] = this.noteBuilder([2, 3, 5, 7, 8, 10, 12])
    },
    noteBuilder(operations) {
      const translateNote = (note) => {
        return this.notes[note % 12]
      }
      const accords = []
      // Pour chaque fondamentales
      for (let fondamentale = 0; fondamentale < 12; fondamentale++) {
        const accord = []
        accord.push(translateNote(fondamentale))
        for (const operation of operations) {
          accord.push(translateNote(fondamentale + operation))
        }
        accords.push({
          fondamentale: translateNote(fondamentale),
          notes: accord,
        })
      }
      return accords
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

        this.$emit('select', accord)
      }
    },
  },
}
</script>
