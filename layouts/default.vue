<template>
  <div>
    <Nuxt />
  </div>
</template>

<script>
export default {
  created() {
    this.$store.commit('bank/createNote')
    this.$store.commit('sounds/loadSounds')
  },
}
</script>
