"use client";

import { useState } from "react";

export default function RoutePage() {
  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");
  const [hour, setHour] = useState(9);
  const [result, setResult] = useState(null);

  async function findRoute() {
    const res = await fetch(
      `https://smart-traffic-fikm.onrender.com/route?source=${source}&destination=${destination}&hour=${hour}`
    );
    const data = await res.json();
    setResult(data);
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-xl shadow-xl w-[420px]">
        <h1 className="text-2xl font-bold mb-4">
          Smart Traffic Route Planner
        </h1>

        <input
          className="border p-2 w-full mb-3"
          placeholder="Source"
          value={source}
          onChange={(e) => setSource(e.target.value)}
        />

        <input
          className="border p-2 w-full mb-3"
          placeholder="Destination"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
        />

        <input
          type="number"
          min="0"
          max="23"
          className="border p-2 w-full mb-4"
          value={hour}
          onChange={(e) => setHour(e.target.value)}
        />

        <button
          onClick={findRoute}
          className="bg-blue-600 text-white w-full py-2 rounded-lg hover:bg-blue-700"
        >
          Find Optimal Route
        </button>

        {result && (
          <div className="mt-5 bg-gray-50 p-4 rounded-lg">
            <p><strong>Algorithm:</strong> {result.algorithm}</p>
            {result.path && (
              <p className="mt-2">
                <strong>Path:</strong> {result.path.join(" → ")}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
