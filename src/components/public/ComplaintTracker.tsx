import { motion, AnimatePresence } from 'framer-motion';
import { severityLabels } from '@/lib/mockData';
import { Clock, CheckCircle, Truck, AlertTriangle, Search, Filter, Pencil, Trash2, X, Save } from 'lucide-react';
import { useState } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { useReports } from '@/contexts/ReportsContext';
import { Button } from '@/components/ui/button';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { toast } from '@/hooks/use-toast';

const statusSteps = ['pending', 'assigned', 'in-progress', 'resolved'] as const;
const statusLabels: Record<string, string> = {
  pending: 'Pending Review',
  assigned: 'Assigned to Inspector',
  'in-progress': 'Work In Progress',
  resolved: 'Resolved',
};
const statusIcons: Record<string, typeof Clock> = {
  pending: Clock,
  assigned: AlertTriangle,
  'in-progress': Truck,
  resolved: CheckCircle,
};
const statusColor: Record<string, string> = {
  pending: 'text-warning bg-warning/10 border-warning/30',
  assigned: 'text-info bg-info/10 border-info/30',
  'in-progress': 'text-primary bg-primary/10 border-primary/30',
  resolved: 'text-success bg-success/10 border-success/30',
};

const wasteTypes = ['Organic', 'Plastic', 'E-Waste', 'Hazardous', 'Construction', 'Paper', 'Glass', 'Textile', 'Mixed'];

