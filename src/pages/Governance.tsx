import { WardLeaderboard } from '@/components/WardLeaderboard';
import { WeeklyTrendChart } from '@/components/Charts';
import { ThemeToggle } from '@/components/ThemeToggle';

const GovernancePage = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Ward Governance Index</h1>
          <p className="text-sm text-muted-foreground">Performance rankings and governance metrics</p>
        </div>
        <ThemeToggle />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <WardLeaderboard />
        <WeeklyTrendChart />
      </div>
    </div>
  );
};

export default GovernancePage;
