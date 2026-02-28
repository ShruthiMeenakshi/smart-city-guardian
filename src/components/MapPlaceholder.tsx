import { motion } from 'framer-motion';
import { mockReports } from '@/lib/mockData';
import { MapPin } from 'lucide-react';

const severityMapColors: Record<number, string> = {
  1: 'bg-success',
  2: 'bg-primary',
  3: 'bg-warning',
  4: 'bg-warning',
  5: 'bg-destructive',
};

export function MapPlaceholder() {
  // Simulated map with positioned dots
  return (
    <div className="rounded-lg bg-card border border-border p-5 card-glow">
      <div className="flex items-center gap-2 mb-4">
        <MapPin className="h-4 w-4 text-primary" />
        <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Hotspot Map — Madurai</h3>
      </div>
      <div className="relative w-full h-[320px] rounded-md bg-muted/30 grid-bg overflow-hidden border border-border">
        {/* City outline suggestion */}
        <div className="absolute inset-4 border border-border/50 rounded-lg opacity-30" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[10px] font-mono text-muted-foreground/50 uppercase tracking-widest">
          Madurai City Grid
        </div>

        {/* Report markers */}
        {mockReports.map((report, i) => {
          // Map lat/lng to relative positions (simplified)
          const x = ((report.lng - 78.06) / 0.07) * 80 + 10;
          const y = ((9.94 - report.lat) / 0.06) * 80 + 10;

          return (
            <motion.div
              key={report.id}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.5 + i * 0.1, type: 'spring' }}
              className="absolute group"
              style={{ left: `${x}%`, top: `${y}%` }}
            >
              <div className={`h-3 w-3 rounded-full ${severityMapColors[report.severity]} shadow-lg cursor-pointer`}>
                {report.severity >= 4 && (
                  <div className={`absolute inset-0 rounded-full ${severityMapColors[report.severity]} animate-ping opacity-40`} />
                )}
              </div>
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block z-10">
                <div className="bg-popover border border-border rounded-md p-2 text-xs shadow-lg whitespace-nowrap">
                  <p className="font-medium text-foreground">{report.location}</p>
                  <p className="text-muted-foreground">Ward {report.ward} · Severity {report.severity}</p>
                </div>
              </div>
            </motion.div>
          );
        })}

        {/* Optimized route line suggestion */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100">
          <motion.path
            d="M 52 82 L 78 48 L 60 55 L 85 30 L 50 40 L 15 60"
            fill="none"
            stroke="hsl(187, 94%, 43%)"
            strokeWidth="0.3"
            strokeDasharray="2 2"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, delay: 1.5 }}
            opacity={0.5}
          />
        </svg>

        {/* Legend */}
        <div className="absolute bottom-3 right-3 bg-card/90 border border-border rounded-md p-2 flex flex-col gap-1">
          {[1, 3, 5].map(s => (
            <div key={s} className="flex items-center gap-1.5">
              <span className={`h-2 w-2 rounded-full ${severityMapColors[s]}`} />
              <span className="text-[9px] text-muted-foreground font-mono">
                {s === 1 ? 'Low' : s === 3 ? 'Medium' : 'Critical'}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
