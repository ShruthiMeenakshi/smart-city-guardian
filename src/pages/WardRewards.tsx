import { motion } from 'framer-motion';
import { mockWards } from '@/lib/mockData';
import { mockCitizenCredits, badgeColors } from '@/lib/intelligenceData';
import { ThemeToggle } from '@/components/ThemeToggle';
import {
  Trophy, Medal, Crown, Star, Flame, Recycle, TrendingUp, Gift,
  Target, FileWarning, Sparkles, Award, Zap, Users
} from 'lucide-react';

const badgeIcons: Record<string, React.ReactNode> = {
  bronze: <Medal className="h-4 w-4" />,
  silver: <Medal className="h-4 w-4" />,
  gold: <Crown className="h-4 w-4" />,
  platinum: <Crown className="h-4 w-4" />,
};

const rewardTiers = [
  { name: 'Bronze', minPts: 0, maxPts: 1500, perks: 'Ward clean-up badge', emoji: '🥉' },
  { name: 'Silver', minPts: 1500, maxPts: 3000, perks: '₹50 eco-voucher', emoji: '🥈' },
  { name: 'Gold', minPts: 3000, maxPts: 4500, perks: '₹150 voucher + Tree planting', emoji: '🥇' },
  { name: 'Platinum', minPts: 4500, maxPts: 6000, perks: '₹300 voucher + City recognition', emoji: '💎' },
];

const topCitizens = [...mockCitizenCredits].sort((a, b) => b.ecoPoints - a.ecoPoints);
const podium = topCitizens.slice(0, 3);
const rest = topCitizens.slice(3, 10);

const sortedWards = [...mockWards].sort((a, b) => b.score - a.score);

const challenges = [
  { title: 'Report 5 waste issues this week', progress: 3, target: 5, reward: 50, icon: FileWarning },
  { title: 'Recycle 10 kg this month', progress: 7, target: 10, reward: 80, icon: Recycle },
  { title: 'Maintain 7-day streak', progress: 5, target: 7, reward: 100, icon: Flame },
  { title: 'Classify 3 images with AI', progress: 1, target: 3, reward: 40, icon: Target },
  { title: 'Participate in a clean-up drive', progress: 0, target: 1, reward: 120, icon: Sparkles },
];

const milestones = [
  { label: 'First Report', icon: '📋', achieved: true },
  { label: '100 Eco Points', icon: '⚡', achieved: true },
  { label: '10 Scans', icon: '📷', achieved: true },
  { label: '7-Day Streak', icon: '🔥', achieved: false },
  { label: 'Gold Tier', icon: '🥇', achieved: false },
  { label: '50 Reports', icon: '🏆', achieved: false },
];

