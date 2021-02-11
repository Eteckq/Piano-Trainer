<template>
  <div class="text-center">
    <h1>Midi Player - WIP</h1>
    <!-- <input type="file" @change="uploadFile" /> -->
  </div>
</template>

<script>
import { Midi } from '@tonejs/midi'

export default {
  data() {
    return {
      midi: null,
    }
  },
  created() {
    this.$store.commit('piano/setOctaveCount', 5)
    this.urlToMidi('/midi/Zanarkand.mid')
  },
  beforeDestroy() {
    this.$store.dispatch('sounds/reload')
  },
  methods: {
    uploadFile(e) {
      const files = e.target.files || e.dataTransfer.files
      if (!files.length) return

      const reader = new FileReader()
      reader.onload = (e) => {
        this.fileToMidi(atob(e.target.result.substr(22)))
      }
      reader.readAsDataURL(e.target.files[0])
    },
    fileToMidi(file) {
      console.log(file)
      const midi = new Midi(Buffer.from(file))
      console.log(midi)
    },
    async urlToMidi(url) {
      const midi = await Midi.fromUrl(url)
      const track = midi.tracks[0]

      setTimeout(() => {
        this.$store.dispatch('sounds/playTrack', track)
      }, 200)
    },
  },
}
</script>