export function ComplaintTracker() {
  const { reports, updateReport, deleteReport } = useReports();
  const [filter, setFilter] = useState<string>('all');
  const [search, setSearch] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState({ location: '', description: '', wasteType: '', severity: 3 });
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const citizenReports = [...reports].sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());

  const filtered = citizenReports.filter(r => {
    if (filter !== 'all' && r.status !== filter) return false;
    if (search && !r.location.toLowerCase().includes(search.toLowerCase()) && !r.id.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const startEdit = (report: typeof reports[0]) => {
    setEditingId(report.id);
    setEditForm({
      location: report.location,
      description: report.description,
      wasteType: report.wasteType,
      severity: report.severity,
    });
  };

  const saveEdit = () => {
    if (!editingId) return;
    updateReport(editingId, {
      location: editForm.location,
      description: editForm.description,
      wasteType: editForm.wasteType,
      severity: editForm.severity,
    });
    setEditingId(null);
    toast({ title: 'Report updated', description: 'Your changes have been saved.' });
  };

  const confirmDelete = () => {
    if (!deleteId) return;
    deleteReport(deleteId);
    setDeleteId(null);
    toast({ title: 'Report deleted', description: 'The report has been removed.' });
  };

  const isOwn = (r: typeof reports[0]) => r.citizenId === 'C999';
  const canEdit = (r: typeof reports[0]) => isOwn(r) && r.status === 'pending';

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="rounded-lg bg-card border border-border p-4 card-glow">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by location or ID..."
              className="w-full bg-input text-foreground text-xs rounded-md pl-9 pr-3 py-2 border border-border outline-none focus:ring-1 focus:ring-ring placeholder:text-muted-foreground"
            />
          </div>
          <div className="flex items-center gap-1.5">
            <Filter className="h-3.5 w-3.5 text-muted-foreground" />
            {['all', ...statusSteps].map(s => (
              <button
                key={s}
                onClick={() => setFilter(s)}
                className={`px-2.5 py-1 rounded-full text-[10px] font-medium transition-all ${
                  filter === s
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground hover:bg-muted/80'
                }`}
              >
                {s === 'all' ? 'All' : statusLabels[s].split(' ')[0]}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Complaints list */}
      {filtered.length === 0 ? (
        <div className="rounded-lg bg-card border border-border p-8 text-center card-glow">
          <Search className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
          <p className="text-sm text-muted-foreground">No complaints match your filter.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((report, idx) => {
            const currentStepIdx = statusSteps.indexOf(report.status);
            const Icon = statusIcons[report.status];
            const isEditing = editingId === report.id;
            const own = isOwn(report);
            const editable = canEdit(report);

            return (
              <motion.div
                key={report.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.06 }}
                className={`rounded-lg bg-card border p-5 card-glow ${own ? 'border-primary/30' : 'border-border'}`}
              >
                <AnimatePresence mode="wait">
                  {isEditing ? (
                    <motion.div
                      key="edit"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="space-y-3"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-primary uppercase tracking-wider">Editing {report.id}</span>
                        <Button size="icon" variant="ghost" onClick={() => setEditingId(null)} className="h-6 w-6">
                          <X className="h-3.5 w-3.5" />
                        </Button>
                      </div>

                      <div>
                        <label className="text-[10px] text-muted-foreground uppercase tracking-wider font-medium block mb-1">Location</label>
                        <input
                          value={editForm.location}
                          onChange={(e) => setEditForm(f => ({ ...f, location: e.target.value }))}
                          className="w-full bg-input text-foreground text-xs rounded-md px-3 py-2 border border-border outline-none focus:ring-1 focus:ring-ring placeholder:text-muted-foreground"
                        />
                      </div>

                      <div>
                        <label className="text-[10px] text-muted-foreground uppercase tracking-wider font-medium block mb-1.5">Waste Type</label>
                        <div className="flex flex-wrap gap-1.5">
                          {wasteTypes.map(t => (
                            <button key={t} onClick={() => setEditForm(f => ({ ...f, wasteType: t }))} className={`px-2.5 py-1 rounded-full text-[10px] font-medium transition-all ${editForm.wasteType === t ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground hover:bg-muted/80'}`}>{t}</button>
                          ))}
                        </div>
                      </div>

                      <div>
                        <label className="text-[10px] text-muted-foreground uppercase tracking-wider font-medium block mb-1.5">Severity: <span className="text-foreground">{editForm.severity}</span></label>
                        <div className="flex gap-1.5">
                          {[1, 2, 3, 4, 5].map(s => (
                            <button key={s} onClick={() => setEditForm(f => ({ ...f, severity: s }))} className={`flex-1 py-1.5 rounded-md text-[10px] font-bold transition-all ${s === editForm.severity ? s <= 2 ? 'bg-success text-success-foreground' : s <= 3 ? 'bg-warning text-warning-foreground' : 'bg-destructive text-destructive-foreground' : 'bg-muted text-muted-foreground hover:bg-muted/80'}`}>{s}</button>
                          ))}
                        </div>
                      </div>

                      <div>
                        <label className="text-[10px] text-muted-foreground uppercase tracking-wider font-medium block mb-1">Description</label>
                        <textarea
                          rows={2}
                          value={editForm.description}
                          onChange={(e) => setEditForm(f => ({ ...f, description: e.target.value }))}
                          className="w-full bg-input text-foreground text-xs rounded-md px-3 py-2 border border-border outline-none focus:ring-1 focus:ring-ring placeholder:text-muted-foreground resize-none"
                        />
                      </div>

                      <Button onClick={saveEdit} size="sm" className="w-full bg-primary text-primary-foreground hover:bg-primary/90 text-xs">
                        <Save className="h-3.5 w-3.5 mr-1.5" /> Save Changes
                      </Button>
                    </motion.div>
                  ) : (
                    <motion.div key="view" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                      {/* Header */}
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold font-mono text-foreground">{report.id}</span>
                            <span className={`inline-flex items-center gap-1 text-[10px] uppercase tracking-wider font-medium px-2 py-0.5 rounded-full border ${statusColor[report.status]}`}>
                              <Icon className="h-3 w-3" />
                              {report.status}
                            </span>
                            {report.illegalDumping && (
                              <span className="text-[10px] px-2 py-0.5 rounded-full bg-destructive/10 border border-destructive/30 text-destructive font-bold">ILLEGAL</span>
                            )}
                            {own && (
                              <span className="text-[10px] px-2 py-0.5 rounded-full bg-primary/10 border border-primary/30 text-primary font-medium">YOUR REPORT</span>
                            )}
                          </div>
                          <p className="text-sm font-medium text-foreground mt-1">{report.location}</p>
                          <p className="text-[10px] text-muted-foreground">
                            Ward {report.ward} · {report.wasteType} · Severity {report.severity} ({severityLabels[report.severity]})
                          </p>
                        </div>
                        <div className="flex items-center gap-1.5">
                          {editable && (
                            <>
                              <Button size="icon" variant="ghost" onClick={() => startEdit(report)} className="h-7 w-7 text-muted-foreground hover:text-primary">
                                <Pencil className="h-3.5 w-3.5" />
                              </Button>
                              <Button size="icon" variant="ghost" onClick={() => setDeleteId(report.id)} className="h-7 w-7 text-muted-foreground hover:text-destructive">
                                <Trash2 className="h-3.5 w-3.5" />
                              </Button>
                            </>
                          )}
                          <span className="text-[10px] text-muted-foreground font-mono">
                            {formatDistanceToNow(report.timestamp, { addSuffix: true })}
                          </span>
                        </div>
                      </div>

                      {/* Description */}
                      <p className="text-xs text-muted-foreground mb-4 pl-0.5">{report.description}</p>

                      {/* Status Timeline */}
                      <div className="flex items-center gap-0">
                        {statusSteps.map((step, i) => {
                          const reached = i <= currentStepIdx;
                          const isCurrent = i === currentStepIdx;
                          const StepIcon = statusIcons[step];
                          return (
                            <div key={step} className="flex items-center flex-1 last:flex-none">
                              <div className="flex flex-col items-center">
                                <motion.div
                                  initial={{ scale: 0 }}
                                  animate={{ scale: 1 }}
                                  transition={{ delay: idx * 0.06 + i * 0.1 }}
                                  className={`h-7 w-7 rounded-full flex items-center justify-center border-2 transition-all ${
                                    isCurrent
                                      ? 'border-primary bg-primary/10 ring-2 ring-primary/20'
                                      : reached
                                        ? 'border-success bg-success/10'
                                        : 'border-border bg-muted/50'
                                  }`}
                                >
                                  <StepIcon className={`h-3 w-3 ${isCurrent ? 'text-primary' : reached ? 'text-success' : 'text-muted-foreground'}`} />
                                </motion.div>
                                <span className={`text-[9px] mt-1 leading-tight text-center ${
                                  isCurrent ? 'text-primary font-bold' : reached ? 'text-success' : 'text-muted-foreground'
                                }`}>
                                  {statusLabels[step].split(' ')[0]}
                                </span>
                              </div>
                              {i < statusSteps.length - 1 && (
                                <div className={`flex-1 h-0.5 mx-1 rounded-full ${
                                  i < currentStepIdx ? 'bg-success' : 'bg-border'
                                }`} />
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      )}

      {/* Delete confirmation dialog */}
      <AlertDialog open={!!deleteId} onOpenChange={(open) => !open && setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Report</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this report? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Summary */}
      <div className="rounded-lg bg-card border border-border p-4 card-glow">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {statusSteps.map(s => {
            const count = citizenReports.filter(r => r.status === s).length;
            const SIcon = statusIcons[s];
            return (
              <div key={s} className="text-center p-2 rounded-md bg-muted/50 border border-border/50">
                <SIcon className={`h-4 w-4 mx-auto mb-1 ${s === 'resolved' ? 'text-success' : s === 'pending' ? 'text-warning' : 'text-info'}`} />
                <span className="text-lg font-bold font-mono text-foreground">{count}</span>
                <p className="text-[9px] text-muted-foreground uppercase tracking-wider">{statusLabels[s]}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
