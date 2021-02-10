export const state = () => ({
  banque: {},
})

export const mutations = {
  init(state) {
    state.banque.accords = {}

    state.banque.accords.Majeur = noteBuilder([4, 7])
    state.banque.accords.Mineur = noteBuilder([3, 7])
    state.banque.accords.Dim = noteBuilder([3, 6])
    state.banque.accords.Aug = noteBuilder([4, 8])
    state.banque.accords['5'] = noteBuilder([7])
    state.banque.accords['7'] = noteBuilder([3, 7, 9])

    state.banque.gammes = {}
    state.banque.gammes.Majeur = noteBuilder([2, 4, 5, 7, 9, 11, 12])
    state.banque.gammes.Mineur = noteBuilder([2, 3, 5, 7, 8, 10, 12])
  },
}

const notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B']

function noteBuilder(operations) {
  const translateNote = (note) => {
    return notes[note % notes.length]
  }
  const accords = []
  // Pour chaque fondamentales
  for (let fondamentale = 0; fondamentale < notes.length; fondamentale++) {
    const accord = []
    accord.push(translateNote(fondamentale))
    for (const operation of operations) {
      accord.push(translateNote(fondamentale + operation))
    }
    accords.push({
      fondamentale: translateNote(fondamentale),
      notes: accord,
    })
  }
  return accords
}
