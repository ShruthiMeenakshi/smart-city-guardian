import { CircularEconomyPanel } from '@/components/CircularEconomyPanel';
import { WasteDistributionChart } from '@/components/Charts';
import { ThemeToggle } from '@/components/ThemeToggle';

const CircularPage = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Circular Economy Advisory</h1>
          <p className="text-sm text-muted-foreground">AI-powered recycling and reuse recommendations</p>
        </div>
        <ThemeToggle />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <CircularEconomyPanel />
        <WasteDistributionChart />
      </div>
    </div>
  );
};

export default CircularPage;
