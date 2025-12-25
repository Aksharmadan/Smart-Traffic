"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function Page() {
  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");
  const [hour, setHour] = useState(9);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState<any>(null);

  async function findRoute() {
    if (!source || !destination) {
      setError("Please enter both source and destination");
      return;
    }

    setError("");
    setLoading(true);
    setResult(null);

    try {
      const res = await fetch(
        "https://smart-traffic-fikm.onrender.com/route?source=" +
          encodeURIComponent(source) +
          "&destination=" +
          encodeURIComponent(destination) +
          "&hour=" +
          hour
      );

      const data = await res.json();
      setResult(data);
    } catch {
      setError("Backend not reachable");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#050B18]">
      {/* Animated gradient blobs */}
      <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-blue-600/30 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute top-1/3 -right-40 w-[500px] h-[500px] bg-purple-600/30 rounded-full blur-[120px] animate-pulse" />

      <div className="relative z-10 flex items-center justify-center min-h-screen">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-[420px] rounded-2xl border border-white/20 bg-white/10 backdrop-blur-xl p-8 shadow-2xl"
        >
          <h1 className="text-2xl font-semibold text-white text-center">
            Smart Traffic Route Planner
          </h1>
          <p className="text-sm text-gray-300 text-center mt-1 mb-6">
            AI-assisted congestion-aware routing
          </p>

          <input
            className="w-full mb-3 rounded-md bg-white/20 px-3 py-2 text-white placeholder-gray-300 outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Source (Anna Nagar)"
            value={source}
            onChange={(e) => setSource(e.target.value)}
          />

          <input
            className="w-full mb-3 rounded-md bg-white/20 px-3 py-2 text-white placeholder-gray-300 outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Destination (Guindy)"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
          />

          <input
            type="number"
            min={0}
            max={23}
            className="w-full mb-4 rounded-md bg-white/20 px-3 py-2 text-white outline-none focus:ring-2 focus:ring-blue-500"
            value={hour}
            onChange={(e) => setHour(Number(e.target.value))}
          />

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            onClick={findRoute}
            className="w-full rounded-md bg-blue-600 py-2 text-white font-medium hover:bg-blue-700 transition"
          >
            {loading ? "Analyzing traffic..." : "Find Optimal Route"}
          </motion.button>

          {error && (
            <p className="text-red-400 text-sm mt-3 text-center">{error}</p>
          )}

          {result && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-4 rounded-md bg-black/30 p-3 text-sm text-gray-200"
            >
              <p>
                <b>Algorithm:</b> {result.algorithm}
              </p>
              <p>
                <b>Path:</b> {result.path?.join(" → ")}
              </p>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
