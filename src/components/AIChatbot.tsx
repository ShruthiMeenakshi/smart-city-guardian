import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Bot, User, Sparkles, Lightbulb, Trash2, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Msg {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const sampleResponses: Record<string, string> = {
  'default': "I'm the MadurAI assistant. I can help you understand ward scores, waste management practices, recycling methods, route optimization, predictions, complaints, and more. What would you like to know?",
  'ward 12': "**Ward 12 — Anna Nagar** currently ranks low with a governance score of **45/100**.\n\n📊 Key Issues:\n• High recurrence rate: 35% of reports are repeat issues\n• Slow resolution: Average 7.3 hours vs city target of 3 hours\n• Low citizen participation: Only 32% engagement\n• 89 total reports with only 40 resolved\n\n✅ Recommendation: Deploy additional collection crews and launch a citizen awareness campaign in Anna Nagar.",
  'ward 1': "**Ward 1 — Meenakshi Ward** is the top-performing ward with **92/100** 🥇\n\n📊 Strengths:\n• Fastest resolution time: 2.1 hours (well under 3h target)\n• 93% report resolution rate (42 of 45)\n• 78% citizen participation — highest in the city\n• Only 5% recurrence rate\n\nThe Temple trust partnership and active resident associations make this a model ward for others to emulate.",
  'ward 3': "**Ward 3 — Thiruparankundram** scores **61/100** and is trending **↓ downward**.\n\n⚠️ Concerns:\n• 5.2 hour resolution time (target: 3h)\n• 22% recurrence rate — repeat offenders near school zone\n• Active illegal dump detected on Main Rd (Severity 5)\n• Only 45% participation rate\n\n🚨 An illegal hazardous dump near the school zone needs immediate priority action.",
  'ward 5': "**Ward 5 — Periyar Ward** scores **54/100** — second lowest in the city.\n\n⚠️ Critical Issues:\n• 6.1 hour average resolution (worst in city)\n• 28% recurrence — highest repeat problem rate\n• Only 38% citizen participation\n• E-Waste illegal dump at Periyar Bus Stand (Severity 5)\n\n💡 Recommended: E-Waste collection drive + dedicated inspector patrol + citizen awareness boards at bus stand.",
  'recycling': "♻️ **Madurai's Circular Economy Potential:**\n\n| Stream | Revenue | Impact |\n|--------|---------|--------|\n| Plastic | ₹18/kg | 72% reduction |\n| Organic | ₹8/kg | Creates 120 jobs |\n| E-Waste | ₹250/kg | Highest value |\n| Paper | ₹12/kg | 65% reduction |\n\n💰 Total estimated monthly revenue: **₹4.2 lakhs** across all waste streams.\n\nTip: E-Waste recovery offers the highest return per kilogram.",
  'route': "🚛 **Today's Optimized Routes** prioritize 3 critical hotspots:\n\n1. **Periyar Bus Stand** (Severity 5, E-Waste) — 2hr to overflow\n2. **Thiruparankundram Main Rd** (Severity 5, Hazardous) — 4hr to overflow\n3. **Pasumalai Hill Base** (Severity 4, Mixed) — Active dump\n\n⛽ Optimized routing saves approximately **23% fuel** compared to sequential collection.\n\nAll routes factor in real-time traffic from Google Maps API.",
  'prediction': "🧠 **AI Predictions (Next 24h):**\n\n• **Periyar Bus Stand** — 92% overflow probability (2h)\n• **Thiruparankundram** — 89% overflow probability (4h)\n• **Anna Nagar Market** — 76% overflow probability (8h)\n• **KK Nagar Junction** — 65% overflow probability (12h)\n\nPrediction model uses sensor data, historical patterns, weather, and event schedules. Current accuracy: **87%**.",
  'complaint': "📋 **Complaint System Overview:**\n\nActive Complaints: **6** across 8 wards\n• Pending: 3 (awaiting inspector assignment)\n• Assigned: 2 (inspectors dispatched)\n• In-Progress: 1 (resolution underway)\n\n⚠️ 3 reports flagged as illegal dumping (Severity 5)\n\nAverage resolution time: **4.2 hours** (target: 3h)\nCitizen satisfaction: **78%**",
  'score': "🏆 **Ward Rankings (Top 5):**\n\n1. 🥇 Meenakshi Ward — 92/100 (↑ trending)\n2. 🥈 Teppakulam Ward — 88/100 (↑ trending)\n3. 🥉 KK Nagar Ward — 75/100 (→ stable)\n4. Tallakulam Ward — 70/100 (↑ trending)\n5. Pasumalai Ward — 67/100 (→ stable)\n\n📉 Lowest: Anna Nagar — 45/100 (needs intervention)\n\nScores factor in resolution time, citizen participation, recycling rate, and recurrence.",
  'help': "🤖 **I can help with:**\n\n• **Ward Analysis** — \"Tell me about Ward 3\" or \"Why is Ward 12 ranked low?\"\n• **Recycling Info** — \"What's the recycling revenue?\"\n• **Route Optimization** — \"Show today's truck routes\"\n• **AI Predictions** — \"Which bins will overflow?\"\n• **Complaint Status** — \"How many complaints are active?\"\n• **Ward Scores** — \"Show ward rankings\"\n• **Eco Tips** — \"How can citizens help?\"\n• **System Stats** — \"Show system overview\"\n• **Illegal Dumping** — \"Where is illegal dumping happening?\"\n• **Vehicles** — \"What's the vehicle fleet status?\"\n• **Weather Impact** — \"How does weather affect waste?\"\n• **Sensors** — \"How do smart bins work?\"\n• **Budget** — \"What's the waste management budget?\"\n• **Compare Wards** — \"Compare Ward 1 and Ward 12\"\n• **Greetings** — Just say hi! 👋\n\nJust type naturally — I understand context!",
  'eco': "🌱 **Eco Tips for Madurai Citizens:**\n\n1. **Segregate daily** — Wet & dry waste separation (+10 pts)\n2. **Report illegal dumps** — Use the app to flag them (+25 pts)\n3. **Weekend clean-ups** — Join community drives (+50 pts)\n4. **Home composting** — Convert organic waste (+30 pts)\n5. **AI Classifier** — Use our tool to sort waste correctly (+15 pts)\n\n🎯 Your eco-points unlock rewards: Bronze (100pts) → Silver (500) → Gold (2000) → Platinum (5000)",
  'stats': "📊 **MadurAI System Overview:**\n\n• Total Wards Monitored: **8**\n• Active Reports: **6** (3 pending, 2 assigned, 1 in-progress)\n• Predictions Active: **4** hotspots\n• Vehicles in Fleet: **5** (2 available, 2 on-route, 1 maintenance)\n• City Cleanliness Score: **70/100**\n• Citizen Platform Users: **12,400+**\n• AI Model Accuracy: **87%**\n\nSystem uptime: 99.7% | Last updated: just now",
  'illegal': "🚨 **Illegal Dumping Hotspots:**\n\n3 active illegal dumping cases detected:\n\n1. **Thiruparankundram Main Rd** (Ward 3)\n   Severity 5 · Mixed Hazardous · Near school zone\n   Status: Pending · Reported 4h ago\n\n2. **Periyar Bus Stand** (Ward 5)\n   Severity 5 · E-Waste · Commercial area\n   Status: Pending · Reported 6h ago\n\n3. **Pasumalai Hill Base** (Ward 15)\n   Severity 4 · Mixed Waste · Residential area\n   Status: Pending · Reported 3h ago\n\n🏛️ All 3 cases have been flagged for commissioner review. Penalty notices can be auto-generated.",
  'vehicle': "🚛 **Vehicle Fleet Status:**\n\n| ID | Plate | Type | Status | Driver |\n|----|-------|------|--------|--------|\n| V-01 | TN-58-AG-4521 | Compactor | ✅ Available | Raman K. |\n| V-02 | TN-58-BH-7712 | Tipper | 🔵 On-Route | Suresh M. |\n| V-03 | TN-58-CJ-1190 | Compactor | ✅ Available | Anand P. |\n| V-04 | TN-58-DK-3345 | Mini Truck | 🟡 Maintenance | Karthik R. |\n| V-05 | TN-58-EL-5503 | Tipper | 🔵 On-Route | Durai S. |\n\nFleet utilization: **60%** (3 of 5 active)\nNext maintenance scheduled: V-04 returns tomorrow.",
  'weather': "🌦️ **Weather Impact on Waste Management:**\n\nCurrent: **32°C, Partly Cloudy** (Madurai)\n\n📈 Heat Impact:\n• Organic waste decomposes **40% faster** above 30°C\n• Odor complaints surge **2.5x** in summer months\n• Bin overflow risk increases by **18%** on hot days\n\n🌧️ Monsoon Season (Oct–Dec):\n• Waterlogged bins delay collection by avg **1.5 hours**\n• Drainage waste increases by **60%**\n• Mosquito breeding reported near 3 stagnant dump sites\n\n💡 AI model adjusts predictions based on 7-day weather forecasts from IMD.",
  'sensor': "📡 **Smart Bin Sensor Technology:**\n\nMadurAI uses **IoT ultrasonic sensors** in bins across 8 wards:\n\n🔧 How It Works:\n1. Ultrasonic sensor measures fill level every **15 minutes**\n2. Data transmitted via **LoRaWAN** to cloud\n3. AI model processes fill rate + historical pattern\n4. Overflow prediction generated with probability score\n\n📊 Sensor Stats:\n• Total Smart Bins: **156** across Madurai\n• Sensor accuracy: **94%** fill-level detection\n• Battery life: **2 years** (solar-assisted)\n• Data latency: **< 30 seconds**\n\nNext phase: Adding **weight sensors** and **gas detection** for hazardous waste alerts.",
  'budget': "💰 **Waste Management Budget (FY 2025-26):**\n\n| Category | Allocation | Spent |\n|----------|-----------|-------|\n| Collection & Transport | ₹2.4 Cr | 67% |\n| Processing & Recycling | ₹1.8 Cr | 58% |\n| Smart Infrastructure | ₹92 L | 75% |\n| Citizen Engagement | ₹45 L | 42% |\n| AI & Technology | ₹68 L | 81% |\n\n📊 Total Budget: **₹5.85 Crores**\nSpent YTD: **₹3.78 Crores (65%)**\n\n💡 Revenue from recycling (₹4.2L/month) offsets **8.6%** of total costs.\nROI on smart infrastructure expected within **18 months**.",
  'compare': "📊 **Ward Comparison — Best vs Worst:**\n\n| Metric | Meenakshi (Best) | Anna Nagar (Worst) |\n|--------|:---:|:---:|\n| Score | 92/100 ✅ | 45/100 ❌ |\n| Resolution Time | 2.1h ✅ | 7.3h ❌ |\n| Resolved Rate | 93% ✅ | 45% ❌ |\n| Participation | 78% ✅ | 32% ❌ |\n| Recurrence | 5% ✅ | 35% ❌ |\n| Population | 15,200 | 22,100 |\n\n🔍 Key Insight: Anna Nagar has **45% more population** but **less than half** the infrastructure. Adding 2 more collection vehicles and 1 inspector could improve its score by an estimated **15-20 points**.",
  'hello': "👋 Hey there! I'm your **MadurAI Assistant** — always ready to help!\n\nHere are some things you can ask me:\n\n🏆 \"Show ward rankings\"\n🧠 \"Which bins will overflow?\"\n🚛 \"Show today's truck routes\"\n♻️ \"What's the recycling revenue?\"\n📋 \"How many complaints are active?\"\n\nOr type **help** to see all my capabilities!\n\nWhat would you like to know? 😊",
  'thanks': "You're welcome! 😊 Happy to help keep Madurai clean and smart.\n\nFeel free to ask anything else — I'm here 24/7! Some more things to explore:\n• \"Tell me about the sensors\"\n• \"What's the budget breakdown?\"\n• \"Compare best and worst wards\"\n• \"How does weather affect waste?\"\n\n🌱 Together, we make Madurai smarter!",
  'meenakshi': "**Ward 1 — Meenakshi Ward** 🥇 **Top Performer!**\n\nScore: **92/100** (↑ trending up)\n\n✨ What makes it #1:\n• Fastest resolution: **2.1 hours** average\n• Highest citizen engagement: **78%** participation\n• Lowest recurrence: Only **5%** repeat issues\n• Temple trust partnership drives community clean-ups\n• Active WhatsApp group with 800+ residents\n\n📈 The Meenakshi model is being studied for replication across other wards. Key success factor: strong community ownership.",
  'teppakulam': "**Ward 2 — Teppakulam Ward** 🥈\n\nScore: **88/100** (↑ trending up)\n\n📊 Performance:\n• Resolution time: **2.8 hours** (good)\n• 89% resolution rate (34 of 38)\n• 72% citizen participation\n• 8% recurrence rate\n• Population: 12,800\n\n🏛️ The historic Teppakulam tank area gets special attention. Heritage zone cleanups happen every Sunday morning with volunteer groups.",
  'kknagar': "**Ward 7 — KK Nagar** \n\nScore: **75/100** (→ stable)\n\n📊 Performance:\n• Resolution time: **3.5 hours** (near target)\n• 76% resolution rate\n• 62% citizen participation\n• 12% recurrence rate\n• Active complaint: Overflowing bins near market area\n\n💡 KK Nagar's market area generates **3x more organic waste** than residential zones. A dedicated market-waste composting unit could boost the score by 10+ points.",
  'inspector': "👮 **Inspector Dashboard Overview:**\n\nInspector: **Vijayendra Bidari**\n\n📋 Current Assignment:\n• Pending inspections: **3** complaints\n• High-severity flags: **2** (illegal dumping)\n• Vehicles assigned: **2** (V-01, V-03 available)\n• Today's resolved: **5** complaints\n\n🗺️ Active Route: Periyar → Meenakshi → Teppakulam\nProgress: **67%** complete · ETA: 45 min\n\n📊 Monthly Stats: 87% compliance rating, 2.6h avg response time.",
  'digital': "🏙️ **Digital Twin Overview:**\n\nMadurAI maintains a real-time digital twin of Madurai's waste infrastructure:\n\n🔌 Connected Nodes:\n• 156 Smart Bins (IoT sensors)\n• 5 Collection Vehicles (GPS-tracked)\n• 3 Processing Centers\n• 8 Ward Command Points\n\n📡 Real-time Data Feeds:\n• Fill levels (every 15 min)\n• Vehicle GPS (every 30 sec)\n• Citizen reports (instant)\n• Weather data (hourly)\n\n🧠 The twin enables simulation of \"what-if\" scenarios — like predicting impact of adding new bins or changing collection schedules.",
  'carbon': "🌍 **Carbon Footprint Analytics:**\n\n📊 Current Month:\n• Total CO₂ from waste: **142 tonnes**\n• Reduction via recycling: **38 tonnes** (−27%)\n• Route optimization saving: **12 tonnes** (−8%)\n\n🎯 Targets:\n• 2026 Goal: 30% reduction → Currently at **27%** ✅ On track\n• 2030 Goal: Carbon neutral waste management\n\n♻️ Composting organic waste alone prevents **23 tonnes** of methane-equivalent emissions monthly.\n\n💡 Switching V-04 and V-02 to CNG would save an additional **8 tonnes/month**.",
};

const suggestedPrompts = [
  "Why is Ward 12 ranked low?",
  "Show recycling revenue",
  "Which bins will overflow?",
  "How many complaints are active?",
  "Show ward rankings",
  "How can citizens help?",
  "Where is illegal dumping?",
  "Compare best and worst wards",
];

function getResponse(input: string): string {
  const lower = input.toLowerCase();
  if (lower.includes('help') || lower === '?') return sampleResponses['help'];
  if (lower.includes('hi') || lower.includes('hello') || lower.includes('hey') || lower === 'yo' || lower.includes('good morning') || lower.includes('good evening')) return sampleResponses['hello'];
  if (lower.includes('thank') || lower.includes('thanks') || lower.includes('thx') || lower.includes('great') || lower.includes('awesome')) return sampleResponses['thanks'];
  if (lower.includes('ward 12') || lower.includes('anna nagar') || lower.includes('ranked low') || lower.includes('worst ward')) return sampleResponses['ward 12'];
  if (lower.includes('ward 1') && !lower.includes('ward 12') && !lower.includes('ward 15')) return sampleResponses['ward 1'];
  if (lower.includes('ward 3') || lower.includes('thiruparankundram')) return sampleResponses['ward 3'];
  if (lower.includes('ward 5') || lower.includes('periyar ward')) return sampleResponses['ward 5'];
  if (lower.includes('ward 2') || lower.includes('teppakulam')) return sampleResponses['teppakulam'];
  if (lower.includes('ward 7') || lower.includes('kk nagar') || lower.includes('kknagar')) return sampleResponses['kknagar'];
  if (lower.includes('meenakshi') || lower.includes('best ward') || lower.includes('#1 ward') || lower.includes('top ward')) return sampleResponses['meenakshi'];
  if (lower.includes('compare') || lower.includes('vs') || lower.includes('versus') || lower.includes('difference between')) return sampleResponses['compare'];
  if (lower.includes('illegal') || lower.includes('dump') || lower.includes('penalty') || lower.includes('violation')) return sampleResponses['illegal'];
  if (lower.includes('vehicle') || lower.includes('fleet') || lower.includes('driver') || lower.includes('v-0')) return sampleResponses['vehicle'];
  if (lower.includes('weather') || lower.includes('rain') || lower.includes('monsoon') || lower.includes('heat') || lower.includes('temperature')) return sampleResponses['weather'];
  if (lower.includes('sensor') || lower.includes('iot') || lower.includes('smart bin') || lower.includes('lora') || lower.includes('ultrasonic')) return sampleResponses['sensor'];
  if (lower.includes('budget') || lower.includes('cost') || lower.includes('spend') || lower.includes('allocation') || lower.includes('crore')) return sampleResponses['budget'];
  if (lower.includes('digital twin') || lower.includes('simulation') || lower.includes('twin')) return sampleResponses['digital'];
  if (lower.includes('carbon') || lower.includes('emission') || lower.includes('co2') || lower.includes('footprint') || lower.includes('greenhouse')) return sampleResponses['carbon'];
  if (lower.includes('inspector') || lower.includes('vijayendra') || lower.includes('field')) return sampleResponses['inspector'];
  if (lower.includes('recycl') || lower.includes('circular') || lower.includes('revenue')) return sampleResponses['recycling'];
  if (lower.includes('route') || lower.includes('optimi') || lower.includes('truck')) return sampleResponses['route'];
  if (lower.includes('predict') || lower.includes('overflow') || lower.includes('forecast') || lower.includes('bins')) return sampleResponses['prediction'];
  if (lower.includes('complaint') || lower.includes('report') || lower.includes('status') || lower.includes('active')) return sampleResponses['complaint'];
  if (lower.includes('score') || lower.includes('rank') || lower.includes('leaderboard') || lower.includes('top')) return sampleResponses['score'];
  if (lower.includes('eco') || lower.includes('tip') || lower.includes('citizen') || lower.includes('point')) return sampleResponses['eco'];
  if (lower.includes('stat') || lower.includes('overview') || lower.includes('system') || lower.includes('dashboard')) return sampleResponses['stats'];
  return sampleResponses['default'];
}

interface AIChatbotProps {
  compact?: boolean;
  height?: string;
}

export function AIChatbot({ compact = false, height = 'h-[600px]' }: AIChatbotProps) {
  const [messages, setMessages] = useState<Msg[]>([
    { id: '0', role: 'assistant', content: "👋 Welcome to **MadurAI Intelligence**!\n\nI can answer questions about ward governance, waste management, recycling, route optimization, predictions, and more.\n\nTry asking: *\"Why is Ward 12 ranked low?\"* or type **help** for all topics.", timestamp: new Date() },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const send = (text?: string) => {
    const value = text || input.trim();
    if (!value) return;
    const userMsg: Msg = { id: Date.now().toString(), role: 'user', content: value, timestamp: new Date() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    const delay = 800 + Math.random() * 800;
    setTimeout(() => {
      const response = getResponse(value);
      setMessages(prev => [...prev, { id: (Date.now() + 1).toString(), role: 'assistant', content: response, timestamp: new Date() }]);
      setIsTyping(false);
    }, delay);
  };

  const clearChat = () => {
    setMessages([
      { id: Date.now().toString(), role: 'assistant', content: "🔄 Chat cleared. How can I help you?", timestamp: new Date() },
    ]);
  };

  return (
    <div className={`rounded-lg bg-card border border-border flex flex-col ${height} card-glow`}>
      {/* Header */}
      <div className="flex items-center justify-between p-3 border-b border-border">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-md bg-primary/10 relative">
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="absolute -top-0.5 -right-0.5 h-2 w-2 rounded-full bg-success animate-pulse" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-foreground">{compact ? 'Quick Help' : 'MadurAI Assistant'}</h3>
            <p className="text-[10px] text-muted-foreground">Powered by Gemini Pro · Online</p>
          </div>
        </div>
        <Button onClick={clearChat} size="icon" variant="ghost" className="h-7 w-7 text-muted-foreground hover:text-foreground" title="Clear chat">
          <RotateCcw className="h-3.5 w-3.5" />
        </Button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-3 space-y-3 scrollbar-thin">
        <AnimatePresence>
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex gap-2 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.role === 'assistant' && (
                <div className="flex-shrink-0 h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center mt-1">
                  <Bot className="h-3 w-3 text-primary" />
                </div>
              )}
              <div className={`max-w-[85%] rounded-lg p-3 ${compact ? 'text-xs' : 'text-sm'} ${
                msg.role === 'user'
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-foreground'
              }`}>
                <p className="whitespace-pre-line leading-relaxed">{msg.content}</p>
                <span className={`block text-[9px] mt-1 ${msg.role === 'user' ? 'text-primary-foreground/60' : 'text-muted-foreground'}`}>
                  {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
              {msg.role === 'user' && (
                <div className="flex-shrink-0 h-6 w-6 rounded-full bg-muted flex items-center justify-center mt-1">
                  <User className="h-3 w-3 text-muted-foreground" />
                </div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
        {isTyping && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-2 items-center">
            <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center">
              <Bot className="h-3 w-3 text-primary" />
            </div>
            <div className="flex gap-1 p-3 bg-muted rounded-lg">
              <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: '0ms' }} />
              <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: '150ms' }} />
              <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
          </motion.div>
        )}
        <div ref={endRef} />
      </div>

      {/* Suggestions (shown when few messages) */}
      {messages.length <= 2 && !compact && (
        <div className="px-3 pb-2">
          <div className="flex items-center gap-1.5 mb-1.5">
            <Lightbulb className="h-3 w-3 text-warning" />
            <span className="text-[10px] text-muted-foreground uppercase tracking-wider font-medium">Suggested</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {suggestedPrompts.map((prompt, i) => (
              <button
                key={i}
                onClick={() => send(prompt)}
                className="px-2.5 py-1 rounded-full text-[10px] font-medium bg-muted text-muted-foreground hover:bg-primary/10 hover:text-primary transition-all border border-border/50"
              >
                {prompt}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input */}
      <div className="p-3 border-t border-border flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && send()}
          placeholder={compact ? "Ask anything..." : "Ask about waste management, routes, predictions..."}
          className="flex-1 bg-input text-foreground text-sm rounded-md px-3 py-2 border border-border outline-none focus:ring-1 focus:ring-ring placeholder:text-muted-foreground"
        />
        <Button onClick={() => send()} size="icon" className="bg-primary text-primary-foreground hover:bg-primary/90" disabled={isTyping}>
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
