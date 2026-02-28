import { motion } from 'framer-motion';
import { mockPredictions } from '@/lib/mockData';
import { AlertTriangle, Clock, Zap } from 'lucide-react';

export function PredictionPanel() {
  const sorted = [...mockPredictions].sort((a, b) => b.overflowProbability - a.overflowProbability);

  return (
    <div className="rounded-lg bg-card border border-border p-5 card-glow">
      <div className="flex items-center gap-2 mb-4">
        <Zap className="h-4 w-4 text-warning" />
        <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Overflow Predictions</h3>
      </div>
      <div className="space-y-3">
        {sorted.map((pred, i) => (
          <motion.div
            key={pred.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: i * 0.1 }}
            className="p-3 rounded-md bg-muted/50 border border-border"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-foreground">{pred.location}</span>
              <span className="text-xs font-mono text-muted-foreground">Ward {pred.wardId}</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <div className="flex justify-between text-[10px] text-muted-foreground mb-1">
                  <span>Overflow Probability</span>
                  <span className={`font-mono font-bold ${pred.overflowProbability >= 80 ? 'text-destructive' : pred.overflowProbability >= 60 ? 'text-warning' : 'text-success'}`}>
                    {pred.overflowProbability}%
                  </span>
                </div>
                <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${pred.overflowProbability}%` }}
                    transition={{ duration: 1.2, delay: i * 0.15 }}
                    className={`h-full rounded-full ${pred.overflowProbability >= 80 ? 'bg-destructive' : pred.overflowProbability >= 60 ? 'bg-warning' : 'bg-success'}`}
                  />
                </div>
              </div>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Clock className="h-3 w-3" />
                <span className="font-mono">{pred.estimatedTimeToOverflow}h</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
