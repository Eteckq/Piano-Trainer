<template>
  <div>
    <Nuxt />
  </div>
</template>

<script>
export default {
  created() {
    this.$store.commit('bank/createNote')
    this.$store.dispatch('sounds/loadSounds')
    this.$store.dispatch('inputs/initMidi')
    // this.$store.dispatch('inputs/initKeyboard')
  },
}
</script>
