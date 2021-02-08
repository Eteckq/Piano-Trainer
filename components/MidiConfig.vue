<template>
  <div></div>
</template>

<script>
import WebMidi from 'webmidi'
export default {
  data() {
    return {
      inputs: [],
      outputs: [],
    }
  },
  watch: {
    inputs() {
      this.$store.dispatch('sounds/playNote', {
        number: 3 * 12 + 3,
        velocity: 0.1,
      })
      this.$store.dispatch('sounds/playNote', {
        number: 3 * 12 + 6,
        velocity: 0.1,
      })
      this.$store.dispatch('sounds/playNote', {
        number: 3 * 12 + 10,
        velocity: 0.1,
      })
      this.setupInput(this.inputs[0])
    },
  },
  created() {
    if (!process.client) return
    const vm = this
    WebMidi.enable(function (err) {
      if (err) {
        console.error(err)
      }

      // Reacting when a new device becomes available
      WebMidi.addListener('connected', function (e) {
        vm.inputs.push(e)
        vm.outputs.push(e)
      })

      WebMidi.addListener('disconnected', function (e) {
        // this.inputs
        // this.outputs
      })
    })
  },
  methods: {
    setupInput(device) {
      device.addListener('noteon', 'all', function (e) {
        this.$store.commit('inputs/pushNote', {
          velocity: e.velocity,
          number: e.note.number,
        })
      })
      // Listen for a 'note off' message on all channels
      device.addListener('noteoff', 'all', function (e) {
        this.$store.commit('inputs/removeNote', e.note.number)
      })

      device.addListener('controlchange', 'all', function (e) {
        if (e.data[2]) this.$store.commit('inputs/setSustain', true)
        else this.$store.commit('inputs/setSustain', false)
      })
    },
    removeInput(device) {},
    setupOutput(device) {},
    removeOutput(device) {},
  },
}
</script>

<style>
</style>