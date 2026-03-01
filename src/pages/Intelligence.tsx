import { motion } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PredictiveHotspots } from '@/components/intelligence/PredictiveHotspots';
import { DigitalTwin } from '@/components/intelligence/DigitalTwin';
import { CarbonAnalytics } from '@/components/intelligence/CarbonAnalytics';
import { RecyclingRevenue } from '@/components/intelligence/RecyclingRevenue';
import { EcoCreditBoard } from '@/components/intelligence/EcoCreditBoard';
import { Flame, Box, Leaf, IndianRupee, Star } from 'lucide-react';

const IntelligencePage = () => {
  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-2xl font-bold text-foreground">Intelligence Hub</h1>
        <p className="text-sm text-muted-foreground">Predictive analytics, digital twin, carbon tracking, revenue engine & citizen gamification</p>
      </motion.div>

      <Tabs defaultValue="hotspots" className="space-y-4">
        <TabsList className="bg-muted/50 border border-border p-1 h-auto flex-wrap gap-1">
          <TabsTrigger value="hotspots" className="gap-1.5 text-xs data-[state=active]:bg-card data-[state=active]:shadow-sm">
            <Flame className="h-3.5 w-3.5" /> Predictive Hotspots
          </TabsTrigger>
          <TabsTrigger value="twin" className="gap-1.5 text-xs data-[state=active]:bg-card data-[state=active]:shadow-sm">
            <Box className="h-3.5 w-3.5" /> Digital Twin
          </TabsTrigger>
          <TabsTrigger value="carbon" className="gap-1.5 text-xs data-[state=active]:bg-card data-[state=active]:shadow-sm">
            <Leaf className="h-3.5 w-3.5" /> Carbon Analytics
          </TabsTrigger>
          <TabsTrigger value="revenue" className="gap-1.5 text-xs data-[state=active]:bg-card data-[state=active]:shadow-sm">
            <IndianRupee className="h-3.5 w-3.5" /> Revenue Engine
          </TabsTrigger>
          <TabsTrigger value="eco" className="gap-1.5 text-xs data-[state=active]:bg-card data-[state=active]:shadow-sm">
            <Star className="h-3.5 w-3.5" /> Eco Credits
          </TabsTrigger>
        </TabsList>

        <TabsContent value="hotspots"><PredictiveHotspots /></TabsContent>
        <TabsContent value="twin"><DigitalTwin /></TabsContent>
        <TabsContent value="carbon"><CarbonAnalytics /></TabsContent>
        <TabsContent value="revenue"><RecyclingRevenue /></TabsContent>
        <TabsContent value="eco"><EcoCreditBoard /></TabsContent>
      </Tabs>
    </div>
  );
};

export default IntelligencePage;
