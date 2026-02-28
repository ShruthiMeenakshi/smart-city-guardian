import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, AreaChart, Area } from 'recharts';
import { weeklyTrend, wasteDistribution } from '@/lib/mockData';

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload?.length) {
    return (
      <div className="bg-popover border border-border rounded-md p-2 text-xs shadow-lg">
        <p className="text-foreground font-medium">{label}</p>
        {payload.map((p: any, i: number) => (
          <p key={i} style={{ color: p.color }} className="font-mono">{p.name}: {p.value}</p>
        ))}
      </div>
    );
  }
  return null;
};

export function WeeklyTrendChart() {
  return (
    <div className="rounded-lg bg-card border border-border p-5 card-glow">
      <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-4">Weekly Report Trend</h3>
      <ResponsiveContainer width="100%" height={220}>
        <AreaChart data={weeklyTrend}>
          <defs>
            <linearGradient id="reportGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="hsl(187, 94%, 43%)" stopOpacity={0.3} />
              <stop offset="95%" stopColor="hsl(187, 94%, 43%)" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="resolvedGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="hsl(160, 84%, 39%)" stopOpacity={0.3} />
              <stop offset="95%" stopColor="hsl(160, 84%, 39%)" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="day" tick={{ fill: 'hsl(215, 20%, 55%)', fontSize: 11 }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fill: 'hsl(215, 20%, 55%)', fontSize: 11 }} axisLine={false} tickLine={false} />
          <Tooltip content={<CustomTooltip />} />
          <Area type="monotone" dataKey="reports" stroke="hsl(187, 94%, 43%)" fill="url(#reportGrad)" strokeWidth={2} name="Reports" />
          <Area type="monotone" dataKey="resolved" stroke="hsl(160, 84%, 39%)" fill="url(#resolvedGrad)" strokeWidth={2} name="Resolved" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export function WasteDistributionChart() {
  return (
    <div className="rounded-lg bg-card border border-border p-5 card-glow">
      <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-4">Waste Distribution</h3>
      <ResponsiveContainer width="100%" height={220}>
        <PieChart>
          <Pie data={wasteDistribution} cx="50%" cy="50%" innerRadius={55} outerRadius={85} paddingAngle={3} dataKey="value" nameKey="type">
            {wasteDistribution.map((entry, i) => (
              <Cell key={i} fill={entry.color} stroke="transparent" />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
        </PieChart>
      </ResponsiveContainer>
      <div className="flex flex-wrap gap-3 mt-2 justify-center">
        {wasteDistribution.map((w) => (
          <div key={w.type} className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full" style={{ backgroundColor: w.color }} />
            <span className="text-[10px] text-muted-foreground">{w.type}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
