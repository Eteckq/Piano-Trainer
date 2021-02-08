<template>
  <div>
    <div v-if="debugValues" class="pl-10">
      Pressed notes:
      <span v-for="(note, i) of pressedNotes" :key="i"
        >{{ note.name }} {{ note.octave }} |
      </span>
      <br />
      Sustained notes:
      <span v-for="(note, index) of sustainNotes" :key="index"
        >{{ note.name }} {{ note.octave }} |
      </span>

      <br />
    </div>

    <!-- Piano -->
    <div v-if="pianoNotes.length > 0" class="flex justify-center m-auto">
      <div v-for="(note, index) of pianoNotes" :key="index" class="relative">
        <div
          class="key"
          :class="[
            note.name[1] && note.name[1] == '#' ? 'black' : 'white',
            isPressed(note) ? 'pressed' : '',
            isHighlighted(note) ? 'light' : '',
          ]"
          @mousedown="addNote(note)"
          @mouseup="removeNote(note)"
        >
          <span v-if="debugNotes" class="absolute bottom-0 inset-x-0"
            >{{ note.name }} {{ note.octave }}</span
          >
        </div>
      </div>
    </div>
    <span>Sustain pedal:</span>
    <input v-model="sustain" type="checkbox" />
  </div>
</template>

<script>
export default {
  props: [
    'highlightedNotes',
    'debugNotes',
    'debugValues',
    'onlyLightCanBePlayed',
    'octaveCount',
  ],
  data() {
    return {
      notes: ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'],
      pianoNotes: [],
    }
  },
  computed: {
    pressedNotes() {
      return this.$store.state.inputs.activeNotes
    },
    sustainNotes() {
      return this.$store.state.inputs.sustainNotes
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
      this.buildPianoNotes(this.octaveCount, 3)
    },
  },
  created() {
    this.buildPianoNotes(this.octaveCount, 3)
  },
  methods: {
    buildPianoNotes(count, startOctave) {
      this.audio = {}
      const translateNote = (note) => {
        return this.notes[note % 12]
      }

      const notes = []

      for (let i = 0; i < count; i++) {
        const octave = i + startOctave
        for (let j = 0; j < 12; j++) {
          const note = {
            name: translateNote(j),
            octave,
            number: octave * 12 + j,
            velocity: 0.7,
          }
          notes.push(note)
        }
      }

      // Add last C
      notes.push({
        name: translateNote(count * 12),
        octave: count + startOctave,
        number: (count + startOctave) * 12,
        velocity: 0.7,
      })

      this.pianoNotes = notes
    },
    isPressed(n) {
      return this.pressedNotes.some((note) => {
        return note.name === n.name && note.octave === n.octave
      })
    },
    isHighlighted(n) {
      return this.highlightedNotes.some((note) => {
        return note === n.name
      })
    },
    addNote(note) {
      this.$store.commit('inputs/pushNote', note)
      // FIXME event: lastnote pressed & pressedNotes + light note can be played
    },
    removeNote(note) {
      this.$store.commit('inputs/removeNote', note)
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
</style>
