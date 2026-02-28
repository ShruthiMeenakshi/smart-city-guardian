import { motion } from 'framer-motion';
import { mockReports, severityLabels } from '@/lib/mockData';
import { MapPin, AlertTriangle, Clock } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

const severityDotColors: Record<number, string> = {
  1: 'bg-success',
  2: 'bg-primary',
  3: 'bg-warning',
  4: 'bg-warning',
  5: 'bg-destructive',
};

export function ReportsFeed() {
  const recent = [...mockReports].sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime()).slice(0, 6);

  return (
    <div className="rounded-lg bg-card border border-border p-5 card-glow">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Live Reports</h3>
        <div className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-success animate-pulse-glow" />
          <span className="text-xs text-success font-mono">LIVE</span>
        </div>
      </div>
      <div className="space-y-3 max-h-[400px] overflow-y-auto scrollbar-thin">
        {recent.map((report, i) => (
          <motion.div
            key={report.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            className="flex items-start gap-3 p-3 rounded-md bg-muted/50 hover:bg-muted transition-colors group cursor-pointer"
          >
            <div className={`mt-1 h-2.5 w-2.5 rounded-full flex-shrink-0 ${severityDotColors[report.severity]}`} />
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2">
                <span className="text-sm font-medium text-foreground truncate">{report.location}</span>
                <span className="text-[10px] font-mono text-muted-foreground flex-shrink-0">{report.id}</span>
              </div>
              <p className="text-xs text-muted-foreground mt-0.5 truncate">{report.description}</p>
              <div className="flex items-center gap-3 mt-1.5">
                <span className="text-[10px] text-muted-foreground flex items-center gap-1">
                  <MapPin className="h-3 w-3" /> Ward {report.ward}
                </span>
                <span className="text-[10px] text-muted-foreground flex items-center gap-1">
                  <AlertTriangle className="h-3 w-3" /> {severityLabels[report.severity]}
                </span>
                <span className="text-[10px] text-muted-foreground flex items-center gap-1">
                  <Clock className="h-3 w-3" /> {formatDistanceToNow(report.timestamp, { addSuffix: true })}
                </span>
              </div>
            </div>
            {report.illegalDumping && (
              <span className="text-[9px] font-bold uppercase px-1.5 py-0.5 rounded bg-destructive/20 text-destructive flex-shrink-0">
                ILLEGAL
              </span>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
