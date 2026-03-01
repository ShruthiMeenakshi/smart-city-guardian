import { motion } from 'framer-motion';
import { mockRecyclingStreams } from '@/lib/intelligenceData';
import { IndianRupee, TrendingUp, TrendingDown, Package, Users } from 'lucide-react';
import { KPICard } from '@/components/KPICard';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload?.length) {
    return (
      <div className="bg-popover border border-border rounded-md p-2 text-xs shadow-lg">
        <p className="text-foreground font-medium">{label}</p>
        {payload.map((p: any, i: number) => (
          <p key={i} style={{ color: p.color }} className="font-mono">{p.name}: ₹{p.value.toLocaleString()}</p>
        ))}
      </div>
    );
  }
  return null;
};

export function RecyclingRevenue() {
  const totalRevenue = mockRecyclingStreams.reduce((s, r) => s + r.totalRevenue, 0);
  const totalVolume = mockRecyclingStreams.reduce((s, r) => s + r.volumeKg, 0);
  const totalBuyers = mockRecyclingStreams.reduce((s, r) => s + r.buyers, 0);

  const chartData = mockRecyclingStreams.map(s => ({
    name: s.wasteType.split(' ')[0],
    revenue: s.totalRevenue,
  }));

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <KPICard title="Total Revenue" value={Math.round(totalRevenue / 1000)} prefix="₹" suffix="K" icon={IndianRupee} variant="secondary" />
        <KPICard title="Volume Processed" value={Math.round(totalVolume / 1000)} suffix="T" icon={Package} variant="primary" />
        <KPICard title="Active Buyers" value={totalBuyers} icon={Users} variant="info" />
        <KPICard title="Avg ₹/kg" value={Math.round(totalRevenue / totalVolume)} prefix="₹" icon={IndianRupee} variant="warning" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-lg bg-card border border-border p-5 card-glow"
        >
          <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-4">Revenue by Stream</h3>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={chartData} layout="vertical">
              <XAxis type="number" tick={{ fill: 'hsl(215, 20%, 55%)', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis dataKey="name" type="category" tick={{ fill: 'hsl(215, 20%, 55%)', fontSize: 10 }} axisLine={false} tickLine={false} width={70} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="revenue" fill="hsl(187, 94%, 43%)" radius={[0, 4, 4, 0]} name="Revenue" />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        <div className="rounded-lg bg-card border border-border p-5 card-glow">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-4">Revenue Streams Detail</h3>
          <div className="space-y-3">
            {mockRecyclingStreams.map((stream, i) => (
              <motion.div
                key={stream.wasteType}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.08 }}
                className="p-3 rounded-md bg-muted/50 border border-border"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-semibold text-foreground">{stream.wasteType}</span>
                  <span className="text-sm font-bold font-mono text-primary">₹{stream.totalRevenue.toLocaleString()}</span>
                </div>
                <div className="flex items-center gap-4 text-[10px] text-muted-foreground">
                  <span>{stream.volumeKg.toLocaleString()} kg</span>
                  <span>₹{stream.revenuePerKg}/kg</span>
                  <span>{stream.buyers} buyers</span>
                  <span className={`flex items-center gap-0.5 font-mono ${stream.trend >= 0 ? 'text-success' : 'text-destructive'}`}>
                    {stream.trend >= 0 ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                    {stream.trend >= 0 ? '+' : ''}{stream.trend}%
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
