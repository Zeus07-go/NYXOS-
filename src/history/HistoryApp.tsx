import { useState } from 'react'
import NavRail from '../ui/nav/NavRail'
import './history.css'

// NASA's Eyes on the Solar System is built to be embedded in an iframe
// (https://science.nasa.gov/eyes/museums). Time travel is supported from 1949 to 2049, so the
// presets below jump straight to moments in lunar exploration history.
const EYES = 'https://eyes.nasa.gov/apps/solar-system/#'

// logo=false is one of NASA's documented embed options; it removes the NASA mark from the top-left.
const eyesUrl = (path: string) => `${EYES}${path}${path.includes('?') ? '&' : '?'}logo=false`

interface Moment {
  id: string
  label: string
  note: string
  path: string
}

const MOMENTS: Moment[] = [
  { id: 'now', label: 'Today', note: 'Live positions of planets and spacecraft', path: '/home' },
  { id: 'moon', label: 'The Moon', note: 'Fly to the Moon, now', path: '/moon' },
  {
    id: 'apollo11',
    label: 'Apollo 11',
    note: 'First crewed landing · 20 Jul 1969',
    path: '/moon?time=1969-07-20T20:17:40.000+00:00&rate=0',
  },
  {
    id: 'artemis1',
    label: 'Artemis I',
    note: 'Uncrewed lunar flyby · Dec 2022',
    path: '/sc_artemis_1?rate=1&time=2022-12-05T12:40:08.518+00:00',
  },
  {
    id: 'voyager',
    label: 'Voyager',
    note: 'The grand tour story',
    path: '/story/voyager_grand_tour',
  },
]

export default function HistoryApp() {
  const [moment, setMoment] = useState<Moment>(MOMENTS[0])
  const [loaded, setLoaded] = useState(false)

  return (
    <div className="history-root">
      <iframe
        key={moment.id}
        className="history-frame"
        title="NASA Eyes on the Solar System"
        src={eyesUrl(moment.path)}
        allow="accelerometer; fullscreen"
        allowFullScreen
        onLoad={() => setLoaded(true)}
      />
      {!loaded && <div className="history-loading">Loading NASA Eyes…</div>}
      <div className="history-brand" aria-label="NYXOS">NYXOS</div>
      <NavRail active="history" />
      <div className="history-bar" role="toolbar" aria-label="History moments">
        {MOMENTS.map((m) => (
          <button
            key={m.id}
            className={`history-chip${m.id === moment.id ? ' on' : ''}`}
            onClick={() => {
              setLoaded(false)
              setMoment(m)
            }}
            title={m.note}
          >
            {m.label}
          </button>
        ))}
      </div>
    </div>
  )
}
