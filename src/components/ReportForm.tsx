import { useState } from 'react';
import { motion } from 'framer-motion';
import { Camera, MapPin, Upload, AlertTriangle, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function ReportForm() {
  const [submitted, setSubmitted] = useState(false);
  const [severity, setSeverity] = useState(3);

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="rounded-lg bg-card border border-border p-8 card-glow text-center"
      >
        <CheckCircle className="h-12 w-12 text-success mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-foreground mb-2">Report Submitted</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Your report has been received. AI classification is in progress.
        </p>
        <Button onClick={() => setSubmitted(false)} variant="outline" className="border-border text-foreground hover:bg-muted">
          Submit Another
        </Button>
      </motion.div>
    );
  }

  return (
    <div className="rounded-lg bg-card border border-border p-5 card-glow">
      <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-4">Report Waste Issue</h3>
      <div className="space-y-4">
        {/* Image Upload */}
        <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary/30 transition-colors cursor-pointer">
          <Camera className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
          <p className="text-sm text-muted-foreground">Click to upload or drag image</p>
          <p className="text-[10px] text-muted-foreground mt-1">AI will auto-classify waste type</p>
        </div>

        {/* Location */}
        <div>
          <label className="text-xs font-medium text-muted-foreground block mb-1.5">Location</label>
          <div className="flex gap-2">
            <input
              placeholder="Enter location or use GPS"
              className="flex-1 bg-input text-foreground text-sm rounded-md px-3 py-2 border border-border outline-none focus:ring-1 focus:ring-ring placeholder:text-muted-foreground"
            />
            <Button size="icon" variant="outline" className="border-border text-primary hover:bg-muted">
              <MapPin className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Ward */}
        <div>
          <label className="text-xs font-medium text-muted-foreground block mb-1.5">Ward</label>
          <select className="w-full bg-input text-foreground text-sm rounded-md px-3 py-2 border border-border outline-none focus:ring-1 focus:ring-ring">
            <option value="">Select Ward</option>
            {[1, 2, 3, 5, 7, 9, 12, 15].map(w => (
              <option key={w} value={w}>Ward {w}</option>
            ))}
          </select>
        </div>

        {/* Severity */}
        <div>
          <label className="text-xs font-medium text-muted-foreground block mb-1.5">Severity: {severity}</label>
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map(s => (
              <button
                key={s}
                onClick={() => setSeverity(s)}
                className={`flex-1 py-2 rounded-md text-xs font-bold transition-all ${
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
          <label className="text-xs font-medium text-muted-foreground block mb-1.5">Description</label>
          <textarea
            rows={3}
            placeholder="Describe the waste issue..."
            className="w-full bg-input text-foreground text-sm rounded-md px-3 py-2 border border-border outline-none focus:ring-1 focus:ring-ring placeholder:text-muted-foreground resize-none"
          />
        </div>

        <Button onClick={() => setSubmitted(true)} className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
          <Upload className="h-4 w-4 mr-2" />
          Submit Report
        </Button>
      </div>
    </div>
  );
}
