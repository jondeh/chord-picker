import React from 'react'
import './dashboard.css'

const sample = {
  chordName: 'C,,(omit5),',
  enharmonicChordName: 'C,,(omit5),',
  fingering: 'X 3 2 X 1 X',
  strings: 'X 3 2 X 1 X',
  tones: 'C,E',
  voicingID: '9223372037897029759'
}

const musicSymbols = {
  b: '♭',
  '#': '♯',
  m: 'm',
  M: 'M',
  dim: '°',
  aug: '+'
}

const Dashboard = ({
  myChords,
  addChord,
  updateChord,
  loadingChord,
  setChordSelected,
  chordSelected,
  setMyNotes,
  myNotes,
  deleteChord,
  handleOffClick
}) => {
  const [showCharts, setShowCharts] = React.useState(false)
  const [showSettings, setShowSettings] = React.useState(false)

  const handleClick = (e, i, chord) => {
    e.stopPropagation()
    setChordSelected({ index: i, chord })
    setMyNotes(() => chord.strings)
  }

  const renderChords = myChords.map((chord, chordIndex) => {
    const formattedChord = formatChord(chord)
    return (
      <div
        key={chordIndex}
        className={`chord ${
          chordSelected.index === chordIndex ? 'active' : ''
        }`}
        onClick={e => handleClick(e, chordIndex, formattedChord)}
      >
        <h5 className="chord-title">{formattedChord.chordName}</h5>
        {chordSelected.index === chordIndex && (
          <button
            onClick={() => deleteChord(chordIndex)}
            className='delete-chord'
          >
            🞬
          </button>
        )}
        {showCharts && <ChordChart chord={formattedChord} />}
        {/* <span>{formattedChord.fingering}</span> */}
      </div>
    )
  })

  const disabled = myNotes.join('') === 'XXXXXX' || loadingChord
  const toUpdate =
    chordSelected &&
    chordSelected.chord?.strings?.join('') !== myNotes?.join('')

  return (
    <div className='dashboard'>
      <div>
        <header>
          <div />
          <h4>My Chords</h4>
          <button onClick={() => setShowSettings(!showSettings)}>⛭</button>
          {showSettings && <Settings showCharts={showCharts} setShowCharts={setShowCharts} />}
        </header>
        <div className='chord-grid'>
          {renderChords}
          {loadingChord && (
            <div className='chord skeleton'>
              <h5>Loading</h5>
              {showCharts && <ChordChart chord={{ strings: loadingChord }} />}
            </div>
          )}
        </div>
      </div>
      <button
        className='submit-button'
        disabled={disabled}
        onClick={toUpdate ? updateChord : addChord}
      >
        {toUpdate ? 'Update Chord' : 'Add Chord'}
      </button>
    </div>
  )
}

const formatChord = chord => {
  const chordName = chord.chordName.split(',').map(e => {
    for (let i = 0; i < e.length; i++) {
      if (musicSymbols[e[i]]) {
        e.replace(e[i], musicSymbols[e[i]])
      }
    }
    return e
  })
  const enharmonicChordName = chord.enharmonicChordName.split(',')
  const fingering = chord.fingering.split(' ')
  const strings = chord.strings.split(' ')
  const tones = chord.tones.split(',')
  const id = chord.voicingID

  return {
    chordName,
    enharmonicChordName,
    fingering,
    strings,
    tones,
    id
  }
}

const ChordChart = ({ chord }) => {
  const chart = [...Array(5)].map((_, s) => {
    return (
      <div
        key={s}
        className={`chord-chart-string ${
          chord.strings[chord.strings.length - s - 2] === 'X' ? 'unplayed' : ''
        }`}
      >
        {[...Array(4)].map((_, f) => {
          return (
            <div key={f} className='chord-chart-fret'>
              <div
                className={`chord-chart-note ${
                  chord.strings?.[chord.strings.length - s - 1]?.toString() ===
                  f.toString()
                    ? 'active'
                    : ''
                }`}
              ></div>
            </div>
          )
        })}
      </div>
    )
  })

  return <div className='chord-chart'>{chart}</div>
}

const Settings = ({ showCharts, setShowCharts }) => {
  console.log("showCharts", showCharts)
  return (
    <div className='dashboard-settings'>
      <label>
        Show Charts
        <input value={showCharts} type='checkbox' onChange={() => setShowCharts(s => !s)} />
      </label>
    </div>
  )
}

export default Dashboard
