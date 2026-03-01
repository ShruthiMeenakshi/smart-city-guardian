import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, AlertTriangle, CheckCircle, Send, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

const wasteTypes = ['Organic', 'Plastic', 'E-Waste', 'Hazardous', 'Construction', 'Paper', 'Mixed'];

export function QuickReport() {
  const [step, setStep] = useState<'form' | 'submitting' | 'done'>('form');
  const [selectedType, setSelectedType] = useState('');
  const [severity, setSeverity] = useState(3);

  const submit = () => {
    setStep('submitting');
    setTimeout(() => setStep('done'), 1800);
  };

  const reset = () => {
    setStep('form');
    setSelectedType('');
    setSeverity(3);
  };

  return (
    <div className="rounded-lg bg-card border border-border p-5 card-glow">
      <div className="flex items-center gap-2 mb-4">
        <AlertTriangle className="h-4 w-4 text-warning" />
        <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Quick Report</h3>
      </div>

      <AnimatePresence mode="wait">
        {step === 'done' ? (
          <motion.div
            key="done"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="text-center py-6"
          >
            <CheckCircle className="h-10 w-10 text-success mx-auto mb-3" />
            <h4 className="text-base font-semibold text-foreground mb-1">Report Submitted!</h4>
            <p className="text-xs text-muted-foreground mb-1">Your ward inspector has been notified.</p>
            <p className="text-xs text-primary font-bold mb-4">+25 eco-points earned</p>
            <Button onClick={reset} variant="outline" size="sm" className="text-xs border-border">
              Report Another Issue
            </Button>
          </motion.div>
        ) : step === 'submitting' ? (
          <motion.div
            key="submitting"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-center py-8"
          >
            <Loader2 className="h-8 w-8 text-primary animate-spin mx-auto mb-3" />
            <p className="text-sm text-muted-foreground">Submitting report...</p>
          </motion.div>
        ) : (
          <motion.div
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-3"
          >
            {/* Location */}
            <div>
              <label className="text-[10px] text-muted-foreground uppercase tracking-wider font-medium block mb-1">Location</label>
              <div className="flex gap-2">
                <input
                  placeholder="Enter location or use GPS"
                  className="flex-1 bg-input text-foreground text-xs rounded-md px-3 py-2 border border-border outline-none focus:ring-1 focus:ring-ring placeholder:text-muted-foreground"
                />
                <Button size="icon" variant="outline" className="border-border text-primary hover:bg-muted h-8 w-8">
                  <MapPin className="h-3.5 w-3.5" />
                </Button>
              </div>
            </div>

            {/* Waste type chips */}
            <div>
              <label className="text-[10px] text-muted-foreground uppercase tracking-wider font-medium block mb-1.5">Waste Type</label>
              <div className="flex flex-wrap gap-1.5">
                {wasteTypes.map(t => (
                  <button
                    key={t}
                    onClick={() => setSelectedType(t)}
                    className={`px-2.5 py-1 rounded-full text-[10px] font-medium transition-all ${
                      selectedType === t
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted text-muted-foreground hover:bg-muted/80'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            {/* Severity */}
            <div>
              <label className="text-[10px] text-muted-foreground uppercase tracking-wider font-medium block mb-1.5">
                Severity: <span className="text-foreground">{severity}</span>
              </label>
              <div className="flex gap-1.5">
                {[1, 2, 3, 4, 5].map(s => (
                  <button
                    key={s}
                    onClick={() => setSeverity(s)}
                    className={`flex-1 py-1.5 rounded-md text-[10px] font-bold transition-all ${
                      s === severity
                        ? s <= 2 ? 'bg-success text-success-foreground' : s <= 3 ? 'bg-warning text-warning-foreground' : 'bg-destructive text-destructive-foreground'
                        : 'bg-muted text-muted-foreground hover:bg-muted/80'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="text-[10px] text-muted-foreground uppercase tracking-wider font-medium block mb-1">Description</label>
              <textarea
                rows={2}
                placeholder="Brief description..."
                className="w-full bg-input text-foreground text-xs rounded-md px-3 py-2 border border-border outline-none focus:ring-1 focus:ring-ring placeholder:text-muted-foreground resize-none"
              />
            </div>

            <Button onClick={submit} size="sm" className="w-full bg-primary text-primary-foreground hover:bg-primary/90 text-xs">
              <Send className="h-3.5 w-3.5 mr-1.5" />
              Submit Report
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
