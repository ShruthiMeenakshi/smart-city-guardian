import { motion } from 'framer-motion';
import { mockWards } from '@/lib/mockData';
import { Trophy, TrendingUp, TrendingDown, Minus } from 'lucide-react';

const trendIcons = {
  up: TrendingUp,
  down: TrendingDown,
  stable: Minus,
};

const rankBadges = ['🥇', '🥈', '🥉'];

export function WardLeaderboard() {
  const sorted = [...mockWards].sort((a, b) => b.score - a.score);

  return (
    <div className="rounded-lg bg-card border border-border p-5 card-glow">
      <div className="flex items-center gap-2 mb-4">
        <Trophy className="h-4 w-4 text-warning" />
        <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Ward Governance Index</h3>
      </div>
      <div className="space-y-2">
        {sorted.map((ward, i) => {
          const TrendIcon = trendIcons[ward.trend];
          const scoreColor = ward.score >= 80 ? 'text-success' : ward.score >= 60 ? 'text-warning' : 'text-destructive';

          return (
            <motion.div
              key={ward.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              className="flex items-center gap-3 p-2.5 rounded-md hover:bg-muted/50 transition-colors"
            >
              <span className="w-6 text-center text-sm">
                {i < 3 ? rankBadges[i] : <span className="text-xs text-muted-foreground font-mono">{i + 1}</span>}
              </span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-foreground">{ward.name}</span>
                  <div className="flex items-center gap-2">
                    <TrendIcon className={`h-3 w-3 ${ward.trend === 'up' ? 'text-success' : ward.trend === 'down' ? 'text-destructive' : 'text-muted-foreground'}`} />
                    <span className={`text-lg font-bold font-mono ${scoreColor}`}>{ward.score}</span>
                  </div>
                </div>
                <div className="mt-1 h-1.5 rounded-full bg-muted overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${ward.score}%` }}
                    transition={{ duration: 1, delay: i * 0.1 }}
                    className={`h-full rounded-full ${ward.score >= 80 ? 'bg-success' : ward.score >= 60 ? 'bg-warning' : 'bg-destructive'}`}
                  />
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
