import React from 'react'
import './App.css'
import Fretboard from './Fretboard'
import Dashboard from './Dashboard'
import Musicboard from './Musicboard'

function App () {
  const [myNotes, setMyNotes] = React.useState(['X', 'X', 'X', 'X', 'X', 'X'])
  const [myChords, setMyChords] = React.useState([])
  const [loadingChord, setLoadingChord] = React.useState(false)
  const [chordSelected, setChordSelected] = React.useState(false)

  const addChord = () => {
    setLoadingChord(myNotes)
    let joinChords = myNotes.join('-')
    fetch(`https://api.uberchord.com/v1/chords?voicing=${joinChords}`)
      .then(res => res.json())
      .then(res => {
        // axios.post('/api/my-chords', { newChords }).then(response => {
        // })
        setMyChords(m => [...m, res[0]])
        setMyNotes(['X', 'X', 'X', 'X', 'X', 'X'])
        setLoadingChord(false)
      })
      .catch(err => console.log(err))
  }

  const updateChord = () => {
    setLoadingChord(myNotes)
    let joinChords = myNotes.join('-')
    fetch(`https://api.uberchord.com/v1/chords?voicing=${joinChords}`)
      .then(res => res.json())
      .then(res => {
        const updatedChords = myChords.map(chord => {
          if (chord.index === chordSelected.index) {
            return res[0]
          } else {
            return chord
          }
        })
        setMyChords(updatedChords)
        setChordSelected(false)
        setMyNotes(['X', 'X', 'X', 'X', 'X', 'X'])
        setLoadingChord(false)
      })
      .catch(err => console.log(err))
  }

  const handleOffClick = () => {
    setChordSelected(false)
  }

  return (
    <div className='App' onClick={handleOffClick}>
      <Musicboard />
      <Fretboard
        myNotes={myNotes}
        setMyNotes={setMyNotes}
        chordSelected={chordSelected}
        handleOffClick={handleOffClick}
      />
      <Dashboard
        handleOffClick={handleOffClick}
        setChordSelected={setChordSelected}
        setMyNotes={setMyNotes}
        myNotes={myNotes}
        chordSelected={chordSelected}
        myChords={myChords}
        addChord={addChord}
        updateChord={updateChord}
        loadingChord={loadingChord}
      />
    </div>
  )
}

export default App
