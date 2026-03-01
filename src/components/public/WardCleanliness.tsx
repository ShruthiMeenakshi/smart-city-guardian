import { motion } from 'framer-motion';
import { mockWards } from '@/lib/mockData';
import { Sparkles, TrendingUp, TrendingDown, Minus, Droplets, Leaf, AlertTriangle, MapPin } from 'lucide-react';

const cleanlinessLevels = [
  { min: 80, label: 'Excellent', color: 'text-success bg-success/10 border-success/30', barColor: 'bg-success' },
  { min: 60, label: 'Good', color: 'text-info bg-info/10 border-info/30', barColor: 'bg-info' },
  { min: 40, label: 'Average', color: 'text-warning bg-warning/10 border-warning/30', barColor: 'bg-warning' },
  { min: 0, label: 'Poor', color: 'text-destructive bg-destructive/10 border-destructive/30', barColor: 'bg-destructive' },
];

function getLevel(score: number) {
  return cleanlinessLevels.find(l => score >= l.min)!;
}

const trendIcon = { up: TrendingUp, down: TrendingDown, stable: Minus };
const trendColor = { up: 'text-success', down: 'text-destructive', stable: 'text-muted-foreground' };

// Zone-level breakdown for the citizen's ward (simulated)
const zoneBreakdown = [
  { zone: 'Residential Zone A', score: 88, bins: 24, lastCleaned: '2h ago' },
  { zone: 'Market Area', score: 62, bins: 18, lastCleaned: '5h ago' },
  { zone: 'Temple Surroundings', score: 95, bins: 12, lastCleaned: '1h ago' },
  { zone: 'Bus Stand Area', score: 48, bins: 8, lastCleaned: '8h ago' },
  { zone: 'Residential Zone B', score: 78, bins: 20, lastCleaned: '3h ago' },
];

const sortedWards = [...mockWards].sort((a, b) => b.score - a.score);

export function WardCleanliness() {
  const cityAvg = Math.round(mockWards.reduce((s, w) => s + w.score, 0) / mockWards.length);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* City-wide ward ranking */}
        <div className="lg:col-span-2 rounded-lg bg-card border border-border p-5 card-glow">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-primary" />
              <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Ward Cleanliness Rankings</h3>
            </div>
            <div className="text-right">
              <span className="text-[10px] text-muted-foreground uppercase tracking-wider">City Avg</span>
              <p className="text-lg font-bold font-mono text-primary">{cityAvg}<span className="text-xs text-muted-foreground">/100</span></p>
            </div>
          </div>
          <div className="space-y-2">
            {sortedWards.map((ward, i) => {
              const level = getLevel(ward.score);
              const TIcon = trendIcon[ward.trend];
              return (
                <motion.div
                  key={ward.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="flex items-center gap-3 p-3 rounded-md bg-muted/50 border border-border/50"
                >
                  <div className="h-6 w-6 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                    <span className="text-[10px] font-bold font-mono text-foreground">#{i + 1}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-medium text-foreground truncate">{ward.name}</span>
                      <div className="flex items-center gap-2">
                        <TIcon className={`h-3 w-3 ${trendColor[ward.trend]}`} />
                        <span className="text-sm font-bold font-mono text-foreground">{ward.score}</span>
                      </div>
                    </div>
                    <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${ward.score}%` }}
                        transition={{ duration: 0.8, delay: i * 0.06 }}
                        className={`h-full rounded-full ${level.barColor}`}
                      />
                    </div>
                    <div className="flex items-center justify-between mt-1">
                      <span className={`text-[9px] uppercase tracking-wider font-medium px-1.5 py-0.5 rounded-full border ${level.color}`}>
                        {level.label}
                      </span>
                      <span className="text-[9px] text-muted-foreground">Avg resolution: {ward.avgResolutionTime}h</span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Key metrics */}
        <div className="space-y-4">
          <div className="rounded-lg bg-card border border-border p-5 card-glow">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-4">Cleanliness Indicators</h3>
            <div className="space-y-4">
              {[
                { label: 'Bin Overflow Rate', value: '12%', icon: AlertTriangle, color: 'text-warning', desc: '↓ 3% vs last week' },
                { label: 'Green Cover Index', value: '67%', icon: Leaf, color: 'text-success', desc: '↑ 2% this month' },
                { label: 'Drain Cleanliness', value: '74/100', icon: Droplets, color: 'text-info', desc: 'Last checked 4h ago' },
                { label: 'Street Cleanliness', value: '81/100', icon: MapPin, color: 'text-primary', desc: 'Daily sweep completed' },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                  className="flex items-start gap-3 p-3 rounded-md bg-muted/50 border border-border/50"
                >
                  <div className={`h-8 w-8 rounded-lg bg-muted flex items-center justify-center flex-shrink-0`}>
                    <item.icon className={`h-4 w-4 ${item.color}`} />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-foreground">{item.label}</p>
                    <p className="text-lg font-bold font-mono text-foreground leading-tight">{item.value}</p>
                    <p className="text-[9px] text-muted-foreground">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Zone-level breakdown */}
      <div className="rounded-lg bg-card border border-border p-5 card-glow">
        <div className="flex items-center gap-2 mb-4">
          <MapPin className="h-4 w-4 text-primary" />
          <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Your Ward — Zone Breakdown</h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {zoneBreakdown.map((zone, i) => {
            const level = getLevel(zone.score);
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.06 }}
                className="p-4 rounded-md bg-muted/50 border border-border/50 text-center"
              >
                <div className={`h-12 w-12 rounded-full mx-auto mb-2 flex items-center justify-center border-2 ${level.color}`}>
                  <span className="text-sm font-bold font-mono">{zone.score}</span>
                </div>
                <p className="text-xs font-medium text-foreground mb-0.5">{zone.zone}</p>
                <p className="text-[9px] text-muted-foreground">{zone.bins} bins · Cleaned {zone.lastCleaned}</p>
                <span className={`inline-block mt-1 text-[9px] uppercase tracking-wider font-medium px-1.5 py-0.5 rounded-full border ${level.color}`}>
                  {level.label}
                </span>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
