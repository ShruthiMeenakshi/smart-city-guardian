import { motion } from 'framer-motion';
import { mockCitizenCredits, badgeColors } from '@/lib/intelligenceData';
import { Star, Award, Recycle, FileText, Flame, Trophy } from 'lucide-react';
import { KPICard } from '@/components/KPICard';

const rankEmoji = ['🥇', '🥈', '🥉'];

export function EcoCreditBoard() {
  const totalPoints = mockCitizenCredits.reduce((s, c) => s + c.ecoPoints, 0);
  const totalRecycled = mockCitizenCredits.reduce((s, c) => s + c.recyclingKg, 0);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <KPICard title="Active Citizens" value={mockCitizenCredits.length} icon={Star} variant="primary" />
        <KPICard title="Total Eco Points" value={Math.round(totalPoints / 1000)} suffix="K" icon={Award} variant="warning" />
        <KPICard title="Recycled Volume" value={totalRecycled} suffix=" kg" icon={Recycle} variant="secondary" />
        <KPICard title="Platinum Members" value={mockCitizenCredits.filter(c => c.badge === 'platinum').length} icon={Trophy} variant="info" />
      </div>

      <div className="rounded-lg bg-card border border-border p-5 card-glow">
        <div className="flex items-center gap-2 mb-4">
          <Star className="h-4 w-4 text-warning" />
          <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Citizen Eco-Credit Leaderboard</h3>
        </div>

        <div className="space-y-2">
          {/* Header */}
          <div className="grid grid-cols-12 gap-2 px-3 py-2 text-[10px] text-muted-foreground uppercase tracking-wider font-semibold">
            <span className="col-span-1">#</span>
            <span className="col-span-3">Citizen</span>
            <span className="col-span-1 text-center">Ward</span>
            <span className="col-span-2 text-center">Eco Points</span>
            <span className="col-span-1 text-center">Reports</span>
            <span className="col-span-1 text-center">Recycled</span>
            <span className="col-span-1 text-center">Streak</span>
            <span className="col-span-2 text-center">Badge</span>
          </div>

          {mockCitizenCredits.map((citizen, i) => (
            <motion.div
              key={citizen.citizenId}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
              className="grid grid-cols-12 gap-2 px-3 py-3 rounded-md bg-muted/50 border border-border hover:border-primary/20 transition-colors items-center"
            >
              <span className="col-span-1 text-sm font-bold font-mono">
                {i < 3 ? rankEmoji[i] : citizen.rank}
              </span>
              <div className="col-span-3">
                <span className="text-sm font-semibold text-foreground">{citizen.name}</span>
                <span className="block text-[10px] text-muted-foreground font-mono">{citizen.citizenId}</span>
              </div>
              <span className="col-span-1 text-center text-xs font-mono text-muted-foreground">{citizen.ward}</span>
              <div className="col-span-2 text-center">
                <span className="text-sm font-bold font-mono text-primary">{citizen.ecoPoints.toLocaleString()}</span>
              </div>
              <span className="col-span-1 text-center text-xs font-mono text-muted-foreground flex items-center justify-center gap-1">
                <FileText className="h-3 w-3" /> {citizen.reportsSubmitted}
              </span>
              <span className="col-span-1 text-center text-xs font-mono text-muted-foreground flex items-center justify-center gap-1">
                <Recycle className="h-3 w-3" /> {citizen.recyclingKg}kg
              </span>
              <span className="col-span-1 text-center text-xs font-mono text-warning flex items-center justify-center gap-1">
                <Flame className="h-3 w-3" /> {citizen.streak}d
              </span>
              <div className="col-span-2 flex justify-center">
                <span className={`text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full ${badgeColors[citizen.badge]}`}>
                  {citizen.badge}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