const WardRewards = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Rewards & Leaderboard</h1>
          <p className="text-sm text-muted-foreground">Track eco-points, rankings, and community challenges</p>
        </div>
        <ThemeToggle />
      </motion.div>

      {/* KPI Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Citizens', value: mockCitizenCredits.length, icon: Users, color: 'text-primary' },
          { label: 'Points Distributed', value: mockCitizenCredits.reduce((s, c) => s + c.ecoPoints, 0).toLocaleString(), icon: Star, color: 'text-warning' },
          { label: 'Active Wards', value: mockWards.length, icon: Target, color: 'text-info' },
          { label: 'Recycled (kg)', value: mockCitizenCredits.reduce((s, c) => s + c.recyclingKg, 0), icon: Recycle, color: 'text-success' },
        ].map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }}
            className="rounded-lg bg-card border border-border p-4 card-glow"
          >
            <div className="flex items-center gap-2 mb-2">
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
              <span className="text-[10px] text-muted-foreground uppercase tracking-wider">{stat.label}</span>
            </div>
            <p className="text-xl font-bold font-mono text-foreground">{stat.value}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left column: Podium + Leaderboard */}
        <div className="lg:col-span-2 space-y-6">
          {/* Podium */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="rounded-lg bg-card border border-border p-6 card-glow"
          >
            <div className="flex items-center gap-2 mb-6">
              <Trophy className="h-5 w-5 text-warning" />
              <h2 className="text-lg font-semibold text-foreground">Top Citizens</h2>
            </div>
            <div className="flex items-end justify-center gap-4 mb-6">
              {[podium[1], podium[0], podium[2]].map((citizen, i) => {
                const rank = i === 0 ? 2 : i === 1 ? 1 : 3;
                const heights = ['h-24', 'h-32', 'h-20'];
                const emojis = ['🥈', '🥇', '🥉'];
                return (
                  <motion.div
                    key={citizen.citizenId}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + i * 0.1 }}
                    className="flex flex-col items-center"
                  >
                    <div className={`h-12 w-12 rounded-full flex items-center justify-center text-2xl mb-2 border-2 ${rank === 1 ? 'border-warning bg-warning/10' : rank === 2 ? 'border-muted-foreground bg-muted' : 'border-primary bg-primary/10'}`}>
                      {emojis[i]}
                    </div>
                    <div className={`w-20 ${heights[i]} rounded-t-lg flex flex-col items-center justify-end p-2 ${rank === 1 ? 'bg-warning/10 border border-warning/20' : 'bg-muted/50 border border-border/50'}`}>
                      <span className="text-lg font-bold font-mono text-foreground">{citizen.ecoPoints}</span>
                      <span className="text-[9px] text-muted-foreground">pts</span>
                    </div>
                    <span className="text-xs font-semibold text-foreground mt-2 truncate max-w-[80px]">{citizen.name}</span>
                    <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full mt-1 ${badgeColors[citizen.badge]}`}>
                      {citizen.badge.toUpperCase()}
                    </span>
                  </motion.div>
                );
              })}
            </div>

            {/* Full leaderboard */}
            <div className="space-y-2">
              {rest.map((citizen, i) => (
                <motion.div
                  key={citizen.citizenId}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + i * 0.05 }}
                  className="flex items-center gap-3 p-2.5 rounded-md bg-muted/50 border border-border/50 hover:bg-muted transition-colors"
                >
                  <span className="w-6 text-center text-xs font-mono font-bold text-muted-foreground">{i + 4}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-foreground truncate">{citizen.name}</span>
                        <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full ${badgeColors[citizen.badge]}`}>{citizen.badge}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-[10px] text-muted-foreground font-mono flex items-center gap-0.5"><Flame className="h-3 w-3 text-warning" />{citizen.streak}d</span>
                        <span className="text-sm font-bold font-mono text-primary">{citizen.ecoPoints.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Ward Rankings */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="rounded-lg bg-card border border-border p-6 card-glow"
          >
            <div className="flex items-center gap-2 mb-4">
              <Award className="h-5 w-5 text-primary" />
              <h2 className="text-lg font-semibold text-foreground">Ward Rankings</h2>
            </div>
            <div className="space-y-2">
              {sortedWards.map((ward, i) => (
                <motion.div
                  key={ward.id}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.35 + i * 0.04 }}
                  className="flex items-center gap-3 p-3 rounded-md bg-muted/50 border border-border/50"
                >
                  <div className="h-7 w-7 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                    <span className="text-[10px] font-bold font-mono text-foreground">#{i + 1}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-medium text-foreground">{ward.name}</span>
                      <span className="text-sm font-bold font-mono text-foreground">{ward.score}/100</span>
                    </div>
                    <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${ward.score}%` }}
                        transition={{ duration: 0.8, delay: 0.4 + i * 0.05 }}
                        className={`h-full rounded-full ${ward.score >= 80 ? 'bg-success' : ward.score >= 60 ? 'bg-primary' : ward.score >= 40 ? 'bg-warning' : 'bg-destructive'}`}
                      />
                    </div>
                  </div>
                  <TrendingUp className={`h-3.5 w-3.5 flex-shrink-0 ${ward.trend === 'up' ? 'text-success' : ward.trend === 'down' ? 'text-destructive rotate-180' : 'text-muted-foreground'}`} />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Right column */}
        <div className="space-y-6">
          {/* Reward Tiers */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="rounded-lg bg-card border border-border p-5 card-glow"
          >
            <div className="flex items-center gap-2 mb-4">
              <Gift className="h-4 w-4 text-primary" />
              <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Reward Tiers</h3>
            </div>
            <div className="space-y-2">
              {rewardTiers.map((tier, i) => (
                <motion.div
                  key={tier.name}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.25 + i * 0.06 }}
                  className="p-3 rounded-md bg-muted/50 border border-border/50"
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-lg">{tier.emoji}</span>
                    <span className="text-sm font-bold text-foreground">{tier.name}</span>
                    <span className="ml-auto text-[10px] font-mono text-muted-foreground">{tier.minPts}+ pts</span>
                  </div>
                  <p className="text-[10px] text-muted-foreground pl-7">{tier.perks}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Active Challenges */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="rounded-lg bg-card border border-border p-5 card-glow"
          >
            <div className="flex items-center gap-2 mb-4">
              <Zap className="h-4 w-4 text-warning" />
              <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Active Challenges</h3>
            </div>
            <div className="space-y-3">
              {challenges.map((ch, i) => {
                const pct = Math.min(100, (ch.progress / ch.target) * 100);
                const done = ch.progress >= ch.target;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.35 + i * 0.06 }}
                    className={`p-3 rounded-md border ${done ? 'bg-success/5 border-success/30' : 'bg-muted/50 border-border/50'}`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center gap-2">
                        <ch.icon className={`h-3.5 w-3.5 ${done ? 'text-success' : 'text-muted-foreground'}`} />
                        <span className="text-xs font-medium text-foreground">{ch.title}</span>
                      </div>
                      <span className="text-xs font-mono text-primary font-bold">+{ch.reward}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-1.5 rounded-full bg-muted overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${pct}%` }}
                          transition={{ duration: 0.8, delay: 0.4 + i * 0.08 }}
                          className={`h-full rounded-full ${done ? 'bg-success' : 'bg-primary'}`}
                        />
                      </div>
                      <span className="text-[10px] font-mono text-muted-foreground">{ch.progress}/{ch.target}</span>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Milestones */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="rounded-lg bg-card border border-border p-5 card-glow"
          >
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="h-4 w-4 text-primary" />
              <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Milestones</h3>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {milestones.map((m, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.45 + i * 0.05 }}
                  className={`p-2.5 rounded-md text-center border ${m.achieved ? 'bg-primary/5 border-primary/20' : 'bg-muted/30 border-border/50 opacity-50'}`}
                >
                  <span className="text-xl block">{m.icon}</span>
                  <span className="text-[9px] text-foreground font-medium mt-1 block">{m.label}</span>
                  {m.achieved && <span className="text-[8px] text-success font-bold">✓ DONE</span>}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default WardRewards;
