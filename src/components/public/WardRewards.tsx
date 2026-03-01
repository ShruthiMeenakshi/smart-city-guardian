import { motion } from 'framer-motion';
import { mockCitizenCredits, badgeColors } from '@/lib/intelligenceData';
import { mockWards } from '@/lib/mockData';
import {
  Trophy,
  Medal,
  Flame,
  Gift,
  Star,
  TrendingUp,
  Recycle,
  FileWarning,
  Crown,
  Target,
} from 'lucide-react';

const badgeIcons: Record<string, React.ReactNode> = {
  bronze: <Medal className="h-4 w-4" />,
  silver: <Medal className="h-4 w-4" />,
  gold: <Crown className="h-4 w-4" />,
  platinum: <Crown className="h-4 w-4" />,
};

const rewardTiers = [
  { name: 'Bronze', minPts: 0, maxPts: 1500, perks: 'Ward clean-up badge', color: 'text-amber-600 dark:text-amber-400' },
  { name: 'Silver', minPts: 1500, maxPts: 3000, perks: '₹50 eco-voucher', color: 'text-slate-500 dark:text-slate-300' },
  { name: 'Gold', minPts: 3000, maxPts: 4500, perks: '₹150 voucher + Tree planting', color: 'text-yellow-600 dark:text-yellow-400' },
  { name: 'Platinum', minPts: 4500, maxPts: 6000, perks: '₹300 voucher + City recognition', color: 'text-primary' },
];

// Simulated current user
const currentUser = mockCitizenCredits[4]; // Meena — silver tier

const challenges = [
  { title: 'Report 5 waste issues this week', progress: 3, target: 5, reward: 50, icon: FileWarning },
  { title: 'Recycle 10 kg this month', progress: 7, target: 10, reward: 80, icon: Recycle },
  { title: 'Maintain 7-day streak', progress: currentUser.streak, target: 7, reward: 100, icon: Flame },
  { title: 'Classify 3 images with AI', progress: 1, target: 3, reward: 40, icon: Target },
];

