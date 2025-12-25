'use client'

import { useState } from 'react'

export default function Home() {
  const [source, setSource] = useState('')
  const [destination, setDestination] = useState('')
  const [result, setResult] = useState<any>(null)

  async function findRoute() {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/route?source=${source}&destination=${destination}&hour=9`
    )
    const data = await res.json()
    setResult(data)
  }

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      background: 'linear-gradient(135deg, #020617, #020617)'
    }}>
      <div style={{ background: 'white', padding: 24, borderRadius: 12, width: 320 }}>
        <h2>Smart Traffic Route Planner</h2>

        <input
          placeholder="Source"
          value={source}
          onChange={e => setSource(e.target.value)}
          style={{ width: '100%', marginBottom: 8 }}
        />

        <input
          placeholder="Destination"
          value={destination}
          onChange={e => setDestination(e.target.value)}
          style={{ width: '100%', marginBottom: 12 }}
        />

        <button onClick={findRoute} style={{ width: '100%' }}>
          Find Optimal Route
        </button>

        {result && (
          <pre style={{ marginTop: 12 }}>
            {JSON.stringify(result, null, 2)}
          </pre>
        )}
      </div>
    </div>
  )
}
