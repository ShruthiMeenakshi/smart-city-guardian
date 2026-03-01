import { motion } from 'framer-motion';
import { Bell, Calendar, Truck, Megaphone, Clock } from 'lucide-react';

const announcements = [
  { id: 1, title: 'Ward clean-up drive this Sunday', date: 'Mar 02, 2026', type: 'event', icon: Calendar },
  { id: 2, title: 'E-waste collection camp at Community Hall', date: 'Mar 05, 2026', type: 'collection', icon: Truck },
  { id: 3, title: 'New recycling bins installed near Market Rd', date: 'Feb 28, 2026', type: 'update', icon: Megaphone },
  { id: 4, title: 'Route change: Garbage truck rescheduled to 7 AM', date: 'Mar 01, 2026', type: 'schedule', icon: Clock },
];

const schedules = [
  { day: 'Monday', time: '6:30 AM', type: 'Organic (Green bin)' },
  { day: 'Tuesday', time: '6:30 AM', type: 'Dry Waste (Blue bin)' },
  { day: 'Wednesday', time: '6:30 AM', type: 'Organic (Green bin)' },
  { day: 'Thursday', time: '6:30 AM', type: 'Dry Waste (Blue bin)' },
  { day: 'Friday', time: '6:30 AM', type: 'All Waste' },
  { day: 'Saturday', time: '7:00 AM', type: 'E-Waste & Hazardous (on request)' },
];

const today = new Date().toLocaleDateString('en-US', { weekday: 'long' });

export function WardInfo() {
  return (
    <div className="space-y-4">
      {/* Announcements */}
      <div className="rounded-lg bg-card border border-border p-5 card-glow">
        <div className="flex items-center gap-2 mb-4">
          <Bell className="h-4 w-4 text-info" />
          <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Ward Announcements</h3>
        </div>
        <div className="space-y-2">
          {announcements.map((a, i) => (
            <motion.div
              key={a.id}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.07 }}
              className="flex items-start gap-3 p-3 rounded-md bg-muted/50 border border-border/50 hover:border-info/30 transition-colors"
            >
              <div className="p-1.5 rounded-md bg-info/10 text-info mt-0.5">
                <a.icon className="h-3.5 w-3.5" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-foreground">{a.title}</p>
                <span className="text-[10px] text-muted-foreground font-mono">{a.date}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Collection schedule */}
      <div className="rounded-lg bg-card border border-border p-5 card-glow">
        <div className="flex items-center gap-2 mb-4">
          <Truck className="h-4 w-4 text-success" />
          <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Collection Schedule</h3>
        </div>
        <div className="space-y-1.5">
          {schedules.map((s, i) => {
            const isToday = s.day === today;
            return (
              <motion.div
                key={s.day}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className={`flex items-center justify-between p-2.5 rounded-md text-xs ${
                  isToday
                    ? 'bg-primary/5 border border-primary/20'
                    : 'bg-muted/30 border border-transparent hover:bg-muted/50'
                }`}
              >
                <div className="flex items-center gap-2">
                  {isToday && <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />}
                  <span className={`font-medium ${isToday ? 'text-primary' : 'text-foreground'}`}>{s.day}</span>
                </div>
                <span className="text-muted-foreground font-mono">{s.time}</span>
                <span className="text-muted-foreground">{s.type}</span>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
