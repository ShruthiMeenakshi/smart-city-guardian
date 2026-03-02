import React from "react";

// Mock data for demonstration
const topStats = [
  { label: "Total Rewards", value: 1240 },
  { label: "Active Wards", value: 24 },
  { label: "Badges Awarded", value: 87 },
  { label: "Top Rank", value: "Ward 7" },
];

const podium = [
  { name: "Ward 7", score: 980, rank: 1, avatar: "🥇" },
  { name: "Ward 12", score: 920, rank: 2, avatar: "🥈" },
  { name: "Ward 3", score: 870, rank: 3, avatar: "🥉" },
];

const leaderboard = [
  { name: "Ward 4", score: 860 },
  { name: "Ward 9", score: 850 },
  { name: "Ward 15", score: 840 },
  { name: "Ward 2", score: 830 },
  { name: "Ward 10", score: 820 },
];

const badges = [
  { label: "Cleanest Ward", icon: "🧹" },
  { label: "Most Improved", icon: "📈" },
  { label: "Community Star", icon: "🌟" },
];

const WardRewards: React.FC = () => {
  return (
    <div className="rewards-page">
      <h1 className="rewards-page__title">🏆 Rewards & Leaderboard</h1>
      {/* Top Stats */}
      <div className="rewards-page__stats-grid">
        {topStats.map((stat) => (
          <div key={stat.label} className="flex flex-col items-center">
            <div className="text-2xl font-bold text-emerald-300">{stat.value}</div>
            <div className="text-xs text-white/60 uppercase mt-1">{stat.label}</div>
          </div>
        ))}
      </div>
      {/* Podium */}
      <div className="rewards-page__podium">
        {podium.map((item, idx) => (
          <div key={item.rank} className={`flex flex-col items-center ${item.rank === 1 ? 'order-2' : item.rank === 2 ? 'order-1' : 'order-3'}`}>
            <div className={`w-20 h-20 rounded-full flex items-center justify-center text-4xl mb-2 border-4 ${item.rank === 1 ? 'border-yellow-400' : item.rank === 2 ? 'border-gray-400' : 'border-orange-700'} bg-gray-900`}>{item.avatar}</div>
            <div className={`w-20 rounded-t-lg flex flex-col items-center justify-end ${item.rank === 1 ? 'h-32 bg-yellow-100/10' : item.rank === 2 ? 'h-24 bg-gray-100/10' : 'h-16 bg-orange-100/10'}`}>
              <span className="text-2xl font-bold text-white/70">{item.score}</span>
            </div>
            <div className="font-semibold text-white/80 mt-2">{item.name}</div>
          </div>
        ))}
      </div>
      {/* Leaderboard Table */}
      <div className="rewards-page__card">
        <h2 className="text-xl font-semibold text-emerald-300 mb-4">Leaderboard</h2>
        <table className="rewards-page__table">
          <thead>
            <tr>
              <th className="py-2">Rank</th>
              <th className="py-2">Ward</th>
              <th className="py-2">Score</th>
            </tr>
          </thead>
          <tbody>
            {leaderboard.map((row, idx) => (
              <tr key={row.name} className="rewards-page__table-row">
                <td className="py-2 font-bold">{idx + 4}</td>
                <td className="py-2">{row.name}</td>
                <td className="py-2">{row.score}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Badges */}
      <div className="rewards-page__badges">
        {badges.map((badge) => (
          <div key={badge.label} className="flex items-center gap-2 bg-emerald-900/30 border border-emerald-700 rounded-lg px-4 py-2 text-emerald-200">
            <span className="text-xl">{badge.icon}</span>
            <span className="text-sm font-semibold">{badge.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WardRewards;
