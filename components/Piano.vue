<template>
  <div>
    <div class="bg-black h-16"></div>
    <!-- Piano -->
    <div v-if="pianoNotes.length > 0" class="">
      <!-- Left Piano -->
      <div id="leftPiano" class="bg-black w-16 float-left">
        <span class="text-white">Sustain pedal:</span>
        <input v-model="sustain" type="checkbox" />
      </div>
      <div
        v-for="(number, index) of pianoNotes"
        :key="index"
        class="relative float-left"
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
          <span v-if="debugNotes" class="absolute bottom-0 inset-x-0"
            >{{ number | toNoteName }} {{ number | toNoteOctave }}</span
          >
        </div>
      </div>
      <!-- Right Piano -->
      <div
        id="rightPiano"
        class="bg-black w-16 flex flex-col justify-center items-center float-left"
      >
        <fa-icon class="text-xl text-white my-2" :icon="['fas', 'volume-up']" />
        <input
          v-model="volume"
          type="range"
          min="0"
          max="1"
          step="0.05"
          name="soundInput"
          id="soundInput"
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
    startingOctave() {
      return this.$store.state.piano.startingOctave
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
      ][number % 12]
      return name[1] && name[1] === '#'
    },
    addNote(number) {
      this.$store.commit('inputs/pushNote', { number, velocity: 0.7 })
      // FIXME event: lastnote pressed & pressedNotes + light note can be played
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
  background: linear-gradient(rgb(206, 206, 206) 0%, rgb(255, 255, 255) 20%);
  box-shadow: inset 1px -2px black;
}
.key.black {
  position: absolute;
  left: -10px;
  width: 25px;
  height: 170px;
  z-index: 2;
  background: linear-gradient(rgba(0, 0, 0, 1) 36%, rgba(87, 87, 87, 1) 100%);
}

.key.light.white {
  background: linear-gradient(rgb(228 255 77) 30%, rgb(255 253 225) 100%);
}

.key.light.black {
  background: linear-gradient(rgb(0 0 0) -40%, rgb(142 158 54) 100%);
}

.key.pressed.white {
  height: 295px;
  box-shadow: inset -1px -2px black;
  /* background: linear-gradient(rgb(39, 0, 211) 10%, rgb(255, 255, 255) 100%); */
}

.key.pressed.black {
  height: 168px;
  /* background: linear-gradient(rgb(0, 14, 211) 36%, rgba(87, 87, 87, 1) 100%); */
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
