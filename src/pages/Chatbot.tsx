import { motion } from 'framer-motion';
import { AIChatbot } from '@/components/AIChatbot';
import { ThemeToggle } from '@/components/ThemeToggle';
import { Brain, Zap, Shield, BarChart3, Truck, Leaf, MessageSquare, Sparkles } from 'lucide-react';

const capabilities = [
  { icon: BarChart3, title: 'Ward Analysis', desc: 'Deep-dive into any ward\'s performance, scores & issues', color: 'text-primary' },
  { icon: Brain, title: 'AI Predictions', desc: 'Bin overflow forecasts with probability & ETA', color: 'text-warning' },
  { icon: Truck, title: 'Route Optimization', desc: 'Smart truck routing saving 23% fuel costs', color: 'text-info' },
  { icon: Leaf, title: 'Eco Insights', desc: 'Recycling revenue, tips & citizen engagement', color: 'text-success' },
  { icon: Shield, title: 'Complaint Intel', desc: 'Real-time complaint tracking & resolution stats', color: 'text-destructive' },
  { icon: Zap, title: 'System Overview', desc: 'Full platform stats, uptime & accuracy metrics', color: 'text-primary' },
];

const ChatbotPage = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-2xl font-bold text-foreground">AI Assistant</h1>
          <p className="text-sm text-muted-foreground">Ask about waste management, ward scores, predictions, routes & system insights</p>
        </div>
        <div className="flex items-center gap-3 text-xs">
          <span className="h-2 w-2 rounded-full bg-success animate-pulse" />
          <span className="text-muted-foreground font-mono">Gemini Pro · Online</span>
          <ThemeToggle />
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Chat */}
        <div className="lg:col-span-2">
          <AIChatbot height="h-[650px]" />
        </div>

        {/* Sidebar panels */}
        <div className="space-y-4">
          {/* Capabilities */}
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="rounded-lg bg-card border border-border p-5 card-glow"
          >
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="h-4 w-4 text-primary" />
              <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Capabilities</h3>
            </div>
            <div className="space-y-2.5">
              {capabilities.map((cap, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.15 + i * 0.05 }}
                  className="flex items-start gap-3 p-2.5 rounded-md bg-muted/50 border border-border/50 hover:border-primary/20 transition-colors"
                >
                  <div className="h-7 w-7 rounded-md bg-muted flex items-center justify-center flex-shrink-0">
                    <cap.icon className={`h-3.5 w-3.5 ${cap.color}`} />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-foreground">{cap.title}</p>
                    <p className="text-[10px] text-muted-foreground leading-relaxed">{cap.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Quick stats */}
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="rounded-lg bg-card border border-border p-5 card-glow"
          >
            <div className="flex items-center gap-2 mb-3">
              <MessageSquare className="h-4 w-4 text-info" />
              <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">AI Model Info</h3>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {[
                { label: 'Model', value: 'Gemini Pro' },
                { label: 'Accuracy', value: '87%' },
                { label: 'Latency', value: '<800ms' },
                { label: 'Topics', value: '9+' },
              ].map((stat, i) => (
                <div key={i} className="p-2.5 rounded-md bg-muted/50 border border-border/50 text-center">
                  <p className="text-xs font-bold font-mono text-foreground">{stat.value}</p>
                  <p className="text-[9px] text-muted-foreground uppercase tracking-wider">{stat.label}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Tips */}
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="rounded-lg bg-primary/5 border border-primary/20 p-4"
          >
            <p className="text-xs font-semibold text-primary mb-1">Pro Tip</p>
            <p className="text-[10px] text-muted-foreground leading-relaxed">
              Type <span className="font-mono font-bold text-foreground">help</span> to see all available topics. The AI understands natural language — just ask questions in plain English!
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ChatbotPage;
