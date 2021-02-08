<template>
  <div>
    <Nuxt />
    <MidiConfig />
    <KeyboardConfig />
  </div>
</template>

<script>
// const notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B']
export default {
  created() {
    this.$store.commit('bank/createNote')
    this.$store.dispatch('sounds/loadSounds')
  },
}
</script>
