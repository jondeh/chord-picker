import React from 'react'
import './fretboard.css'
import { strings, notes } from './data'

const Fretboard = ({ myNotes, setMyNotes, handleOffClick }) => {
  // componentDidMount = () => {
  //   // axios.get('/api/chords').then(res => {
  //   //   setState({
  //   //     strings: res.data[0],
  //   //     notes: res.data[1]
  //   //   })
  //   // })
  //   fetch('/api/chords').then(res => {
  //     res.json().then(data => {
  //       setState({
  //         strings: data[0],
  //         notes: data[1]
  //       })
  //     })
  //   })
  // }

  // click1 = () => {
  //   setState({ className: 'fretboard-container' })
  // }

  // click2 = () => {
  //   setState({ className: 'fretboard-container2' })
  // }

  // click3 = () => {
  //   setState({ className: 'fretboard-container3' })
  // }

  // click4 = () => {
  //   setState({ className: 'fretboard-containerRyan' })
  // }

  // click5 = () => {
  //   setState({ className: 'fretboard-containerUnicorn' })
  // }

  // click6 = () => {
  //   setState({ className: 'fretboard-containerPerez' })
  // }

  const addNote = (e, strInd, fretInd) => {
    e.stopPropagation()
    setMyNotes(n => {
      const newNotes = [...n]
      newNotes[strInd] = fretInd
      return newNotes
    })
  }

  return (
    <div className='fretboard' onClick={e => e.stopPropagation()}>
      <OpenStrings addNote={addNote} myNotes={myNotes} />
      <FretboardBody addNote={addNote} myNotes={myNotes} />
    </div>
  )
}

const OpenStrings = ({ addNote, myNotes }) => {
  return (
    <div className='open-strings-container'>
      {strings.map((string, strInd) => {
        return (
          <div
            key={strInd}
            className={`open-strings ${myNotes[strInd] == 0 &&
              'note-selected'}`}
            onClick={e => addNote(e, strInd, 0)}
          >
            <h3>{string}</h3>
          </div>
        )
      })}
    </div>
  )
}

const FretboardBody = ({ myNotes, addNote }) => {
  return (
    <div className='fretboard-body'>
      <div className='display-strings'>
        {[...Array(7)].map((_, i) => (
          <div key={i} className='display-string' />
        ))}
      </div>
      <div className='display-frets'>
        {[...Array(9)].map((_, i) => (
          <div key={i} className='display-fret' />
        ))}
      </div>
      <div className='circles-container'>
        {[...Array(3)].map((_, i) => (
          <div key={i} className='circle' />
        ))}
      </div>
      {notes.map((string, strInd) => {
        return (
          <div className='string' key={strInd}>
            {string.map((fret, fretInd) => (
              <div
                className={`note ${myNotes[strInd] == fretInd + 1 &&
                  'note-selected'}`}
                key={fretInd + 1}
                onClick={e => addNote(e, strInd, fretInd + 1)}
              >
                <div className='noteName'>
                  <span>{fret}</span>
                </div>
              </div>
            ))}
          </div>
        )
      })}
    </div>
  )
}

export default Fretboard
