import { motion } from 'framer-motion';
import { mockHotspots } from '@/lib/intelligenceData';
import { Flame, TrendingUp, TrendingDown, Minus, MapPin, Calendar } from 'lucide-react';
import { KPICard } from '@/components/KPICard';
import { AlertTriangle, Zap } from 'lucide-react';

const trendIcon = { rising: TrendingUp, falling: TrendingDown, stable: Minus };
const trendColor = { rising: 'text-destructive', falling: 'text-success', stable: 'text-muted-foreground' };

export function PredictiveHotspots() {
  const critical = mockHotspots.filter(h => h.riskScore >= 80).length;
  const avgRisk = Math.round(mockHotspots.reduce((s, h) => s + h.riskScore, 0) / mockHotspots.length);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <KPICard title="Total Hotspots" value={mockHotspots.length} icon={Flame} variant="warning" />
        <KPICard title="Critical (80+)" value={critical} icon={AlertTriangle} variant="destructive" />
        <KPICard title="Avg Risk Score" value={avgRisk} icon={Zap} variant="primary" />
        <KPICard title="Rising Trends" value={mockHotspots.filter(h => h.trend === 'rising').length} icon={TrendingUp} variant="info" />
      </div>

      <div className="rounded-lg bg-card border border-border p-5 card-glow">
        <div className="flex items-center gap-2 mb-4">
          <Flame className="h-4 w-4 text-warning" />
          <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">AI-Predicted Hotspots</h3>
        </div>
        <div className="space-y-3">
          {mockHotspots.map((spot, i) => {
            const TIcon = trendIcon[spot.trend];
            return (
              <motion.div
                key={spot.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.08 }}
                className="p-4 rounded-md bg-muted/50 border border-border hover:border-warning/30 transition-colors"
              >
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-3.5 w-3.5 text-muted-foreground" />
                      <span className="text-sm font-semibold text-foreground">{spot.location}</span>
                    </div>
                    <span className="text-[10px] text-muted-foreground font-mono ml-5.5">Ward {spot.wardId} · {spot.wasteType}</span>
                  </div>
                  <div className="text-right">
                    <span className={`text-lg font-bold font-mono ${spot.riskScore >= 80 ? 'text-destructive' : spot.riskScore >= 60 ? 'text-warning' : 'text-success'}`}>
                      {spot.riskScore}
                    </span>
                    <div className={`flex items-center gap-1 text-[10px] ${trendColor[spot.trend]}`}>
                      <TIcon className="h-3 w-3" />
                      <span className="capitalize">{spot.trend}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex-1 mr-4">
                    <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${spot.riskScore}%` }}
                        transition={{ duration: 1, delay: i * 0.1 }}
                        className={`h-full rounded-full ${spot.riskScore >= 80 ? 'bg-destructive' : spot.riskScore >= 60 ? 'bg-warning' : 'bg-success'}`}
                      />
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
                    <Calendar className="h-3 w-3" />
                    <span className="font-mono">{spot.predictedDate}</span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
