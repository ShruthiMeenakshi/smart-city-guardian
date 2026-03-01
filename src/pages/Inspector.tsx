import { motion } from 'framer-motion';
import { KPICard } from '@/components/KPICard';
import { ReportsFeed } from '@/components/ReportsFeed';
import { MapPlaceholder } from '@/components/MapPlaceholder';
import { mockReports, severityLabels } from '@/lib/mockData';
import { FileWarning, Map, Shield, AlertTriangle, Clock, CheckCircle, Navigation } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

const assignedReports = mockReports.filter(r => r.status === 'assigned' || r.status === 'pending');
const highSeverity = mockReports.filter(r => r.severity >= 4);

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
          <p className="text-sm text-muted-foreground">Field inspection queue, routes & high-priority alerts</p>
        </div>
        <div className="flex items-center gap-2 text-xs">
          <span className="h-2 w-2 rounded-full bg-warning animate-pulse" />
          <span className="text-muted-foreground font-mono">{assignedReports.length} pending assignments</span>
        </div>
      </motion.div>

      {/* Inspector KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <KPICard title="Assigned To Me" value={assignedReports.length} icon={FileWarning} variant="primary" />
        <KPICard title="High Severity" value={highSeverity.length} icon={AlertTriangle} variant="destructive" />
        <KPICard title="Avg Response" value={2.6} suffix="h" icon={Clock} variant="warning" decimals={1} />
        <KPICard title="Resolved Today" value={5} icon={CheckCircle} variant="info" />
        <KPICard title="Route Stops" value={assignedReports.length} icon={Navigation} variant="secondary" />
        <KPICard title="Compliance" value={87} suffix="%" icon={Shield} variant="primary" />
      </div>

      {/* Main content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <MapPlaceholder />

          {/* Priority Queue */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="rounded-lg bg-card border border-border p-6"
          >
            <h2 className="text-lg font-semibold text-foreground mb-4">Priority Inspection Queue</h2>
            <div className="space-y-3">
              {assignedReports
                .sort((a, b) => b.severity - a.severity)
                .map((report, i) => (
                  <motion.div
                    key={report.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="flex items-center justify-between p-3 rounded-md bg-muted/50 border border-border/50"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`h-3 w-3 rounded-full ${
                        report.severity >= 4 ? 'bg-destructive animate-pulse' : report.severity >= 3 ? 'bg-warning' : 'bg-info'
                      }`} />
                      <div>
                        <span className="text-sm font-medium text-foreground">{report.location}</span>
                        <p className="text-xs text-muted-foreground">
                          {report.id} · Ward {report.ward} · {severityLabels[report.severity]}
                          {report.illegalDumping && (
                            <span className="ml-2 text-destructive font-semibold">⚠ ILLEGAL</span>
                          )}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-xs text-muted-foreground">
                        {formatDistanceToNow(report.timestamp, { addSuffix: true })}
                      </span>
                      <div className="mt-1">
                        <span className={`text-[10px] uppercase tracking-wider font-medium px-2 py-0.5 rounded-full ${
                          report.status === 'pending' ? 'bg-warning/10 text-warning' : 'bg-info/10 text-info'
                        }`}>
                          {report.status}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
            </div>
          </motion.div>
        </div>

        <div className="space-y-6">
          <ReportsFeed />

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="rounded-lg bg-card border border-border p-6"
          >
            <h2 className="text-lg font-semibold text-foreground mb-4">Quick Actions</h2>
            <div className="space-y-2">
              {[
                { label: 'Start Route Navigation', icon: Navigation, color: 'text-primary' },
                { label: 'Log Field Inspection', icon: FileWarning, color: 'text-warning' },
                { label: 'Flag Illegal Dumping', icon: AlertTriangle, color: 'text-destructive' },
                { label: 'Mark Resolved', icon: CheckCircle, color: 'text-success' },
              ].map((action, i) => (
                <button
                  key={i}
                  className="w-full flex items-center gap-3 p-3 rounded-md bg-muted/50 border border-border/50 hover:bg-muted transition-colors text-left"
                >
                  <action.icon className={`h-4 w-4 ${action.color}`} />
                  <span className="text-sm text-foreground">{action.label}</span>
                </button>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Inspector;

