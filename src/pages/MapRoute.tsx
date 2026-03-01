import { MapPlaceholder } from '@/components/MapPlaceholder';
import { PredictionPanel } from '@/components/PredictionPanel';
import { ThemeToggle } from '@/components/ThemeToggle';

const MapPage = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Route Optimization & Map</h1>
          <p className="text-sm text-muted-foreground">Optimized collection routes and hotspot visualization</p>
        </div>
        <ThemeToggle />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <MapPlaceholder />
        </div>
        <PredictionPanel />
      </div>
    </div>
  );
};

export default MapPage;
