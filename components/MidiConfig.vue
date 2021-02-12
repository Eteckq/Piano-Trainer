<template>
  <div>
    <div
      v-for="(device, index) of devices"
      :key="index"
      @click="$store.dispatch('midi/setupInput', device)"
    >
      {{ device.name }}
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
  computed: {
    devices() {
      return this.$store.state.midi.devices
    },
  },
  created() {
    console.log(this.inputs)
  },
}
</script>
