"use client";

import { useState } from "react";

export default function Page() {
  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState("");

  const API_URL = process.env.NEXT_PUBLIC_API_URL!;

  async function findRoute() {
    if (!source || !destination) {
      setError("Enter both source and destination");
      return;
    }

    setLoading(true);
    setError("");
    setResult(null);

    try {
      const res = await fetch(
        `${API_URL}/route?source=${encodeURIComponent(
          source
        )}&destination=${encodeURIComponent(destination)}`
      );

      if (!res.ok) throw new Error("API failed"); const data = await res.json();
      setResult(data);
    } catch (e) {
      setError("Backend not reachable");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-gray-800">
      <div className="bg-white rounded-xl shadow-xl p-8 w-[420px] space-y-4">
        <h1 className="text-xl font-semibold text-center">
          Smart Traffic Route Planner
        </h1>

        <input
          className="w-full border px-3 py-2 rounded"
          placeholder="Source"
          value={source}
          onChange={(e) => setSource(e.target.value)}
        />

        <input
          className="w-full border px-3 py-2 rounded"
          placeholder="Destination"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
        />

        <button
          onClick={findRoute}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          {loading ? "Analyzing..." : "Find Optimal Route"}
        </button>

        {error && <p className="text-red-600 text-sm">{error}</p>}

        {result && (
          <div className="bg-gray-100 p-3 rounded text-sm">
            <p><b>Algorithm:</b> {result.algorithm}</p>
            <p><b>Path:</b> {result.path?.join(" → ")}</p>
          </div>
        )}
      </div>
    </div>
  );
}
