<template>
  <div class="w-screen h-screen bg-blue-300">
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
          <label for="showNotes" class="mr-4">Display Keys Name</label>
          <input
            id="showNotes"
            v-model="debug.notes"
            type="checkbox"
            name="showNotes"
          />
        </div>
        <div class="flex justify-between">
          <label for="showValues" class="mr-4">Debug Keyboard Values</label>
          <input
            id="showValues"
            v-model="debug.values"
            type="checkbox"
            name="showValues"
          />
        </div>
        <div class="flex justify-between">
          <label for="onlyLightCanBePlayed" class="mr-4"
            >Only light note can be played</label
          >
          <input
            id="onlyLightCanBePlayed"
            v-model="debug.onlyLightCanBePlayed"
            type="checkbox"
            name="onlyLightCanBePlayed"
          />
        </div>
      </div>
    </transition>

    <nav class="m-auto text-center">
      Choix du mode:
      <span class="cursor-pointer text-xl" @click="displayMode = 0"
        >Banque</span
      >
      -
      <span class="cursor-pointer text-xl" @click="displayMode = 1"
        >Training</span
      >
      -
      <span class="cursor-pointer text-xl" @click="displayMode = 2"
        >Oreille</span
      >
    </nav>

    <div>
      <Banque
        v-if="displayMode === 0"
        class="pt-10"
        @select="selectFromBanque"
      />
      <Training
        v-if="displayMode === 1"
        :pressed="pressed"
        :last-pressed="lastPressed"
      />
      <Oreille v-if="displayMode === 2" :last-pressed="lastPressed" />
    </div>

    <Piano
      class="absolute inset-x-0"
      style="bottom: 50px"
      :highlighted-notes="highlightedNotes"
      :only-light-can-be-played="debug.onlyLightCanBePlayed"
      :debug-notes="debug.notes"
      :debug-values="debug.values"
      :octave-count="octaveCount"
      @notesPressed="(e) => (pressed = e)"
      @lastPressedNote="(e) => (lastPressed = e)"
    />

    <input v-model="volume" type="range" min="0" max="1" step="0.1" />
  </div>
</template>

<script>
import Vue from 'vue'

/*       @click="(debug.notes = !debug.notes)"
      @click="(debug.values = !debug.values)" */
export default Vue.extend({
  data() {
    return {
      displayMode: null,
      showParameters: false,
      debug: {
        notes: false,
        values: false,
        onlyLightCanBePlayed: false,
      },
      pressed: [],
      lastPressed: null,
      highlightedNotes: [],
      octaveCount: 1,
    }
  },
  computed: {
    volume: {
      get() {
        return this.$store.state.sounds.volume
      },
      set(newValue) {
        this.$store.commit('sounds/setVolume', newValue)
      },
    },
  },
  watch: {
    displayMode(mode) {
      this.highlightedNotes = []
      if (mode === 0) {
        this.octaveCount = 2
      }
      if (mode === 1) {
        this.octaveCount = 2
      }
      if (mode === 2) {
        this.octaveCount = 1
      }
    },
  },
  created() {
    this.displayMode = 0
  },
  methods: {
    selectFromBanque(accord) {
      this.highlightedNotes = accord.notes
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
