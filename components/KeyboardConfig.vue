<template>
  <div>
    {{ this.$store.state.keyboard.config }}
  </div>
</template>

<script>
export default {
  computed: {
    config: {
      get() {
        return this.$store.state.keyboard.config
      },
      set(val) {
        this.$store.commit('keyboard/setConfig', val)
      },
    },
  },

  mounted() {},
  methods: {},
}
</script>
