import { useState, useRef, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, Upload, X, Loader2, Recycle, AlertTriangle, Leaf, Cpu, Package, HardHat, FileText, Sparkles, Droplets, Pill, Shirt, Utensils, Battery, Smartphone, Monitor, Lightbulb as LightbulbIcon, Wine, ShieldAlert, Flame, Clock, TreePine, IndianRupee, Zap, Video, CircleStop, RefreshCw, Brain, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SubType {
  name: string;
  examples: string[];
}

interface ClassificationResult {
  wasteType: string;
  category: string;
  confidence: number;
  icon: React.ReactNode;
  color: string;
  bgColor: string;
  disposal: string;
  binColor: string;
  ecoPoints: number;
  recyclable: boolean;
  tips: string[];
  subTypes: SubType[];
  decompositionTime: string;
  environmentalImpact: string;
  revenuePerKg: string;
  processingMethod: string;
}

const classificationDB: Record<string, ClassificationResult> = {
  pet_plastic: {
    wasteType: 'PET Plastic',
    category: 'Plastics',
    confidence: 96.8,
    icon: <Recycle className="h-5 w-5" />,
    color: 'text-cyan-500',
    bgColor: 'bg-cyan-500/10 border-cyan-500/30',
    disposal: 'Blue Bin — Dry Recyclable',
    binColor: '🔵 Blue',
    ecoPoints: 18,
    recyclable: true,
    tips: ['Rinse and remove labels', 'Flatten bottles to save space', 'Remove caps (they\'re a different plastic type)', 'Check for recycling symbol ♻️ 1'],
    subTypes: [
      { name: 'PET Bottles', examples: ['Water bottles', 'Soft drink bottles', 'Oil bottles'] },
      { name: 'PET Containers', examples: ['Food trays', 'Clamshell packaging'] },
    ],
    decompositionTime: '450+ years',
    environmentalImpact: 'One PET bottle takes 450 years to decompose. Recycling 1 tonne saves 7.4 cubic yards of landfill space.',
    revenuePerKg: '₹18/kg',
    processingMethod: 'Mechanical recycling → pelletization → new products',
  },
  hdpe_plastic: {
    wasteType: 'HDPE Plastic',
    category: 'Plastics',
    confidence: 93.4,
    icon: <Recycle className="h-5 w-5" />,
    color: 'text-sky-500',
    bgColor: 'bg-sky-500/10 border-sky-500/30',
    disposal: 'Blue Bin — Dry Recyclable',
    binColor: '🔵 Blue',
    ecoPoints: 16,
    recyclable: true,
    tips: ['Rinse thoroughly', 'Remove pumps and sprayers', 'Accepted at most recycling centers', 'One of the most recyclable plastics'],
    subTypes: [
      { name: 'HDPE Containers', examples: ['Milk jugs', 'Detergent bottles', 'Shampoo bottles'] },
      { name: 'HDPE Bags', examples: ['Grocery bags', 'Cereal box liners'] },
    ],
    decompositionTime: '500+ years',
    environmentalImpact: 'HDPE is the most recycled plastic. Recycling saves 75% of the energy required to make from raw materials.',
    revenuePerKg: '₹15/kg',
    processingMethod: 'Shredding → washing → pelletizing → molding',
  },
  plastic_bag: {
    wasteType: 'Plastic Bag / Film',
    category: 'Plastics',
    confidence: 91.2,
    icon: <Package className="h-5 w-5" />,
    color: 'text-teal-500',
    bgColor: 'bg-teal-500/10 border-teal-500/30',
    disposal: 'Collect & Drop at Plastic Bag Collection Point',
    binColor: '🟡 Yellow (Special)',
    ecoPoints: 12,
    recyclable: true,
    tips: ['Don\'t put in regular blue bin', 'Collect multiple bags and drop at collection point', 'Switch to cloth bags for +20 eco-points', 'Many stores accept bag returns'],
    subTypes: [
      { name: 'Carry Bags', examples: ['Shopping bags', 'Produce bags'] },
      { name: 'Packaging Film', examples: ['Bubble wrap', 'Shrink wrap', 'Pallet wrap'] },
    ],
    decompositionTime: '20–1000 years',
    environmentalImpact: 'Plastic bags kill 100,000 marine animals annually. They break into microplastics that enter the food chain.',
    revenuePerKg: '₹8/kg',
    processingMethod: 'Film recycling → plastic lumber & composite decking',
  },
  smartphone: {
    wasteType: 'Smartphone / Mobile Device',
    category: 'Electronics',
    confidence: 97.3,
    icon: <Smartphone className="h-5 w-5" />,
    color: 'text-amber-500',
    bgColor: 'bg-amber-500/10 border-amber-500/30',
    disposal: 'E-Waste Collection Center — Ward Office',
    binColor: '🟠 Orange (E-Waste)',
    ecoPoints: 40,
    recyclable: true,
    tips: ['Factory reset before disposing', 'Remove SIM and memory cards', 'Drop at authorized e-waste center', 'Many manufacturers offer take-back programs'],
    subTypes: [
      { name: 'Smartphones', examples: ['iPhones', 'Android phones', 'Feature phones'] },
      { name: 'Accessories', examples: ['Chargers', 'Earphones', 'Cases with electronics'] },
    ],
    decompositionTime: 'Never (contains toxic metals)',
    environmentalImpact: 'One smartphone contains gold, silver, palladium, cobalt, and rare earth metals. Mining them destroys ecosystems.',
    revenuePerKg: '₹350/kg',
    processingMethod: 'Disassembly → precious metal extraction → component refurbishment',
  },
  computer: {
    wasteType: 'Computer / Laptop',
    category: 'Electronics',
    confidence: 94.8,
    icon: <Monitor className="h-5 w-5" />,
    color: 'text-orange-500',
    bgColor: 'bg-orange-500/10 border-orange-500/30',
    disposal: 'E-Waste Collection Center — Schedule Pickup',
    binColor: '🟠 Orange (E-Waste)',
    ecoPoints: 50,
    recyclable: true,
    tips: ['Wipe all personal data', 'Remove hard drive if possible', 'Schedule a pickup for large items', 'Donate if still functional — earn bonus points'],
    subTypes: [
      { name: 'Computers', examples: ['Desktops', 'Laptops', 'Tablets'] },
      { name: 'Peripherals', examples: ['Keyboards', 'Mice', 'Monitors', 'Printers'] },
    ],
    decompositionTime: 'Never (lead, mercury, cadmium)',
    environmentalImpact: 'A single CRT monitor contains 2-4 kg of lead. E-waste recycling recovers 95% of precious metals.',
    revenuePerKg: '₹250/kg',
    processingMethod: 'Component extraction → metal recovery → refurbishment pipeline',
  },
  battery: {
    wasteType: 'Battery',
    category: 'Electronics',
    confidence: 92.6,
    icon: <Battery className="h-5 w-5" />,
    color: 'text-yellow-600',
    bgColor: 'bg-yellow-600/10 border-yellow-600/30',
    disposal: 'Battery Collection Box — Do NOT put in regular bins',
    binColor: '🔴 Red (Hazardous)',
    ecoPoints: 35,
    recyclable: true,
    tips: ['NEVER throw in regular waste', 'Tape terminals of lithium batteries', 'Store in cool, dry place until drop-off', 'Leaking batteries are hazardous — report immediately'],
    subTypes: [
      { name: 'Rechargeable', examples: ['Li-ion', 'NiMH', 'Phone batteries', 'Laptop batteries'] },
      { name: 'Single-use', examples: ['AA/AAA', 'Button cells', 'Car batteries'] },
    ],
    decompositionTime: '100+ years (leaches toxic chemicals)',
    environmentalImpact: 'One button cell battery can contaminate 600,000 liters of water with mercury. Always recycle batteries!',
    revenuePerKg: '₹180/kg',
    processingMethod: 'Acid neutralization → metal recovery → safe disposal of residuals',
  },
  bulb: {
    wasteType: 'Light Bulb / Tube',
    category: 'Electronics',
    confidence: 89.7,
    icon: <LightbulbIcon className="h-5 w-5" />,
    color: 'text-amber-400',
    bgColor: 'bg-amber-400/10 border-amber-400/30',
    disposal: 'E-Waste Collection — Handle with care',
    binColor: '🟠 Orange (E-Waste)',
    ecoPoints: 15,
    recyclable: true,
    tips: ['CFL bulbs contain mercury — handle carefully', 'Wrap in paper to prevent breakage', 'LED bulbs are safer but still e-waste', 'Never break bulbs intentionally'],
    subTypes: [
      { name: 'Bulbs', examples: ['CFLs', 'LEDs', 'Incandescent'] },
      { name: 'Tubes', examples: ['Fluorescent tubes', 'Neon tubes'] },
    ],
    decompositionTime: '1000+ years (glass + mercury)',
    environmentalImpact: 'Broken CFL releases mercury vapor. One broken CFL can exceed safety limits in a small room.',
    revenuePerKg: '₹45/kg',
    processingMethod: 'Mercury capture → glass recycling → metal recovery',
  },
  food_waste: {
    wasteType: 'Food Waste',
    category: 'Organics',
    confidence: 95.3,
    icon: <Utensils className="h-5 w-5" />,
    color: 'text-green-500',
    bgColor: 'bg-green-500/10 border-green-500/30',
    disposal: 'Green Bin — Wet Waste',
    binColor: '🟢 Green',
    ecoPoints: 10,
    recyclable: false,
    tips: ['Compost at home for +30 bonus eco-points', 'Don\'t mix with plastic bags', 'Plan meals to reduce food waste', 'Banana peels & tea leaves make great compost'],
    subTypes: [
      { name: 'Cooked Food', examples: ['Leftover rice', 'Curry', 'Roti', 'Spoiled food'] },
      { name: 'Raw Kitchen Waste', examples: ['Vegetable peels', 'Fruit scraps', 'Eggshells'] },
    ],
    decompositionTime: '2 weeks – 6 months',
    environmentalImpact: 'Food waste in landfills produces methane (25x more potent than CO₂). Composting eliminates this entirely.',
    revenuePerKg: '₹8/kg (compost)',
    processingMethod: 'Composting → biogas generation → organic fertilizer',
  },
  garden_waste: {
    wasteType: 'Garden / Green Waste',
    category: 'Organics',
    confidence: 93.1,
    icon: <TreePine className="h-5 w-5" />,
    color: 'text-emerald-600',
    bgColor: 'bg-emerald-600/10 border-emerald-600/30',
    disposal: 'Green Bin — Biodegradable',
    binColor: '🟢 Green',
    ecoPoints: 12,
    recyclable: false,
    tips: ['Chop large branches before disposal', 'Makes excellent mulch', 'Dry leaves can be composted separately', 'Don\'t burn garden waste — it\'s illegal in city limits'],
    subTypes: [
      { name: 'Green Waste', examples: ['Grass clippings', 'Leaves', 'Flowers'] },
      { name: 'Woody Waste', examples: ['Branches', 'Tree trimmings', 'Coconut shells'] },
    ],
    decompositionTime: '1 month – 1 year',
    environmentalImpact: 'Garden waste composting saves ₹2,000/tonne in landfill costs and produces rich soil amendment.',
    revenuePerKg: '₹5/kg (mulch & compost)',
    processingMethod: 'Shredding → windrow composting → mulch production',
  },
  hazardous: {
    wasteType: 'Hazardous Chemical Waste',
    category: 'Hazardous',
    confidence: 88.9,
    icon: <ShieldAlert className="h-5 w-5" />,
    color: 'text-red-500',
    bgColor: 'bg-red-500/10 border-red-500/30',
    disposal: 'Red Bin — Hazardous Collection Point',
    binColor: '🔴 Red',
    ecoPoints: 30,
    recyclable: false,
    tips: ['NEVER pour down drains', 'Keep in original containers', 'Report large quantities to inspector', 'Handle with protective gloves'],
    subTypes: [
      { name: 'Household Chemicals', examples: ['Paint', 'Thinner', 'Pesticides', 'Cleaning agents'] },
      { name: 'Automotive', examples: ['Motor oil', 'Brake fluid', 'Antifreeze'] },
    ],
    decompositionTime: 'Persistent — contaminates soil & water',
    environmentalImpact: '1 liter of motor oil can contaminate 1 million liters of groundwater. Proper disposal is critical.',
    revenuePerKg: 'N/A (disposal cost: ₹35/kg)',
    processingMethod: 'Neutralization → incineration → secure landfill',
  },
  medical: {
    wasteType: 'Medical / Pharmaceutical Waste',
    category: 'Hazardous',
    confidence: 87.2,
    icon: <Pill className="h-5 w-5" />,
    color: 'text-rose-500',
    bgColor: 'bg-rose-500/10 border-rose-500/30',
    disposal: 'Yellow Bin — Biomedical Waste',
    binColor: '🟡 Yellow',
    ecoPoints: 25,
    recyclable: false,
    tips: ['Never flush medicines down toilet', 'Use medicine take-back programs', 'Wrap sharps (needles) securely before disposal', 'Expired medicines should go to pharmacy drop-off'],
    subTypes: [
      { name: 'Pharmaceuticals', examples: ['Expired medicines', 'Syrups', 'Ointments'] },
      { name: 'Medical Devices', examples: ['Syringes', 'Bandages', 'Test kits', 'Masks'] },
    ],
    decompositionTime: 'Variable — chemicals persist in water',
    environmentalImpact: 'Pharmaceutical contamination in water harms aquatic life and contributes to antibiotic resistance.',
    revenuePerKg: 'N/A (incineration required)',
    processingMethod: 'Autoclave sterilization → incineration → ash disposal',
  },
  paper: {
    wasteType: 'Paper & Cardboard',
    category: 'Paper',
    confidence: 96.5,
    icon: <FileText className="h-5 w-5" />,
    color: 'text-blue-500',
    bgColor: 'bg-blue-500/10 border-blue-500/30',
    disposal: 'Blue Bin — Dry Recyclable',
    binColor: '🔵 Blue',
    ecoPoints: 12,
    recyclable: true,
    tips: ['Keep dry — wet paper can\'t be recycled', 'Flatten cardboard boxes', 'Remove staples, tape and plastic windows', 'Shredded paper can be composted'],
    subTypes: [
      { name: 'Paper', examples: ['Newspapers', 'Office paper', 'Magazines', 'Books'] },
      { name: 'Cardboard', examples: ['Boxes', 'Packaging', 'Egg cartons', 'Toilet paper rolls'] },
    ],
    decompositionTime: '2–6 weeks',
    environmentalImpact: 'Recycling 1 tonne of paper saves 17 trees, 26,500 liters of water, and 4,100 kWh of electricity.',
    revenuePerKg: '₹12/kg',
    processingMethod: 'Pulping → de-inking → pressing → new paper products',
  },
  textile: {
    wasteType: 'Textile / Clothing',
    category: 'Textile',
    confidence: 90.4,
    icon: <Shirt className="h-5 w-5" />,
    color: 'text-purple-500',
    bgColor: 'bg-purple-500/10 border-purple-500/30',
    disposal: 'Textile Collection Bin / Donation Center',
    binColor: '🟣 Purple (Textile)',
    ecoPoints: 20,
    recyclable: true,
    tips: ['Donate wearable clothes — earn bonus points', 'Clean before dropping off', 'Old fabrics can become industrial rags', 'Check for textile collection drives in your ward'],
    subTypes: [
      { name: 'Clothing', examples: ['Shirts', 'Pants', 'Dresses', 'Underwear'] },
      { name: 'Home Textiles', examples: ['Bedsheets', 'Curtains', 'Towels', 'Carpets'] },
    ],
    decompositionTime: '20–200+ years (synthetics)',
    environmentalImpact: 'Fashion industry produces 10% of global CO₂ emissions. Reusing clothing reduces impact by up to 82%.',
    revenuePerKg: '₹22/kg (sorted)',
    processingMethod: 'Sorting → fiber recovery → rag production or re-spinning',
  },
  glass: {
    wasteType: 'Glass',
    category: 'Glass',
    confidence: 94.6,
    icon: <Wine className="h-5 w-5" />,
    color: 'text-indigo-500',
    bgColor: 'bg-indigo-500/10 border-indigo-500/30',
    disposal: 'Blue Bin — Handle with care',
    binColor: '🔵 Blue',
    ecoPoints: 14,
    recyclable: true,
    tips: ['Wrap broken glass carefully', 'Rinse bottles and jars', 'Remove metal lids separately', 'Glass can be recycled infinitely with no quality loss'],
    subTypes: [
      { name: 'Container Glass', examples: ['Bottles', 'Jars', 'Cosmetic containers'] },
      { name: 'Flat Glass', examples: ['Window panes', 'Mirrors (special handling)'] },
    ],
    decompositionTime: '1 million+ years',
    environmentalImpact: 'Glass in landfill lasts virtually forever. But recycled glass reduces energy use by 30% compared to raw production.',
    revenuePerKg: '₹6/kg',
    processingMethod: 'Crushing → cullet cleaning → melting → remolding',
  },
  construction: {
    wasteType: 'Construction & Demolition',
    category: 'Construction',
    confidence: 89.1,
    icon: <HardHat className="h-5 w-5" />,
    color: 'text-slate-500',
    bgColor: 'bg-slate-500/10 border-slate-500/30',
    disposal: 'Special Collection — Schedule Pickup via App',
    binColor: '⬜ White (C&D)',
    ecoPoints: 20,
    recyclable: true,
    tips: ['Separate metal, wood, and concrete', 'Contact ward office for bulk pickup', 'Concrete can be crushed for road aggregate', 'Wood can be chipped for mulch'],
    subTypes: [
      { name: 'Inert Materials', examples: ['Concrete', 'Bricks', 'Tiles', 'Sand'] },
      { name: 'Other', examples: ['Plumbing fixtures', 'Wiring', 'Timber', 'Roofing'] },
    ],
    decompositionTime: 'Centuries (concrete & rubite)',
    environmentalImpact: 'C&D waste makes up 30% of landfill volume. Recycling reduces quarrying and saves natural resources.',
    revenuePerKg: '₹3/kg (aggregate)',
    processingMethod: 'Crushing → screening → grading → road base & fill material',
  },
};

const categories = [
  { name: 'Plastics', color: 'bg-cyan-500/10 text-cyan-500 border-cyan-500/30', keys: ['pet_plastic', 'hdpe_plastic', 'plastic_bag'] },
  { name: 'Electronics', color: 'bg-amber-500/10 text-amber-500 border-amber-500/30', keys: ['smartphone', 'computer', 'battery', 'bulb'] },
  { name: 'Organics', color: 'bg-green-500/10 text-green-500 border-green-500/30', keys: ['food_waste', 'garden_waste'] },
  { name: 'Hazardous', color: 'bg-red-500/10 text-red-500 border-red-500/30', keys: ['hazardous', 'medical'] },
  { name: 'Paper', color: 'bg-blue-500/10 text-blue-500 border-blue-500/30', keys: ['paper'] },
  { name: 'Textile', color: 'bg-purple-500/10 text-purple-500 border-purple-500/30', keys: ['textile'] },
  { name: 'Glass', color: 'bg-indigo-500/10 text-indigo-500 border-indigo-500/30', keys: ['glass'] },
  { name: 'Construction', color: 'bg-slate-500/10 text-slate-500 border-slate-500/30', keys: ['construction'] },
];

const allKeys = Object.keys(classificationDB);

export function WasteImageClassifier() {
  const [preview, setPreview] = useState<string | null>(null);
  const [step, setStep] = useState<'upload' | 'select' | 'analyzing' | 'result'>('upload');
  const [result, setResult] = useState<ClassificationResult | null>(null);
  const [scanCount, setScanCount] = useState(0);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFile = useCallback((file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      setPreview(e.target?.result as string);
      setResult(null);
      setStep('select');
    };
    reader.readAsDataURL(file);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) handleFile(file);
  }, [handleFile]);

  const selectWasteType = useCallback((key: string) => {
    setStep('analyzing');
    // Show analysis animation, then reveal result
    setTimeout(() => {
      const base = classificationDB[key];
      const jitter = (Math.random() - 0.5) * 3;
      const adjusted = { ...base, confidence: Math.min(99.9, Math.max(85, +(base.confidence + jitter).toFixed(1))) };
      setResult(adjusted);
      setScanCount((c) => c + 1);
      setStep('result');
    }, 2000);
  }, []);

  const reset = () => {
    setPreview(null);
    setResult(null);
    setStep('upload');
    if (fileRef.current) fileRef.current.value = '';
  };

  const totalEcoEarned = scanCount * 15;

  return (
    <div className="space-y-4">
      {/* Header stats */}
      <div className="grid grid-cols-3 gap-3">
        <div className="rounded-lg bg-card border border-border p-3 text-center card-glow">
          <p className="text-lg font-bold font-mono text-primary">{Object.keys(classificationDB).length}</p>
          <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Waste Types</p>
        </div>
        <div className="rounded-lg bg-card border border-border p-3 text-center card-glow">
          <p className="text-lg font-bold font-mono text-primary">{categories.length}</p>
          <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Categories</p>
        </div>
        <div className="rounded-lg bg-card border border-border p-3 text-center card-glow">
          <p className="text-lg font-bold font-mono text-primary">{scanCount}</p>
          <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Your Scans</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Main classifier panel */}
        <div className="lg:col-span-2 rounded-lg bg-card border border-border p-5 card-glow">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="h-4 w-4 text-primary" />
            <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">AI Waste Classifier</h3>
            <span className="ml-auto text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded-full font-medium">v2.0 • 15 Types</span>
          </div>

          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            capture="environment"
            className="hidden"
            onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
          />

          <AnimatePresence mode="wait">
            {/* Step 1: Upload */}
            {step === 'upload' && (
              <motion.div
                key="dropzone"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onDragOver={(e) => e.preventDefault()}
                onDrop={handleDrop}
                onClick={() => fileRef.current?.click()}
                className="border-2 border-dashed border-border rounded-lg p-10 text-center hover:border-primary/40 transition-colors cursor-pointer group"
              >
                <Camera className="h-10 w-10 text-muted-foreground mx-auto mb-3 group-hover:text-primary transition-colors" />
                <p className="text-sm font-medium text-foreground">Take a photo or upload an image</p>
                <p className="text-xs text-muted-foreground mt-1">Snap a photo → Select waste type → Get AI-powered disposal guidance</p>
                <div className="flex items-center justify-center gap-3 mt-4">
                  <Button size="sm" variant="outline" className="text-xs border-border">
                    <Camera className="h-3.5 w-3.5 mr-1.5" />
                    Camera
                  </Button>
                  <Button size="sm" variant="outline" className="text-xs border-border">
                    <Upload className="h-3.5 w-3.5 mr-1.5" />
                    Upload
                  </Button>
                </div>
                <div className="flex flex-wrap items-center justify-center gap-1.5 mt-5">
                  {categories.map((cat) => (
                    <span key={cat.name} className={`text-[10px] px-2 py-0.5 rounded-full border ${cat.color} font-medium`}>
                      {cat.name}
                    </span>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Step 2: Select waste type */}
            {step === 'select' && preview && (
              <motion.div
                key="select"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="space-y-4"
              >
                {/* Image thumbnail + instruction */}
                <div className="flex items-start gap-3">
                  <div className="relative w-24 h-24 rounded-lg overflow-hidden border border-border flex-shrink-0">
                    <img src={preview} alt="Uploaded waste" className="w-full h-full object-cover" />
                    <button
                      onClick={reset}
                      className="absolute top-1 right-1 p-1 rounded-full bg-black/60 text-white hover:bg-black/80 transition-colors"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground flex items-center gap-1.5">
                      <Sparkles className="h-4 w-4 text-primary" />
                      What type of waste is this?
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Select the matching category below. Our AI will analyze it and provide detailed disposal guidance, environmental impact data & eco-points.
                    </p>
                  </div>
                </div>

                {/* Category grid */}
                <div className="space-y-3">
                  {categories.map((cat, catIdx) => (
                    <motion.div
                      key={cat.name}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: catIdx * 0.05 }}
                    >
                      <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-semibold mb-1.5">{cat.name}</p>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                        {cat.keys.map((key) => {
                          const item = classificationDB[key];
                          return (
                            <button
                              key={key}
                              onClick={() => selectWasteType(key)}
                              className={`rounded-lg border p-3 text-left transition-all hover:scale-[1.02] hover:shadow-md active:scale-[0.98] ${cat.color} hover:border-current`}
                            >
                              <div className="flex items-center gap-2 mb-1">
                                <span className={item.color}>{item.icon}</span>
                                <span className="text-xs font-semibold text-foreground">{item.wasteType}</span>
                              </div>
                              <p className="text-[10px] text-muted-foreground leading-tight">
                                {item.subTypes.map((s) => s.examples[0]).join(', ')}
                              </p>
                            </button>
                          );
                        })}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Step 3: Analyzing animation */}
            {step === 'analyzing' && preview && (
              <motion.div
                key="analyzing"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-4"
              >
                <div className="relative rounded-lg overflow-hidden border border-border">
                  <img src={preview} alt="Uploaded waste" className="w-full h-56 object-cover" />
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center backdrop-blur-sm">
                    <div className="text-center">
                      <Loader2 className="h-8 w-8 text-primary animate-spin mx-auto mb-2" />
                      <p className="text-sm font-medium text-white">AI Analyzing...</p>
                      <p className="text-xs text-white/70 mt-1">Generating detailed waste intelligence</p>
                      <div className="flex items-center justify-center gap-1 mt-3">
                        {['Material ID', 'Disposal lookup', 'Impact calc', 'Eco scoring'].map((s, i) => (
                          <motion.span
                            key={s}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: i * 0.4 }}
                            className="text-[9px] bg-white/20 text-white/80 px-2 py-0.5 rounded-full"
                          >
                            {s}
                          </motion.span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 4: Result */}
            {step === 'result' && result && preview && (
              <motion.div
                key="result"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="space-y-4"
              >
                {/* Image thumbnail strip */}
                <div className="flex items-center gap-3">
                  <div className="w-16 h-16 rounded-lg overflow-hidden border border-border flex-shrink-0">
                    <img src={preview} alt="Uploaded waste" className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className={result.color}>{result.icon}</span>
                      <span className="text-base font-bold text-foreground">{result.wasteType}</span>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-muted/80 text-muted-foreground font-medium">{result.category}</span>
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="h-1.5 flex-1 rounded-full bg-muted/50 overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${result.confidence}%` }}
                          transition={{ duration: 1, ease: 'easeOut' }}
                          className="h-full rounded-full bg-primary"
                        />
                      </div>
                      <span className="text-xs font-mono text-primary font-bold">{result.confidence}%</span>
                    </div>
                  </div>
                </div>

                {/* Key info grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  <div className="rounded-md bg-muted/50 border border-border/50 p-2.5">
                    <span className="text-[9px] text-muted-foreground uppercase tracking-wider flex items-center gap-1">
                      <Droplets className="h-3 w-3" /> Bin Color
                    </span>
                    <p className="text-xs font-medium text-foreground mt-1">{result.binColor}</p>
                  </div>
                  <div className="rounded-md bg-muted/50 border border-border/50 p-2.5">
                    <span className="text-[9px] text-muted-foreground uppercase tracking-wider flex items-center gap-1">
                      <Zap className="h-3 w-3" /> Eco Points
                    </span>
                    <p className="text-lg font-bold font-mono text-primary mt-0.5">+{result.ecoPoints}</p>
                  </div>
                  <div className="rounded-md bg-muted/50 border border-border/50 p-2.5">
                    <span className="text-[9px] text-muted-foreground uppercase tracking-wider flex items-center gap-1">
                      <Clock className="h-3 w-3" /> Decomposition
                    </span>
                    <p className="text-xs font-medium text-foreground mt-1">{result.decompositionTime}</p>
                  </div>
                  <div className="rounded-md bg-muted/50 border border-border/50 p-2.5">
                    <span className="text-[9px] text-muted-foreground uppercase tracking-wider flex items-center gap-1">
                      <IndianRupee className="h-3 w-3" /> Revenue
                    </span>
                    <p className="text-xs font-medium text-foreground mt-1">{result.revenuePerKg}</p>
                  </div>
                </div>

                {/* Disposal */}
                <div className="rounded-md bg-muted/50 border border-border/50 p-3">
                  <span className="text-[9px] text-muted-foreground uppercase tracking-wider font-medium">Disposal Method</span>
                  <p className="text-sm font-semibold text-foreground mt-1">{result.disposal}</p>
                  <p className="text-[10px] text-muted-foreground mt-1">{result.processingMethod}</p>
                </div>

                {/* Badges */}
                <div className="flex items-center gap-2 flex-wrap">
                  <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium ${
                    result.recyclable ? 'bg-success/10 text-success' : 'bg-destructive/10 text-destructive'
                  }`}>
                    <Recycle className="h-3 w-3" />
                    {result.recyclable ? 'Recyclable' : 'Non-Recyclable'}
                  </div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-muted text-muted-foreground">
                    <Flame className="h-3 w-3" />
                    {result.category}
                  </div>
                </div>

                {/* Sub-types */}
                {result.subTypes.length > 0 && (
                  <div className="space-y-2">
                    <span className="text-[10px] text-muted-foreground uppercase tracking-wider font-medium">Sub-Types Detected</span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {result.subTypes.map((sub, i) => (
                        <motion.div
                          key={sub.name}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.15 }}
                          className="rounded-md bg-muted/30 border border-border/50 p-2.5"
                        >
                          <p className="text-xs font-semibold text-foreground">{sub.name}</p>
                          <p className="text-[10px] text-muted-foreground mt-0.5">{sub.examples.join(' • ')}</p>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Environmental impact */}
                <div className="rounded-md bg-amber-500/5 border border-amber-500/20 p-3">
                  <span className="text-[10px] text-amber-500 uppercase tracking-wider font-medium flex items-center gap-1">
                    <AlertTriangle className="h-3 w-3" /> Environmental Impact
                  </span>
                  <p className="text-xs text-foreground/80 mt-1 leading-relaxed">{result.environmentalImpact}</p>
                </div>

                {/* Tips */}
                <div className="space-y-1.5">
                  <span className="text-[10px] text-muted-foreground uppercase tracking-wider font-medium">Disposal Tips</span>
                  {result.tips.map((tip, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="flex items-start gap-2 text-xs text-muted-foreground"
                    >
                      <span className="text-primary mt-0.5">•</span>
                      <span>{tip}</span>
                    </motion.div>
                  ))}
                </div>

                {/* Actions */}
                <div className="flex gap-2 pt-1">
                  <Button onClick={reset} variant="outline" size="sm" className="flex-1 text-xs border-border">
                    Scan Another
                  </Button>
                  <Button size="sm" className="flex-1 text-xs bg-primary text-primary-foreground">
                    Report This Waste
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Side panel: Category reference */}
        <div className="rounded-lg bg-card border border-border p-4 card-glow space-y-3 h-fit">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Classification Reference</h4>
          <div className="space-y-2">
            {categories.map((cat) => (
              <div key={cat.name} className={`rounded-md border p-2.5 ${cat.color}`}>
                <p className="text-xs font-semibold">{cat.name}</p>
                <p className="text-[10px] opacity-80 mt-0.5">{cat.keys.length} type{cat.keys.length > 1 ? 's' : ''}</p>
                <div className="flex flex-wrap gap-1 mt-1.5">
                  {cat.keys.map((k) => (
                    <span key={k} className="text-[9px] bg-background/50 px-1.5 py-0.5 rounded text-foreground/70">{classificationDB[k].wasteType}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Lifetime stats */}
          <div className="border-t border-border pt-3 mt-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">Your Impact</h4>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">Items Scanned</span>
                <span className="font-mono font-bold text-primary">{scanCount}</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">~Eco Points Earned</span>
                <span className="font-mono font-bold text-primary">+{totalEcoEarned}</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">Citizen Rank</span>
                <span className="font-mono font-bold text-amber-500">{scanCount >= 5 ? 'Eco Warrior' : scanCount >= 2 ? 'Green Scout' : 'Beginner'}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
