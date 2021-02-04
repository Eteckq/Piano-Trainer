<template>
  <div class="w-screen h-screen bg-blue-300">
    <Banque @select="selectFromBanque" />
    <Piano
      class="absolute inset-x-0"
      style="bottom: 50px"
      :highlighted-notes="highlightedNotes"
      @notesPressed="(e) => (pressed = e)"
    />
  </div>
</template>

<script>
import Vue from 'vue'

export default Vue.extend({
  data() {
    return {
      pressed: [],
      highlightedNotes: [],
    }
  },

  methods: {
    selectFromBanque(accord) {
      this.highlightedNotes = accord.notes
    },
  },
})
</script>
