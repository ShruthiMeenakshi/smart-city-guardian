import { motion } from 'framer-motion';
import { mockCarbonMetrics } from '@/lib/intelligenceData';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { KPICard } from '@/components/KPICard';
import { Leaf, TrendingDown, Zap, Factory } from 'lucide-react';

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload?.length) {
    return (
      <div className="bg-popover border border-border rounded-md p-2 text-xs shadow-lg">
        <p className="text-foreground font-medium">{label}</p>
        {payload.map((p: any, i: number) => (
          <p key={i} style={{ color: p.color }} className="font-mono">{p.name}: {p.value} tCO₂</p>
        ))}
      </div>
    );
  }
  return null;
};

export function CarbonAnalytics() {
  const totalSaved = mockCarbonMetrics.reduce((s, m) => s + m.saved, 0);
  const latestReduction = mockCarbonMetrics[mockCarbonMetrics.length - 1];
  const reductionPct = Math.round((latestReduction.saved / latestReduction.baseline) * 100);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <KPICard title="Total CO₂ Saved" value={totalSaved} suffix=" t" icon={Leaf} variant="secondary" />
        <KPICard title="Current Reduction" value={reductionPct} suffix="%" icon={TrendingDown} variant="primary" />
        <KPICard title="Latest Emissions" value={latestReduction.actual} suffix=" t" icon={Factory} variant="warning" />
        <KPICard title="Green Score" value={87} icon={Zap} variant="info" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-lg bg-card border border-border p-5 card-glow"
        >
          <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-4">
            Emissions: Baseline vs Actual
          </h3>
          <ResponsiveContainer width="100%" height={260}>
            <AreaChart data={mockCarbonMetrics}>
              <defs>
                <linearGradient id="baselineGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(0, 72%, 51%)" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="hsl(0, 72%, 51%)" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="actualGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(160, 84%, 39%)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(160, 84%, 39%)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="month" tick={{ fill: 'hsl(215, 20%, 55%)', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: 'hsl(215, 20%, 55%)', fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="baseline" stroke="hsl(0, 72%, 51%)" fill="url(#baselineGrad)" strokeWidth={2} name="Baseline" strokeDasharray="5 5" />
              <Area type="monotone" dataKey="actual" stroke="hsl(160, 84%, 39%)" fill="url(#actualGrad)" strokeWidth={2} name="Actual" />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="rounded-lg bg-card border border-border p-5 card-glow"
        >
          <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-4">
            Monthly CO₂ Savings
          </h3>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={mockCarbonMetrics}>
              <XAxis dataKey="month" tick={{ fill: 'hsl(215, 20%, 55%)', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: 'hsl(215, 20%, 55%)', fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="saved" fill="hsl(160, 84%, 39%)" radius={[4, 4, 0, 0]} name="Saved" />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      </div>
    </div>
  );
}
