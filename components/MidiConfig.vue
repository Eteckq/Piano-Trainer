<template>
  <div>
    <div
      v-for="(input, index) of inputs"
      :key="index"
      @click="$store.dispatch('midi/setupInput', input)"
    >
      {{ input }}
    </div>
    <div
      v-for="(output, index) of outputs"
      :key="index"
      @click="$store.dispatch('midi/setupOutput', output)"
    >
      {{ output }}
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
  computed: {
    inputs() {
      return this.$store.state.midi.inputs
    },
    outputs() {
      return this.$store.state.midi.inputs
    },
  },
  methods: {},
}
</script>

<style>
</style>