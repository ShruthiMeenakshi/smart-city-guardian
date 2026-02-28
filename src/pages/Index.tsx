import { motion } from 'framer-motion';
import { KPICard } from '@/components/KPICard';
import { ReportsFeed } from '@/components/ReportsFeed';
import { WardLeaderboard } from '@/components/WardLeaderboard';
import { WeeklyTrendChart, WasteDistributionChart } from '@/components/Charts';
import { PredictionPanel } from '@/components/PredictionPanel';
import { MapPlaceholder } from '@/components/MapPlaceholder';
import {
  FileWarning,
  AlertTriangle,
  Clock,
  Zap,
  Fuel,
  IndianRupee,
} from 'lucide-react';

const Index = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-2xl font-bold text-foreground">Command Center</h1>
          <p className="text-sm text-muted-foreground">Real-time urban waste intelligence — Madurai Corporation</p>
        </div>
        <div className="flex items-center gap-2 text-xs">
          <span className="h-2 w-2 rounded-full bg-success animate-pulse-glow" />
          <span className="text-muted-foreground font-mono">System Online · {new Date().toLocaleDateString()}</span>
        </div>
      </motion.div>

      {/* KPI Row */}
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <KPICard title="Total Reports" value={347} icon={FileWarning} trend={{ value: 12, positive: false }} variant="primary" />
        <KPICard title="Active Hotspots" value={14} icon={AlertTriangle} variant="destructive" />
        <KPICard title="Avg Resolution" value={4.2} suffix="h" icon={Clock} trend={{ value: 8, positive: true }} decimals={1} variant="warning" />
        <KPICard title="Overflow Alerts" value={4} icon={Zap} variant="info" />
        <KPICard title="Fuel Saved" value={23} suffix="%" icon={Fuel} trend={{ value: 5, positive: true }} variant="secondary" />
        <KPICard title="Recycling Rev." value={4.2} prefix="₹" suffix="L" icon={IndianRupee} decimals={1} variant="secondary" />
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <MapPlaceholder />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <WeeklyTrendChart />
            <WasteDistributionChart />
          </div>
        </div>
        <div className="space-y-6">
          <ReportsFeed />
          <PredictionPanel />
        </div>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <WardLeaderboard />
      </div>
    </div>
  );
};

export default Index;
