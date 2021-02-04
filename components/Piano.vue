<template>
  <div>
    <div v-if="debugValues" class="pl-10">
      Pressed notes:
      <span v-for="(note, index) of pressedNotes" :key="index"
        >{{ note.name }} {{ note.octave }}</span
      >
      <br />
      Sustained notes:
      <span v-for="(note, index) of sustainNotes" :key="index"
        >{{ note.name }} {{ note.octave }}</span
      >

      <br />
      <span>Sustain pedal:</span>
      <input v-model="sustain" type="checkbox" />
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
  </div>
</template>

<script>
import WebMidi from 'webmidi'

export default {
  props: [
    'highlightedNotes',
    'debugNotes',
    'debugValues',
    'onlyLightCanBePlayed',
  ],
  data() {
    return {
      pressedNotes: [],
      sustainNotes: [],
      notes: ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'],
      pianoNotes: [],
      audio: {},
      sustain: false,
    }
  },
  mounted() {
    const vm = this
    WebMidi.enable(function (err) {
      if (err) {
        console.error(err)
      }

      // Reacting when a new device becomes available
      WebMidi.addListener('connected', function (e) {
        // console.log(e)
      })

      // Reacting when a device becomes unavailable
      WebMidi.addListener('disconnected', function (e) {
        // console.log(e)
      })

      // Retrieving an output port/device using its id, name or index
      // output = WebMidi.outputs[0];
      const input = WebMidi.inputs[0]

      // Retrieve an input by name, id or index

      // Listen for a 'note on' message on all channels
      input.addListener('noteon', 'all', function (e) {
        vm.addNote({
          name: e.note.name,
          octave: e.note.octave - 1,
          velocity: e.velocity,
          number: e.note.number,
        })
      })
      // Listen for a 'note off' message on all channels
      input.addListener('noteoff', 'all', function (e) {
        vm.removeNote({
          name: e.note.name,
          octave: e.note.octave - 1,
          velocity: e.velocity,
          number: e.note.number,
        })
      })

      // Listen to pitch bend message on channel 3
      input.addListener('pitchbend', 3, function (e) {
        // console.log("Received 'pitchbend' message.", e);
      })

      // Listen to control change message on all channels
      input.addListener('controlchange', 'all', function (e) {
        // console.log("Received 'controlchange' message.", e);
        if (e.data[2]) vm.sustain = true
        else vm.sustain = false
      })

      // Listen to NRPN message on all channels
      input.addListener('nrpn', 'all', function (e) {
        if (e.controller.type === 'entry') {
          console.log("Received 'nrpn' 'entry' message.", e)
        }
        if (e.controller.type === 'decrement') {
          console.log("Received 'nrpn' 'decrement' message.", e)
        }
        if (e.controller.type === 'increment') {
          console.log("Received 'nrpn' 'increment' message.", e)
        }
        console.log('message value: ' + e.controller.value + '.', e)
      })
    })
  },
  created() {
    this.buildPianoNotes(5, 1)
  },
  watch: {
    sustain(val) {
      if (!val) {
        this.clearSustain()
      }
    },
  },
  methods: {
    loadNotes(name, octave) {
      if (!process.client) return
      const nameFormated = name.toLowerCase().replace('#', 's')
      this.audio[name + octave] = new Audio(
        `https://www.multiplayerpiano.com/sounds/Emotional_2.0/${
          nameFormated + octave
        }.mp3`
      )
    },
    playNote(name, octave, velocity = 0.5) {
      this.stopNote(name, octave)
      const audio = this.audio[name + octave]
      if (!audio) console.error('Note undefined', name, octave, velocity)
      else {
        audio.volume = velocity
        audio.play()
      }
    },
    stopNote(name, octave) {
      const audio = this.audio[name + octave]
      if (!audio) console.error('Note undefined', name, octave)
      else {
        audio.pause()
        audio.currentTime = 0
      }
    },
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
          this.loadNotes(note.name, note.octave)
        }
      }

      // Add last C

      notes.push({
        name: translateNote(count * 12),
        octave: count * startOctave + 1,
        number: count * 12,
        velocity: 0.7,
      })
      this.loadNotes(translateNote(count * 12), count * startOctave + 1)

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
      if (this.onlyLightCanBePlayed) {
        if (!this.isHighlighted(note)) {
          return
        }
      }

      this.pressedNotes.push(note)
      this.playNote(note.name, note.octave, note.velocity)
      this.updateNotes()
    },
    removeNote(n) {
      this.pressedNotes = this.pressedNotes.filter((note) => {
        return note.number !== n.number
      })
      if (this.sustain) {
        this.sustainNotes = this.sustainNotes.filter(
          (note) => !(note.name === n.name && note.octave === n.octave)
        )
        this.sustainNotes.push(n)
      } else {
        this.stopNote(n.name, n.octave)
      }
      this.updateNotes()
    },
    clearSustain() {
      this.sustainNotes.map(this.removeNote)
      this.sustainNotes = []
    },
    updateNotes() {
      this.$emit('notesPressed', this.pressedNotes)
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
  background: linear-gradient(rgb(39, 0, 211) 10%, rgb(255, 255, 255) 100%);
}

.key.pressed.black {
  height: 168px;
  background: linear-gradient(rgb(0, 14, 211) 36%, rgba(87, 87, 87, 1) 100%);
}
</style>
