import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Home: React.FC = () => {
  const navigate = useNavigate();
  // Example state, replace with real data/API later
  const [stats] = useState({
    totalWards: 24,
    totalReports: 120,
    avgResponse: "2h 15m",
  });

  return (
    <div className="p-8">
      {/* Header */}
      <div className="bg-white/5 backdrop-blur border border-white/10 rounded-2xl mb-8 flex flex-col md:flex-row justify-between items-center p-8">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-emerald-600 bg-clip-text text-transparent mb-2">
            🏛️ Welcome to MUIG
          </h1>
          <p className="text-sm text-white/60">
            MadurAI Urban Intelligence Grid - Predictive Waste Governance Platform
          </p>
        </div>
        <div className="flex gap-8 mt-6 md:mt-0">
          <div>
            <div className="text-cyan-400 text-2xl font-bold">{stats.totalWards}</div>
            <div className="text-xs uppercase text-white/50">Wards</div>
          </div>
          <div>
            <div className="text-cyan-400 text-2xl font-bold">{stats.totalReports}</div>
            <div className="text-xs uppercase text-white/50">Reports</div>
          </div>
          <div>
            <div className="text-cyan-400 text-2xl font-bold">{stats.avgResponse}</div>
            <div className="text-xs uppercase text-white/50">Avg Response</div>
          </div>
        </div>
      </div>

      {/* Quick Actions & System Status */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Quick Actions */}
        <div className="bg-white/5 border border-cyan-400/30 rounded-xl p-6">
          <h2 className="text-cyan-400 text-xl font-semibold mb-4">🤖 Quick Actions</h2>
          <div className="flex flex-col gap-3">
            <button className="btn btn-cyan" onClick={() => navigate("/ai-classifier")}>Classify Waste Image</button>
            <button className="btn btn-emerald" onClick={() => navigate("/ward-map")}>View Ward Map</button>
            <button className="btn btn-warning" onClick={() => navigate("/reports")}>View Reports</button>
          </div>
        </div>
        {/* System Status */}
        <div className="bg-white/5 border border-white/10 rounded-xl p-6">
          <h2 className="text-cyan-400 text-xl font-semibold mb-4">📊 System Status</h2>
          <div className="flex flex-col gap-3">
            <div className="p-3 bg-white/10 rounded text-emerald-400 font-semibold">✅ Firebase Connected</div>
            <div className="p-3 bg-white/10 rounded text-cyan-400 font-semibold">✅ Gemini AI Ready</div>
            <div className="p-3 bg-white/10 rounded text-emerald-400 font-semibold">✅ Socket.IO Active</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
