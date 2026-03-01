import { motion } from 'framer-motion';
import { KPICard } from '@/components/KPICard';
import { WardLeaderboard } from '@/components/WardLeaderboard';
import { ReportsFeed } from '@/components/ReportsFeed';
import { mockWards, mockReports } from '@/lib/mockData';
import { Users, Star, Recycle, TrendingUp, FileWarning, CheckCircle } from 'lucide-react';

const myWard = mockWards[0]; // Simulating logged-in citizen's ward
const myReports = mockReports.filter(r => r.ward === myWard.id);

const PublicDashboard = () => {
  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-2xl font-bold text-foreground">My Ward Dashboard</h1>
          <p className="text-sm text-muted-foreground">
            Welcome back — {myWard.name} · Ward {myWard.id}
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs">
          <span className="h-2 w-2 rounded-full bg-success animate-pulse" />
          <span className="text-muted-foreground">Live</span>
        </div>
      </motion.div>

      {/* Public KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <KPICard title="Ward Score" value={myWard.score} suffix="/100" icon={Star} variant="primary" />
        <KPICard title="My Reports" value={myReports.length} icon={FileWarning} variant="info" />
        <KPICard title="Resolved" value={myWard.resolvedReports} icon={CheckCircle} variant="primary" />
        <KPICard title="Participation" value={myWard.participationRate} suffix="%" icon={Users} variant="secondary" />
        <KPICard title="Recycling Rate" value={100 - myWard.recurrenceRate} suffix="%" icon={Recycle} variant="warning" />
        <KPICard title="Ward Rank" value={1} suffix="/8" icon={TrendingUp} variant="info" />
      </div>

      {/* Ward Health & Community */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Ward info card */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="rounded-lg bg-card border border-border p-6"
          >
            <h2 className="text-lg font-semibold text-foreground mb-4">Ward Health Overview</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="space-y-1">
                <span className="text-xs text-muted-foreground uppercase tracking-wider">Population</span>
                <p className="text-xl font-bold font-mono text-foreground">{myWard.population.toLocaleString()}</p>
              </div>
              <div className="space-y-1">
                <span className="text-xs text-muted-foreground uppercase tracking-wider">Total Reports</span>
                <p className="text-xl font-bold font-mono text-foreground">{myWard.totalReports}</p>
              </div>
              <div className="space-y-1">
                <span className="text-xs text-muted-foreground uppercase tracking-wider">Avg Resolution</span>
                <p className="text-xl font-bold font-mono text-foreground">{myWard.avgResolutionTime}h</p>
              </div>
              <div className="space-y-1">
                <span className="text-xs text-muted-foreground uppercase tracking-wider">Recurrence</span>
                <p className="text-xl font-bold font-mono text-foreground">{myWard.recurrenceRate}%</p>
              </div>
            </div>
          </motion.div>

          {/* Tips & Community */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="rounded-lg bg-card border border-border p-6"
          >
            <h2 className="text-lg font-semibold text-foreground mb-4">Eco Tips & Actions</h2>
            <div className="space-y-3">
              {[
                { tip: 'Segregate wet and dry waste daily', points: 10 },
                { tip: 'Report illegal dumping in your area', points: 25 },
                { tip: 'Participate in weekend clean-up drives', points: 50 },
                { tip: 'Compost organic waste at home', points: 30 },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between p-3 rounded-md bg-muted/50 border border-border/50">
                  <span className="text-sm text-foreground">{item.tip}</span>
                  <span className="text-xs font-mono text-primary font-medium">+{item.points} pts</span>
                </div>
              ))}
            </div>
          </motion.div>
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

export default PublicDashboard;
