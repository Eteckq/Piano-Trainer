<template>
  <div></div>
</template>

<script>
export default {
  data() {
    return {
      keyboardConfig: {
        KeyA: 36,
        KeyW: 37,
        KeyS: 38,
        KeyE: 39,
        KeyD: 40,
        KeyF: 41,
        KeyT: 42,
        KeyG: 43,
        KeyY: 44,
        KeyH: 45,
        KeyU: 46,
        KeyJ: 47,
        KeyK: 48,
      },
    }
  },

  mounted() {
    document.addEventListener('keyup', (e) => {
      for (const key in this.keyboardConfig) {
        if (e.code === key) {
          this.$store.commit('inputs/removeNote', this.keyboardConfig[key])
        }
      }
    })

    document.addEventListener('keydown', (e) => {
      // console.log(e.code)
      for (const key in this.keyboardConfig) {
        if (e.code === key) {
          const note = {
            number: this.keyboardConfig[key],
            velocity: 0.7,
          }

          this.$store.commit('inputs/pushNote', note)
        }
      }
    })
  },
  methods: {},
}
</script>
