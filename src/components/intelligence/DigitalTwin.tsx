import { motion } from 'framer-motion';
import { mockDigitalTwin } from '@/lib/intelligenceData';
import { Box, Clock, Truck, AlertTriangle } from 'lucide-react';
import { KPICard } from '@/components/KPICard';

const statusStyles = {
  normal: 'border-success/30 bg-success/5',
  warning: 'border-warning/30 bg-warning/5',
  critical: 'border-destructive/30 bg-destructive/5 animate-pulse',
};

const fillColor = (level: number) =>
  level >= 85 ? 'bg-destructive' : level >= 65 ? 'bg-warning' : 'bg-success';

const statusDot = {
  normal: 'bg-success',
  warning: 'bg-warning',
  critical: 'bg-destructive',
};

export function DigitalTwin() {
  const critical = mockDigitalTwin.filter(n => n.status === 'critical').length;
  const avgFill = Math.round(mockDigitalTwin.reduce((s, n) => s + n.fillLevel, 0) / mockDigitalTwin.length);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <KPICard title="Active Bins" value={mockDigitalTwin.length} icon={Box} variant="primary" />
        <KPICard title="Critical Bins" value={critical} icon={AlertTriangle} variant="destructive" />
        <KPICard title="Avg Fill Level" value={avgFill} suffix="%" icon={Truck} variant="warning" />
        <KPICard title="Next Collection" value={1} suffix="h" icon={Clock} variant="info" />
      </div>

      <div className="rounded-lg bg-card border border-border p-5 card-glow">
        <div className="flex items-center gap-2 mb-4">
          <Box className="h-4 w-4 text-primary" />
          <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Digital Twin — Bin Network</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {mockDigitalTwin.map((node, i) => (
            <motion.div
              key={node.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.08 }}
              className={`p-4 rounded-md border ${statusStyles[node.status]} transition-colors`}
            >
              <div className="flex items-center justify-between mb-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className={`h-2 w-2 rounded-full ${statusDot[node.status]}`} />
                    <span className="text-xs font-mono text-muted-foreground">{node.id}</span>
                  </div>
                  <span className="text-sm font-semibold text-foreground ml-4">{node.zone}</span>
                </div>
                <span className={`text-xl font-bold font-mono ${node.fillLevel >= 85 ? 'text-destructive' : node.fillLevel >= 65 ? 'text-warning' : 'text-success'}`}>
                  {node.fillLevel}%
                </span>
              </div>

              {/* Bin visualization */}
              <div className="relative h-6 rounded bg-muted overflow-hidden mb-2">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${node.fillLevel}%` }}
                  transition={{ duration: 1.2, delay: i * 0.1 }}
                  className={`h-full rounded ${fillColor(node.fillLevel)}`}
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-[9px] font-mono font-bold text-foreground/70">
                    {Math.round(node.fillLevel * node.capacity / 100)}L / {node.capacity}L
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between text-[10px] text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Clock className="h-3 w-3" /> Collected: {node.lastCollected}
                </span>
                <span className="flex items-center gap-1">
                  <Truck className="h-3 w-3" /> Next: {node.nextCollection}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
