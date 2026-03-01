import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { KPICard } from '@/components/KPICard';
import { WardLeaderboard } from '@/components/WardLeaderboard';
import { ReportsFeed } from '@/components/ReportsFeed';
import { mockWards, mockReports } from '@/lib/mockData';
import { Users, Star, Recycle, TrendingUp, FileWarning, CheckCircle, Camera, Gift, Bell, LayoutDashboard, ClipboardList, Sparkles } from 'lucide-react';
import { ThemeToggle } from '@/components/ThemeToggle';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { WasteImageClassifier } from '@/components/public/WasteImageClassifier';
import { WardRewards } from '@/components/public/WardRewards';
import { QuickReport } from '@/components/public/QuickReport';
import { WardInfo } from '@/components/public/WardInfo';
import { ComplaintTracker } from '@/components/public/ComplaintTracker';
import { WardCleanliness } from '@/components/public/WardCleanliness';

const myWard = mockWards[0]; // Simulating logged-in citizen's ward
const myReports = mockReports.filter(r => r.ward === myWard.id);

const validTabs = ['overview', 'report', 'track', 'cleanliness', 'classify', 'rewards', 'info'];

const PublicDashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const hashTab = location.hash.replace('#', '');
  const [activeTab, setActiveTab] = useState(validTabs.includes(hashTab) ? hashTab : 'overview');

  useEffect(() => {
    const h = location.hash.replace('#', '');
    if (validTabs.includes(h)) setActiveTab(h);
  }, [location.hash]);

  const onTabChange = (val: string) => {
    setActiveTab(val);
    navigate(`/public#${val}`, { replace: true });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-2xl font-bold text-foreground">Citizen Portal</h1>
          <p className="text-sm text-muted-foreground">
            Welcome back — {myWard.name} · Ward {myWard.id}
          </p>
        </div>
        <div className="flex items-center gap-3 text-xs">
          <span className="h-2 w-2 rounded-full bg-success animate-pulse" />
          <span className="text-muted-foreground font-mono">Live · {new Date().toLocaleDateString()}</span>
          <ThemeToggle />
        </div>
      </motion.div>

      {/* KPI Row */}
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <KPICard title="Ward Score" value={myWard.score} suffix="/100" icon={Star} variant="primary" />
        <KPICard title="My Reports" value={myReports.length} icon={FileWarning} variant="info" />
        <KPICard title="Resolved" value={myWard.resolvedReports} icon={CheckCircle} variant="primary" />
        <KPICard title="Participation" value={myWard.participationRate} suffix="%" icon={Users} variant="secondary" />
        <KPICard title="Recycling Rate" value={100 - myWard.recurrenceRate} suffix="%" icon={Recycle} variant="warning" />
        <KPICard title="Ward Rank" value={1} suffix="/8" icon={TrendingUp} variant="info" />
      </div>

      {/* Tab Navigation */}
      <Tabs value={activeTab} onValueChange={onTabChange} className="space-y-4">
        <TabsList className="bg-muted/50 border border-border p-1 h-auto flex-wrap gap-1">
          <TabsTrigger value="overview" className="gap-1.5 text-xs data-[state=active]:bg-card data-[state=active]:shadow-sm">
            <LayoutDashboard className="h-3.5 w-3.5" /> Overview
          </TabsTrigger>
          <TabsTrigger value="report" className="gap-1.5 text-xs data-[state=active]:bg-card data-[state=active]:shadow-sm">
            <FileWarning className="h-3.5 w-3.5" /> Report Garbage
          </TabsTrigger>
          <TabsTrigger value="track" className="gap-1.5 text-xs data-[state=active]:bg-card data-[state=active]:shadow-sm">
            <ClipboardList className="h-3.5 w-3.5" /> Track Status
          </TabsTrigger>
          <TabsTrigger value="cleanliness" className="gap-1.5 text-xs data-[state=active]:bg-card data-[state=active]:shadow-sm">
            <Sparkles className="h-3.5 w-3.5" /> Ward Cleanliness
          </TabsTrigger>
          <TabsTrigger value="classify" className="gap-1.5 text-xs data-[state=active]:bg-card data-[state=active]:shadow-sm">
            <Camera className="h-3.5 w-3.5" /> AI Classifier
          </TabsTrigger>
          <TabsTrigger value="rewards" className="gap-1.5 text-xs data-[state=active]:bg-card data-[state=active]:shadow-sm">
            <Gift className="h-3.5 w-3.5" /> Rewards & Ranks
          </TabsTrigger>
          <TabsTrigger value="info" className="gap-1.5 text-xs data-[state=active]:bg-card data-[state=active]:shadow-sm">
            <Bell className="h-3.5 w-3.5" /> Ward Info
          </TabsTrigger>
        </TabsList>

        {/* ===== OVERVIEW TAB ===== */}
        <TabsContent value="overview">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              {/* Ward health */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="rounded-lg bg-card border border-border p-6 card-glow"
              >
                <h2 className="text-lg font-semibold text-foreground mb-4">Ward Health Overview</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="space-y-1">
                    <span className="text-xs text-muted-foreground uppercase tracking-wider">Population</span>
                    <p className="text-xl font-bold font-mono text-foreground">{myWard.population.toLocaleString()}</p>
                  </div>
                  <div className="space-y-1">
                    <span className="text-xs text-muted-foreground uppercase tracking-wider">Total Reports</span>
                    <p className="text-xl font-bold font-mono text-foreground">{myWard.totalReports}</p>
                  </div>
                  <div className="space-y-1">
                    <span className="text-xs text-muted-foreground uppercase tracking-wider">Avg Resolution</span>
                    <p className="text-xl font-bold font-mono text-foreground">{myWard.avgResolutionTime}h</p>
                  </div>
                  <div className="space-y-1">
                    <span className="text-xs text-muted-foreground uppercase tracking-wider">Recurrence</span>
                    <p className="text-xl font-bold font-mono text-foreground">{myWard.recurrenceRate}%</p>
                  </div>
                </div>
              </motion.div>

              {/* Eco tips */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="rounded-lg bg-card border border-border p-6 card-glow"
              >
                <h2 className="text-lg font-semibold text-foreground mb-4">Eco Tips & Actions</h2>
                <div className="space-y-3">
                  {[
                    { tip: 'Segregate wet and dry waste daily', points: 10 },
                    { tip: 'Report illegal dumping in your area', points: 25 },
                    { tip: 'Participate in weekend clean-up drives', points: 50 },
                    { tip: 'Compost organic waste at home', points: 30 },
                    { tip: 'Use the AI classifier to sort your waste', points: 15 },
                  ].map((item, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + i * 0.06 }}
                      className="flex items-center justify-between p-3 rounded-md bg-muted/50 border border-border/50 hover:border-primary/20 transition-colors"
                    >
                      <span className="text-sm text-foreground">{item.tip}</span>
                      <span className="text-xs font-mono text-primary font-medium">+{item.points} pts</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              <WardLeaderboard />
            </div>
            <div className="space-y-6">
              <ReportsFeed />
            </div>
          </div>
        </TabsContent>

        {/* ===== REPORT TAB ===== */}
        <TabsContent value="report">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <QuickReport />
            <ReportsFeed />
          </div>
        </TabsContent>

        {/* ===== TRACK STATUS TAB ===== */}
        <TabsContent value="track">
          <ComplaintTracker />
        </TabsContent>

        {/* ===== WARD CLEANLINESS TAB ===== */}
        <TabsContent value="cleanliness">
          <WardCleanliness />
        </TabsContent>

        {/* ===== AI CLASSIFIER TAB ===== */}
        <TabsContent value="classify">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <WasteImageClassifier />
            {/* Supported waste types info */}
            <div className="rounded-lg bg-card border border-border p-5 card-glow">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-4">How It Works</h3>
              <div className="space-y-4">
                {[
                  { step: '1', title: 'Take a Photo', desc: 'Use your camera or upload an image of the waste.' },
                  { step: '2', title: 'AI Classifies', desc: 'Our AI model identifies the waste type with confidence score.' },
                  { step: '3', title: 'Get Guidance', desc: 'Receive disposal instructions, bin type, and eco-tips.' },
                  { step: '4', title: 'Earn Points', desc: 'Get eco-points for properly classifying and disposing waste.' },
                ].map((s, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-start gap-3"
                  >
                    <div className="h-7 w-7 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <span className="text-xs font-bold text-primary">{s.step}</span>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground">{s.title}</p>
                      <p className="text-xs text-muted-foreground">{s.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="mt-6 rounded-md bg-muted/50 border border-border/50 p-4">
                <h4 className="text-xs font-semibold text-foreground mb-2">Supported Waste Types</h4>
                <div className="flex flex-wrap gap-1.5">
                  {['Plastic', 'Organic', 'E-Waste', 'Hazardous', 'Construction', 'Paper', 'Mixed'].map(t => (
                    <span key={t} className="px-2 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-medium">{t}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        {/* ===== REWARDS TAB ===== */}
        <TabsContent value="rewards">
          <WardRewards />
        </TabsContent>

        {/* ===== WARD INFO TAB ===== */}
        <TabsContent value="info">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <WardInfo />
            <WardLeaderboard />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PublicDashboard;
