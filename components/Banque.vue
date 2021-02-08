<template>
  <div class="text-center">
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
  },
  methods: {
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