export function WardRewards() {
  const myWard = mockWards[0];
  const wardCitizens = mockCitizenCredits.filter(c => c.ward === myWard.id || true).slice(0, 6);
  const currentTier = rewardTiers.find(t => currentUser.ecoPoints >= t.minPts && currentUser.ecoPoints < t.maxPts) || rewardTiers[rewardTiers.length - 1];
  const nextTier = rewardTiers[rewardTiers.indexOf(currentTier) + 1];
  const progressToNext = nextTier
    ? ((currentUser.ecoPoints - currentTier.minPts) / (nextTier.minPts - currentTier.minPts)) * 100
    : 100;

  return (
    <div className="space-y-4">
      {/* Your rewards card */}
      <div className="rounded-lg bg-card border border-border p-5 card-glow">
        <div className="flex items-center gap-2 mb-4">
          <Gift className="h-4 w-4 text-primary" />
          <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">My Eco Rewards</h3>
        </div>

        {/* User badge & points */}
        <div className="flex items-center gap-4 mb-4">
          <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center border-2 border-primary/30">
            <span className="text-2xl">🌱</span>
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <span className="text-base font-bold text-foreground">{currentUser.name}</span>
              <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold ${badgeColors[currentUser.badge]}`}>
                {badgeIcons[currentUser.badge]}
                {currentUser.badge.toUpperCase()}
              </span>
            </div>
            <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
              <span className="font-mono"><Star className="h-3 w-3 inline mr-0.5 text-primary" />{currentUser.ecoPoints} pts</span>
              <span className="font-mono"><Flame className="h-3 w-3 inline mr-0.5 text-warning" />{currentUser.streak}-day streak</span>
              <span className="font-mono"><Recycle className="h-3 w-3 inline mr-0.5 text-success" />{currentUser.recyclingKg} kg</span>
            </div>
          </div>
        </div>

        {/* Progress to next tier */}
        {nextTier && (
          <div className="rounded-md bg-muted/50 border border-border/50 p-3 mb-4">
            <div className="flex items-center justify-between text-xs mb-1.5">
              <span className={`font-bold ${currentTier.color}`}>{currentTier.name}</span>
              <span className="text-muted-foreground font-mono">{currentUser.ecoPoints} / {nextTier.minPts}</span>
              <span className={`font-bold ${nextTier.color}`}>{nextTier.name}</span>
            </div>
            <div className="h-2 rounded-full bg-muted overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progressToNext}%` }}
                transition={{ duration: 1.2 }}
                className="h-full rounded-full bg-gradient-to-r from-primary/80 to-primary"
              />
            </div>
            <p className="text-[10px] text-muted-foreground mt-1.5">
              Earn <span className="font-bold text-primary">{nextTier.minPts - currentUser.ecoPoints} more pts</span> to unlock: {nextTier.perks}
            </p>
          </div>
        )}

        {/* Reward tiers */}
        <div className="grid grid-cols-4 gap-2">
          {rewardTiers.map((tier, i) => {
            const active = currentTier.name === tier.name;
            const unlocked = currentUser.ecoPoints >= tier.minPts;
            return (
              <motion.div
                key={tier.name}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                className={`rounded-md border p-2 text-center ${
                  active
                    ? 'border-primary bg-primary/5'
                    : unlocked
                    ? 'border-border bg-muted/30'
                    : 'border-border/50 bg-muted/10 opacity-50'
                }`}
              >
                <span className={`text-xs font-bold ${tier.color}`}>{tier.name}</span>
                <p className="text-[9px] text-muted-foreground mt-0.5">{tier.perks}</p>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Active challenges */}
      <div className="rounded-lg bg-card border border-border p-5 card-glow">
        <div className="flex items-center gap-2 mb-4">
          <Target className="h-4 w-4 text-warning" />
          <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Active Challenges</h3>
        </div>
        <div className="space-y-3">
          {challenges.map((ch, i) => {
            const pct = Math.min(100, (ch.progress / ch.target) * 100);
            const done = ch.progress >= ch.target;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.08 }}
                className={`p-3 rounded-md border ${done ? 'bg-success/5 border-success/30' : 'bg-muted/50 border-border/50'}`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <ch.icon className={`h-3.5 w-3.5 ${done ? 'text-success' : 'text-muted-foreground'}`} />
                    <span className="text-xs font-medium text-foreground">{ch.title}</span>
                  </div>
                  <span className="text-xs font-mono text-primary font-bold">+{ch.reward} pts</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-1.5 rounded-full bg-muted overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${pct}%` }}
                      transition={{ duration: 0.8, delay: i * 0.1 }}
                      className={`h-full rounded-full ${done ? 'bg-success' : 'bg-primary'}`}
                    />
                  </div>
                  <span className="text-[10px] font-mono text-muted-foreground">{ch.progress}/{ch.target}</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Ward leaderboard (mini) */}
      <div className="rounded-lg bg-card border border-border p-5 card-glow">
        <div className="flex items-center gap-2 mb-4">
          <Trophy className="h-4 w-4 text-warning" />
          <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Citizen Leaderboard</h3>
        </div>
        <div className="space-y-2">
          {wardCitizens.map((c, i) => (
            <motion.div
              key={c.citizenId}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.06 }}
              className={`flex items-center gap-3 p-2.5 rounded-md transition-colors ${
                c.citizenId === currentUser.citizenId ? 'bg-primary/5 border border-primary/20' : 'hover:bg-muted/50'
              }`}
            >
              <span className="w-5 text-center text-sm">
                {i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : <span className="text-xs text-muted-foreground font-mono">{i + 1}</span>}
              </span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="text-sm font-medium text-foreground truncate">{c.name}</span>
                    <span className={`inline-flex items-center px-1.5 py-0.5 rounded text-[9px] font-bold ${badgeColors[c.badge]}`}>
                      {c.badge}
                    </span>
                  </div>
                  <span className="text-sm font-bold font-mono text-primary">{c.ecoPoints.toLocaleString()}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
