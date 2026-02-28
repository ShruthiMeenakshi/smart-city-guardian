import { motion } from 'framer-motion';
import { KPICard } from '@/components/KPICard';
import { ReportsFeed } from '@/components/ReportsFeed';
import { WardLeaderboard } from '@/components/WardLeaderboard';
import { WeeklyTrendChart, WasteDistributionChart } from '@/components/Charts';
import { MapPlaceholder } from '@/components/MapPlaceholder';
import { FileWarning, Map, Shield, AlertTriangle } from 'lucide-react';

const Inspector = () => {
  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-2xl font-bold text-foreground">Inspector Panel</h1>
          <p className="text-sm text-muted-foreground">Field inspection tools and active reports</p>
        </div>
      </motion.div>

      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <KPICard title="Assigned Reports" value={42} icon={FileWarning} variant="primary" />
        <KPICard title="Nearby Hotspots" value={7} icon={AlertTriangle} variant="destructive" />
        <KPICard title="Avg Response" value={2.6} suffix="h" icon={Map} variant="warning" />
        <KPICard title="Resolved Today" value={5} icon={Shield} variant="info" />
      </div>

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
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <WardLeaderboard />
      </div>
    </div>
  );
};

export default Inspector;
