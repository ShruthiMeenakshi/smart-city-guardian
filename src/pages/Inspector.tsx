import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { KPICard } from '@/components/KPICard';
import { ReportsFeed } from '@/components/ReportsFeed';
import { MapPlaceholder } from '@/components/MapPlaceholder';
import { mockReports, mockWards, mockPredictions, severityLabels } from '@/lib/mockData';
import {
  FileWarning, Map, Shield, AlertTriangle, Clock, CheckCircle, Navigation,
  Truck, Brain, Eye, ClipboardCheck, Route, MapPin, ToggleRight,
} from 'lucide-react';
import { ThemeToggle } from '@/components/ThemeToggle';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { formatDistanceToNow } from 'date-fns';

const assignedReports = mockReports.filter(r => r.status === 'assigned' || r.status === 'pending');
const highSeverity = mockReports.filter(r => r.severity >= 4);

/* ---- mock vehicles ---- */
const vehicles = [
  { id: 'V-01', plate: 'TN-58-AG-4521', type: 'Compactor', status: 'available' as const, driver: 'Raman K.' },
  { id: 'V-02', plate: 'TN-58-BH-7712', type: 'Tipper', status: 'on-route' as const, driver: 'Suresh M.' },
  { id: 'V-03', plate: 'TN-58-CJ-1190', type: 'Compactor', status: 'available' as const, driver: 'Anand P.' },
  { id: 'V-04', plate: 'TN-58-DK-3345', type: 'Mini Truck', status: 'maintenance' as const, driver: 'Karthik R.' },
  { id: 'V-05', plate: 'TN-58-EL-5503', type: 'Tipper', status: 'on-route' as const, driver: 'Durai S.' },
];

const vStatusColor: Record<string, string> = {
  available: 'bg-success/10 text-success',
  'on-route': 'bg-info/10 text-info',
  maintenance: 'bg-warning/10 text-warning',
};

/* ---- truck routes mock ---- */
const truckRoutes = [
  { id: 'TR-01', vehicle: 'V-01', route: 'Anna Nagar → KK Nagar → Tallakulam', stops: 12, progress: 0, eta: '—', status: 'not-started' as const },
  { id: 'TR-02', vehicle: 'V-02', route: 'Periyar → Meenakshi → Teppakulam', stops: 9, progress: 67, eta: '45 min', status: 'in-progress' as const },
  { id: 'TR-03', vehicle: 'V-05', route: 'Thiruparankundram → Pasumalai', stops: 7, progress: 42, eta: '1h 10m', status: 'in-progress' as const },
];

const validTabs = ['complaints', 'vehicles', 'resolution', 'predictions', 'routes'];

