import { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, AlertTriangle, CheckCircle, Send, Loader2, Camera, Upload, X, ImagePlus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';

const wasteTypes = ['Organic', 'Plastic', 'E-Waste', 'Hazardous', 'Construction', 'Paper', 'Glass', 'Textile', 'Mixed'];

export function QuickReport() {
  const [step, setStep] = useState<'form' | 'submitting' | 'done'>('form');
  const [selectedType, setSelectedType] = useState('');
  const [severity, setSeverity] = useState(3);
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [ward, setWard] = useState('');
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [gpsLoading, setGpsLoading] = useState(false);
  const [gpsCoords, setGpsCoords] = useState<{ lat: number; lng: number } | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleImage = useCallback((file: File) => {
    if (!file.type.startsWith('image/')) return;
    const reader = new FileReader();
    reader.onload = (e) => setImagePreview(e.target?.result as string);
    reader.readAsDataURL(file);
  }, []);

  const captureGPS = useCallback(() => {
    if (!navigator.geolocation) {
      toast({ title: 'GPS not supported', description: 'Your browser does not support geolocation.' });
      return;
    }
    setGpsLoading(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setGpsCoords({ lat: pos.coords.latitude, lng: pos.coords.longitude });
        setLocation(`${pos.coords.latitude.toFixed(5)}, ${pos.coords.longitude.toFixed(5)}`);
        setGpsLoading(false);
        toast({ title: 'GPS captured', description: 'Location set from GPS coordinates.' });
      },
      (err) => {
        setGpsLoading(false);
        toast({ title: 'GPS Error', description: err.message });
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  }, []);

  const isValid = selectedType && location && ward;

  const submit = () => {
    if (!isValid) {
      toast({ title: 'Incomplete', description: 'Please fill location, ward, and waste type.' });
      return;
    }
    setStep('submitting');
    // Simulate submission
    setTimeout(() => {
      setStep('done');
      toast({ title: 'Report submitted!', description: `${selectedType} waste reported in Ward ${ward}. +25 eco-points earned.` });
    }, 1800);
  };

  const reset = () => {
    setStep('form');
    setSelectedType('');
    setSeverity(3);
    setLocation('');
    setDescription('');
    setWard('');
    setImagePreview(null);
    setGpsCoords(null);
  };

  return (
    <div className="rounded-lg bg-card border border-border p-5 card-glow">
      <div className="flex items-center gap-2 mb-4">
        <AlertTriangle className="h-4 w-4 text-warning" />
        <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Report Garbage</h3>
        <span className="ml-auto text-[10px] bg-success/10 text-success px-2 py-0.5 rounded-full font-medium">+25 pts</span>
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
            <p className="text-xs text-primary font-bold mb-2">+25 eco-points earned</p>
            {gpsCoords && (
              <p className="text-[10px] text-muted-foreground font-mono mb-4">
                📍 {gpsCoords.lat.toFixed(4)}, {gpsCoords.lng.toFixed(4)}
              </p>
            )}
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
            <p className="text-[10px] text-muted-foreground mt-1">AI is classifying and routing your report</p>
          </motion.div>
        ) : (
          <motion.div
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-3"
          >
            {/* Image Upload */}
            <div>
              <label className="text-[10px] text-muted-foreground uppercase tracking-wider font-medium block mb-1">Photo Evidence</label>
              <input
                ref={fileRef}
                type="file"
                accept="image/*"
                capture="environment"
                className="hidden"
                onChange={(e) => e.target.files?.[0] && handleImage(e.target.files[0])}
              />
              {imagePreview ? (
                <div className="relative rounded-lg overflow-hidden border border-border">
                  <img src={imagePreview} alt="Report" className="w-full h-32 object-cover" />
                  <button
                    onClick={() => { setImagePreview(null); if (fileRef.current) fileRef.current.value = ''; }}
                    className="absolute top-2 right-2 p-1 rounded-full bg-black/60 text-white hover:bg-black/80"
                  >
                    <X className="h-3 w-3" />
                  </button>
                  <div className="absolute bottom-2 left-2 bg-success/90 text-white text-[9px] px-2 py-0.5 rounded-full font-medium">
                    ✓ Photo attached
                  </div>
                </div>
              ) : (
                <div
                  onClick={() => fileRef.current?.click()}
                  className="border-2 border-dashed border-border rounded-lg p-4 text-center hover:border-primary/30 transition-colors cursor-pointer group"
                >
                  <ImagePlus className="h-6 w-6 text-muted-foreground mx-auto mb-1 group-hover:text-primary transition-colors" />
                  <p className="text-[10px] text-muted-foreground">Tap to capture or upload photo</p>
                </div>
              )}
            </div>

            {/* Location with GPS */}
            <div>
              <label className="text-[10px] text-muted-foreground uppercase tracking-wider font-medium block mb-1">Location</label>
              <div className="flex gap-2">
                <input
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Enter location or use GPS"
                  className="flex-1 bg-input text-foreground text-xs rounded-md px-3 py-2 border border-border outline-none focus:ring-1 focus:ring-ring placeholder:text-muted-foreground"
                />
                <Button
                  size="icon"
                  variant="outline"
                  onClick={captureGPS}
                  disabled={gpsLoading}
                  className="border-border text-primary hover:bg-muted h-8 w-8"
                >
                  {gpsLoading ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <MapPin className="h-3.5 w-3.5" />}
                </Button>
              </div>
              {gpsCoords && (
                <p className="text-[9px] text-success font-mono mt-1">📍 GPS: {gpsCoords.lat.toFixed(5)}, {gpsCoords.lng.toFixed(5)}</p>
              )}
            </div>

            {/* Ward */}
            <div>
              <label className="text-[10px] text-muted-foreground uppercase tracking-wider font-medium block mb-1">Ward</label>
              <select
                value={ward}
                onChange={(e) => setWard(e.target.value)}
                className="w-full bg-input text-foreground text-xs rounded-md px-3 py-2 border border-border outline-none focus:ring-1 focus:ring-ring"
              >
                <option value="">Select Ward</option>
                {[1, 2, 3, 5, 7, 9, 12, 15].map(w => (
                  <option key={w} value={w}>Ward {w}</option>
                ))}
              </select>
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
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Brief description of the waste issue..."
                className="w-full bg-input text-foreground text-xs rounded-md px-3 py-2 border border-border outline-none focus:ring-1 focus:ring-ring placeholder:text-muted-foreground resize-none"
              />
            </div>

            <Button
              onClick={submit}
              disabled={!isValid}
              size="sm"
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90 text-xs disabled:opacity-50"
            >
              <Send className="h-3.5 w-3.5 mr-1.5" />
              Submit Report
            </Button>

            {!isValid && (
              <p className="text-[9px] text-muted-foreground text-center">
                Fill location, ward, and waste type to submit
              </p>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
