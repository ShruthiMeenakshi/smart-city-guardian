import { motion } from 'framer-motion';
import { recyclingAdvisory } from '@/lib/mockData';
import { Recycle, IndianRupee, Leaf, Users } from 'lucide-react';

export function CircularEconomyPanel() {
  return (
    <div className="rounded-lg bg-card border border-border p-5 card-glow">
      <div className="flex items-center gap-2 mb-4">
        <Recycle className="h-4 w-4 text-secondary" />
        <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Circular Economy Advisory</h3>
      </div>
      <div className="space-y-3">
        {recyclingAdvisory.map((item, i) => (
          <motion.div
            key={item.wasteType}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="p-3 rounded-md bg-muted/50 border border-border hover:border-secondary/30 transition-colors"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-semibold text-foreground">{item.wasteType}</span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-secondary/10 text-secondary font-mono">
                {item.impactReduction} impact ↓
              </span>
            </div>
            <p className="text-xs text-muted-foreground mb-2">{item.method}</p>
            <div className="flex items-center gap-4 text-[10px] text-muted-foreground">
              <span className="flex items-center gap-1">
                <IndianRupee className="h-3 w-3" /> ₹{item.revenuePerKg}/kg
              </span>
              <span className="flex items-center gap-1">
                <Users className="h-3 w-3" /> {item.employment} jobs
              </span>
              <span className="flex items-center gap-1">
                <Leaf className="h-3 w-3" /> {item.localReuse.split(',')[0]}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