const Inspector = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const hashTab = location.hash.replace('#', '');
  const [activeTab, setActiveTab] = useState(validTabs.includes(hashTab) ? hashTab : 'complaints');
  const [resolvedIds, setResolvedIds] = useState<Set<string>>(new Set());
  const [assignedVehicles, setAssignedVehicles] = useState<Record<string, string>>({});
  const [validatedPredictions, setValidatedPredictions] = useState<Set<string>>(new Set());

  useEffect(() => {
    const h = location.hash.replace('#', '');
    if (validTabs.includes(h)) setActiveTab(h);
  }, [location.hash]);

  const onTabChange = (val: string) => {
    setActiveTab(val);
    navigate(`/inspector#${val}`, { replace: true });
  };

  const toggleResolved = (id: string) => {
    setResolvedIds(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const assignVehicle = (reportId: string, vehicleId: string) => {
    setAssignedVehicles(prev => ({ ...prev, [reportId]: vehicleId }));
  };

  const toggleValidation = (id: string) => {
    setValidatedPredictions(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
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
          <h1 className="text-2xl font-bold text-foreground">Inspector Panel</h1>
          <p className="text-sm text-muted-foreground">Field inspection queue, vehicles, routes & AI validation</p>
        </div>
        <div className="flex items-center gap-3 text-xs">
          <span className="h-2 w-2 rounded-full bg-warning animate-pulse" />
          <span className="text-muted-foreground font-mono">{assignedReports.length} pending assignments</span>
          <ThemeToggle />
        </div>
      </motion.div>

      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <KPICard title="Assigned To Me" value={assignedReports.length} icon={FileWarning} variant="primary" />
        <KPICard title="High Severity" value={highSeverity.length} icon={AlertTriangle} variant="destructive" />
        <KPICard title="Avg Response" value={2.6} suffix="h" icon={Clock} variant="warning" decimals={1} />
        <KPICard title="Resolved Today" value={5 + resolvedIds.size} icon={CheckCircle} variant="info" />
        <KPICard title="Route Stops" value={assignedReports.length} icon={Navigation} variant="secondary" />
        <KPICard title="Compliance" value={87} suffix="%" icon={Shield} variant="primary" />
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={onTabChange} className="space-y-4">
        <TabsList className="bg-muted/50 border border-border p-1 h-auto flex-wrap gap-1">
          <TabsTrigger value="complaints" className="gap-1.5 text-xs data-[state=active]:bg-card data-[state=active]:shadow-sm">
            <Eye className="h-3.5 w-3.5" /> Ward Complaints
          </TabsTrigger>
          <TabsTrigger value="vehicles" className="gap-1.5 text-xs data-[state=active]:bg-card data-[state=active]:shadow-sm">
            <Truck className="h-3.5 w-3.5" /> Assign Vehicles
          </TabsTrigger>
          <TabsTrigger value="resolution" className="gap-1.5 text-xs data-[state=active]:bg-card data-[state=active]:shadow-sm">
            <ClipboardCheck className="h-3.5 w-3.5" /> Mark Resolution
          </TabsTrigger>
          <TabsTrigger value="predictions" className="gap-1.5 text-xs data-[state=active]:bg-card data-[state=active]:shadow-sm">
            <Brain className="h-3.5 w-3.5" /> Validate AI
          </TabsTrigger>
          <TabsTrigger value="routes" className="gap-1.5 text-xs data-[state=active]:bg-card data-[state=active]:shadow-sm">
            <Route className="h-3.5 w-3.5" /> Truck Routes
          </TabsTrigger>
        </TabsList>

        {/* ===== WARD COMPLAINTS ===== */}
        <TabsContent value="complaints">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <MapPlaceholder />
              {/* All ward complaints grouped */}
              {mockWards.map((ward, wi) => {
                const wardReports = mockReports.filter(r => r.ward === ward.id);
                if (wardReports.length === 0) return null;
                return (
                  <motion.div
                    key={ward.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: wi * 0.06 }}
                    className="rounded-lg bg-card border border-border p-5 card-glow"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-sm font-semibold text-foreground">{ward.name} · Ward {ward.id}</h3>
                      <span className="text-xs font-mono text-muted-foreground">{wardReports.length} complaints</span>
                    </div>
                    <div className="space-y-2">
                      {wardReports.sort((a, b) => b.severity - a.severity).map((r, i) => (
                        <motion.div
                          key={r.id}
                          initial={{ opacity: 0, x: -8 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: wi * 0.06 + i * 0.03 }}
                          className="flex items-center justify-between p-3 rounded-md bg-muted/50 border border-border/50"
                        >
                          <div className="flex items-center gap-3">
                            <div className={`h-2.5 w-2.5 rounded-full ${r.severity >= 4 ? 'bg-destructive animate-pulse' : r.severity >= 3 ? 'bg-warning' : 'bg-info'}`} />
                            <div>
                              <span className="text-xs font-medium text-foreground">{r.location}</span>
                              <p className="text-[10px] text-muted-foreground">
                                {r.id} · {r.wasteType} · {severityLabels[r.severity]}
                                {r.illegalDumping && <span className="ml-1 text-destructive font-bold">⚠ ILLEGAL</span>}
                              </p>
                            </div>
                          </div>
                          <span className={`text-[10px] uppercase tracking-wider font-medium px-2 py-0.5 rounded-full ${
                            r.status === 'pending' ? 'bg-warning/10 text-warning' : r.status === 'resolved' ? 'bg-success/10 text-success' : 'bg-info/10 text-info'
                          }`}>{resolvedIds.has(r.id) ? 'resolved' : r.status}</span>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                );
              })}
            </div>
            <div className="space-y-6">
              <ReportsFeed />
            </div>
          </div>
        </TabsContent>

        {/* ===== ASSIGN VEHICLES ===== */}
        <TabsContent value="vehicles">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Vehicle fleet */}
            <div className="rounded-lg bg-card border border-border p-5 card-glow">
              <div className="flex items-center gap-2 mb-4">
                <Truck className="h-4 w-4 text-primary" />
                <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Vehicle Fleet</h3>
              </div>
              <div className="space-y-2">
                {vehicles.map((v, i) => (
                  <motion.div
                    key={v.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06 }}
                    className="flex items-center justify-between p-3 rounded-md bg-muted/50 border border-border/50"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold font-mono text-foreground">{v.id}</span>
                        <span className="text-xs text-muted-foreground">{v.plate}</span>
                      </div>
                      <p className="text-[10px] text-muted-foreground">{v.type} · {v.driver}</p>
                    </div>
                    <span className={`text-[10px] uppercase tracking-wider font-medium px-2 py-0.5 rounded-full ${vStatusColor[v.status]}`}>
                      {v.status}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Assign to complaints */}
            <div className="rounded-lg bg-card border border-border p-5 card-glow">
              <div className="flex items-center gap-2 mb-4">
                <MapPin className="h-4 w-4 text-warning" />
                <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Assign Vehicle to Complaint</h3>
              </div>
              <div className="space-y-3">
                {assignedReports.map((r, i) => {
                  const availableVehicles = vehicles.filter(v => v.status === 'available');
                  return (
                    <motion.div
                      key={r.id}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.06 }}
                      className="p-3 rounded-md bg-muted/50 border border-border/50"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <span className="text-xs font-medium text-foreground">{r.location}</span>
                          <p className="text-[10px] text-muted-foreground">{r.id} · Ward {r.ward}</p>
                        </div>
                        <div className={`h-2.5 w-2.5 rounded-full ${r.severity >= 4 ? 'bg-destructive' : 'bg-warning'}`} />
                      </div>
                      <div className="flex items-center gap-2">
                        <select
                          value={assignedVehicles[r.id] || ''}
                          onChange={(e) => assignVehicle(r.id, e.target.value)}
                          className="flex-1 bg-input text-foreground text-[10px] rounded-md px-2 py-1.5 border border-border outline-none focus:ring-1 focus:ring-ring"
                        >
                          <option value="">Select vehicle...</option>
                          {availableVehicles.map(v => (
                            <option key={v.id} value={v.id}>{v.id} — {v.plate} ({v.type})</option>
                          ))}
                        </select>
                        {assignedVehicles[r.id] && (
                          <motion.span
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="text-success"
                          >
                            <CheckCircle className="h-4 w-4" />
                          </motion.span>
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        </TabsContent>

        {/* ===== MARK RESOLUTION ===== */}
        <TabsContent value="resolution">
          <div className="rounded-lg bg-card border border-border p-5 card-glow">
            <div className="flex items-center gap-2 mb-4">
              <ClipboardCheck className="h-4 w-4 text-success" />
              <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Mark Complaints as Resolved</h3>
            </div>
            <div className="space-y-2">
              {mockReports
                .filter(r => r.status !== 'resolved')
                .sort((a, b) => b.severity - a.severity)
                .map((r, i) => {
                  const isResolved = resolvedIds.has(r.id);
                  return (
                    <motion.div
                      key={r.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.04 }}
                      className={`flex items-center justify-between p-4 rounded-md border transition-all ${
                        isResolved ? 'bg-success/5 border-success/30' : 'bg-muted/50 border-border/50'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`h-3 w-3 rounded-full ${
                          isResolved ? 'bg-success' : r.severity >= 4 ? 'bg-destructive animate-pulse' : r.severity >= 3 ? 'bg-warning' : 'bg-info'
                        }`} />
                        <div>
                          <span className="text-sm font-medium text-foreground">{r.location}</span>
                          <p className="text-[10px] text-muted-foreground">
                            {r.id} · Ward {r.ward} · {r.wasteType} · {severityLabels[r.severity]}
                            {r.illegalDumping && <span className="ml-1 text-destructive font-bold">⚠ ILLEGAL</span>}
                          </p>
                        </div>
                      </div>
                      <Button
                        size="sm"
                        variant={isResolved ? 'outline' : 'default'}
                        onClick={() => toggleResolved(r.id)}
                        className={`text-xs ${isResolved ? 'border-success text-success hover:bg-success/10' : 'bg-primary text-primary-foreground'}`}
                      >
                        {isResolved ? (
                          <><CheckCircle className="h-3.5 w-3.5 mr-1" /> Resolved</>
                        ) : (
                          <><ToggleRight className="h-3.5 w-3.5 mr-1" /> Mark Resolved</>
                        )}
                      </Button>
                    </motion.div>
                  );
                })}
            </div>
            <div className="mt-4 p-3 rounded-md bg-muted/30 text-xs text-muted-foreground">
              <span className="font-bold text-foreground">{resolvedIds.size}</span> complaints marked resolved this session
            </div>
          </div>
        </TabsContent>

        {/* ===== VALIDATE AI PREDICTIONS ===== */}
        <TabsContent value="predictions">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="rounded-lg bg-card border border-border p-5 card-glow">
              <div className="flex items-center gap-2 mb-4">
                <Brain className="h-4 w-4 text-primary" />
                <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">AI Overflow Predictions</h3>
              </div>
              <p className="text-xs text-muted-foreground mb-4">Review AI-predicted overflow events and mark them as accurate or inaccurate based on field observations.</p>
              <div className="space-y-3">
                {mockPredictions.map((p, i) => {
                  const ward = mockWards.find(w => w.id === p.wardId);
                  const isValidated = validatedPredictions.has(p.id);
                  return (
                    <motion.div
                      key={p.id}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.08 }}
                      className={`p-4 rounded-md border transition-all ${
                        isValidated ? 'bg-success/5 border-success/30' : 'bg-muted/50 border-border/50'
                      }`}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <span className="text-sm font-semibold text-foreground">{p.location}</span>
                          <p className="text-[10px] text-muted-foreground">{ward?.name || `Ward ${p.wardId}`} · {p.id}</p>
                        </div>
                        <span className={`text-lg font-bold font-mono ${p.overflowProbability >= 80 ? 'text-destructive' : p.overflowProbability >= 60 ? 'text-warning' : 'text-info'}`}>
                          {p.overflowProbability}%
                        </span>
                      </div>
                      <div className="h-1.5 rounded-full bg-muted overflow-hidden mb-2">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${p.overflowProbability}%` }}
                          transition={{ duration: 0.8, delay: i * 0.1 }}
                          className={`h-full rounded-full ${p.overflowProbability >= 80 ? 'bg-destructive' : p.overflowProbability >= 60 ? 'bg-warning' : 'bg-info'}`}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] text-muted-foreground">ETA to overflow: <span className="font-mono font-bold text-foreground">{p.estimatedTimeToOverflow}h</span></span>
                        <Button
                          size="sm"
                          variant={isValidated ? 'outline' : 'default'}
                          onClick={() => toggleValidation(p.id)}
                          className={`text-[10px] h-7 ${isValidated ? 'border-success text-success hover:bg-success/10' : 'bg-primary text-primary-foreground'}`}
                        >
                          {isValidated ? '✓ Validated' : 'Validate Prediction'}
                        </Button>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Validation stats */}
            <div className="space-y-4">
              <div className="rounded-lg bg-card border border-border p-5 card-glow">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-4">Validation Summary</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-md bg-muted/50 border border-border/50 p-3 text-center">
                    <span className="text-2xl font-bold font-mono text-primary">{validatedPredictions.size}</span>
                    <p className="text-[10px] text-muted-foreground mt-1">Validated</p>
                  </div>
                  <div className="rounded-md bg-muted/50 border border-border/50 p-3 text-center">
                    <span className="text-2xl font-bold font-mono text-muted-foreground">{mockPredictions.length - validatedPredictions.size}</span>
                    <p className="text-[10px] text-muted-foreground mt-1">Pending Review</p>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-4">
                  Validating AI predictions improves future accuracy. Your field feedback helps the model learn from real-world conditions in Madurai.
                </p>
              </div>

              <div className="rounded-lg bg-card border border-border p-5 card-glow">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-3">How It Works</h3>
                <div className="space-y-3">
                  {[
                    { step: '1', title: 'AI Predicts', desc: 'Model forecasts bin overflow based on fill sensors & patterns.' },
                    { step: '2', title: 'Inspector Reviews', desc: 'You visit the location and check actual conditions.' },
                    { step: '3', title: 'Validate or Flag', desc: 'Confirm prediction accuracy to improve the model.' },
                  ].map((s, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <span className="text-[10px] font-bold text-primary">{s.step}</span>
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-foreground">{s.title}</p>
                        <p className="text-[10px] text-muted-foreground">{s.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        {/* ===== MONITOR TRUCK ROUTES ===== */}
        <TabsContent value="routes">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <MapPlaceholder />
            </div>
            <div className="space-y-4">
              <div className="rounded-lg bg-card border border-border p-5 card-glow">
                <div className="flex items-center gap-2 mb-4">
                  <Route className="h-4 w-4 text-info" />
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Active Routes</h3>
                </div>
                <div className="space-y-3">
                  {truckRoutes.map((tr, i) => (
                    <motion.div
                      key={tr.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.08 }}
                      className="p-4 rounded-md bg-muted/50 border border-border/50"
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-bold font-mono text-foreground">{tr.id}</span>
                        <span className={`text-[10px] uppercase tracking-wider font-medium px-2 py-0.5 rounded-full ${
                          tr.status === 'in-progress' ? 'bg-info/10 text-info' : 'bg-muted text-muted-foreground'
                        }`}>{tr.status}</span>
                      </div>
                      <p className="text-xs text-foreground mb-1">{tr.route}</p>
                      <div className="flex items-center gap-2 text-[10px] text-muted-foreground mb-2">
                        <span>{tr.vehicle}</span>
                        <span>·</span>
                        <span>{tr.stops} stops</span>
                        <span>·</span>
                        <span>ETA: {tr.eta}</span>
                      </div>
                      <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${tr.progress}%` }}
                          transition={{ duration: 1, delay: i * 0.15 }}
                          className={`h-full rounded-full ${tr.progress > 50 ? 'bg-success' : tr.progress > 0 ? 'bg-info' : 'bg-muted-foreground'}`}
                        />
                      </div>
                      <span className="text-[10px] font-mono text-muted-foreground">{tr.progress}% complete</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Inspector;

