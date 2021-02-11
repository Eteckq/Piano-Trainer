<template>
  <!-- <div
          class="text-white cursor-pointer text-6xl"
          @click="startingOctave--"
        >
          -
        </div> -->

  <!-- <div class="text-white cursor-pointer text-6xl" @click="startingOctave++">
        +
      </div> -->
  <div class="m-auto" style="width: -moz-min-content; width: min-content">
    <!-- Piano -->
    <!-- Top -->
    <div class="bg-gray-500 h-16">
      <select
        id="instrumentsSelect"
        v-model="instrument"
        class="m-auto"
        name="instruments"
      >
        <option v-for="(i, index) of instruments" :key="index" :value="i">
          {{ i }}
        </option>
      </select>
    </div>

    <div class="flex">
      <!-- Left Piano -->
      <div id="leftPiano" class="bg-gray-500 w-16">
        <label for="isSustain" class="text-white">Sustain</label>
        <input
          id="isSustain"
          v-model="sustain"
          type="checkbox"
          name="isSustain"
        />
      </div>

      <!-- Center -->
      <div v-if="pianoNotes.length > 0" class="flex relative">
        <div v-if="!isLoaded" class="absolute inset-0 z-50">
          <p class="text-center py-48">Loading...</p>
        </div>
        <div
          v-for="(number, index) of pianoNotes"
          :key="index"
          class="relative"
        >
          <div
            class="key"
            :class="[
              isSharp(number) ? 'black' : 'white',
              isPressed(number) ? 'pressed' : '',
              isHighlighted(number) ? 'light' : '',
            ]"
            @mousedown="addNote(number)"
            @mouseup="removeNote(number)"
          >
            <span class="text-black absolute inset-x-0" style="bottom: 15px">
              <span v-if="debugNotes"
                >{{ number | toNoteName }} {{ number | toNoteOctave }}</span
              >
              <span v-else-if="number % 12 === 0"
                >{{ number | toNoteName }} {{ number | toNoteOctave }}</span
              >
            </span>
          </div>
        </div>
      </div>

      <!-- Right Piano -->
      <div
        id="rightPiano"
        class="bg-gray-500 w-16 flex flex-col justify-center items-center"
      >
        <span class="text-xl text-white my-2 cursor-pointer"
          ><fa-icon
            v-if="volume > 0"
            :icon="['fas', 'volume-up']"
            @click="volume = 0" /><fa-icon
            v-else
            :icon="['fas', 'volume-mute']"
            @click="volume = 0.5"
        /></span>

        <input
          id="soundInput"
          v-model="volume"
          type="range"
          min="0"
          max="1"
          step="0.05"
          name="soundInput"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      pianoNotes: [],
      debugNotes: false,
    }
  },
  computed: {
    isLoaded() {
      return this.$store.state.sounds.loaded
    },
    instrument: {
      get() {
        return this.$store.state.sounds.instrument
      },
      set(val) {
        this.$store.dispatch('sounds/loadSounds', val)
      },
    },
    instruments() {
      return this.$store.state.sounds.instruments
    },
    volume: {
      get() {
        return this.$store.state.sounds.volume
      },
      set(newValue) {
        this.$store.commit('sounds/setVolume', newValue)
      },
    },
    highlightedNotes() {
      return this.$store.state.piano.lightNotes
    },
    pressedNotes() {
      return this.$store.state.inputs.activeNotes
    },
    sustainNotes() {
      return this.$store.state.inputs.sustainNotes
    },
    octaveCount() {
      return this.$store.state.piano.octaveCount
    },
    startingOctave: {
      get() {
        return this.$store.state.piano.startingOctave
      },
      set(val) {
        if (val === -1 || val === 7) return
        this.$store.commit('piano/setStartingOctave', val)
      },
    },
    sustain: {
      get() {
        return this.$store.state.inputs.sustain
      },
      set(val) {
        this.$store.commit('inputs/setSustain', val)
      },
    },
  },
  watch: {
    octaveCount() {
      this.buildPianoNotes()
    },
    startingOctave() {
      this.buildPianoNotes()
    },
  },
  created() {
    this.buildPianoNotes()
  },
  methods: {
    buildPianoNotes() {
      const notes = []

      for (let i = 0; i < this.octaveCount; i++) {
        const octave = i + this.startingOctave
        for (let j = 0; j < 12; j++) {
          notes.push(octave * 12 + j)
        }
      }

      // Add last C
      notes.push((this.octaveCount + this.startingOctave) * 12)

      this.pianoNotes = notes
    },
    isPressed(n) {
      return this.pressedNotes.some((number) => {
        return number === n
      })
    },
    isHighlighted(n) {
      return this.highlightedNotes.some((number) => {
        return number === n
      })
    },
    isSharp(number) {
      const name = [
        'C',
        'C#',
        'D',
        'D#',
        'E',
        'F',
        'F#',
        'G',
        'G#',
        'A',
        'A#',
        'B',
      ][Math.abs(number) % 12]
      return name[1] && name[1] === '#'
    },
    addNote(number) {
      this.$store.commit('inputs/pushNote', { number, velocity: 0.7 })
    },
    removeNote(number) {
      this.$store.commit('inputs/removeNote', number)
    },
  },
}
</script>

<style scoped>
.key {
  transition: all 0.1s;
  text-align: center;
  font-size: 10px;
  color: rgb(167, 167, 167);
  border-bottom-right-radius: 4px;
  border-bottom-left-radius: 4px;
}

.key.white {
  width: 40px;
  height: 300px;
  z-index: 1;
  border-left: 1px solid #bbb;
  border-bottom: 1px solid #bbb;
  border-radius: 0 0 5px 5px;
  box-shadow: -1px 0 0 rgba(255, 255, 255, 0.8) inset, 0 0 5px #ccc inset,
    0 0 3px rgba(0, 0, 0, 0.2);
  background: linear-gradient(to bottom, #eee 0%, #fff 100%);
}
.key.black {
  position: absolute;
  left: -10px;
  width: 25px;
  height: 170px;
  z-index: 2;
  border: 1px solid #000;
  border-radius: 0 0 3px 3px;
  box-shadow: -1px -1px 2px rgba(255, 255, 255, 0.2) inset,
    0 -5px 2px 3px rgba(0, 0, 0, 0.6) inset, 0 2px 4px rgba(0, 0, 0, 0.5);
  background: linear-gradient(45deg, #222 0%, #555 100%);
}

.key.light.white {
  background: linear-gradient(rgb(228 255 77) 30%, rgb(255 253 225) 100%);
}

.key.light.black {
  background: linear-gradient(rgb(0 0 0) -40%, rgb(142 158 54) 100%);
}

.key.pressed.white {
  height: 295px;
  border-top: 1px solid #777;
  border-left: 1px solid #999;
  border-bottom: 1px solid #999;
  box-shadow: 2px 0 3px rgba(0, 0, 0, 0.1) inset,
    -5px 5px 20px rgba(0, 0, 0, 0.2) inset, 0 0 3px rgba(0, 0, 0, 0.2);
}

.key.pressed.black {
  height: 168px;
  box-shadow: -1px -1px 2px rgba(255, 255, 255, 0.2) inset,
    0 -2px 2px 3px rgba(0, 0, 0, 0.6) inset, 0 1px 2px rgba(0, 0, 0, 0.5);
}

#rightPiano,
#leftPiano {
  height: 310px;
}

input[type='range'] {
  writing-mode: bt-lr; /* IE */
  -webkit-appearance: slider-vertical; /* WebKit */
}
</style>
