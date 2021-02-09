<template>
  <div class="w-screen h-screen bg-purple-900">
    <!-- Parameters -->
    <div class="absolute top-0 left-0 m-4 cursor-pointer">
      <fa-icon
        class="text-gray01 text-5xl transform transition-all duration-700 hover:rotate-45"
        :icon="['fas', 'cog']"
        @click="showParameters = true"
      />
    </div>

    <transition name="fade">
      <div v-show="showParameters" class="p-10 bg-white absolute rounded-br-md">
        <div class="mb-8">
          <fa-icon
            class="text-black text-5xl cursor-pointer absolute right-0 top-0 m-3"
            :icon="['fas', 'times']"
            @click="showParameters = false"
          />
        </div>
        <div class="flex justify-between">
          <label for="onlyLightCanBePlayed" class="mr-4"
            >Only light note can be played</label
          >
          <input
            id="onlyLightCanBePlayed"
            v-model="onlyLightCanBePlayed"
            type="checkbox"
            name="onlyLightCanBePlayed"
          />
        </div>
      </div>
    </transition>

    <!-- Top Menu -->

    <MenuTab @changeTab="changeTab" />

    <div class="pt-10">
      <Banque v-if="displayMode === 0" />
      <Training v-if="displayMode === 1" />
      <Oreille v-if="displayMode === 2" />
    </div>

    <Piano />
  </div>
</template>

<script>
import Vue from 'vue'

export default Vue.extend({
  data() {
    return {
      displayMode: null,
      showParameters: false,
    }
  },
  computed: {
    onlyLightCanBePlayed: {
      get() {
        return this.$store.state.piano.onlyLightCanBePlayed
      },
      set(newValue) {
        this.$store.commit('piano/setOnlyLightCanBePlayed', newValue)
      },
    },
  },
  watch: {
    displayMode(mode) {
      this.$store.commit('piano/setLightNotes', [])

      if (mode === 2) {
        this.$store.commit('piano/setOctaveCount', 1)
      } else if (mode === 1) {
        this.$store.commit('piano/setOctaveCount', 2)
      } else {
        this.$store.commit('piano/setOctaveCount', 3)
      }
    },
  },
  created() {
    this.displayMode = 0
  },
  methods: {
    changeTab(tab) {
      this.displayMode = tab
    },
  },
})
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s;
  top: 0px;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
  top: -100px;
}
</style>
