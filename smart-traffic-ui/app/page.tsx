"use client";

import { useState } from "react";

export default function Home() {
  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const API = process.env.NEXT_PUBLIC_API_URL;

  const findRoute = async () => {
    setLoading(true);
    setResult(null);

    try {
      const res = await fetch(
        `${API}/route?source=${encodeURIComponent(source)}&destination=${encodeURIComponent(destination)}`
      );
      const data = await res.json();
      setResult(data);
    } catch (e) {
      setResult({ error: "Backend not reachable" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-slate-900 to-blue-900">
      <div className="bg-white rounded-xl p-6 w-[360px] shadow-xl">
        <h1 className="text-xl font-semibold text-center mb-4">
          Smart Traffic Route Planner
        </h1>

        <input
          className="w-full border p-2 rounded mb-3"
          placeholder="Source"
          value={source}
          onChange={(e) => setSource(e.target.value)}
        />

        <input
          className="w-full border p-2 rounded mb-3"
          placeholder="Destination"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
        />

        <button
          onClick={findRoute}
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          {loading ? "Calculating..." : "Find Optimal Route"}
        </button>

        {result && (
          <pre className="mt-4 text-sm bg-gray-100 p-2 rounded overflow-auto">
            {JSON.stringify(result, null, 2)}
          </pre>
        )}
      </div>
    </main>
  );
}
