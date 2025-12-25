"use client";

import { useEffect, useState } from "react";

export default function AnalyticsPage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAnalytics() {
      try {
        const res = await fetch(
          "https://smart-traffic-fikm.onrender.com/analytics/peak-hours"
        );
        const json = await res.json();
        setData(json);
      } catch (err) {
        alert("Backend not reachable");
      }
      setLoading(false);
    }

    fetchAnalytics();
  }, []);

  return (
    <main className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-xl shadow-lg w-[420px]">
        <h1 className="text-2xl font-bold mb-4 text-center">
          Traffic Analytics
        </h1>

        {loading && <p className="text-center">Loading analytics...</p>}

        {data && (
          <div className="bg-gray-50 p-4 rounded">
            <p className="mb-2">
              <strong>Peak Congestion Hours:</strong>
            </p>

            <p className="mb-3">
              {data.peak_hours.join(" : 00, ")} : 00
            </p>

            <p>
              <strong>Severity Level:</strong>{" "}
              {data.severity_level}
            </p>

            <p className="mt-2 text-sm text-gray-600">
              (4 = Severe congestion)
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
