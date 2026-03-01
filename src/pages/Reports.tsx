import { ReportForm } from '@/components/ReportForm';
import { ReportsFeed } from '@/components/ReportsFeed';
import { ThemeToggle } from '@/components/ThemeToggle';

const ReportsPage = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Citizen Reports</h1>
          <p className="text-sm text-muted-foreground">Submit and track waste management reports</p>
        </div>
        <ThemeToggle />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ReportForm />
        <ReportsFeed />
      </div>
    </div>
  );
};

export default ReportsPage;
