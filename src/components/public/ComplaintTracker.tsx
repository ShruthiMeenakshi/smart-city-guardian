import { motion } from 'framer-motion';
import { severityLabels } from '@/lib/mockData';
import { Clock, CheckCircle, Truck, AlertTriangle, Search, Filter } from 'lucide-react';
import { useState } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { useReports } from '@/contexts/ReportsContext';

const statusSteps = ['pending', 'assigned', 'in-progress', 'resolved'] as const;
const statusLabels: Record<string, string> = {
  pending: 'Pending Review',
  assigned: 'Assigned to Inspector',
  'in-progress': 'Work In Progress',
  resolved: 'Resolved',
};
const statusIcons: Record<string, typeof Clock> = {
  pending: Clock,
  assigned: AlertTriangle,
  'in-progress': Truck,
  resolved: CheckCircle,
};
const statusColor: Record<string, string> = {
  pending: 'text-warning bg-warning/10 border-warning/30',
  assigned: 'text-info bg-info/10 border-info/30',
  'in-progress': 'text-primary bg-primary/10 border-primary/30',
  resolved: 'text-success bg-success/10 border-success/30',
};

export function ComplaintTracker() {
  const { reports } = useReports();
  const [filter, setFilter] = useState<string>('all');
  const [search, setSearch] = useState('');

  const citizenReports = [...reports].sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());

  const filtered = citizenReports.filter(r => {
    if (filter !== 'all' && r.status !== filter) return false;
    if (search && !r.location.toLowerCase().includes(search.toLowerCase()) && !r.id.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="rounded-lg bg-card border border-border p-4 card-glow">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by location or ID..."
              className="w-full bg-input text-foreground text-xs rounded-md pl-9 pr-3 py-2 border border-border outline-none focus:ring-1 focus:ring-ring placeholder:text-muted-foreground"
            />
          </div>
          <div className="flex items-center gap-1.5">
            <Filter className="h-3.5 w-3.5 text-muted-foreground" />
            {['all', ...statusSteps].map(s => (
              <button
                key={s}
                onClick={() => setFilter(s)}
                className={`px-2.5 py-1 rounded-full text-[10px] font-medium transition-all ${
                  filter === s
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground hover:bg-muted/80'
                }`}
              >
                {s === 'all' ? 'All' : statusLabels[s].split(' ')[0]}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Complaints list with status timeline */}
      {filtered.length === 0 ? (
        <div className="rounded-lg bg-card border border-border p-8 text-center card-glow">
          <Search className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
          <p className="text-sm text-muted-foreground">No complaints match your filter.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((report, idx) => {
            const currentStepIdx = statusSteps.indexOf(report.status);
            const Icon = statusIcons[report.status];
            return (
              <motion.div
                key={report.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.06 }}
                className="rounded-lg bg-card border border-border p-5 card-glow"
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold font-mono text-foreground">{report.id}</span>
                      <span className={`inline-flex items-center gap-1 text-[10px] uppercase tracking-wider font-medium px-2 py-0.5 rounded-full border ${statusColor[report.status]}`}>
                        <Icon className="h-3 w-3" />
                        {report.status}
                      </span>
                      {report.illegalDumping && (
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-destructive/10 border border-destructive/30 text-destructive font-bold">ILLEGAL</span>
                      )}
                    </div>
                    <p className="text-sm font-medium text-foreground mt-1">{report.location}</p>
                    <p className="text-[10px] text-muted-foreground">
                      Ward {report.ward} · {report.wasteType} · Severity {report.severity} ({severityLabels[report.severity]})
                    </p>
                  </div>
                  <span className="text-[10px] text-muted-foreground font-mono">
                    {formatDistanceToNow(report.timestamp, { addSuffix: true })}
                  </span>
                </div>

                {/* Description */}
                <p className="text-xs text-muted-foreground mb-4 pl-0.5">{report.description}</p>

                {/* Status Timeline */}
                <div className="flex items-center gap-0">
                  {statusSteps.map((step, i) => {
                    const reached = i <= currentStepIdx;
                    const isCurrent = i === currentStepIdx;
                    const StepIcon = statusIcons[step];
                    return (
                      <div key={step} className="flex items-center flex-1 last:flex-none">
                        <div className="flex flex-col items-center">
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: idx * 0.06 + i * 0.1 }}
                            className={`h-7 w-7 rounded-full flex items-center justify-center border-2 transition-all ${
                              isCurrent
                                ? 'border-primary bg-primary/10 ring-2 ring-primary/20'
                                : reached
                                  ? 'border-success bg-success/10'
                                  : 'border-border bg-muted/50'
                            }`}
                          >
                            <StepIcon className={`h-3 w-3 ${isCurrent ? 'text-primary' : reached ? 'text-success' : 'text-muted-foreground'}`} />
                          </motion.div>
                          <span className={`text-[9px] mt-1 leading-tight text-center ${
                            isCurrent ? 'text-primary font-bold' : reached ? 'text-success' : 'text-muted-foreground'
                          }`}>
                            {statusLabels[step].split(' ')[0]}
                          </span>
                        </div>
                        {i < statusSteps.length - 1 && (
                          <div className={`flex-1 h-0.5 mx-1 rounded-full ${
                            i < currentStepIdx ? 'bg-success' : 'bg-border'
                          }`} />
                        )}
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            );
          })}
        </div>
      )}

      {/* Summary */}
      <div className="rounded-lg bg-card border border-border p-4 card-glow">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {statusSteps.map(s => {
            const count = citizenReports.filter(r => r.status === s).length;
            const Icon = statusIcons[s];
            return (
              <div key={s} className="text-center p-2 rounded-md bg-muted/50 border border-border/50">
                <Icon className={`h-4 w-4 mx-auto mb-1 ${s === 'resolved' ? 'text-success' : s === 'pending' ? 'text-warning' : 'text-info'}`} />
                <span className="text-lg font-bold font-mono text-foreground">{count}</span>
                <p className="text-[9px] text-muted-foreground uppercase tracking-wider">{statusLabels[s]}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
